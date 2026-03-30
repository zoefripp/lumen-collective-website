#!/usr/bin/env node
/**
 * Lumen Collective — Apple Wallet Business Card Generator
 *
 * Usage:
 *   node generate-pass.js
 *
 * With certificates in ./certs/ the pass is signed and ready to install.
 * Without certificates an unsigned bundle is created for structure inspection.
 *
 * Environment variables:
 *   KEY_PASSPHRASE   — passphrase for signerKey.pem (if encrypted)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const archiver = require('archiver');
const forge = require('node-forge');

const TEMPLATE_DIR = path.join(__dirname, 'pass-template');
const CERTS_DIR    = path.join(__dirname, 'certs');
const OUTPUT_FILE  = path.join(__dirname, 'zoe-fripp.pkpass');

// All files that go inside the .pkpass ZIP
// Apple requires no compression (store only)
const PASS_FILES = [
  'pass.json',
  'icon.png',
  'icon@2x.png',
  'icon@3x.png',
  'logo.png',
  'logo@2x.png',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sha1File(filePath) {
  return crypto
    .createHash('sha1')
    .update(fs.readFileSync(filePath))
    .digest('hex');
}

function buildManifest(files) {
  const manifest = {};
  for (const file of files) {
    const fp = path.join(TEMPLATE_DIR, file);
    if (fs.existsSync(fp)) manifest[file] = sha1File(fp);
  }
  return manifest;
}

/**
 * Creates a detached PKCS#7 / CMS signature over the manifest content.
 * This is the format Apple Wallet requires for the `signature` file.
 */
function signManifest(manifestContent, wwdrPem, signerCertPem, signerKeyPem, passphrase) {
  const p7 = forge.pkcs7.createSignedData();
  p7.content = forge.util.createBuffer(manifestContent, 'utf8');

  const wwdrCert   = forge.pki.certificateFromPem(wwdrPem);
  const signerCert = forge.pki.certificateFromPem(signerCertPem);

  let signerKey;
  try {
    signerKey = passphrase
      ? forge.pki.decryptRsaPrivateKey(signerKeyPem, passphrase)
      : forge.pki.privateKeyFromPem(signerKeyPem);
  } catch {
    throw new Error(
      'Could not load private key — check KEY_PASSPHRASE env var or verify signerKey.pem'
    );
  }
  if (!signerKey) {
    throw new Error('Private key decryption returned null — wrong passphrase?');
  }

  p7.addCertificate(wwdrCert);
  p7.addCertificate(signerCert);

  p7.addSigner({
    key: signerKey,
    certificate: signerCert,
    digestAlgorithm: forge.pki.oids.sha1,
    authenticatedAttributes: [
      { type: forge.pki.oids.contentType, value: forge.pki.oids.data },
      { type: forge.pki.oids.messageDigest },
      { type: forge.pki.oids.signingTime, value: new Date() },
    ],
  });

  p7.sign({ detached: true });
  return Buffer.from(forge.asn1.toDer(p7.toAsn1()).getBytes(), 'binary');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function generatePass() {
  // 1. Check all required source files exist
  const missing = PASS_FILES.filter(f => !fs.existsSync(path.join(TEMPLATE_DIR, f)));
  if (missing.length > 0) {
    console.error('\nMissing required files in pass-template/:');
    missing.forEach(f => console.error('  ' + f));
    console.error('\nRun first:  node create-placeholders.js\n');
    process.exit(1);
  }

  // 2. Build manifest
  const manifest        = buildManifest(PASS_FILES);
  const manifestContent = JSON.stringify(manifest, null, 2);

  // Write manifest temporarily so we can hash it
  const manifestPath  = path.join(TEMPLATE_DIR, 'manifest.json');
  const signaturePath = path.join(TEMPLATE_DIR, 'signature');
  fs.writeFileSync(manifestPath, manifestContent);

  // 3. Sign (or stub)
  const wwdrPath      = path.join(CERTS_DIR, 'wwdr.pem');
  const certPath      = path.join(CERTS_DIR, 'signerCert.pem');
  const keyPath       = path.join(CERTS_DIR, 'signerKey.pem');
  const hasCerts      = [wwdrPath, certPath, keyPath].every(fs.existsSync);

  let signatureBuffer;

  if (hasCerts) {
    console.log('\nSigning pass with certificates...');
    const passphrase = process.env.KEY_PASSPHRASE || '';
    signatureBuffer  = signManifest(
      manifestContent,
      fs.readFileSync(wwdrPath,  'utf8'),
      fs.readFileSync(certPath,  'utf8'),
      fs.readFileSync(keyPath,   'utf8'),
      passphrase
    );
    console.log('Signed successfully.');
  } else {
    console.log('\n  No signing certificates found in certs/');
    console.log('  Creating unsigned bundle (structure/design testing only).');
    console.log('  See SETUP.md for how to add certificates.\n');
    signatureBuffer = Buffer.alloc(0); // placeholder — won't install on device
  }

  fs.writeFileSync(signaturePath, signatureBuffer);

  // 4. Package as ZIP with store (no compression) — Apple requirement
  const output  = fs.createWriteStream(OUTPUT_FILE);
  const archive = archiver('zip', { store: true });

  await new Promise((resolve, reject) => {
    output.on('close', resolve);
    archive.on('error', reject);
    archive.pipe(output);

    const allFiles = [...PASS_FILES, 'manifest.json', 'signature'];
    for (const file of allFiles) {
      const fp = path.join(TEMPLATE_DIR, file);
      if (fs.existsSync(fp)) archive.file(fp, { name: file });
    }

    archive.finalize();
  });

  // 5. Clean up temp files
  fs.unlinkSync(manifestPath);
  fs.unlinkSync(signaturePath);

  console.log(`\nPass written to: ${path.relative(process.cwd(), OUTPUT_FILE)}`);
  if (hasCerts) {
    console.log('Next step:  node server.js  — then open the URL on your iPhone\n');
  } else {
    console.log('Next step:  add certs → re-run to get a signable pass\n');
  }
}

generatePass().catch(err => {
  console.error('\nError:', err.message);
  process.exit(1);
});
