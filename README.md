# 🎓 Skolahub Kelas Free - Registration System

**Hub Digitalisasi Pendidikan**  
Kelas Free: Google Gemini + Apps Script + Google Sheets

---

## 🌐 Live URL

**Landing Page:** [URL akan ditambah selepas deploy]

---

## ✨ Features

### **Landing Page:**
- ✅ Professional design dengan branding Skolahub
- ✅ Hero section dengan CTA badge
- ✅ "What You'll Learn" - 3 learning tracks
- ✅ Projects Showcase - Portfolio Skolahub apps
- ✅ Registration form yang comprehensive
- ✅ Success message setelah daftar
- ✅ Mobile responsive

### **Backend API:**
- ✅ Cloudflare Workers API endpoint
- ✅ D1 Database integration
- ✅ Form validation
- ✅ Error handling
- ✅ Ready untuk Google Sheets webhook

### **Data Storage:**
- ✅ **Primary:** Cloudflare D1 Database
- ✅ **Alternative:** Google Sheets (via webhook)
- ✅ **Backup:** JSON exports

---

## 🚀 Setup & Deployment

### **Option 1: Quick Deploy (Recommended)**

```bash
# 1. Navigate to project
cd /home/node/.openclaw/workspace/skolahub-kelas-free

# 2. Initialize git
git init
git branch -m main
git config user.email "iqbalmuhaider@gmail.com"
git config user.name "Amin"

# 3. Commit
git add -A
git commit -m "Initial commit - Skolahub Kelas Free registration"

# 4. Create GitHub repo
# Pergi https://github.com/new
# Repo name: skolahub-kelas-free
# Visibility: Public

# 5. Push
git remote add origin https://github.com/iqbalmuhaider-dot/skolahub-kelas-free.git
git push -u origin main

# 6. Deploy ke Cloudflare Pages
# Pergi https://dash.cloudflare.com → Pages → Create project
# Connect GitHub → Pilih repo skolahub-kelas-free
# Deploy!
```

### **Option 2: Manual Deploy dengan Wrangler**

```bash
# Install wrangler
npm install -g wrangler

# Login
wrangler login

# Create D1 database
wrangler d1 create skolahub-registrations

# Update wrangler.toml dengan database_id

# Deploy
wrangler pages deploy . --project-name="skolahub-kelas-free"
```

---

## 📊 Database Setup

### **Cloudflare D1**

1. **Create Database:**
```bash
wrangler d1 create skolahub-registrations
```

2. **Apply Schema:**
```bash
wrangler d1 execute skolahub-registrations --file=schema.sql
```

3. **Update wrangler.toml:**
```toml
[[d1_databases]]
binding = "DB"
database_name = "skolahub-registrations"
database_id = "YOUR_DATABASE_ID"
```

### **Google Sheets Alternative**

1. **Create Google Sheet:**
   - Columns: `nama`, `email`, `telefon`, `jawatan`, `institusi`, `tahap`, `tujuan`, `projek`, `timestamp`, `status`

2. **Deploy Google Apps Script:**
```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.nama,
    data.email,
    data.telefon,
    data.jawatan,
    data.institusi,
    data.tahap,
    data.tujuan,
    data.projek,
    data.timestamp,
    data.status
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy as Web App:**
   - Publish → Deploy as Web App
   - Execute as: Me
   - Who has access: Anyone
   - Copy webhook URL

4. **Update API:**
   - Uncomment webhook code in `functions/api/register.js`
   - Add env variable `GOOGLE_SHEETS_WEBHOOK`

---

## 🎨 Customization

### **Change Colors:**

Edit `:root` variables in `index.html`:

```css
:root {
  --primary: #4F46E5;      /* Main brand color */
  --primary-dark: #4338CA; /* Darker shade */
  --secondary: #10B981;    /* Success/accent */
  --accent: #F59E0B;       /* CTA buttons */
}
```

### **Update Projects:**

Edit projects grid in `index.html` (line ~250):

```html
<div class="project-card">
  <div class="project-icon">📖</div>
  <h3>[Project Name]</h3>
  <p>[Description]</p>
  <a href="[URL]" target="_blank">Layari →</a>
</div>
```

### **Add More Fields:**

Edit form in `index.html`:

```html
<div class="form-group">
  <label>New Field Name</label>
  <input type="text" name="newfield" placeholder="Placeholder">
</div>
```

Update API validation in `functions/api/register.js`.

---

## 📧 Email Notifications (Optional)

### **Option A: Cloudflare Email Routing**

Setup email forwarding in Cloudflare dashboard.

### **Option B: Resend API**

```javascript
// In functions/api/register.js
await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${env.RESEND_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: 'Skolahub <onboarding@skolahub.com>',
    to: [data.email],
    subject: 'Pendaftaran Kelas Free - Confirmation',
    html: `
      <h1>Terima Kasih ${data.nama}!</h1>
      <p>Pendaftaran anda telah diterima.</p>
      <p>Kami akan hubungi anda dalam 2-3 hari bekerja.</p>
    `
  })
});
```

---

## 📊 View Registrations

### **D1 Query:**

```bash
# List all registrations
wrangler d1 execute skolahub-registrations --command="SELECT * FROM registrations ORDER BY created_at DESC"

# Count by status
wrangler d1 execute skolahub-registrations --command="SELECT status, COUNT(*) FROM registrations GROUP BY status"
```

### **Google Sheets:**

Just open the spreadsheet - data auto-populates!

---

## 🔧 Environment Variables

Create `.dev.vars` for local development:

```
GOOGLE_SHEETS_WEBHOOK=https://script.google.com/macros/s/xxx/exec
RESEND_API_KEY=re_xxx
DATABASE_ID=xxx
```

For Cloudflare Pages:
- Settings → Environment Variables → Add variables

---

## 📱 Form Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `nama` | Text | ✅ | Full name |
| `email` | Email | ✅ | Contact email |
| `telefon` | Tel | ✅ | Phone number |
| `jawatan` | Text | ✅ | Job title |
| `institusi` | Text | ❌ | School/Company |
| `tahap` | Select | ✅ | Skill level |
| `tujuan` | Textarea | ✅ | Why join |
| `projek` | Textarea | ✅ | Project idea |
| `timestamp` | Auto | ✅ | Registration time |
| `status` | Auto | ✅ | pending/confirmed |

---

## 🎯 Marketing Tips

### **Share On:**
- ✅ WhatsApp groups (teachers, educators)
- ✅ Facebook education groups
- ✅ Telegram channels
- ✅ LinkedIn (professional network)
- ✅ Twitter/X (education community)

### **Template Message:**

```
🎓 KELAS FREE AI & AUTOMATION! 🎓

Kuasai Google Gemini, Apps Script & Sheets!

✅ 100% PERCUMA
✅ Dari asas hingga boleh buat web app
✅ Bina projek sendiri

Daftar sekarang:
[LANDING_PAGE_URL]

Terhad kepada [X] peserta sahaja!

#AI #Automation #GoogleSheets #Education
```

---

## 📈 Analytics (Optional)

Add Cloudflare Web Analytics:

```html
<!-- In index.html <head> -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' 
  data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

---

## 🛠️ Troubleshooting

### **Form Not Submitting:**
- Check browser console for errors
- Verify API endpoint is deployed
- Check CORS settings

### **Database Errors:**
- Ensure D1 database is created
- Schema applied correctly
- Database ID correct in wrangler.toml

### **Deployment Fails:**
- Check Cloudflare Pages build logs
- Ensure `functions/` folder structure correct
- Verify Node.js compatibility

---

## 📞 Support

**Email:** contact@skolahub.com  
**Website:** https://skolahub.com

---

## 📄 License

© 2026 Skolahub. All rights reserved.

---

**Created:** 21 Mac 2026  
**By:** Embun AI Assistant  
**For:** Boss Amin - Skolahub  
**Version:** 1.0
