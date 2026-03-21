# 🔔 Setup Telegram Notification

## Cara Setup Telegram Bot Token

### Step 1: Create Telegram Bot

1. Buka Telegram, search: **@BotFather**
2. Send message: `/newbot`
3. Follow instructions:
   - **Bot name:** Skolahub Registration Bot
   - **Bot username:** skolahub_reg_bot (atau apa-apa yang available)
4. **Copy Bot Token** (akan jadi macam: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 2: Set Secret di Cloudflare

Dalam terminal (di folder `skolahub-kelas-free`):

```bash
cd /home/node/.openclaw/workspace/skolahub-kelas-free

# Set Telegram bot token sebagai secret
npx wrangler secret put TELEGRAM_BOT_TOKEN
```

Masukkan bot token bila diminta.

### Step 3: Deploy

```bash
git add -A
git commit -m "Setup: Telegram notification enabled"
git push
```

### Step 4: Test!

Submit registration di https://skolahub-kelas-free.pages.dev

Boss akan dapat Telegram message macam ni:

```
🎓 Pendaftaran Baru!

📋 Maklumat:
• Nama: Ahmad bin Abdullah
• Email: ahmad@gmail.com
• Telefon: 012-3456789
• Jawatan: Guru
• Institusi: SK Masjid Tanah
• Tahap: pemula
• Projek: Kuiz interaktif untuk murid

⏰ 21/3/2026, 12:00:00 PM
```

---

## ✅ Status

- [x] D1 database ready
- [x] Telegram notification code added
- [ ] Telegram bot token set (Boss buat)
- [ ] Google Sheets webhook (optional)

---

**Chat ID:** 348712133 (Amin)  
**Notification:** Real-time bila ada pendaftaran baru
