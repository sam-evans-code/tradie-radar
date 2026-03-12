# Tradie Radar Landing Page

Static HTML landing page for Tradie Radar - a live call answering service for tradespeople in South London.

## What This Is

A single-page, self-contained HTML landing page with:
- 📞 Live call answering service for trades
- 💰 Interactive ROI calculator with sliders
- ❓ FAQ section with accordion functionality
- 📱 Fully responsive mobile design
- ✨ Smooth animations and transitions

## Project Structure

```
/
├── index.html              # Main landing page (self-contained)
├── assets/
│   └── images/            # All images, logos, and icons
├── .vercel/               # Vercel deployment configuration
├── CLAUDE.md              # Project documentation and history
└── README.md              # This file
```

## Key Features

### Rotating Hero Headline
5 rotating phrases that cycle every 3.2 seconds with smooth fade/slide animations:
- "...a facilities manager with 40 units"
- "...a job worth more than a month's work"
- "...a landlord who needed someone reliable for years"
- "...someone who'd have recommended you to everyone they know"
- "...the one you'll never know you missed"

### Interactive ROI Calculator
Three slider inputs that calculate missed call costs in real-time:
- Missed calls per week (5-60)
- Average job value (£200-£5,000)
- Conversion rate (5-50%)

Formula: `calls × 4.3 weeks × (conversion %) × job value`

### Fully Responsive
- Mobile-first design
- Hamburger menu on mobile
- Touch-friendly buttons and interactions
- Optimized for all screen sizes

## Technical Stack

- **Pure HTML** - No build process required
- **Embedded CSS** - All styles in `<style>` tags
- **Embedded JavaScript** - All functionality in `<script>` tags
- **Google Fonts** - Aspekta font family (CDN)
- **No Dependencies** - Completely self-contained

## Development

### Local Preview

Simply open the HTML file in a browser:
```bash
open index.html
```

Or use a local server:
```bash
python -m http.server 8000
# Visit http://localhost:8000
```

### Making Content Changes

All content is in [index.html](index.html). Key sections:

- **Line 6-7**: Meta tags (title, description)
- **Line 1726-1732**: Navigation menu
- **Line 1752-1762**: Hero section
- **Line 1810-1829**: Problem section (3 cards)
- **Line 1843-1859**: "Two Problems" section
- **Line 1862-1892**: ROI Calculator
- **Line 1946-1981**: How It Works section
- **Line 1986-2009**: Pricing section
- **Line 2034-2106**: FAQ section
- **Line 2113**: Footer

### Animations

Three main JavaScript functions:
1. **Rotating Headline** (line 1781-1805): Cycles through 5 phrases
2. **ROI Calculator** (line 1894-1943): Real-time slider updates
3. **FAQ Accordion** (line 2196-2213): Expand/collapse FAQs

All CSS animations are inline in the `<style>` tag (line 16-1703).

## Deployment

### Vercel (Current Setup)

Deployed to: **compete-landing-only.vercel.app**

Configuration:
- Framework Preset: **Other (static site)**
- Build Command: *(empty)*
- Output Directory: `.` (root)
- Install Command: *(empty)*

Deploy commands:
```bash
# Production
vercel --prod --yes

# Preview
vercel --yes

# Check status
vercel list compete-landing-only
```

### Other Static Hosts

Since it's pure HTML, you can deploy to:
- **Netlify**: Drag & drop index.html + assets/
- **GitHub Pages**: Push to gh-pages branch
- **Cloudflare Pages**: Connect repo and deploy
- **AWS S3**: Upload files and enable static hosting
- **Any web server**: Just upload index.html and assets/

## Assets

All images are in [assets/images/](assets/images/):
- `compete-logo.png` - Main logo (used in nav, footer, loading screen)
- `compete-favicon.svg` - SVG favicon
- `favicon.ico` - ICO favicon
- `icons/` - Logo variations (4 sets: dark-green/lime, SVG/PNG)
- `screenshots/` - OG image for social sharing

## Browser Support

- ✅ Chrome/Edge (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ Mobile Safari (iOS 12+)
- ✅ Chrome Mobile (Android 8+)

## Performance

- **Size**: ~78KB HTML + 8.7MB assets
- **Load Time**: <2s on 3G
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)

## Key Contact Points

All CTAs link to SMS:
- Phone: `+447700000000` (placeholder - replace with actual Twilio number)
- Message: `AUDIT` (triggers missed call audit conversation)

Format: `sms:+447700000000?body=AUDIT`

## History

This project was originally a full Next.js application (Compete - competitive intelligence platform). It has been transformed into a static landing page for Tradie Radar, removing all React/Next.js/backend code and keeping only the self-contained HTML page.

### Previous Cleanup (March 2025)
- Removed: Next.js, React, Supabase, OpenAI integrations
- Removed: ~311MB of unused code (components, tests, node_modules)
- Kept: Static HTML landing page + assets (~9MB total)

## License

Proprietary - All rights reserved by Tradie Radar

---

**Live Site**: https://compete-landing-only.vercel.app
**Last Updated**: March 2025
