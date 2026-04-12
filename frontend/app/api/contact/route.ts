import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, association, email, country, message } = await req.json();

    if (!name || !email || !message || !country) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Dynamic Email Routing
    let targetEmail = 'info@tactlink.com';
    switch (country.toLowerCase()) {
      case 'singapore': targetEmail = 'info.singapore@tactlink.com'; break;
      case 'thailand': targetEmail = 'info.thailand@tactlink.com'; break;
      case 'cambodia': targetEmail = 'info.cambodia@tactlink.com'; break;
      case 'malaysia': targetEmail = 'info.malaysia@tactlink.com'; break;
      case 'indonesia': targetEmail = 'info.indonesia@tactlink.com'; break;
      case 'vietnam': targetEmail = 'info.vietnam@tactlink.com'; break;
      case 'philippines': targetEmail = 'info.philippines@tactlink.com'; break;
      case 'bangladesh': targetEmail = 'info.bangladesh@tactlink.com'; break;
      default: targetEmail = 'info@tactlink.com';
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
        from: `"TactLink Website" <${process.env.SMTP_USER}>`,
        to: targetEmail,
        replyTo: email,
        subject: `Partnership Inquiry from ${name} (${association || 'N/A'}) - ${country.toUpperCase()}`,
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #2b51aa;">New Partnership Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Association/Company:</strong> ${association || 'N/A'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Region/Country:</strong> ${country}</p>
            <br/>
            <p><strong>Message:</strong></p>
            <div style="background: #f4f6f9; padding: 15px; border-radius: 8px;">
                <p style="margin: 0;">${message.replace(/\n/g, '<br/>')}</p>
            </div>
          </div>
        `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Email send failed:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
