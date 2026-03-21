export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['nama', 'email', 'telefon', 'jawatan', 'tahap', 'projek'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return Response.json({ 
          success: false, 
          error: `Field '${field}' is required` 
        }, { status: 400 });
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return Response.json({ 
        success: false, 
        error: 'Invalid email format' 
      }, { status: 400 });
    }
    
    // Save to D1 Database (if configured)
    if (env.DB) {
      await env.DB.prepare(`
        INSERT INTO registrations (nama, email, telefon, jawatan, institusi, tahap, projek, timestamp, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        data.nama,
        data.email,
        data.telefon,
        data.jawatan,
        data.institusi || null,
        data.tahap,
        data.projek,
        data.timestamp,
        data.status
      ).run();
    }
    
    // Increment counter in KV storage (if configured)
    if (env.KV) {
      const currentCount = parseInt(await env.KV.get('registration_count') || '0');
      await env.KV.put('registration_count', (currentCount + 1).toString());
    }
    
    // Backup to Google Sheets via webhook
    if (env.GOOGLE_SHEETS_WEBHOOK && env.GOOGLE_SHEETS_WEBHOOK !== "https://script.google.com/macros/s/YOUR_WEBHOOK_ID/exec") {
      try {
        await fetch(env.GOOGLE_SHEETS_WEBHOOK, {
          method: 'POST',
          mode: 'no-cors',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        });
        console.log('✅ Backup to Google Sheets successful');
      } catch (sheetError) {
        console.error('⚠️ Google Sheets backup failed:', sheetError);
        // Don't fail registration if Sheets backup fails
      }
    }
    
    // Send Telegram notification to Boss
    if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
      try {
        const message = `🎓 *Pendaftaran Baru!*

📋 *Maklumat:*
• Nama: ${data.nama}
• Email: ${data.email}
• Telefon: ${data.telefon}
• Jawatan: ${data.jawatan}
• Institusi: ${data.institusi || '-'}
• Tahap: ${data.tahap}
• Projek: ${data.projek}

⏰ ${new Date(data.timestamp).toLocaleString('ms-MY')}

📢 User akan join Telegram channel untuk update.`;

        await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
          })
        });
        console.log('✅ Telegram notification sent');
      } catch (tgError) {
        console.error('⚠️ Telegram notification failed:', tgError);
        // Don't fail registration if Telegram fails
      }
    }
    
    // Send confirmation email to User via Resend
    if (env.RESEND_API_KEY) {
      try {
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1F2937; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #4F46E5 0%, #4338CA 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #F9FAFB; padding: 30px; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 10px 0; }
    .telegram-btn { background: #0088cc; }
    .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #6B7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🎓 Pendaftaran Berjaya!</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Kelas Free AI & Automation - Skolahub</p>
    </div>
    
    <div class="content">
      <p>Hi <strong>${data.nama}</strong>,</p>
      
      <p>Terima kasih kerana mendaftar untuk <strong>Kelas Free Bina Permainan Interaktif</strong>!</p>
      
      <div class="details">
        <h3 style="margin-top: 0; color: #4F46E5;">📋 Maklumat Pendaftaran</h3>
        <p><strong>Nama:</strong> ${data.nama}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefon:</strong> ${data.telefon}</p>
        <p><strong>Jawatan:</strong> ${data.jawatan}</p>
        <p><strong>Institusi:</strong> ${data.institusi || '-'}</p>
        <p><strong>Tahap:</strong> ${data.tahap}</p>
        <p><strong>Projek:</strong> ${data.projek}</p>
      </div>
      
      <h3>📬 Apa Yang Seterusnya?</h3>
      <ol>
        <li>Kami akan hubungi anda dalam masa <strong>2-3 hari bekerja</strong></li>
        <li>Check email untuk butiran kelas & akses bahan pembelajaran</li>
        <li>Join Telegram channel untuk update terkini</li>
      </ol>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://t.me/+Jh9YJIPKARxiYTFl" class="button telegram-btn">✈️ Join Telegram Channel</a>
        <p style="font-size: 14px; color: #6B7280; margin-top: 10px;">Dapatkan update terkini tentang kelas & bahan pembelajaran</p>
      </div>
      
      <p><strong>🎮 Bersedia untuk bina permainan interaktif pertama anda!</strong></p>
      
      <div class="footer">
        <p>Sebarang pertanyaan? Reply email ini atau hubungi kami di skolahub1@gmail.com</p>
        <p style="margin-top: 10px;">© 2026 Skolahub. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
        `;

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: 'Skolahub <onboarding@resend.dev>',
            to: data.email,
            subject: `✅ Pendaftaran Berjaya - Kelas Free Bina Permainan Interaktif`,
            html: emailHtml
          })
        });
        console.log('✅ Confirmation email sent to user:', data.email);
      } catch (emailError) {
        console.error('⚠️ Confirmation email failed:', emailError);
        // Don't fail registration if email fails
      }
    }
    
    return Response.json({ 
      success: true, 
      message: 'Registration successful',
      registrationId: Date.now().toString()
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
