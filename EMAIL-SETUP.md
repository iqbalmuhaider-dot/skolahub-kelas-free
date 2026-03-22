# 📧 Email Setup Guide

## ✅ Email Configuration

### 1. Admin Notification (Google Sheets)
**Email:** `skolahub1@gmail.com`  
**Status:** ✅ Configured in `google-apps-script-webhook.js`

Bila ada pendaftaran baru, Boss akan dapat email dari Google Sheets dengan maklumat lengkap peserta.

---

### 2. User Confirmation Email (Resend)
**Status:** ⚠️ **Perlu Setup API Key**

User akan dapat confirmation email dengan:
- ✅ Maklumat pendaftaran
- ✅ Link Telegram channel
- ✅ Next steps untuk kelas

---

## 🔧 Setup Resend API Key

### Step 1: Create Resend Account

1. Pergi ke https://resend.com
2. Sign up (free tier: 3,000 emails/month)
3. Verify email Boss

### Step 2: Get API Key

1. Login ke Resend dashboard
2. Klik **API Keys** di sidebar
3. Click **Create API Key**
4. Nama: `Skolahub Kelas Permula Percuma Webapp`
5. Copy API Key (akan jadi macam: `re_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)

### Step 3: Set Secret di Cloudflare

Dalam terminal:

```bash
cd /home/node/.openclaw/workspace/skolahub-kelas-free

# Set Resend API key sebagai secret
npx wrangler secret put RESEND_API_KEY
```

Paste API Key bila diminta.

### Step 4: Deploy

```bash
git push
```

---

## 📧 Email Flow

```
User Submit Form
    ↓
Cloudflare Worker
    ↓
├─→ D1 Database (Save registration)
├─→ Google Sheets (Backup)
│   └─→ Email Boss (skolahub1@gmail.com)
├─→ Telegram (Notify Boss)
└─→ Resend (Email confirmation to User)
    └─→ User dapat email + Telegram link
```

---

## 📋 Checklist

- [x] Admin email updated to skolahub1@gmail.com
- [x] User confirmation email code added
- [ ] Resend API key set (Boss buat)
- [ ] Test registration

---

## ✅ Status Summary

| Feature | Status |
|---------|--------|
| D1 Database | ✅ Ready |
| Telegram Notification (Boss) | ⚠️ Need bot token |
| Google Sheets Backup | ⚠️ Need webhook URL |
| Email to Boss (Sheets) | ✅ Ready |
| Email to User (Resend) | ⚠️ Need API key |

---

**Last Updated:** 2026-03-21
