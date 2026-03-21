export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['nama', 'email', 'telefon', 'jawatan', 'tahap', 'tujuan', 'projek'];
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
        INSERT INTO registrations (nama, email, telefon, jawatan, institusi, tahap, tujuan, projek, timestamp, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        data.nama,
        data.email,
        data.telefon,
        data.jawatan,
        data.institusi || null,
        data.tahap,
        data.tujuan,
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
    
    // Send confirmation email (optional - implement with Cloudflare Email or external service)
    // await sendConfirmationEmail(data.email, data.nama);
    
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
