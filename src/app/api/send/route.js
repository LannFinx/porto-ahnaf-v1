// app/api/send/route.js
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Sistem akan membaca kunci rahasia dari file .env.local Anda
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Ahnaf Portfolio <onboarding@resend.dev>', // Wajib pakai ini untuk free tier
      to: 'ahnafisa02@gmail.com', // <── SUDAH DIGANTI KE EMAIL ANDA
      reply_to: email, // Klien membalas ke email yang mereka input
      subject: `New Inquiry from ${name} - Portfolio`,
      html: `
        <div style="font-family: sans-serif; color: #111;">
          <h2>Pesan Baru dari Portofolio</h2>
          <p><strong>Nama Klien:</strong> ${name}</p>
          <p><strong>Email Klien:</strong> ${email}</p>
          <br />
          <p><strong>Pesan:</strong></p>
          <p style="padding: 12px; border-left: 4px solid #c8a96e; background: #f9f9f9;">
            ${message}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Resend Error:', error);
    return NextResponse.json({ error: 'Gagal mengirim pesan.' }, { status: 500 });
  }
}