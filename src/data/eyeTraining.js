// Eye Training rounds. Expanded pool of typographic exercises:
// visual comparisons (better-set option) and MCQ trivia about
// anatomy, history, families, and best practice.
//
// `render.type` values:
//   - paragraph, display, headline, pairing, card, stack — visual
//   - mcq — text-only multiple choice (2–4 options)

export const eyeRounds = [
  // ────── VISUAL: leading, hierarchy, pairing, contrast, etc. ──────
  {
    id: 'leading-1',
    topic: 'Leading',
    prompt: 'Which paragraph is easier to read?',
    render: {
      type: 'paragraph',
      text: "Typography is what you notice when it's working against you. When it's working for you, it disappears. The goal is to disappear.",
      options: [
        { label: 'A', style: { lineHeight: 1.2, fontSize: '16px' } },
        { label: 'B', style: { lineHeight: 1.55, fontSize: '16px' } }
      ]
    },
    correct: 'B',
    why: 'Body text wants 1.4–1.6 line-height. 1.2 is fine for display but claustrophobic at 16px. B lets the letters breathe.'
  },
  {
    id: 'hierarchy-1',
    topic: 'Hierarchy',
    prompt: 'Which card has clearer hierarchy?',
    render: {
      type: 'card',
      options: [
        {
          label: 'A',
          title: { text: 'Almost, Type.', style: { fontSize: '22px', fontWeight: 600 } },
          sub: { text: 'Typography, one swipe at a time.', style: { fontSize: '20px', fontWeight: 500, color: '#333' } },
          cta: { text: 'Start learning', style: { fontSize: '20px', fontWeight: 500 } }
        },
        {
          label: 'B',
          title: { text: 'Almost, Type.', style: { fontSize: '28px', fontWeight: 700 } },
          sub: { text: 'Typography, one swipe at a time.', style: { fontSize: '15px', fontWeight: 400, color: '#555' } },
          cta: { text: 'Start learning', style: { fontSize: '14px', fontWeight: 600 } }
        }
      ]
    },
    correct: 'B',
    why: 'B has clear, intentional contrast between the three roles. A is all the same weight and size — visually flat, which is visually confusing.'
  },
  {
    id: 'pairing-1',
    topic: 'Font Pairing',
    prompt: 'Which pairing has better contrast?',
    render: {
      type: 'pairing',
      options: [
        {
          label: 'A',
          head: { text: 'Almost, Type.', family: 'Inter', style: { fontSize: '28px', fontWeight: 700 } },
          body: { text: 'Typography is a choice. Make it on purpose.', family: 'Inter', style: { fontSize: '15px', color: '#444' } }
        },
        {
          label: 'B',
          head: { text: 'Almost, Type.', family: 'Fraunces', style: { fontSize: '28px', fontWeight: 700, fontStyle: 'italic' } },
          body: { text: 'Typography is a choice. Make it on purpose.', family: 'Inter', style: { fontSize: '15px', color: '#444' } }
        }
      ]
    },
    correct: 'B',
    why: 'B pairs a characterful serif display with a neutral sans body — classic contrast in shape and mood. A is one font doing two jobs, which flattens the feeling.'
  },
  {
    id: 'contrast-1',
    topic: 'Colour Contrast',
    prompt: 'Which is actually readable?',
    render: {
      type: 'paragraph',
      text: 'Some users will read this outside, in sunlight. Others will read it at 2 a.m. with their phone brightness at 10%. Both should succeed.',
      options: [
        { label: 'A', style: { color: '#A3A3A3', fontSize: '16px', lineHeight: 1.5 } },
        { label: 'B', style: { color: '#262626', fontSize: '16px', lineHeight: 1.5 } }
      ]
    },
    correct: 'B',
    why: 'A has a contrast ratio around 2.7:1 — fails WCAG AA. B is about 12:1. Lower contrast isn’t elegant; it’s an exclusion.'
  },
  {
    id: 'whitespace-1',
    topic: 'White Space',
    prompt: 'Which design reads faster?',
    render: {
      type: 'stack',
      options: [
        {
          label: 'A',
          items: [
            { text: 'Daily reads', size: 14, gap: 4 },
            { text: 'Swipe to learn', size: 18, weight: 600, gap: 4 },
            { text: 'Save what clicks.', size: 14, gap: 4 }
          ]
        },
        {
          label: 'B',
          items: [
            { text: 'Daily reads', size: 13, gap: 4, color: '#666' },
            { text: 'Swipe to learn', size: 22, weight: 700, gap: 18 },
            { text: 'Save what clicks.', size: 15, gap: 4 }
          ]
        }
      ]
    },
    correct: 'B',
    why: 'White space creates rhythm and grouping. B uses a bigger gap above the headline and a quieter label above, so the eye knows where to land first.'
  },
  {
    id: 'measure-1',
    topic: 'Line Length',
    prompt: 'Which has a better measure?',
    render: {
      type: 'paragraph',
      text: 'Line length matters more than you think. The eye has to travel from the end of one line back to the start of the next, and the farther it travels, the more often it loses its place. The rule of thumb is 45 to 75 characters per line. Shorter feels twitchy. Longer feels exhausting.',
      options: [
        { label: 'A', style: { fontSize: '16px', lineHeight: 1.55, maxWidth: '90%' } },
        { label: 'B', style: { fontSize: '16px', lineHeight: 1.55, maxWidth: '36ch' } }
      ]
    },
    correct: 'B',
    why: 'Line length above ~75 characters breaks reading rhythm. B sits around 36 characters — comfortable mobile reading.'
  },
  {
    id: 'kerning-1',
    topic: 'Kerning',
    prompt: 'Which display setting looks intentional?',
    render: {
      type: 'display',
      options: [
        { label: 'A', text: 'ALMOST.', style: { fontFamily: 'Fraunces', fontSize: '44px', fontWeight: 700, letterSpacing: '0em' } },
        { label: 'B', text: 'ALMOST.', style: { fontFamily: 'Fraunces', fontSize: '44px', fontWeight: 700, letterSpacing: '0.06em' } }
      ]
    },
    correct: 'B',
    why: 'Capitals need a little positive tracking to breathe — 5–10% works. Without it, capital letters collide at the shoulders.'
  },
  {
    id: 'hierarchy-2',
    topic: 'Hierarchy',
    prompt: 'Which headline does its job?',
    render: {
      type: 'headline',
      options: [
        { label: 'A', title: "You're learning. It shows.", sub: "That's the point.", titleStyle: { fontSize: '24px', fontWeight: 500 }, subStyle: { fontSize: '22px', fontWeight: 500, color: '#333' } },
        { label: 'B', title: "You're learning. It shows.", sub: "That's the point.", titleStyle: { fontSize: '34px', fontWeight: 700, lineHeight: 1.1 }, subStyle: { fontSize: '17px', fontWeight: 400, color: '#555', marginTop: '10px' } }
      ]
    },
    correct: 'B',
    why: 'A headline needs to be loud enough to be heard before the subtitle. B has the right 2:1 ratio and a breath of space between them.'
  },
  {
    id: 'allcaps-1',
    topic: 'All Caps',
    prompt: 'Which label is doing it right?',
    render: {
      type: 'display',
      options: [
        { label: 'A', text: 'NEW FEATURE', style: { fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, letterSpacing: '0em' } },
        { label: 'B', text: 'NEW FEATURE', style: { fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, letterSpacing: '0.12em' } }
      ]
    },
    correct: 'B',
    why: 'Small all-caps labels need generous tracking — 10–15%. Without it the letters jam together and lose legibility.'
  },
  {
    id: 'leading-2',
    topic: 'Leading',
    prompt: 'Which display setting reads right?',
    render: {
      type: 'display',
      options: [
        { label: 'A', text: 'Typography,\nquietly opinionated.', style: { fontFamily: 'Fraunces', fontSize: '34px', fontWeight: 700, lineHeight: 1.5, whiteSpace: 'pre-line' } },
        { label: 'B', text: 'Typography,\nquietly opinionated.', style: { fontFamily: 'Fraunces', fontSize: '34px', fontWeight: 700, lineHeight: 1.1, whiteSpace: 'pre-line' } }
      ]
    },
    correct: 'B',
    why: 'Display type wants tighter leading (1.05–1.2). 1.5 is for body. B reads as one considered headline.'
  },
  {
    id: 'pairing-2',
    topic: 'Font Pairing',
    prompt: 'Which pairing avoids the "too similar" trap?',
    render: {
      type: 'pairing',
      options: [
        {
          label: 'A',
          head: { text: 'Hours of operation', family: 'Inter', style: { fontSize: '22px', fontWeight: 600 } },
          body: { text: 'Mon–Fri, 9 to 5. We try to mean it.', family: 'Roboto', style: { fontSize: '14px', color: '#444' } }
        },
        {
          label: 'B',
          head: { text: 'Hours of operation', family: 'DM Serif Display', style: { fontSize: '24px', fontWeight: 700 } },
          body: { text: 'Mon–Fri, 9 to 5. We try to mean it.', family: 'Inter', style: { fontSize: '14px', color: '#444' } }
        }
      ]
    },
    correct: 'B',
    why: 'Inter + Roboto are siblings — both humanist sans-serifs at similar widths. The pairing reads as "I forgot to set the body font." B contrasts a serif display against a neutral sans.'
  },
  {
    id: 'measure-2',
    topic: 'Hierarchy',
    prompt: 'Which page has a clearer reading order?',
    render: {
      type: 'stack',
      options: [
        {
          label: 'A',
          items: [
            { text: 'Welcome', size: 16, weight: 600, gap: 4 },
            { text: 'New here? Start with our quick tour.', size: 16, gap: 4 },
            { text: 'Take the tour', size: 16, weight: 600, color: '#FF5B3A', gap: 4 }
          ]
        },
        {
          label: 'B',
          items: [
            { text: 'Welcome', size: 12, weight: 600, color: '#7B7A78', gap: 4 },
            { text: 'New here? Start with our quick tour.', size: 22, weight: 700, gap: 14 },
            { text: 'Take the tour →', size: 14, weight: 600, color: '#FF5B3A', gap: 4 }
          ]
        }
      ]
    },
    correct: 'B',
    why: 'B uses size and weight to assign three distinct roles: kicker label, headline, action. A has everything competing for the same role.'
  },
  {
    id: 'leading-3',
    topic: 'Leading',
    prompt: 'Which body paragraph reads more comfortably?',
    render: {
      type: 'paragraph',
      text: 'A good rule of thumb: as the line length grows, leading grows with it. Long lines need more vertical space so the eye can find the next start. Short lines need less.',
      options: [
        { label: 'A', style: { fontSize: '16px', lineHeight: 1.7, maxWidth: '90%' } },
        { label: 'B', style: { fontSize: '16px', lineHeight: 1.3, maxWidth: '32ch' } }
      ]
    },
    correct: 'A',
    why: 'Long lines (close to full width) need looser leading; short lines (~32 characters) can hold tighter. A pairs wide column with 1.7 leading correctly. B pairs short lines with already-tight leading and reads cramped.'
  },

  // ────── MCQ: anatomy ──────
  {
    id: 'mcq-x-height',
    topic: 'Anatomy',
    prompt: 'What does "x-height" measure?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'The total height of capital letters.' },
        { label: 'B', text: 'The height of lowercase letters without ascenders or descenders.' },
        { label: 'C', text: 'The width of the letter "x" specifically.' },
        { label: 'D', text: 'The vertical spacing between baselines.' }
      ]
    },
    correct: 'B',
    why: 'X-height is literally measured against the lowercase x — it sets how "big" a font looks at the same point size. Inter has a tall x-height; EB Garamond a short one.'
  },
  {
    id: 'mcq-ascender',
    topic: 'Anatomy',
    prompt: 'Which part of the letter is the ascender?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'The part that drops below the baseline (like in p, g, q).' },
        { label: 'B', text: 'The part that rises above the x-height (like in b, d, h, l).' },
        { label: 'C', text: 'The decorative flourish on a serif.' },
        { label: 'D', text: 'The horizontal stroke crossing a vertical (like in t).' }
      ]
    },
    correct: 'B',
    why: 'Ascenders rise above the x-height — letters like b, d, h, l. Descenders drop below the baseline — p, g, q, y.'
  },
  {
    id: 'mcq-counter',
    topic: 'Anatomy',
    prompt: 'What is a counter in typography?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'The space between two letters.' },
        { label: 'B', text: 'The enclosed (or partially enclosed) space inside a letter.' },
        { label: 'C', text: 'The number of glyphs in a font.' },
        { label: 'D', text: 'The decorative curl at the end of a stroke.' }
      ]
    },
    correct: 'B',
    why: 'The counter is the negative space inside letters like O, A, e, P. Closed counters (O) and open counters (c, e). Big counters mean clearer letters at small sizes.'
  },
  {
    id: 'mcq-kerning-vs-tracking',
    topic: 'Spacing',
    prompt: "What's the difference between kerning and tracking?",
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'Kerning is for caps, tracking is for lowercase.' },
        { label: 'B', text: 'Kerning adjusts space between specific letter pairs; tracking adjusts space across an entire word or line.' },
        { label: 'C', text: 'They mean the same thing in different software.' },
        { label: 'D', text: 'Kerning is vertical, tracking is horizontal.' }
      ]
    },
    correct: 'B',
    why: 'Kerning is pair-specific (the AV pair famously needs negative kerning). Tracking is uniform across a run of text. Most "logo kerning" videos are actually about kerning specific pairs.'
  },
  {
    id: 'mcq-leading-origin',
    topic: 'History',
    prompt: 'Why is line-spacing called "leading"?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: "Because the lead designer chose it." },
        { label: 'B', text: "From the lead strips inserted between metal type rows in letterpress printing." },
        { label: 'C', text: "Because the first line 'leads' the eye to the next." },
        { label: 'D', text: "It's an acronym: Line Editing And Definitive Spacing." }
      ]
    },
    correct: 'B',
    why: 'Letterpress typesetters added thin strips of lead between rows of metal type to space the lines. The word stuck — even though we now set leading in CSS, the lead is gone.'
  },
  {
    id: 'mcq-ligature',
    topic: 'Anatomy',
    prompt: 'A ligature is…',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'A line of text that connects two paragraphs.' },
        { label: 'B', text: 'Two or more letters merged into a single glyph (like fi or fl).' },
        { label: 'C', text: 'The thin line at the bottom of a serif.' },
        { label: 'D', text: 'A diagonal stroke through a numeral.' }
      ]
    },
    correct: 'B',
    why: 'Common ligatures combine pairs that collide awkwardly: fi, fl, ffi. Good fonts substitute them automatically — modern OpenType handles it via the "liga" feature.'
  },
  {
    id: 'mcq-em-en',
    topic: 'Punctuation',
    prompt: 'Which is the correct use of an em-dash vs en-dash?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'En-dash for ranges (1–10), em-dash for breaks in thought (like — this).' },
        { label: 'B', text: 'Em-dash for ranges, en-dash for breaks in thought.' },
        { label: 'C', text: 'They are the same character at different point sizes.' },
        { label: 'D', text: 'Use whichever; modern typography no longer distinguishes.' }
      ]
    },
    correct: 'A',
    why: 'En-dashes (–) connect: ranges, scores, durations. Em-dashes (—) interrupt: breaks in a sentence — like this one. Hyphens (-) join compound words.'
  },
  {
    id: 'mcq-quotes',
    topic: 'Punctuation',
    prompt: "Which version uses correct curly quotes?",
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: '"Almost," she said. "Type."' },
        { label: 'B', text: '“Almost,” she said. “Type.”' },
        { label: 'C', text: "''Almost,'' she said. ''Type.''" },
        { label: 'D', text: '«Almost», she said. «Type».' }
      ]
    },
    correct: 'B',
    why: 'Straight quotes are a holdover from typewriter keyboards. Real typography uses curly (smart) quotes — “…” for English. D is correct in French and Spanish.'
  },

  // ────── MCQ: family classification ──────
  {
    id: 'mcq-classify-helvetica',
    topic: 'Font Families',
    prompt: 'Helvetica is which type classification?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'Humanist sans-serif.' },
        { label: 'B', text: 'Geometric sans-serif.' },
        { label: 'C', text: 'Neo-grotesque sans-serif.' },
        { label: 'D', text: 'Slab serif.' }
      ]
    },
    correct: 'C',
    why: 'Helvetica is a neo-grotesque from 1957 — Swiss, neutral, optical-tendency to look uniform. Futura is geometric. Gill Sans is humanist.'
  },
  {
    id: 'mcq-classify-garamond',
    topic: 'Font Families',
    prompt: 'Garamond is which kind of serif?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'Old-style serif (Garalde).' },
        { label: 'B', text: 'Transitional serif.' },
        { label: 'C', text: 'Didone (modern serif).' },
        { label: 'D', text: 'Slab serif.' }
      ]
    },
    correct: 'A',
    why: 'Garamond is a 16th-century old-style serif — moderate stroke contrast, oblique stress, tilted axis. Bodoni and Didot are Didones (extreme contrast). Rockwell is a slab.'
  },
  {
    id: 'mcq-classify-bodoni',
    topic: 'Font Families',
    prompt: 'Bodoni is famous for…',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'Soft, friendly curves with low contrast.' },
        { label: 'B', text: 'Extreme thick-thin contrast and vertical stress (a Didone).' },
        { label: 'C', text: 'Square serifs and uniform stroke weight.' },
        { label: 'D', text: 'Being designed in the 1990s for screens.' }
      ]
    },
    correct: 'B',
    why: 'Bodoni (1798) is a Didone — dramatic thick/thin contrast, hairline serifs, vertical stress. The classic fashion magazine masthead.'
  },
  {
    id: 'mcq-slab',
    topic: 'Font Families',
    prompt: 'Which of these is a slab serif?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'Times New Roman.' },
        { label: 'B', text: 'Garamond.' },
        { label: 'C', text: 'Rockwell.' },
        { label: 'D', text: 'Caslon.' }
      ]
    },
    correct: 'C',
    why: 'Slab serifs (Egyptian) have thick, square, unbracketed serifs. Rockwell, Roboto Slab, Courier. The others are conventional serifs.'
  },
  {
    id: 'mcq-humanist',
    topic: 'Font Families',
    prompt: 'Which font is a humanist sans-serif?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'Helvetica.' },
        { label: 'B', text: 'Futura.' },
        { label: 'C', text: 'Gill Sans.' },
        { label: 'D', text: 'Impact.' }
      ]
    },
    correct: 'C',
    why: 'Humanist sans-serifs (Gill Sans, Frutiger, Optima) take their proportions from Roman inscriptions and handwritten letterforms. They feel warmer than geometric or grotesque sans.'
  },
  {
    id: 'mcq-monospaced',
    topic: 'Font Families',
    prompt: 'In a monospaced font…',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'Every glyph occupies the same horizontal width.' },
        { label: 'B', text: 'All letters are the same height.' },
        { label: 'C', text: 'Only one weight is included.' },
        { label: 'D', text: 'There are no italics.' }
      ]
    },
    correct: 'A',
    why: 'Monospaced fonts (JetBrains Mono, Courier, Departure Mono) give every character the same advance width — useful for code where columns must align.'
  },

  // ────── MCQ: history ──────
  {
    id: 'mcq-helvetica-year',
    topic: 'History',
    prompt: 'When was Helvetica designed?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: '1923.' },
        { label: 'B', text: '1957.' },
        { label: 'C', text: '1972.' },
        { label: 'D', text: '1986.' }
      ]
    },
    correct: 'B',
    why: 'Helvetica was designed in 1957 by Max Miedinger and Eduard Hoffmann at the Haas Type Foundry in Switzerland. Originally called "Neue Haas Grotesk".'
  },
  {
    id: 'mcq-comicsans',
    topic: 'History',
    prompt: 'Comic Sans was designed for…',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'A children\'s book publisher.' },
        { label: 'B', text: "Microsoft Bob's animated dog character." },
        { label: 'C', text: 'A comic book printing company.' },
        { label: 'D', text: 'Internet message boards.' }
      ]
    },
    correct: 'B',
    why: 'Vincent Connare designed Comic Sans in 1994 for Microsoft Bob — specifically for speech bubbles spoken by an animated dog called Rover. It was never meant for general use. The rest is history.'
  },
  {
    id: 'mcq-times',
    topic: 'History',
    prompt: 'Times New Roman was originally designed for…',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'A book publisher.' },
        { label: 'B', text: 'Microsoft Word.' },
        { label: 'C', text: 'The Times newspaper.' },
        { label: 'D', text: 'A typewriter company.' }
      ]
    },
    correct: 'C',
    why: 'Times New Roman was commissioned by The Times of London in 1931, designed by Stanley Morison and Victor Lardent. It went into use the next year and replaced the paper\'s previous typeface.'
  },

  // ────── MCQ: best practice ──────
  {
    id: 'mcq-body-size',
    topic: 'Best Practice',
    prompt: 'Recommended minimum body text size on mobile?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: '12px.' },
        { label: 'B', text: '14px.' },
        { label: 'C', text: '16px.' },
        { label: 'D', text: '20px.' }
      ]
    },
    correct: 'C',
    why: '16px is the sweet spot — below 16px iOS Safari often auto-zooms text inputs on focus, and most readers strain. 17–18px is even friendlier.'
  },
  {
    id: 'mcq-line-height',
    topic: 'Best Practice',
    prompt: 'Sensible body-text line-height?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: '1.0' },
        { label: 'B', text: '1.2' },
        { label: 'C', text: '1.5' },
        { label: 'D', text: '2.0' }
      ]
    },
    correct: 'C',
    why: '1.4–1.6 is the comfortable range for body text. 1.0 cramps lines on top of each other. 2.0 disconnects them. Display headlines want tighter (1.05–1.2).'
  },
  {
    id: 'mcq-line-length',
    topic: 'Best Practice',
    prompt: 'Ideal line length for body reading?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: '20–35 characters.' },
        { label: 'B', text: '45–75 characters.' },
        { label: 'C', text: '80–110 characters.' },
        { label: 'D', text: 'As wide as the screen — let it breathe.' }
      ]
    },
    correct: 'B',
    why: '45–75 characters per line is the well-tested optimum. Above 75 the eye loses its place returning to the next line; below 45 reading feels twitchy.'
  },
  {
    id: 'mcq-contrast-ratio',
    topic: 'Best Practice',
    prompt: 'Minimum text contrast ratio for WCAG AA?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: '2.1:1' },
        { label: 'B', text: '3:1' },
        { label: 'C', text: '4.5:1' },
        { label: 'D', text: '7:1' }
      ]
    },
    correct: 'C',
    why: 'WCAG AA requires 4.5:1 for normal text and 3:1 for large text (≥18pt or ≥14pt bold). AAA requires 7:1. Use the WebAIM contrast checker.'
  },
  {
    id: 'mcq-fonts-per-design',
    topic: 'Best Practice',
    prompt: 'How many type families should one design typically use?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'One — be consistent.' },
        { label: 'B', text: 'Two or three — body workhorse + character lead.' },
        { label: 'C', text: 'Four or five — give every level its own.' },
        { label: 'D', text: 'As many as the design needs.' }
      ]
    },
    correct: 'B',
    why: '1 family works (use weights and sizes for hierarchy). 2 is the classic — a neutral body and a characterful display. 3 is the upper limit before things start to feel disorganised.'
  },
  {
    id: 'mcq-italic-purpose',
    topic: 'Best Practice',
    prompt: 'When should you use italics?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'For emphasis on every important word.' },
        { label: 'B', text: 'For book and film titles, foreign words, species names, internal thoughts.' },
        { label: 'C', text: 'On every headline to make it look elegant.' },
        { label: 'D', text: 'Never — italics are dated.' }
      ]
    },
    correct: 'B',
    why: 'Italics carry voice. Use them for titles (a book), terms of art (sotto voce), thoughts, and the occasional emphasis. Italicised paragraphs read as an entire-section aside.'
  },
  {
    id: 'mcq-trueitalic',
    topic: 'Anatomy',
    prompt: 'What\'s the difference between true italics and oblique?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'There is no difference; they\'re synonyms.' },
        { label: 'B', text: 'True italics are a separately drawn cut with different letterforms; oblique is the upright tilted.' },
        { label: 'C', text: 'Oblique is for serif fonts; italic is for sans.' },
        { label: 'D', text: 'True italics are only available in paid fonts.' }
      ]
    },
    correct: 'B',
    why: 'True italics (most serifs) have distinct letterforms — the lowercase a in italic Garamond is shaped differently from upright. Obliques (most older sans) are just the regular roman, slanted.'
  },

  // ────── MCQ: pairing/style ──────
  {
    id: 'mcq-pair-wedding',
    topic: 'Style Match',
    prompt: 'Which pairing best fits a wedding invitation?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'Cormorant Garamond + Inter.' },
        { label: 'B', text: 'Anton + Roboto Mono.' },
        { label: 'C', text: 'Bagel Fat One + Comic Sans.' },
        { label: 'D', text: 'Impact + JetBrains Mono.' }
      ]
    },
    correct: 'A',
    why: 'A delicate high-contrast serif (Cormorant) for the names, set in italic, paired with a neutral sans (Inter) for details. The others lean heavy, retro or technical.'
  },
  {
    id: 'mcq-pair-fintech',
    topic: 'Style Match',
    prompt: 'Best font for a fintech dashboard?',
    render: {
      type: 'mcq',
      options: [
        { label: 'A', text: 'Cookie (script).' },
        { label: 'B', text: 'Bagel Fat One.' },
        { label: 'C', text: 'Inter or Manrope (with tabular figures).' },
        { label: 'D', text: 'Old English Text.' }
      ]
    },
    correct: 'C',
    why: 'Dashboards need predictable digit widths — turn on tabular numerals so $1,234 lines up under $9,876. Inter, Manrope, IBM Plex Sans all support this.'
  }
]

export function shuffleRounds(n = 5) {
  // Legacy helper, still used elsewhere if needed.
  const copy = [...eyeRounds]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, n)
}

// Pick one round whose id isn't in `seenIds`. If all rounds have been seen,
// reset and pick from the full pool. Returns null only if there are no rounds.
export function pickNextRound(seenIds) {
  const seen = seenIds instanceof Set ? seenIds : new Set(seenIds || [])
  const fresh = eyeRounds.filter((r) => !seen.has(r.id))
  const pool = fresh.length > 0 ? fresh : eyeRounds
  if (pool.length === 0) return null
  return pool[Math.floor(Math.random() * pool.length)]
}
