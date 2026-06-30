import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { scrapeProduct } from "@/lib/firecrawl";
import { sendPriceDropEmail } from "@/lib/email";

/**
 * POST /api/cron/check-prices
 * 
 * Automated cron endpoint that:
 * 1. Fetches ALL tracked products (using service role to bypass RLS)
 * 2. Re-scrapes each product via Firecrawl
 * 3. Compares old vs new price
 * 4. Updates the products table with the new price
 * 5. Inserts a new price_history record
 * 6. Sends email alert via Resend if the price dropped
 */
export async function POST(request) {
  try {
    // Verify the cron secret to prevent unauthorized access
    const authHeader = request.headers.get("Authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret) {
      console.error("CRON_SECRET is not configured.");
      return NextResponse.json(
        { error: "Server misconfiguration: CRON_SECRET not set." },
        { status: 500 }
      );
    }

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Use service role client to bypass RLS and access all users' products
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Fetch all products with their owner's email
    const { data: products, error: fetchError } = await supabase
      .from("products")
      .select("*");

    if (fetchError) {
      console.error("Failed to fetch products:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch products", details: fetchError.message },
        { status: 500 }
      );
    }

    if (!products || products.length === 0) {
      return NextResponse.json({
        message: "No products to check.",
        checked: 0,
        updated: 0,
        alerts: 0,
      });
    }

    console.log(`Cron: Starting price check for ${products.length} products...`);

    let checked = 0;
    let updated = 0;
    let alerts = 0;
    const errors = [];

    for (const product of products) {
      checked++;

      try {
        // Re-scrape the product
        const scrapedData = await scrapeProduct(product.url);

        if (!scrapedData || scrapedData.currentPrice === undefined) {
          errors.push({ id: product.id, name: product.name, error: "Failed to extract price" });
          continue;
        }

        const oldPrice = product.current_price;
        const newPrice = scrapedData.currentPrice;

        // Always insert a price_history record for the check
        await supabase.from("price_history").insert({
          product_id: product.id,
          price: newPrice,
          currency: scrapedData.currencyCode || product.currency,
          checked_at: new Date().toISOString(),
        });

        // If price changed, update the product record
        if (newPrice !== oldPrice) {
          const { error: updateError } = await supabase
            .from("products")
            .update({
              current_price: newPrice,
              currency: scrapedData.currencyCode || product.currency,
              img_url: scrapedData.productImageUrl || product.img_url,
              name: scrapedData.productName || product.name,
              updated_at: new Date().toISOString(),
            })
            .eq("id", product.id);

          if (updateError) {
            errors.push({ id: product.id, name: product.name, error: updateError.message });
            continue;
          }

          updated++;

          // If price DROPPED, send email alert
          if (newPrice < oldPrice) {
            // Look up the user's email
            const { data: userData } = await supabase.auth.admin.getUserById(product.user_id);
            const userEmail = userData?.user?.email;

            if (userEmail && process.env.RESEND_API_KEY) {
              const emailResult = await sendPriceDropEmail(
                userEmail,
                product,
                oldPrice,
                newPrice
              );

              if (emailResult.success) {
                alerts++;
                console.log(`Cron: Price drop alert sent for "${product.name}" to ${userEmail}`);
              } else {
                console.error(`Cron: Email failed for "${product.name}":`, emailResult.error);
              }
            }
          }
        }

        console.log(
          `Cron: [${checked}/${products.length}] "${product.name}" — ` +
          `${oldPrice} → ${newPrice} ${newPrice < oldPrice ? "↓ DROP" : newPrice > oldPrice ? "↑ UP" : "= SAME"}`
        );
      } catch (scrapeErr) {
        console.error(`Cron: Error processing "${product.name}":`, scrapeErr.message);
        errors.push({ id: product.id, name: product.name, error: scrapeErr.message });
      }
    }

    const summary = {
      message: "Price check completed.",
      checked,
      updated,
      alerts,
      errors: errors.length,
      errorDetails: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString(),
    };

    console.log("Cron: Price check summary:", summary);
    return NextResponse.json(summary);
  } catch (error) {
    console.error("Cron: Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
