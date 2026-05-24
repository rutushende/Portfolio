# Rutuja Shende — Portfolio Website

A full-stack portfolio with Node.js backend and EmailJS frontend integration.

## 📁 File Structure

```
portfolio/
├── index.html          ← Main website (all sections, updated)
├── rutuja.jpg          ← Your profile photo
├── Certificate1-8.png  ← Certification images
├── server.js           ← Node.js backend
├── package.json        ← Dependencies
├── .env.example        ← Environment variables template
└── README.md
```

## 🚀 Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file
cp .env.example .env
# Then edit .env with your Gmail App Password

# 3. Run the server
npm start

# 4. Open http://localhost:3000
```

## ✉️ Email Setup (Gmail)

1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Go to App Passwords → Mail → Other → name it "Portfolio"
4. Copy the 16-character password into `.env` as `EMAIL_PASS`

The contact form uses EmailJS (service_g0lgacb / template_yz7min1) with Node.js backend as fallback.

## 📸 Required Image Files (place in same folder as index.html)

- rutuja.jpg         — your profile photo
- Certificate1.png   — SQL and Relational Databases 101
- Certificate2.png   — RAG with Embeddings
- Certificate3.png   — Full Stack Web Development
- Certificate4.png   — AI Engineer for Data Scientists
- Certificate5.png   — Python for Beginners
- Certificate6.png   — Artificial Intelligence IIT Roorkee
- Certificate7.png   — Generative AI for Beginners
- Certificate8.png   — SQL for Beginners MySQL

## ✅ Changes Made

- ✅ Phone number removed from all sections
- ✅ "AI Course Participant" experience entry removed
- ✅ Toolkit section redesigned with category headers, coloured pill tags, and proficiency bar cards
- ✅ EmailJS service ID corrected to service_g0lgacb
- ✅ Contact form: EmailJS primary + Node.js backend fallback
- ✅ Certificate images use object-fit:contain so full cert is visible
- ✅ Hero & About photos use onerror graceful fallback

## 🌐 Deploy to Railway / Render

### Render
1. Push to GitHub
2. New Web Service → connect repo
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add env vars: `EMAIL_USER`, `EMAIL_PASS`
