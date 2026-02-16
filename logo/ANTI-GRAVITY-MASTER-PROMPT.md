# ANTI GRAVITY — MASTER PROMPT
## Aayush Cine Portfolio Website

---

## ROLE

You are a world-class Frontend Developer and Creative Director specializing in award-winning portfolio websites for visual creatives. You write clean, production-ready HTML/CSS/JS with zero dependencies or build tools required — just open the file and it works.

---

## OBJECTIVE

Build a complete, single-file `index.html` portfolio website for **Aayush Cine**, a professional video editor. The site should feel cinematic, editorial, and premium — like a well-cut film, not a template.

The aesthetic reference is the cordia.studio website: minimal, black & white, brutally clean typography, generous white space, confident. Not a bloated agency site — a quiet statement of quality.

---

## BRAND

- **Name:** Aayush Cine
- **Tagline:** Designed to Be Remembered
- **Instagram:** https://www.instagram.com/aayush.cine/
- **Calendly (Book a Call):** [INSERT YOUR CALENDLY LINK]
- **Email:** [INSERT YOUR EMAIL]
- **Palette:** Near-black `#0a0a0a` background, off-white `#f5f4f0` text, mid-grey `#888` for secondary text
- **Fonts:** Syne (display/headings, Google Fonts) + DM Sans (body, Google Fonts)

---

## TECH STACK

- **Pure HTML/CSS/JS** — zero frameworks, zero npm, zero build step
- Single `index.html` file
- All assets referenced from an `/assets/` folder the client will populate
- Google Fonts loaded via `<link>` tag

---

## ASSETS FOLDER STRUCTURE

The client will provide an `/assets/` folder with this structure:

```
assets/
├── videos/
│   ├── thumb-1.jpg   (thumbnail for video 1)
│   ├── thumb-2.jpg
│   ├── thumb-3.jpg
│   ├── thumb-4.jpg
│   └── thumb-5.jpg
└── testimonials/
    ├── t1.png        (screenshot of testimonial DM/comment)
    ├── t2.png
    ├── t3.png
    └── t4.png
```

Videos are embedded via YouTube iframe (data-src attribute on each card). The client will replace placeholder YouTube URLs with their actual video links.

---

## SECTIONS (IN ORDER)

### 1. NAVBAR (Fixed)
- Logo: small circular logo-mark (star/spark SVG) + "Aayush Cine" wordmark in Syne Bold
- Right: "Get in Touch" button → opens Calendly link in new tab
- On scroll: `backdrop-filter: blur(20px)` + subtle bottom border appears
- Custom cursor: small white dot + lagging ring (mix-blend-mode: difference)

### 2. HERO
- Full viewport height
- Tag line in small uppercase tracking: `VIDEO EDITOR · CONTENT CREATOR · VISUAL STORYTELLER`
- Giant headline: **"Designed to / *Be Remembered.*"** (second line in italic grey, Syne 800, ~9vw)
- Bottom row: left = short descriptor copy, right = "Book a Call" (primary button) + "See the Work ↓" (ghost link)
- Bottom ticker strip: scrolling marquee of services (Short Form · Long Form · YouTube · Reels · Brand Films etc.)
- Entry animations: fade+translateY staggered on load

### 3. OUR WORK
- Section tag + heading: "OUR **WORK**"
- **Asymmetric CSS grid layout:**
  - Row 1: Card 1 spans 7 cols (landscape 16:9), Card 2 spans 5 cols (landscape 16:9)
  - Row 2: Cards 3, 4, 5 each span 4 cols (portrait 9:14)
- Each card: dark background, thumbnail image, hover reveals play button + gradient overlay + label
- Click → opens full-screen modal with YouTube iframe (autoplay)
- Modal: dark overlay, scale-in animation, ESC or click-outside to close
- HOW TO SET VIDEOS: `data-src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1"` on each `.video-card`

### 4. TESTIMONIALS
- Section tag + heading: "HEAR IT **FROM THEM**"
- 5-column grid of cards (dark `#1a1a1a` background)
- Alternating: text cards (avatar + name + quote) and screenshot image cards
- Screenshot cards: `<img src="assets/testimonials/t1.png">` — client drops in their DM screenshots
- Subtle hover: background lightens slightly

### 5. FAQ (Accordion)
- Two-column layout: sticky left title panel + right accordion list
- 5 questions with polished answers:
  1. **Philosophy** — "To create content designed to be remembered, not part of the scroll…"
  2. **NDAs** — "Yes, when required. I take confidentiality seriously…"
  3. **Revisions** — "Default 2 rounds, fully customisable per project…"
  4. **Turnaround** — "1–3 days short form, 3–7 days long form…"
  5. **Team** — "All creative work is mine. I delegate non-creative tasks to 1–2 junior editors and trusted freelancers while personally ensuring quality…"
- Accordion: click to open, click again or click another to close. Plus → rotates to ✕

### 6. FOOTER
- Dark grey `#1a1a1a` background
- Big CTA: "Tell Your *Story.*" headline
- Buttons: "Book a Call" (primary) + "Instagram ↗" (outline) + email (ghost)
- Bottom bar: brand name / nav links / copyright
- Watermark: huge outlined "AAYUSH CINE" text at very bottom (`-webkit-text-stroke`)

---

## UX & ANIMATION DETAILS

| Element | Behaviour |
|---|---|
| Custom cursor | Small white dot (10px) + lagging ring (36px). `mix-blend-mode: difference`. Scales up on hover. |
| Scroll reveal | All sections fade+translateY(40px) → visible via IntersectionObserver. Staggered delays on grid children. |
| Video modal | Dark overlay + `scale(0.95)→1` inner. ESC key closes. Clicking outside closes. Sets `iframe.src=''` on close to stop video. |
| FAQ accordion | `max-height: 0 → 300px` transition. One item open at a time. |
| Navbar | Transparent → blur + border on `scrollY > 60`. Padding shrinks slightly. |
| Ticker | CSS `@keyframes` infinite scroll. No JS required. |
| Noise overlay | SVG `feTurbulence` as `body::before` fixed overlay at ~40% opacity for film grain feel. |

---

## RESPONSIVE BREAKPOINTS

- **< 900px:** Nav padding reduced. Hero bottom stacks vertically. Work grid goes 2 columns. Test grid goes 2 columns. FAQ stacks vertically (left panel unsticks).
- **< 600px:** Work grid and test grid go 1 column. All cards become landscape 16:9.

---

## CODE QUALITY REQUIREMENTS

- Zero console errors
- All `href` targets use `target="_blank" rel="noopener"` for external links
- All images have `alt` attributes
- All interactive elements are keyboard accessible (tab + enter)
- `scroll-behavior: smooth` on `html`
- Custom scrollbar (3px, dark)
- `overflow-x: hidden` on body
- `cursor: none` on body (custom cursor handles it)
- No placeholder lorem ipsum text — all copy is final as specified above

---

## PLACEHOLDER INSTRUCTIONS (for client)

Add comments in the HTML clearly explaining:

1. **Videos:** Replace `data-src` attribute on each `.video-card` with YouTube embed URL
2. **Thumbnails:** Replace `.video-thumb` div contents with `<img src="assets/videos/thumb-N.jpg">`
3. **Testimonial screenshots:** Replace `.video-thumb` in `.image-card` with `<img src="assets/testimonials/tN.png">`
4. **Calendly link:** Find & replace `https://calendly.com` with actual link
5. **Email:** Replace `hello@aayushcine.com` with actual email

---

## OUTPUT

Generate the complete, single `index.html` file. It must be error-free, visually stunning, and immediately usable by opening in a browser. The file should be self-contained except for Google Fonts (CDN) and the `/assets/` folder references.
