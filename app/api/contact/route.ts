import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const data = await req.json();
  const { name, email, phone, company_name, website_url, help } = data;

  if (!name || !email || !phone || !company_name || !help) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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
        <h3>Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company_name}</p>
        <p><strong>Website:</strong> ${website_url || "N/A"}</p>
        <p><strong>Message:</strong> ${help}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send failed", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
