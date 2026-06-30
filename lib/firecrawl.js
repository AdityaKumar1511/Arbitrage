import http from "http";
import https from "https";
import fs from "fs";
import FirecrawlApp from "@mendable/firecrawl-js";

const apiKey = process.env.FIRECRAWL_API_KEY;

if (!apiKey) {
  console.warn("Warning: FIRECRAWL_API_KEY is not defined in environment variables.");
}

const firecrawl = new FirecrawlApp({ apiKey: apiKey || "" });

/**
 * Resolves redirects for a given URL and returns the final destination URL.
 * Follows up to maxRedirects redirects.
 */
async function resolveUrl(url, maxRedirects = 5) {
  return new Promise((resolve) => {
    let currentUrl = url;
    let redirectCount = 0;

    const follow = (targetUrl) => {
      if (redirectCount >= maxRedirects) {
        resolve(targetUrl);
        return;
      }

      const isHttps = targetUrl.startsWith("https");
      const client = isHttps ? https : http;

      try {
        const req = client.request(
          targetUrl,
          {
            method: "GET",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
          },
          (res) => {
            // Abort reading the body to save bandwidth/time
            res.destroy();

            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
              redirectCount++;
              let redirectUrl = res.headers.location;
              if (!redirectUrl.startsWith("http")) {
                const urlObj = new URL(targetUrl);
                redirectUrl = urlObj.origin + redirectUrl;
              }
              follow(redirectUrl);
            } else {
              resolve(targetUrl);
            }
          }
        );

        req.on("error", (err) => {
          console.error("Redirect resolution request error:", err);
          resolve(targetUrl);
        });

        req.end();
      } catch (err) {
        console.error("Redirect resolution error:", err);
        resolve(targetUrl);
      }
    };

    follow(currentUrl);
  });
}

/**
 * Scrapes product information from a URL using Firecrawl's LLM extraction.
 * @param {string} url - The URL of the product to scrape.
 * @returns {Promise<{productName: string, currentPrice: number, currencyCode?: string, productImageUrl?: string, resolvedUrl: string}>}
 */
export async function scrapeProduct(url) {
  if (!url) {
    throw new Error("Product URL is required");
  }

  // Follow any redirects to get the canonical URL (critical for amzn.in, amzn.to, etc.)
  const resolvedUrl = await resolveUrl(url);
  console.log(`Scraping resolved product URL: ${resolvedUrl}`);

  const response = await firecrawl.scrapeUrl(resolvedUrl, {
    formats: [
      {
        type: "json",
        schema: {
          type: "object",
          properties: {
            productName: { 
              type: "string", 
              description: "The title or name of the product" 
            },
            currentPrice: { 
              type: "number", 
              description: "The numerical current price of the product (e.g. 99.99)" 
            },
            currencyCode: { 
              type: "string", 
              description: "The 3-letter currency code, e.g. USD, INR, GBP, EUR" 
            },
            productImageUrl: { 
              type: "string", 
              description: "The absolute URL of the primary product image" 
            }
          },
          required: ["productName", "currentPrice"]
        }
      }
    ]
  });

  if (!response || (!response.json && !response.success)) {
    const errorMsg = response?.error || "Failed to scrape product data via Firecrawl";
    try {
      fs.appendFileSync(
        "c:/Users/ADITYA/Desktop/Code/Projects/Arbitrage/error.log",
        `[${new Date().toISOString()}] Scrape URL: ${resolvedUrl}\nError message: ${errorMsg}\nResponse: ${JSON.stringify(response)}\n\n`
      );
    } catch (logErr) {
      console.error("Failed to write to error.log:", logErr);
    }
    throw new Error(errorMsg);
  }

  if (!response.json) {
    try {
      fs.appendFileSync(
        "c:/Users/ADITYA/Desktop/Code/Projects/Arbitrage/error.log",
        `[${new Date().toISOString()}] Scrape URL: ${resolvedUrl}\nError: No JSON data returned. Full response: ${JSON.stringify(response)}\n\n`
      );
    } catch (logErr) {}
    throw new Error("No structured data returned from scraper");
  }

  return {
    ...response.json,
    resolvedUrl,
  };
}
