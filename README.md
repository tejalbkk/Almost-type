# almost, type.

*you're learning. it shows. that's the point.*

A mobile-first PWA that teaches typography through short, swipeable cards — no download, no login. Built to the PRD `almost-type-prd.docx` v1.0 spec.

## What's in here (v1.0)

All four P0 features from §4 of the PRD:

- **Type School** — swipeable cards (right = like, left = not now), stamps during drag, undo, 70px decision threshold, 3-card stack depth, notes, share sheet.
- **Font Finder** — keyword → four real Google Fonts + four 60-30-10 palettes + live mock preview with dynamic text-contrast.
- **Type Critique** — paste a description, get a scored, structured critique (verdict, score, what's working, what to fix, hierarchy note, priority fix, closing line).
- **Eye Training** — five pre-authored side-by-side comparison rounds with reveal-why feedback and scoring.

Plus the PRD P1 support: **Liked Library**, **Not Now pile**, **Share sheet** (copy / X / WhatsApp), **note-taking** (private + scaffolded public), and a **PWA manifest**.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5173`). For the real experience: open it on your phone via your laptop's LAN address, or use your browser's device-emulation at 390×844.

```bash
npm run build     # production bundle in ./dist
npm run preview   # serve the built bundle locally
```

## Content / AI mode

v1.0 ships **seed content** — no API key required, works entirely offline. Every card, font bundle, critique, and eye-training round is hand-authored in `src/data/`. The PRD's Claude API integration (§6.2) is scaffolded through that same interface: swap the seed modules' exports for a `fetch()` call to a serverless endpoint and the rest of the app stays the same.

## Project layout

```
src/
├── App.jsx                # App shell, intro, top bar, bottom nav, tab router
├── main.jsx               # React entry
├── index.css              # Tailwind + base styles + safe-area helpers
├── components/
│   ├── BottomNav.jsx      # 5-tab bottom bar
│   ├── SwipeCard.jsx      # Pointer-drag card with stamps + threshold
│   ├── TypeSchool.jsx     # Swipe stack orchestrator
│   ├── FontFinder.jsx     # Keyword → fonts + palettes + live preview
│   ├── TypeCritique.jsx   # Textarea → scored structured critique
│   ├── EyeTraining.jsx    # 5 rounds, pick-and-reveal
│   ├── Library.jsx        # Liked + Not Now piles, notes surfaced
│   ├── ShareSheet.jsx     # Bottom sheet: Copy, X, WhatsApp
│   └── NoteSheet.jsx      # Bottom sheet: private/public notes
├── data/
│   ├── cards.js           # 22 swipe cards (tag, title, body, tip, read-more)
│   ├── fonts.js           # 8 font bundles keyed by vibe keywords
│   ├── critiques.js       # Keyword-aware critique generator
│   └── eyeTraining.js     # 10+ pre-authored comparison rounds
└── lib/
    ├── contrast.js        # WCAG luminance + readable-text-on-background
    ├── fontLoader.js      # Dynamic Google Fonts <link> injection
    └── storage.js         # localStorage wrapper (namespaced)
```

## Design notes

- **Mobile canvas:** everything is designed at 390px wide (iPhone 14 baseline, PRD §6.1). Desktop gets a centred phone-width column.
- **Tone:** every string follows the PRD §7.3 voice — warm, dry, a little roasty. No "Lesson 1." No "We're so excited."
- **Typography choices:** Fraunces for display/italics, Inter for body, JetBrains Mono for mono accents. All loaded from Google Fonts.
- **Accessibility:** button controls for every gesture (Like/Skip/Undo), 44px+ tap targets, contrast helpers on the live preview. The fully-keyboard-accessible swipe alternative flagged in PRD §12 is still an open question — buttons cover it for now.

## What's next (from the PRD roadmap)

- **v1.1** — swap in real Claude API calls, expand seed bank to 40+ cards, Service Worker caching, PWA install prompt after 3 sessions.
- **v1.2** — backend (Supabase) for public notes / comments, daily streaks.
- **v2.0** — Type History mode, Designer Profiles ("What would Vignelli do?"), optional Pro tier.

## Known limitations

- All state is in-session except `liked` / `notnow` / `notes`, which are persisted to localStorage (a small preview of the v1.1 persistence milestone — safe to ship now, easy to remove).
- Critique scoring is keyword-based, not model-based. It's deliberately conservative and transparent; when the real API is wired in, this module gets replaced.
- Public notes are scaffolded (UI toggle, visibility field) but not surfaced to other users — the backend is a v1.2 deliverable.
