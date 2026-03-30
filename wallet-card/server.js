#!/usr/bin/env node
/**
 * Local development server for the Lumen Collective Apple Wallet pass.
 *
 * Routes:
 *   GET /        — landing page with install links
 *   GET /pass    — serves zoe-fripp.pkpass (Apple Wallet install)
 *   GET /vcard   — serves zoe-fripp.vcf (direct contact save)
 *
 * Usage:
 *   node server.js
 *
 * Then open http://YOUR_LOCAL_IP:3000 on your iPhone.
 * Find your IP: System Settings → Wi-Fi → tap your network → IP Address
 */

const express = require('express');
const path    = require('path');
const fs      = require('fs');
const os      = require('os');

const app       = express();
const PORT      = process.env.PORT || 3000;
const PASS_FILE = path.join(__dirname, 'zoe-fripp.pkpass');
const VCF_FILE  = path.join(__dirname, 'zoe-fripp.vcf');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getLocalIP() {
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return 'localhost';
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

app.get('/pass', (req, res) => {
  if (!fs.existsSync(PASS_FILE)) {
    return res
      .status(404)
      .send('Pass not found. Run: node generate-pass.js');
  }
  res.setHeader('Content-Type', 'application/vnd.apple.pkpass');
  res.setHeader('Content-Disposition', 'attachment; filename="zoe-fripp.pkpass"');
  res.sendFile(PASS_FILE);
});

app.get('/vcard', (req, res) => {
  if (!fs.existsSync(VCF_FILE)) {
    return res.status(404).send('vCard not found.');
  }
  res.setHeader('Content-Type', 'text/vcard; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="zoe-fripp.vcf"');
  res.sendFile(VCF_FILE);
});

app.get('/', (req, res) => {
  const passExists = fs.existsSync(PASS_FILE);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Zoe Fripp — Lumen Collective</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      background: #f2f6f5;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 24px;
    }
    .card {
      background: white;
      border-radius: 20px;
      padding: 40px 32px;
      max-width: 360px;
      width: 100%;
      text-align: center;
      box-shadow: 0 4px 32px rgba(42,122,112,0.12);
    }
    .brand {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.12em;
      color: #2A7A70;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    h1 {
      font-size: 26px;
      font-weight: 600;
      color: #111;
      margin-bottom: 8px;
    }
    .title {
      font-size: 14px;
      color: #666;
      line-height: 1.5;
      margin-bottom: 28px;
    }
    .btn {
      display: block;
      width: 100%;
      padding: 14px 20px;
      border-radius: 12px;
      text-decoration: none;
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 10px;
      transition: opacity 0.15s;
    }
    .btn:hover { opacity: 0.88; }
    .btn-primary {
      background: #2A7A70;
      color: white;
    }
    .btn-secondary {
      background: #eef5f4;
      color: #2A7A70;
    }
    .btn-disabled {
      background: #ddd;
      color: #999;
      cursor: not-allowed;
    }
    .note {
      font-size: 12px;
      color: #aaa;
      margin-top: 20px;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="brand">lumen. COLLECTIVE</div>
    <h1>Zoe Fripp</h1>
    <p class="title">
      Specialist Support Coordinator<br>
      Youth Development Specialist
    </p>

    ${passExists
      ? `<a href="/pass"   class="btn btn-primary">Add to Apple Wallet</a>`
      : `<span class="btn btn-disabled">Add to Apple Wallet (run generate-pass.js first)</span>`
    }
    <a href="/vcard" class="btn btn-secondary">Save Contact (.vcf)</a>

    <p class="note">
      Open this page on your iPhone while on the same Wi-Fi network.<br>
      Tap <strong>Add to Apple Wallet</strong> to install the pass.
    </p>
  </div>
</body>
</html>`);
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

app.listen(PORT, () => {
  const ip = getLocalIP();
  console.log('\nServer running.');
  console.log(`  Local:    http://localhost:${PORT}`);
  console.log(`  Network:  http://${ip}:${PORT}  ← open this on your iPhone\n`);
  console.log('Make sure your iPhone is on the same Wi-Fi network.');
  console.log('Press Ctrl+C to stop.\n');
});
