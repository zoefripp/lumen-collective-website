# Apple Wallet Pass — Setup Guide

## Quick start (local testing)

```bash
cd wallet-card
npm install
npm run build      # creates placeholder images + generates the pass bundle
node server.js     # starts local server
```

Open the printed network URL on your iPhone (same Wi-Fi required).
The pass won't install until it's signed — follow the certificate steps below.

---

## Certificate setup (required to install on a real device)

Apple requires every .pkpass to be cryptographically signed with:
- Your Apple Developer **Pass Type ID** certificate
- Apple's **WWDR intermediate certificate**

### Step 1 — Apple Developer account

Sign in at [developer.apple.com](https://developer.apple.com) ($99/yr required).

### Step 2 — Create a Pass Type ID

1. Go to **Certificates, IDs & Profiles → Identifiers**
2. Click **+**, choose **Pass Type IDs**, click Continue
3. Description: `Lumen Collective Business Card`
4. Identifier: `pass.com.lumencollective.businesscard`
   *(must match `passTypeIdentifier` in pass-template/pass.json)*
5. Register

### Step 3 — Create the certificate

1. In **Identifiers**, click your new Pass Type ID
2. Click **Create Certificate** under Apple Wallet
3. Follow the on-screen CSR instructions (use Keychain Access on your Mac)
4. Download the resulting `.cer` file (e.g. `pass.cer`)

### Step 4 — Export as .p12

1. Double-click `pass.cer` to import it into Keychain Access
2. In Keychain Access → **My Certificates**, find the certificate
3. Expand it, select both the certificate AND the private key
4. Right-click → **Export 2 items…** → save as `pass.p12`
5. Set a passphrase (remember it — you'll need it below)

### Step 5 — Convert to PEM files

Run these commands from your terminal:

```bash
# Extract the signing certificate
openssl pkcs12 -in pass.p12 -clcerts -nokeys -out certs/signerCert.pem

# Extract the private key (will prompt for the .p12 passphrase)
openssl pkcs12 -in pass.p12 -nocerts -out certs/signerKey.pem

# Download Apple's WWDR G4 intermediate certificate and convert it
curl -O https://www.apple.com/certificateauthority/AppleWWDRCAG4.cer
openssl x509 -inform DER -in AppleWWDRCAG4.cer -out certs/wwdr.pem
```

> Note: `AppleWWDRCAG4.cer` is publicly available from Apple and safe to download.

### Step 6 — Update pass.json with your Team ID

1. In the Apple Developer portal, click your name/account (top right)
2. Copy your **Team ID** (10-character alphanumeric string)
3. Open `pass-template/pass.json`
4. Replace `"YOUR_TEAM_ID"` with your actual Team ID

### Step 7 — Generate and serve the signed pass

```bash
# If your private key has a passphrase:
KEY_PASSPHRASE="your-passphrase-here" node generate-pass.js

# Otherwise:
node generate-pass.js

# Then start the server:
node server.js
```

Open the network URL on your iPhone → tap **Add to Apple Wallet**.

---

## Swapping in your real logo

Replace these files in `pass-template/` with your actual artwork:

| File | Size | Usage |
|---|---|---|
| `logo.png` | 160×50 px | Wordmark on pass face |
| `logo@2x.png` | 320×100 px | Retina wordmark |
| `icon.png` | 29×29 px | Notification / Lock Screen icon |
| `icon@2x.png` | 58×58 px | Retina icon |
| `icon@3x.png` | 87×87 px | Super-retina icon |

All images must be PNG with a transparent or teal (#2A7A70) background.
After replacing, re-run `node generate-pass.js` to rebuild the pass.

---

## File structure

```
wallet-card/
├── generate-pass.js       # builds + signs zoe-fripp.pkpass
├── server.js              # local Express server
├── create-placeholders.js # generates placeholder PNG images
├── zoe-fripp.vcf          # vCard contact file
├── SETUP.md               # this file
├── pass-template/
│   ├── pass.json          # pass design & content
│   ├── icon.png / @2x / @3x
│   └── logo.png / @2x
└── certs/                 # signing certificates (not committed to git)
    ├── wwdr.pem
    ├── signerCert.pem
    └── signerKey.pem
```

**Keep `certs/` out of version control** — add it to `.gitignore`:
```
wallet-card/certs/*.pem
wallet-card/certs/*.p12
```
