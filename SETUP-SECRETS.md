# 🔐 Setup Secrets - Cloudflare Dashboard

## Cara Set Secrets (Environment Variables)

Sebab wrangler CLI ada issue dengan API token, Boss boleh set secrets terus dari Cloudflare Dashboard.

---

## ✅ Step-by-Step

### Step 1: Buka Cloudflare Dashboard

1. Pergi ke: https://dash.cloudflare.com
2. Login dengan account Boss (iqbalmuhaider@gmail.com)

---

### Step 2: Navigate ke Worker

1. Klik **Workers & Pages** di sidebar kiri
2. Cari & klik project: **`skolahub-kelas-free`**

---

### Step 3: Buka Settings

1. Klik tab **Settings**
2. Scroll ke bawah ke section **Variables**
3. Klik **Environment Variables**

---

### Step 4: Add Secret #1 - RESEND_API_KEY

1. Click **Add variable**
2. Fill in:
   - **Variable name:** `RESEND_API_KEY`
   - **Value:** `re_cERbggoZ_Az7YZovzVUzTPZQMUKRWybyf`
   - ✅ Tick **Encrypt** (jadi secret)
3. Click **Save**

---

### Step 5: Add Secret #2 - TELEGRAM_BOT_TOKEN (Optional)

Kalau Boss nak Telegram notification:

1. Click **Add variable** lagi
2. Fill in:
   - **Variable name:** `TELEGRAM_BOT_TOKEN`
   - **Value:** `[bot token dari @BotFather]`
   - ✅ Tick **Encrypt** (jadi secret)
3. Click **Save**

**Cara dapat bot token:**
1. Buka Telegram, search: `@BotFather`
2. Send: `/newbot`
3. Follow instructions
4. Copy token (macam: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

---

### Step 5: Deploy Changes

1. Lepas save semua secrets, scroll atas
2. Click **Deploy** (atau push ke GitHub)
3. Tunggu deployment complete

---

## ✅ Verify

1. Buka https://skolahub-kelas-free.pages.dev
2. Isi borang & submit
3. Check:
   - ✅ User dapat confirmation email (dari Resend)
   - ✅ Boss dapat Telegram notification (kalau set bot token)
   - ✅ Data masuk D1 & Google Sheets

---

## 📋 Secrets Summary

| Variable | Value | Status |
|----------|-------|--------|
| `RESEND_API_KEY` | `re_cERbggoZ_Az7YZovzVUzTPZQMUKRWybyf` | ✅ Ready to set |
| `TELEGRAM_BOT_TOKEN` | (dari @BotFather) | ⚠️ Optional |
| `TELEGRAM_CHAT_ID` | `348712133` | ✅ Already in wrangler.toml |
| `GOOGLE_SHEETS_WEBHOOK` | (dari Apps Script) | ⚠️ Boss perlu set |

---

## 🔗 Quick Links

- Cloudflare Dashboard: https://dash.cloudflare.com
- Resend Dashboard: https://resend.com
- BotFather: https://t.me/BotFather

---

**Last Updated:** 2026-03-21
