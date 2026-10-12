import nodemailer from "nodemailer";

const FORM_NAMES = {
    luxury_booking: "Luxury Salon Booking",
    makeup_page_booking: "Bridal & Studio Makeup Booking",
    makeup: "Makeup Booking",
    contact_us: "Contact Us Inquiry",
    contact: "Contact Us Inquiry",
    hero_quick_booking: "Hero Quick Reservation",
    about_booking: "About Page Reservation",
    course_inquiry: "Academy Course Inquiry",
    academy_booking: "Academy Masterclass Booking",
    academy_hero_inquiry: "Academy Hero Inquiry",
    modal_booking: "Quick Appointment Modal",
    bridal_landing_page: "Bridal Landing Page (/makeup-artist-lucknow)",
    bridal_landing_modal: "Bridal Landing Page Modal (/makeup-artist-lucknow)",
    salon_landing_page: "Salon Landing Page (/salon-services-lucknow)",
    salon_landing_modal: "Salon Landing Page Modal (/salon-services-lucknow)",
};

function formatFormName(formType) {
    if (!formType) return "Website Booking";
    return FORM_NAMES[formType] || formType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function getTransporter() {
    const user = process.env.EMAIL_USER || process.env.SMTP_USER;
    const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

    if (!user || !pass) {
        return null;
    }

    const host = process.env.EMAIL_HOST || process.env.SMTP_HOST;
    const port = Number(process.env.EMAIL_PORT || process.env.SMTP_PORT || (host ? 587 : 465));
    const service = process.env.EMAIL_SERVICE;

    const transportConfig = {
        connectionTimeout: 10000,
        greetingTimeout: 7000,
        socketTimeout: 15000,
    };

    if (service) {
        transportConfig.service = service;
        transportConfig.auth = { user, pass };
    } else if (host) {
        transportConfig.host = host;
        transportConfig.port = port;
        transportConfig.secure = process.env.EMAIL_SECURE === "true" || port === 465;
        transportConfig.auth = { user, pass };
    } else {
        // Default to gmail service when user/pass provided
        transportConfig.service = "gmail";
        transportConfig.auth = { user, pass };
    }

    return nodemailer.createTransport(transportConfig);
}

/**
 * Sends lead notification email to admin (tanukashyap889@gmail.com).
 * Safe function: Does not throw errors so booking submission is never broken.
 */
export async function sendLeadEmail(lead) {
    const toEmail = process.env.EMAIL_TO || "tanukashyap889@gmail.com";
    const fromEmail =
        process.env.EMAIL_FROM ||
        (process.env.EMAIL_USER ? `"KNK Awadh Salon" <${process.env.EMAIL_USER}>` : null) ||
        (process.env.SMTP_USER ? `"KNK Awadh Salon" <${process.env.SMTP_USER}>` : null) ||
        `"KNK Awadh Salon" <no-reply@knkawadh.com>`;

    try {
        const transporter = getTransporter();
        if (!transporter) {
            console.warn(
                `[MailService] EMAIL_USER / EMAIL_PASS not configured in .env. Lead #${lead.id || ""} for "${lead.name}" was saved in DB, but email to ${toEmail} was skipped.`
            );
            return { success: false, reason: "missing_credentials" };
        }

        const formName = formatFormName(lead.formType);
        const digits = String(lead.phone || "").replace(/\D/g, "");
        const cleanWhatsappPhone = digits.startsWith("91") && digits.length > 10 ? digits.slice(2) : digits;

        const nowFormatted = new Intl.DateTimeFormat("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "Asia/Kolkata",
        }).format(new Date());

        const subject = `[New Lead - ${formName}] ${lead.name} - ${lead.serviceOrCourse || "Appointment Request"}`;

        const textContent = `
KNK AWADH - NEW LEAD NOTIFICATION
=================================
Source: ${formName}
Lead ID: #${lead.id || "N/A"}

Client Name: ${lead.name}
Phone Number: ${lead.phone}
Email: ${lead.email || "Not provided"}
Service / Course: ${lead.serviceOrCourse || "General Inquiry"}
Branch / Location: ${lead.branchLocation || "KNK Salon Mahanagar"}
Preferred Date: ${lead.bookingDate || "Not specified"}
Preferred Time: ${lead.bookingTime || "Not specified"}
Guests: ${lead.guests || 1}
City: ${lead.city || "Not specified"}
Message / Notes: ${lead.message || "None"}

Received At: ${nowFormatted}
IP Address: ${lead.ipAddress || "N/A"}

This lead has also been saved to your Admin Dashboard (Bookings & Leads).
        `.trim();

        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f6f4ef; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f6f4ef; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td style="background-color: #1a1612; padding: 28px 32px; text-align: center; border-bottom: 3px solid #c59b27;">
              <h1 style="color: #c59b27; margin: 0 0 6px 0; font-size: 24px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">KNK AWADH</h1>
              <p style="color: #dfd7cc; margin: 0; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">Luxury Salon &amp; Academy &mdash; New Lead Notification</p>
            </td>
          </tr>

          <!-- Banner / Form Source -->
          <tr>
            <td style="background-color: #fcfbf8; padding: 16px 32px; border-bottom: 1px solid #ede8de;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: #1a1612; color: #c59b27; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; padding: 5px 12px; border-radius: 4px;">
                      Source: ${formName}
                    </span>
                  </td>
                  <td align="right" style="color: #8c8275; font-size: 12px; font-weight: 600;">
                    Lead ID: #${lead.id || "N/A"}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Details -->
          <tr>
            <td style="padding: 28px 32px;">
              <h2 style="margin: 0 0 18px 0; font-size: 18px; color: #1a1612; font-weight: 600; border-bottom: 1px solid #f0ebe1; padding-bottom: 10px;">
                Client &amp; Booking Details
              </h2>

              <table width="100%" border="0" cellspacing="0" cellpadding="8" style="font-size: 14px; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #f5f2eb;">
                  <td width="36%" style="color: #797165; font-weight: 600; padding: 10px 0;">Client Name:</td>
                  <td style="color: #1a1612; font-weight: 700; font-size: 15px; padding: 10px 0;">${lead.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f5f2eb;">
                  <td style="color: #797165; font-weight: 600; padding: 10px 0;">Phone Number:</td>
                  <td style="padding: 10px 0;">
                    <a href="tel:${lead.phone}" style="color: #b38728; font-weight: 700; text-decoration: none;">+91 ${cleanWhatsappPhone}</a>
                    &nbsp;|&nbsp;
                    <a href="https://wa.me/91${cleanWhatsappPhone}" target="_blank" style="color: #25D366; font-weight: 600; text-decoration: none; font-size: 12px;">WhatsApp &rarr;</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #f5f2eb;">
                  <td style="color: #797165; font-weight: 600; padding: 10px 0;">Email Address:</td>
                  <td style="color: #1a1612; padding: 10px 0;">${lead.email || '<span style="color:#999;font-style:italic;">Not provided</span>'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f5f2eb;">
                  <td style="color: #797165; font-weight: 600; padding: 10px 0;">Service / Course:</td>
                  <td style="color: #1a1612; font-weight: 600; padding: 10px 0;">${lead.serviceOrCourse || "General Salon Inquiry"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f5f2eb;">
                  <td style="color: #797165; font-weight: 600; padding: 10px 0;">Branch / Location:</td>
                  <td style="color: #1a1612; padding: 10px 0;">${lead.branchLocation || "KNK Salon Mahanagar"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f5f2eb;">
                  <td style="color: #797165; font-weight: 600; padding: 10px 0;">Preferred Date:</td>
                  <td style="color: #1a1612; padding: 10px 0;">${lead.bookingDate || '<span style="color:#999;font-style:italic;">Not specified</span>'}</td>
                </tr>
                ${
                    lead.bookingTime
                        ? `<tr style="border-bottom: 1px solid #f5f2eb;">
                    <td style="color: #797165; font-weight: 600; padding: 10px 0;">Preferred Time:</td>
                    <td style="color: #1a1612; padding: 10px 0;">${lead.bookingTime}</td>
                  </tr>`
                        : ""
                }
                ${
                    lead.guests && lead.guests > 1
                        ? `<tr style="border-bottom: 1px solid #f5f2eb;">
                    <td style="color: #797165; font-weight: 600; padding: 10px 0;">Number of Guests:</td>
                    <td style="color: #1a1612; padding: 10px 0;">${lead.guests}</td>
                  </tr>`
                        : ""
                }
                ${
                    lead.city
                        ? `<tr style="border-bottom: 1px solid #f5f2eb;">
                    <td style="color: #797165; font-weight: 600; padding: 10px 0;">City:</td>
                    <td style="color: #1a1612; padding: 10px 0;">${lead.city}</td>
                  </tr>`
                        : ""
                }
                ${
                    lead.message
                        ? `<tr style="border-bottom: 1px solid #f5f2eb;">
                    <td style="color: #797165; font-weight: 600; padding: 10px 0; vertical-align: top;">Message / Notes:</td>
                    <td style="color: #333333; padding: 10px 0; line-height: 1.5; white-space: pre-wrap; background-color: #faf8f5; border-radius: 4px;">${lead.message}</td>
                  </tr>`
                        : ""
                }
                <tr>
                  <td style="color: #797165; font-weight: 600; padding: 10px 0;">Received At:</td>
                  <td style="color: #8c8275; font-size: 13px; padding: 10px 0;">${nowFormatted}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Actions -->
          <tr>
            <td style="background-color: #faf7f2; padding: 22px 32px; text-align: center; border-top: 1px solid #ede8de;">
              <table border="0" cellspacing="0" cellpadding="0" align="center">
                <tr>
                  <td style="padding: 0 8px;">
                    <a href="tel:${lead.phone}" style="display: inline-block; background-color: #1a1612; color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 6px; font-size: 13px; font-weight: 600;">
                      Call Client
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://wa.me/91${cleanWhatsappPhone}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 6px; font-size: 13px; font-weight: 600;">
                      WhatsApp Client
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1612; padding: 18px 32px; text-align: center;">
              <p style="color: #9c9183; margin: 0; font-size: 11px; line-height: 1.6;">
                This lead has been saved in your database and is visible in your Admin Dashboard under <strong>Bookings &amp; Leads</strong>.<br />
                &copy; KNK Awadh Luxury Salon &amp; Academy.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `.trim();

        const info = await transporter.sendMail({
            from: fromEmail,
            to: toEmail,
            subject,
            text: textContent,
            html: htmlContent,
        });

        console.log(`[MailService] Lead email sent to ${toEmail} successfully. MessageId: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`[MailService] Failed to send email to ${toEmail}:`, error.message);
        return { success: false, error: error.message };
    }
}
