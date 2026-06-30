import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured in environment variables.");
    }
    _resend = new Resend(apiKey);
  }
  return _resend;
}

export interface EmailProductInfo {
  name: string;
  currency: string;
  url: string;
  img_url?: string | null;
}

/**
 * Sends a price drop alert email to the user.
 * @param to - Recipient email address
 * @param product - Product details
 * @param oldPrice - Previous price
 * @param newPrice - New (lower) price
 */
export async function sendPriceDropEmail(
  to: string,
  product: EmailProductInfo,
  oldPrice: number,
  newPrice: number
): Promise<{ success: boolean; id?: string; error?: string }> {
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const currencySymbol = getCurrencySymbol(product.currency);
  const savings = (oldPrice - newPrice).toFixed(2);
  const percentDrop = ((1 - newPrice / oldPrice) * 100).toFixed(1);

  try {
    const { data, error } = await getResend().emails.send({
      from: `Arbitrage Price Tracker <${fromEmail}>`,
      to: [to],
      subject: `🔥 Price Drop Alert: ${product.name} is now ${currencySymbol}${newPrice}!`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0C0B0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0C0B0A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#141311;border-radius:16px;border:1px solid #1a1917;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="padding:32px 32px 24px;border-bottom:1px solid #1a1917;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:24px;font-weight:800;color:#f5f5f4;letter-spacing:-0.5px;">arbitr</span>
                    <span style="font-size:24px;font-weight:800;color:#f97316;">↗</span>
                    <span style="font-size:24px;font-weight:800;color:#f5f5f4;letter-spacing:-0.5px;">ge</span>
                  </td>
                  <td align="right">
                    <span style="background-color:rgba(249,115,22,0.1);color:#f97316;font-size:10px;font-weight:700;padding:6px 12px;border-radius:20px;border:1px solid rgba(249,115,22,0.2);text-transform:uppercase;letter-spacing:1.5px;">Price Alert</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Alert Banner -->
          <tr>
            <td style="padding:24px 32px;">
              <div style="background:linear-gradient(135deg,#f97316 0%,#f59e0b 100%);border-radius:12px;padding:20px 24px;text-align:center;">
                <p style="margin:0;color:rgba(255,255,255,0.9);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Price just dropped</p>
                <p style="margin:8px 0 0;color:#fff;font-size:36px;font-weight:900;letter-spacing:-1px;">${percentDrop}% OFF</p>
                <p style="margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">You save ${currencySymbol}${savings}</p>
              </div>
            </td>
          </tr>

          <!-- Product Info -->
          <tr>
            <td style="padding:0 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1917;border-radius:12px;border:1px solid #252420;">
                <tr>
                  ${product.img_url ? `
                  <td width="100" style="padding:16px;">
                    <img src="${product.img_url}" alt="${product.name}" width="80" height="80" style="border-radius:8px;object-fit:contain;background:#0C0B0A;display:block;" />
                  </td>` : ""}
                  <td style="padding:16px;">
                    <p style="margin:0;color:#f5f5f4;font-size:15px;font-weight:700;line-height:1.4;">${product.name}</p>
                    <table cellpadding="0" cellspacing="0" style="margin-top:12px;">
                      <tr>
                        <td style="padding-right:16px;">
                          <p style="margin:0;color:#71717a;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Was</p>
                          <p style="margin:2px 0 0;color:#71717a;font-size:18px;font-weight:700;text-decoration:line-through;">${currencySymbol}${oldPrice.toLocaleString()}</p>
                        </td>
                        <td>
                          <p style="margin:0;color:#71717a;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Now</p>
                          <p style="margin:2px 0 0;color:#22c55e;font-size:18px;font-weight:900;">${currencySymbol}${newPrice.toLocaleString()}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding:0 32px 32px;" align="center">
              <a href="${product.url}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#f97316 0%,#f59e0b 100%);color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:14px 32px;border-radius:10px;letter-spacing:0.3px;">
                View Product →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #1a1917;text-align:center;">
              <p style="margin:0;color:#52525b;font-size:11px;">
                You're receiving this because you're tracking this product on
                <a href="${appUrl}" style="color:#f97316;text-decoration:none;font-weight:600;">Arbitrage</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    if (error) {
      console.error("Resend email error:", error);
      return { success: false, error: error.message };
    }

    console.log(`Price drop email sent to ${to} for "${product.name}" (ID: ${data?.id})`);
    return { success: true, id: data?.id };
  } catch (err: any) {
    console.error("Failed to send price drop email:", err);
    return { success: false, error: err.message };
  }
}

function getCurrencySymbol(code: string): string {
  switch (code?.toUpperCase()) {
    case "USD": return "$";
    case "EUR": return "€";
    case "GBP": return "£";
    case "INR": return "₹";
    case "JPY": return "¥";
    case "CAD": return "CA$";
    case "AUD": return "A$";
    default: return code || "$";
  }
}
