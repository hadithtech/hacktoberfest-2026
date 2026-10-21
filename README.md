# Hacktoberfest Mini Hackathon 2026 — HadithTech Istanbul

A bilingual (English / Arabic) one-page website for the **Hacktoberfest Mini Hackathon 2026**,
a one-day open-source coding competition organised by HadithTech in Istanbul
(Saturday, 24 October 2026, 10:00, FSMVÜ Topkapı Campus).

The site is a static single page. There is no backend, no database and no framework runtime:
all text lives in one file, a small script turns it into HTML, and the build packs everything
into **one self-contained `dist/index.html`** that works by double-click.

---

## Table of contents

1. [Features](#features)
2. [Tech stack](#tech-stack)
3. [Quick start](#quick-start)
4. [Project structure (every file explained)](#project-structure-every-file-explained)
5. [How the page is built](#how-the-page-is-built)
6. [Editing the content](#editing-the-content)
7. [Languages and RTL](#languages-and-rtl)
8. [Design system](#design-system)
9. [Logos, favicon and the link-preview image](#logos-favicon-and-the-link-preview-image)
10. [Building and deploying](#building-and-deploying)
11. [Accessibility and performance notes](#accessibility-and-performance-notes)
12. [Known limitations and tips](#known-limitations-and-tips)

---

## Features

**Page sections (in order)**

| # | Section | What it does |
|---|---------|--------------|
| – | Navbar | Sticky top bar: HadithTech emblem + name, section links (Overview, Details, Agenda, Guide, Past Edition, Partners), EN / عربي language switch, Register button. Collapses into a hamburger menu on phones and tablets. |
| 1 | Hero | Headline, short description, date/time/venue line, "Register now" and "See how the day works" buttons. On the right, the HadithTech emblem framed in a pale disc with gold rings, a soft glow and a slowly turning dashed ring. |
| 2 | Countdown | Live days / hours / minutes / seconds until the event start. Switches to "The day is here." when the time passes. |
| 3 | About ("What is Hacktoberfest?") | Introductory paragraph, then the **Overview** block (title + subtitle) above four numbered cards (Understand, Learn by doing, Compete, Keep going) and a highlighted note. |
| 4 | Event details | Ruled card with date, time, venue etc. and a "map" button linking to Google Maps. |
| 5 | Agenda | Vertical timeline generated from the `agenda` list. |
| 6 | Guide | "Your first pull request in five steps", each step with a code box (Fork, Clone, Branch, Commit & push, Pull request). |
| 7 | Projects wall | Projects built on the day. Shows a friendly empty state until you add entries. An optional "Submit your project" button appears only when a submission link is set. |
| 8 | Leaderboard | Ranked contributors table (rank, name, GitHub, PRs). Empty state until you add entries. |
| 9 | Past Edition | Text about the previous event, four stat figures, a closing line and a link to the previous event's site. |
| 10 | Partners | Three equal-size cards: GitHub, Replit, FSMVÜ. |
| – | Footer | Organiser text, HadithTech emblem + name, links (website, GitHub, LinkedIn, Register) and copyright. |

**Site-wide features**

- Full **English and Arabic** versions with a one-click language switch; Arabic switches the page to right-to-left and uses an Arabic font.
- Language is remembered (browser storage) and can be forced with `?lang=ar` or `?lang=en` in the URL.
- Smooth scrolling to sections, with an offset so headings are not hidden under the sticky navbar.
- Soft fade-and-rise animation as sections scroll into view (disabled automatically for users who prefer reduced motion).
- Responsive layout for phones, tablets and desktops (no horizontal scrolling).
- Link-preview image (Open Graph / Twitter card) for WhatsApp, LinkedIn, Facebook and X.
- Favicon generated from the HadithTech emblem.
- Single-file build with fonts, styles, code and logos embedded.

---

## Tech stack

| Tool | Version | Role |
|------|---------|------|
| [Vite](https://vitejs.dev) | ^5.4 | Dev server and production bundler |
| [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile) | ^2.3 | Inlines JS, CSS, fonts and images into one `index.html` |
| [Tailwind CSS](https://tailwindcss.com) | 3.4 | Utility-first styling |
| PostCSS + Autoprefixer | ^8.5 / ^10.6 | CSS processing (required by Tailwind) |
| [Fontsource](https://fontsource.org) | ^5.3 | Self-hosted fonts: **Manrope** (UI), **Instrument Serif** (italic accents), **IBM Plex Sans Arabic** (Arabic) |
| Vanilla JavaScript (ES modules) | – | Rendering, language switch, countdown, menu. No React/Vue. |
| Python 3 + Pillow + NumPy | – | *Optional* helper scripts that prepare logos and generate the favicon and link-preview image |

**Requirements:** Node.js 18 or newer (developed on Node 22) and npm. Python 3 is needed only for the optional asset scripts.

---

## Quick start

```bash
# 1. Install dependencies (once)
npm install

# 2. Start the dev server (hot reload, reachable on your network)
npm run dev
#    -> open the address Vite prints, usually http://localhost:5173

# 3. Build the production site
npm run build
#    -> creates dist/index.html (single file) plus dist/images, favicon and og-image

# 4. Preview the production build locally
npm run preview
```

You can also simply **double-click `dist/index.html`** after building; it needs no server.

| Command | What it does |
|---------|--------------|
| `npm run dev` | Vite dev server with hot reload (`--host` exposes it on your LAN so you can test on a phone) |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serves the built `dist/` folder locally (`--host`) |

---

## Project structure (every file explained)

```
hacktoberfest-2026/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── src/
│   ├── main.js
│   ├── render.js
│   ├── content.js
│   └── index.css
├── public/
│   ├── favicon.png
│   ├── og-image.png
│   └── images/
│       ├── logo-hadithtech.png
│       ├── logo-fsmvu.png
│       └── logo-replit.png
├── scripts/
│   ├── prepare-logos.py
│   ├── make-assets.py
│   └── source-logos/
│       ├── hadithtech.png
│       ├── fsmvu.png
│       └── replit.png
└── dist/            (generated by `npm run build`)
```

### Root files

| File | Purpose |
|------|---------|
| `index.html` | The HTML shell Vite starts from. Contains the page `<title>`, description, theme colour, favicon link, Open Graph and Twitter card tags, an empty `<div id="root">` and the script tag that loads `src/main.js`. All real page content is injected by JavaScript. |
| `package.json` | Project name, scripts (`dev`, `build`, `preview`) and dependencies (fonts as runtime deps; Vite, Tailwind, PostCSS, Autoprefixer and the single-file plugin as dev deps). |
| `package-lock.json` | Exact dependency versions for reproducible installs. Generated by npm. |
| `vite.config.js` | Vite settings: relative `base: './'` so the site works from any folder, the single-file plugin, and a very large `assetsInlineLimit` so images and fonts are embedded into the HTML. |
| `tailwind.config.js` | Tailwind setup: which files to scan for class names, the brand colours (`cream`, `charcoal`, `gold`) and font families (`sans`, `serif`, `arabic`, `mono`). |
| `postcss.config.js` | Enables the Tailwind and Autoprefixer PostCSS plugins. |
| `README.md` | This document. |

### `src/` — the application

| File | Purpose |
|------|---------|
| `src/content.js` | **All visible text and data**, in one place. Contains shared data (links, event start time, logos, agenda, projects, leaderboard, step commands) and two parallel objects, `content.en` and `content.ar`, with identical structure. This is the file to edit for any wording change. |
| `src/render.js` | Turns content into HTML. One small function per section (`navbar`, `hero`, `countdown`, `about`, `details`, `agendaSec`, `guide`, `projectsSec`, `leaderboardSec`, `lastYear`, `partners`, `footer`) plus helpers for buttons, titles, callouts and the GitHub icon. Contains layout and Tailwind classes but no wording. `renderPage` joins the sections in order. |
| `src/main.js` | Starts the site: imports fonts and CSS, chooses the language (`?lang=` → saved choice → English), sets `lang`/`dir` on `<html>`, renders the page, runs the countdown every second, handles the language switch and mobile menu clicks, and triggers the scroll-reveal animation with `IntersectionObserver`. |
| `src/index.css` | Tailwind layers plus a few global rules: page background and text colour, Arabic font swap, focus outline, text selection colour, the `.em` italic-accent style (italic serif in English, medium weight in Arabic), left-to-right code boxes, the `.reveal` fade animation and the reduced-motion override. |

### `public/` — static files copied as-is

| File | Purpose |
|------|---------|
| `public/favicon.png` | 256×256 browser-tab icon (generated by `scripts/make-assets.py`). |
| `public/og-image.png` | 1200×630 link-preview image shown when the site is shared (generated by `scripts/make-assets.py`). Uses the real logo from `public/images/logo-hadithtech.png`. |
| `public/images/logo-hadithtech.png` | HadithTech calligraphy emblem, transparent PNG (about 502×793). Used in the navbar, hero, footer, OG image and favicon. |
| `public/images/logo-fsmvu.png` | FSMVÜ Syrian Students Community logo, transparent PNG. Used on the partner card. |
| `public/images/logo-replit.png` | Replit logo, transparent PNG. Used on the partner card. |

### `scripts/` — optional helpers (Python)

| File | Purpose |
|------|---------|
| `scripts/prepare-logos.py` | Converts the original logo screenshots in `scripts/source-logos/` into clean, tightly cropped, transparent PNGs in `public/images/`. Upscales and sharpens the small HadithTech emblem. Run it only when a source logo changes. |
| `scripts/make-assets.py` | Draws `public/og-image.png` (title, date, framed emblem, gold rings and glow, drawn at 2× then downsampled for smooth edges) and `public/favicon.png`. Reads fonts from `node_modules`, so run `npm install` first. Run it when the logo, title or date changes. |
| `scripts/source-logos/*.png` | The original logo images that `prepare-logos.py` reads. Replace these with better (larger or vector-exported) files to improve quality. |

### `dist/` — build output (generated)

| File | Purpose |
|------|---------|
| `dist/index.html` | The complete site in one file (code, styles, fonts and logos embedded). Upload or open this. |
| `dist/images/`, `dist/favicon.png`, `dist/og-image.png` | Copies of the `public/` files. `og-image.png` must be reachable by URL for link previews; the favicon is referenced by the HTML. |

Do not edit anything in `dist/` by hand; it is overwritten on every build.

---

## How the page is built

```
content.js  ──►  render.js  ──►  HTML string  ──►  main.js puts it in <div id="root">
 (text/data)    (layout)                           (+ language, countdown, menu, animation)
```

1. `main.js` picks a language and calls `renderPage(content[lang], lang)`.
2. `render.js` builds each section as an HTML string using Tailwind classes.
3. The result is written into `#root`. Switching language simply re-renders the whole page in the other language and sets `dir="rtl"` or `dir="ltr"`.
4. Elements with the `reveal` class are observed and fade in as they enter the screen.
5. `npm run build` bundles this and inlines it all into `dist/index.html`.

---

## Editing the content

Almost every change happens in **`src/content.js`**. Change only the text between quotation marks, and update **both** `content.en` and `content.ar` when you change a fact.

| To change… | Edit |
|------------|------|
| Register form, map, website, GitHub, LinkedIn, previous-event links | `links` at the top of `content.js` |
| Event start time (drives the countdown) | `eventStart` (format `YYYY-MM-DDTHH:MM:SS+03:00`) |
| Agenda items | `agenda` list (`time`, `en`, `ar`); add a line per session |
| Projects wall | `projects` list (name, author, bilingual description, link) |
| Leaderboard | `leaderboard` list, best first (`name`, `github`, `prs`) |
| Show the "Submit your project" button | Put a URL in `links.submission` (leave `''` to hide it) |
| Code shown in each guide step | `stepCommands` (same order as the steps; stays English and left-to-right) |
| Headlines, paragraphs, labels | The matching key inside `content.en` / `content.ar` |
| Navigation links | `nav.links` in each language (`id` must match a section id; do not change ids, only labels) |
| Overview title and subtitle | `about.overview` in each language |
| Make a word italic-serif in a headline | Wrap it in `*stars*`, e.g. `Your first *pull request*` |

Section ids used by the navbar: `overview`, `details`, `agenda`, `guide`, `last-year` (the **Past Edition** section; the id is internal and unchanged), `partners`.

After editing, `npm run dev` updates automatically; for production run `npm run build`.

---

## Languages and RTL

- English is the default; Arabic is selected with the **عربي** button or `?lang=ar`.
- Arabic sets `<html lang="ar" dir="rtl">`. The layout uses logical Tailwind utilities (`ps-`, `pe-`, `start-`, `border-s`, `rtl:` variants) so spacing and borders mirror automatically.
- Arabic text uses **IBM Plex Sans Arabic**; Latin words inside it fall back to Manrope.
- The hero emblem is Arabic calligraphy and is intentionally **not** mirrored.
- Code boxes always stay left-to-right.

---

## Design system

| Token | Value | Use |
|-------|-------|-----|
| `cream` | `#F3F2E9` | Page background |
| `charcoal` | `#3B3B3B` | Text and dark buttons |
| `gold` | `#C9B26B` | Thin lines, rings, accents, selection colour |

Style is minimal and editorial: light weights, generous whitespace, hairline gold rules, square corners, an italic serif for emphasis words. Tokens are defined in `tailwind.config.js` and used as `bg-cream`, `text-charcoal`, `border-gold`, etc.

---

## Logos, favicon and the link-preview image

The logos are transparent PNGs, so they sit cleanly on any background without blend-mode tricks. They are **imported** in `content.js`, which makes the build embed them in `dist/index.html`.

To update a logo:

```bash
pip install pillow numpy

# 1. Put the new original in scripts/source-logos/ (same file name)
# 2. Rebuild the cleaned logos in public/images/
python3 scripts/prepare-logos.py

# 3. Rebuild the favicon and the link-preview image
npm install                       # once, fonts are read from node_modules
python3 scripts/make-assets.py

# 4. Rebuild the site
npm run build
```

If you already have a clean transparent PNG or SVG-exported PNG, you can skip step 2 and drop it straight into `public/images/` under the same name.

---

## Building and deploying

`npm run build` produces `dist/`. Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages, an ordinary web server, or just a shared file).

- Upload the contents of `dist/`. The single `index.html` is enough to show the site.
- For link previews (WhatsApp, LinkedIn, X), also upload `og-image.png`. The tags in `index.html` point to `/og-image.png`, so the site must be served from a domain root (for example `https://example.com/`) for the preview to be found. For a sub-folder deployment, change those two meta tags to the full image URL.
- Because the base path is relative, the page also works when opened from a local folder.

---

## Accessibility and performance notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and labelled controls (language switch, menu button with `aria-expanded`, countdown with `role="timer"`).
- Visible keyboard focus outline; decorative graphics are `aria-hidden`.
- Motion is removed for users with `prefers-reduced-motion`.
- Everything is embedded: one request, no external fonts or CDNs. The file is about 2 MB because the fonts (including Arabic) are inlined.

---

## Known limitations and tips

- **Logo resolution:** the original HadithTech image was only about 47×80 px, so the emblem was upscaled and re-sharpened. It looks clean at current sizes, but a vector (SVG) or high-resolution original will look better, especially large in the hero.
- **Content lives in JavaScript:** search engines mostly index the `<title>` and meta tags in `index.html`; the body is rendered by JS. This is fine for a single event page.
- **Internal names:** the Past Edition section still uses the internal names `lastYear` (content key / function) and `last-year` (section id). They are code identifiers, not visible text, and were left unchanged on purpose.
- **Language persistence:** the chosen language is stored in `localStorage`; it silently falls back to English if storage is blocked.
