/**
 * Rutuja Shende — Portfolio Backend
 * Node.js + Express server
 * Run: node server.js
 * Serves static files AND handles contact form API
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Serve static files (HTML, CSS, images) ───
app.use(express.static(path.join(__dirname)));

// ─── Contact Form API ───
app.post('/api/contact', async (req, res) => {
  const { from_name, from_email, title, message } = req.body;

  // Basic validation
  if (!from_name || !from_email || !title || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(from_email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address.' });
  }

  // ─── Nodemailer transporter ───
  // Configure with Gmail App Password (see .env.example)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,   // your gmail
      pass: process.env.EMAIL_PASS    // Gmail App Password (not your login password)
    }
  });

  const mailOptions = {
    from: `"${from_name}" <${process.env.EMAIL_USER}>`,
    to: 'rutujashende896@gmail.com',
    replyTo: from_email,
    subject: `Portfolio Contact: ${title}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0a0a0f;color:#e8e6f0;border-radius:16px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#7c6aff,#ff6a9a);padding:28px 32px">
          <h2 style="margin:0;color:#fff;font-size:1.4rem">New Portfolio Message 📩</h2>
        </div>
        <div style="padding:32px">
          <p style="margin:0 0 16px"><strong style="color:#b8aaff">From:</strong> ${from_name} &lt;${from_email}&gt;</p>
          <p style="margin:0 0 16px"><strong style="color:#b8aaff">Subject:</strong> ${title}</p>
          <p style="margin:0 0 8px"><strong style="color:#b8aaff">Message:</strong></p>
          <div style="background:#111118;border:1px solid rgba(124,106,255,.2);border-radius:10px;padding:20px;line-height:1.8;white-space:pre-wrap">${message}</div>
          <p style="margin:20px 0 0;font-size:.85rem;color:#9997b0">Sent on ${new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})} IST</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[${new Date().toISOString()}] Email sent from ${from_email}`);
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Email error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
  }
});

// ─── Health check ───
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Catch-all: serve index.html ───
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio server running at http://localhost:${PORT}`);
  console.log(`📧 Contact API at http://localhost:${PORT}/api/contact`);
  console.log(`🩺 Health check at http://localhost:${PORT}/api/health\n`);
});
