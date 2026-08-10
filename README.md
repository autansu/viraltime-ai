# ViralTime AI

Find Your Best Time to Post. Anywhere in the World.

ViralTime AI is a free, client-side social-media posting-time checker. It helps creators find the best estimated time to post on TikTok, Instagram, Facebook, YouTube, and YouTube Shorts based on platform, country, timezone, day, and general audience activity patterns.

## Features

- 5 platforms: TikTok, Instagram, Facebook, YouTube, YouTube Shorts
- 195+ countries with flag emojis, search, and timezone info
- AI-powered recommendation engine (runs entirely in the browser)
- Today / Tomorrow / This Week recommendations
- "Post Now" detection based on your local time
- Copy result + WhatsApp, Facebook, X, and native Web Share
- Dark / light mode (saved to localStorage)
- Fully responsive, mobile-first design
- No backend, no database, no API keys, no paid services

## Privacy

Everything runs in your browser. No personal data is collected or transmitted. The optional username field stays on your device and is never sent anywhere. See `privacy.html`.

## Honesty

ViralTime AI provides **estimated** posting windows based on general audience activity patterns. Viral performance is never guaranteed — actual results depend on content quality, audience, platform algorithm, competition, and other factors.

## Project structure

```
viraltime-ai/
├── index.html
├── about.html
├── how-it-works.html
├── privacy.html
├── terms.html
├── contact.html
├── style.css
├── script.js
├── sitemap.xml
├── robots.txt
├── favicon.svg
└── README.md
```

## Deploy to Cloudflare Pages

1. Upload these files to a GitHub repository.
2. In Cloudflare Pages, create a new project connected to that repo.
3. Build command: *(none)*
4. Build output directory: `/` (root)
5. Deploy.

No `npm install`, no build step, no environment variables, no API keys required.

## Replace the placeholder domain

Search and replace `https://YOUR-DOMAIN-HERE/` in `sitemap.xml` and `robots.txt` with your real domain after deployment.

## License

Free to use. Provided as-is, without warranty.
