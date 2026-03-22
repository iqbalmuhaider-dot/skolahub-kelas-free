// Google Apps Script Webhook untuk Skolahub Kelas Permula Percuma Webapp
// Setup Guide: https://github.com/iqbalmuhaider-dot/skolahub-kelas-free/blob/main/APPS-SCRIPT-SETUP.md
// 
// Cara setup:
// 1. Buka https://script.google.com
// 2. Create new project
// 3. Paste code ni
// 4. Deploy → Deploy as Web App
// 5. Execute as: Me
// 6. Who has access: Anyone
// 7. Copy webhook URL
// 8. Update wrangler.toml dengan webhook URL

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Create headers if first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'ID',
        'Nama',
        'Email',
        'Telefon',
        'Jawatan',
        'Institusi',
        'Tahap',
        'Projek',
        'Timestamp',
        'Status',
        'Created At'
      ]);
      
      // Style header row
      const headerRange = sheet.getRange(1, 1, 1, 11);
      headerRange.setBackground('#4F46E5');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }
    
    // Generate ID
    const id = 'REG-' + Date.now().toString().slice(-6);
    const createdAt = new Date().toISOString();
    
    // Append data
    sheet.appendRow([
      id,
      data.nama,
      data.email,
      data.telefon,
      data.jawatan,
      data.institusi || '-',
      data.tahap,
      data.projek,
      data.timestamp,
      data.status || 'pending',
      createdAt
    ]);
    
    // Format new row
    const lastRow = sheet.getLastRow();
    const dataRange = sheet.getRange(lastRow, 1, 1, 11);
    dataRange.setHorizontalAlignment('left');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 11);
    
    // Send email notification (optional)
    sendNotificationEmail(data, id);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Registration saved successfully',
      registrationId: id
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendNotificationEmail(data, id) {
  try {
    const adminEmail = 'skolahub1@gmail.com'; // Email Boss
    
    const subject = `🎓 Pendaftaran Baru: ${data.nama} (${id})`;
    
    const htmlBody = `
      <h2 style="color: #4F46E5;">Pendaftaran Kelas Permula Percuma Webapp - Skolahub</h2>
      
      <div style="background: #F3F4F6; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>Maklumat Peserta:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold;">ID:</td>
            <td style="padding: 8px;">${id}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Nama:</td>
            <td style="padding: 8px;">${data.nama}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Telefon:</td>
            <td style="padding: 8px;">${data.telefon}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Jawatan:</td>
            <td style="padding: 8px;">${data.jawatan}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Institusi:</td>
            <td style="padding: 8px;">${data.institusi || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Tahap:</td>
            <td style="padding: 8px;">${data.tahap}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Tujuan:</td>
            <td style="padding: 8px;">${data.tujuan}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Projek:</td>
            <td style="padding: 8px;">${data.projek}</td>
          </tr>
        </table>
      </div>
      
      <p style="color: #6B7280; font-size: 14px;">
        Masa pendaftaran: ${new Date(data.timestamp).toLocaleString('ms-MY')}
      </p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #E5E7EB;">
        <p style="color: #6B7280; font-size: 12px;">
          Email ini dihantar secara automatik. Sila hubungi peserta dalam 2-3 hari bekerja.
        </p>
      </div>
    `;
    
    GmailApp.sendEmail(adminEmail, subject, '', {
      htmlBody: htmlBody,
      name: 'Skolahub Registration System'
    });
    
    Logger.log('Notification email sent to ' + adminEmail);
    
  } catch (error) {
    Logger.log('Email error: ' + error.toString());
    // Don't fail registration if email fails
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    message: 'Skolahub Registration Webhook API',
    status: 'active',
    version: '1.0.0'
  })).setMimeType(ContentService.MimeType.JSON);
}
