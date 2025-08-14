import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const data = await req.json();
  const { name, email, phone, company_name, website_url, help } = data;

  if (!name || !email || !phone || !company_name || !help) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or use SMTP config for SendGrid/Mailgun/etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${name}`,
      html: `
    <div style="font-family: Arial, sans-serif; background-color: #f6f8fa; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        
        <div style="background-color: #004aad; color: white; padding: 16px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px;">📩 New Contact Form Submission</h2>
        </div>
        
        <div style="padding: 20px; color: #333;">
          <p style="font-size: 15px;">You have received a new message via your contact form:</p>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 160px; background-color: #f1f4f8;">Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #f1f4f8;">Email:</td>
              <td style="padding: 8px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #f1f4f8;">Phone:</td>
              <td style="padding: 8px;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #f1f4f8;">Company:</td>
              <td style="padding: 8px;">${company_name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #f1f4f8;">Website:</td>
              <td style="padding: 8px;">${website_url || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #f1f4f8; vertical-align: top;">Message:</td>
              <td style="padding: 8px;">${help}</td>
            </tr>
          </table>
        </div>
        
        <div style="background-color: #f6f8fa; color: #777; font-size: 12px; padding: 12px; text-align: center;">
          This message was sent from your website's contact form.
        </div>
      </div>
    </div>
  `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send failed", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
