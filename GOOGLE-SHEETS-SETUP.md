# 📊 Google Sheets Backup Setup

## ✅ D1 Database Created!

**Database:** `skolahub-registrations`  
**Database ID:** `8f486806-2fef-49c4-93df-9ce5fe8d6271`  
**Status:** ✅ Active & Ready

---

## 🔧 Setup Google Sheets Webhook (Backup)

### Step 1: Create Google Sheet

1. Buka https://sheets.google.com
2. Create new spreadsheet
3. Nama: **"Skolahub Kelas Permula Percuma Webapp - Registrations"**

### Step 2: Create Google Apps Script

1. Dalam Google Sheet, klik **Extensions** → **Apps Script**
2. Delete semua code dalam editor
3. Copy & paste code dari file: `google-apps-script-webhook.js`
4. **Save** project (nama: "Skolahub Registration Webhook")

### Step 3: Deploy Webhook

1. Klik **Deploy** → **New deployment**
2. Click gear icon ⚙️ → Select type: **Web app**
3. Fill in:
   - **Description:** Skolahub Registration Webhook
   - **Execute as:** Me (iqbalmuhaider@gmail.com)
   - **Who has access:** Anyone
4. Click **Deploy**
5. Authorize access (klik Allow)
6. **Copy Webhook URL** (akan jadi macam: `https://script.google.com/macros/s/XXXXX/exec`)

### Step 4: Update Wrangler Config

1. Buka file: `wrangler.toml`
2. Update line ini:
   ```toml
   GOOGLE_SHEETS_WEBHOOK = "https://script.google.com/macros/s/YOUR_WEBHOOK_ID/exec"
   ```
   Jadi:
   ```toml
   GOOGLE_SHEETS_WEBHOOK = "https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXXX/exec"
   ```
3. Commit & push ke GitHub

### Step 5: Test!

1. Buka landing page: https://skolahub-kelas-free.pages.dev
2. Submit test registration
3. Check:
   - ✅ D1 Database (data masuk)
   - ✅ Google Sheet (data backup)
   - ✅ Email notification (optional)

---

## 📋 Data Flow

```
User Submit Form
    ↓
Cloudflare Worker (register.js)
    ↓
├─→ D1 Database (Primary)
│   - Save registration
│   - Real-time counter
│
└─→ Google Sheets Webhook (Backup)
    - Auto-create headers
    - Append row
    - Format cells
    - Send email notification
```

---

## 🔍 Check D1 Data

```bash
# Check semua registrations
curl -X POST "https://api.cloudflare.com/client/v4/accounts/3cc808af04ffee93fa6b37664117177c/d1/database/8f486806-2fef-49c4-93df-9ce5fe8d6271/query" \
  -H "X-Auth-Key: YOUR_API_KEY" \
  -H "X-Auth-Email: YOUR_EMAIL" \
  -H "Content-Type: application/json" \
  -d '{"sql":"SELECT * FROM registrations ORDER BY created_at DESC"}'

# Check count
curl -X POST "https://api.cloudflare.com/client/v4/accounts/3cc808af04ffee93fa6b37664117177c/d1/database/8f486806-2fef-49c4-93df-9ce5fe8d6271/query" \
  -H "X-Auth-Key: YOUR_API_KEY" \
  -H "X-Auth-Email: YOUR_EMAIL" \
  -H "Content-Type: application/json" \
  -d '{"sql":"SELECT COUNT(*) as total FROM registrations"}'
```

---

## 📧 Email Notification

Default email notification dihantar ke: `contact@skolahub.com`

Untuk tukar, edit file `google-apps-script-webhook.js`:

```javascript
const adminEmail = 'contact@skolahub.com'; // ← Tukar sini
```

---

## ✅ Status Checklist

- [x] D1 Database created
- [x] Table schema created
- [x] Wrangler config updated
- [x] Backup code in register.js
- [ ] Google Sheet created (Boss buat)
- [ ] Apps Script deployed (Boss buat)
- [ ] Webhook URL added to wrangler.toml (Boss buat)
- [ ] Test registration (Boss test)

---

**Last Updated:** 2026-03-21  
**Database ID:** `8f486806-2fef-49c4-93df-9ce5fe8d6271`
