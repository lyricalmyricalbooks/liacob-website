# Luciano Iacobelli — Memorial Website
Free static replacement for the Shopify store. Deploy on Netlify at zero cost.

---

## HOW TO DEPLOY (step by step)

### Step 1 — Unzip
Unzip `luciano-site.zip` on your computer. You'll get a folder called `luciano-site`.

### Step 2 — Create free Netlify account
Go to https://netlify.com → Sign up free (use your email).

### Step 3 — Drag & drop to deploy
On your Netlify dashboard, look for the box:
**"Drag and drop your site folder here"**
Drag the entire `luciano-site` folder into it.
Your site goes live in ~30 seconds at a URL like `https://amazing-name-123.netlify.app`

### Step 4 — Connect your real domain (lucianoiacobelli.com)
1. In Netlify → Site Settings → Domain management → Add custom domain
2. Type `lucianoiacobelli.com` → Verify
3. Netlify shows you nameservers (e.g. `dns1.p01.nsone.net`)
4. Go to your domain registrar (GoDaddy, Namecheap, etc.) → DNS settings → replace nameservers with Netlify's
5. Wait 1–24 hours → your domain points to the new free site

### Step 5 — Set up contact form (free)
The contact form uses Formspree (free tier = 50 submissions/month):
1. Go to https://formspree.io → Create free account
2. Create a new form → copy your Form ID (e.g. `xpznwkqb`)
3. Open `contact/index.html` and `index.html` in any text editor
4. Replace `YOUR_FORM_ID` with your actual ID in both files
5. Re-drag the folder to Netlify to update

### Step 6 — Cancel Shopify
Once your domain is live on Netlify, cancel Shopify. Done!

---

## SITE STRUCTURE
```
luciano-site/
├── index.html              Homepage
├── style.css               All styles (matches Shopify Dawn theme)
├── nav.js                  Shared header + footer
├── netlify.toml            Netlify config
├── art/
│   ├── large.html          46 large paintings
│   ├── medium.html         Clowns, Angels, Noctograms, etc.
│   ├── small.html          Prints, Angels, small works
│   ├── digital.html        Microsoft Paint works
│   └── assemblage.html     All assemblage pieces
├── poetry-books/
│   └── index.html          All 7 poetry books
├── lyricalmyrical/
│   └── index.html          120 Lyricalmyrical covers
├── lucs-apartment/
│   └── index.html          Photo gallery by Vincenzo Pietropaolo
└── contact/
    └── index.html          Contact form
```

## UPDATING THE SITE
To update after changes: just drag the `luciano-site` folder back into Netlify.
Netlify automatically republishes — no command line needed.

---

## TROUBLESHOOTING: images stopped loading

If **all** images disappeared after moving away from Shopify, the image URLs are likely still pointing at:

`https://www.lucianoiacobelli.com/cdn/shop/...`

Those links only work while Shopify is serving that domain path. When the domain is pointed at Netlify (or another host), `/cdn/shop/...` is no longer Shopify and image requests fail.

### What this repo now does

`nav.js` includes a fallback loader for Shopify-style image links. It retries failed image URLs across a host list.

Default host retry order:
1. `https://www.lucianoiacobelli.com`
2. `https://lucianoiacobelli.com`

### How to restore images permanently

Best long-term fix: host your images directly in this repo (for example under `images/`) and update `src` values to local paths.

This has now been done in the HTML pages: image references point to local files under `images/shopify/`, with source mappings stored in `images/shopify/manifest.json`.

### If you already have the image files on your computer (recommended)

Import your saved image folder into this project:

```bash
node scripts/import-local-images.mjs /path/to/your/saved-images
```

The script matches by original Shopify filename and copies files into the exact local paths used by the site.

If you prefer Python, this equivalent command still works:

```bash
python scripts/import_local_images.py /path/to/your/saved-images
```

### If you need to pull from Shopify URLs (fallback only)

```bash
python scripts/download_shopify_images.py
```

If your current machine cannot access those Shopify URLs, run that command from a network that can, then redeploy.

If your images are still available on a Shopify/myshopify domain, set that host before loading `nav.js`:

```html
<script>
  window.IMAGE_FALLBACK_HOSTS = [
    "https://YOUR-SHOP-NAME.myshopify.com",
    "https://www.lucianoiacobelli.com",
    "https://lucianoiacobelli.com"
  ];
</script>
<script src="nav.js"></script>
```

This lets the site retry broken image URLs against the Shopify origin without hand-editing every image link first.
