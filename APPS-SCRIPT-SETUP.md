# 📝 Google Apps Script Setup

## ✅ Step-by-Step Guide

### Step 1: Create Google Sheet

1. Buka https://sheets.google.com
2. Login dengan Google Boss (iqbalmuhaider@gmail.com)
3. Click **+ Blank** atau **+ Kosong**
4. Nama sheet: **`Skolahub Kelas Permula Percuma Webapp - Registrations`**

---

### Step 2: Buka Apps Script Editor

1. Dalam Google Sheet, klik **Extensions** → **Apps Script**
2. Akan buka tab baru dengan editor code

---

### Step 3: Copy & Paste Code

1. **Delete** semua code yang ada dalam editor
2. **Copy** code dari file: `google-apps-script-webhook.js`
3. **Paste** ke dalam Apps Script editor

---

### Step 4: Save Project

1. Click icon **Save** (💾) atau `Ctrl+S`
2. Nama project: **`Skolahub Registration Webhook`**

---

### Step 5: Deploy Web App

1. Click **Deploy** (button biru atas kanan)
2. Pilih **New deployment**
3. Click gear icon ⚙️ (Select type)
4. Pilih **Web app**
5. Fill in:
   - **Description:** `Skolahub Kelas Permula Percuma Webapp Registration`
   - **Execute as:** `Me (iqbalmuhaider@gmail.com)`
   - **Who has access:** `Anyone` ← **IMPORTANT!**
6. Click **Deploy**

---

### Step 6: Authorize Access

1. Google akan minta authorization
2. Click **Authorize access**
3. Pilih Google account Boss (iqbalmuhaider@gmail.com)
4. Kalau keluar "Google hasn't verified this app":
   - Click **Advanced**
   - Click **Go to Skolahub Registration Webhook (unsafe)**
   - Click **Allow**
5. Copy **Web app URL**

**URL format:**
```
https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
```

---

### Step 7: Update Wrangler Config

1. Buka file: `wrangler.toml`
2. Update line ni:
   ```toml
   GOOGLE_SHEETS_WEBHOOK = "https://script.google.com/macros/s/YOUR_WEBHOOK_ID/exec"
   ```
   
   Jadi macam ni (guna URL Boss):
   ```toml
   GOOGLE_SHEETS_WEBHOOK = "https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec"
   ```

3. Save file

---

### Step 8: Deploy ke Cloudflare

Dalam terminal:

```bash
cd /home/node/.openclaw/workspace/skolahub-kelas-free

git add -A
git commit -m "Update: Google Sheets webhook URL"
git push
```

Cloudflare akan auto-deploy dalam 1-2 minit.

---

## ✅ Test!

1. Buka https://skolahub-kelas-free.pages.dev
2. Isi borang dengan test data
3. Submit
4. Check:
   - ✅ Google Sheet ada data baru
   - ✅ Boss dapat email ke skolahub1@gmail.com
   - ✅ D1 database ada entry
   - ✅ Counter bertambah

---

## 📧 Email Notification

**Admin email:** `skolahub1@gmail.com`

Bila ada pendaftaran baru, Boss akan dapat email dengan:
- Nama peserta
- Email & telefon
- Jawatan & institusi
- Projek yang nak dibina

---

## 🔧 Troubleshooting

### Error: "You do not have permission"
- Pastikan **Who has access** = `Anyone`
- Redeploy web app

### Data tak masuk Sheet
- Check webhook URL dalam wrangler.toml
- Pastikan URL betul (copy dari Deploy → Web app URL)
- Check Apps Script logs (View → Executions)

### Email tak sampai
- Check spam folder
- Pastikan email Boss betul: `skolahub1@gmail.com`

---

## 📋 Checklist

- [ ] Google Sheet created
- [ ] Apps Script code pasted
- [ ] Project saved
- [ ] Deployed as Web app
- [ ] Who has access = Anyone
- [ ] Web app URL copied
- [ ] wrangler.toml updated
- [ ] Git pushed
- [ ] Test registration

---

**Last Updated:** 2026-03-21  
**Admin Email:** skolahub1@gmail.com
