# Lumen Collective — Website

A production-ready Next.js 14 website for Lumen Collective, an NDIS Support Coordination collective.

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding a New Blog Post

1. Create a new `.mdx` file in `/content/posts/` — e.g. `my-new-post.mdx`
2. Add frontmatter at the top:

```mdx
---
title: "Your Post Title"
date: "2025-07-01"
excerpt: "A short summary that appears on the blog listing page."
---

Your post content here...
```

3. The post will automatically appear on the `/blog` page. The filename (without `.mdx`) becomes the URL slug.

## Setting Up Formspree (Contact Form)

1. Go to [formspree.io](https://formspree.io) and sign in or create an account.
2. Create a new form and set the recipient email to `admin@lumencollective.com.au`.
3. Copy your form ID (looks like `xyzabcde`).
4. Open `app/contact/page.tsx` and replace `YOUR_FORMSPREE_ENDPOINT` with your form ID:

```ts
const FORMSPREE_URL = "https://formspree.io/f/xyzabcde";
```

## Deploying to Vercel

1. Push the repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the GitHub repository.
3. No additional configuration is needed — Vercel auto-detects Next.js.
4. Click Deploy.

Environment variables are not required unless you add additional services.

## Adding a Logo Image in Future

To replace the text-based logo with an image:

1. Drop your logo file into `/public/logo.png` (or `.svg`).
2. Open `components/Navbar.tsx` and replace the `<span>lumen.</span>` text element with a `<Image>` component pointing to `/logo.png`.

The nav structure and link are already in place — you just need to swap the inner content.
