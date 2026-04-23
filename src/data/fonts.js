// Seed Font Finder responses, keyed by fuzzy keyword match.
// Each bundle: 4 real Google Fonts + 4 palettes (60-30-10) + snark.
// Keywords are matched liberally; a default fallback always exists.

const bundle = (keywords, summary, fonts, palettes) => ({
  keywords,
  summary,
  fonts,
  palettes
})

const f = (role, family, style, sample, body, tag, blurb, googleParam) => ({
  role,
  family,
  style,
  sample,
  body,
  tag,
  blurb,
  googleParam // used to inject the <link> tag dynamically
})

const p = (name, blurb, c60, c30, c10) => ({
  name,
  blurb,
  // explicit 60-30-10 roles per PRD §4.3.3
  swatches: [
    { role: 'Background & large surfaces', hex: c60.hex, nameHint: c60.name, weight: 60 },
    { role: 'UI elements & sections', hex: c30.hex, nameHint: c30.name, weight: 30 },
    { role: 'Accent & CTAs', hex: c10.hex, nameHint: c10.name, weight: 10 }
  ]
})

export const fontBundles = [
  bundle(
    ['dark', 'moody', 'luxury', 'fashion', 'editorial', 'perfume'],
    "Something quiet, expensive, and slightly unfriendly. Good. That's fashion.",
    [
      f('Display headlines', 'Fraunces', 'Serif \u00b7 Variable', 'Almost.', 'Body text in Fraunces feels like it was set in 1910 by someone wearing gloves.', 'Editorial serif', "Has opinions. Knows you're watching.", 'Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400'),
      f('Editorial subheads', 'Playfair Display', 'Serif', 'Quiet power.', 'Body text in Playfair — technically legible, spiritually gothic.', 'High-contrast serif', 'The font your editor uses when she means it.', 'Playfair+Display:ital,wght@0,400;0,700;1,400'),
      f('Body', 'Inter', 'Sans-serif', 'Readable. Honest.', 'Inter is the default for a reason. It does not get in the way. It does not have a personality. That is the personality.', 'Neutral sans', "Doesn't want to be noticed. That's why it works.", 'Inter:wght@400;500;600;700'),
      f('Accents', 'Unica One', 'Display', 'ALMOST.', 'All caps only. Do not use this for body. Seriously.', 'Condensed display', 'For signage, not sentences.', 'Unica+One')
    ],
    [
      p('Oak & Smoke', 'Black tie, low lighting, no small talk.', { hex: '#0E0E10', name: 'Ink' }, { hex: '#2A2622', name: 'Espresso' }, { hex: '#C8A96A', name: 'Brass' }),
      p('Bone China', 'The beige that costs more than all the other beiges.', { hex: '#F4EFE6', name: 'Bone' }, { hex: '#8C7E6B', name: 'Driftwood' }, { hex: '#1A1916', name: 'Obsidian' }),
      p('Noir', 'All the blacks, plus one red for emphasis.', { hex: '#111111', name: 'Carbon' }, { hex: '#3A3A3A', name: 'Graphite' }, { hex: '#C0392B', name: 'Signal' }),
      p('Dusk', 'Unexpected. Midnight blue doing a black impression.', { hex: '#121622', name: 'Midnight' }, { hex: '#3A4058', name: 'Indigo Smoke' }, { hex: '#E8C07D', name: 'Candle' })
    ]
  ),
  bundle(
    ['playful', 'kids', 'children', 'fun', 'friendly', 'learning', 'school', 'bright'],
    'Friendly without being cringe. Hard to do. We did it.',
    [
      f('Display headlines', 'Fraunces', 'Serif \u00b7 Variable', 'Hi there.', 'Fraunces for body works at warm, generous settings. Try 1.6 line-height.', 'Warm serif', 'Has eyebrows. Uses them.', 'Fraunces:opsz,wght@9..144,400;9..144,700'),
      f('Playful accents', 'Caprasimo', 'Display', 'Wheeeee.', 'One word at a time. Not for paragraphs.', 'Chunky display', "Looks like it's having a very good day.", 'Caprasimo'),
      f('Body', 'Nunito', 'Sans-serif', 'Soft and round.', 'Nunito is Inter in a hoodie. Softer shoulders, warmer mood, still legible at 16px.', 'Rounded sans', "Can't take it too seriously, and that's the point.", 'Nunito:wght@400;600;700'),
      f('Subheads', 'Baloo 2', 'Sans-serif', 'Bouncy.', 'Baloo 2 carries a lot of personality. Use it sparingly.', 'Rounded display sans', 'Says "learn" without saying "lesson".', 'Baloo+2:wght@400;600;700')
    ],
    [
      p('Playground', 'Primary colours pretending to be grown up.', { hex: '#FFF9EF', name: 'Cream' }, { hex: '#FF6B6B', name: 'Tomato' }, { hex: '#2E86AB', name: 'Blue Jay' }),
      p('Recess', 'Sunny, loud, a little exhausting. Perfect.', { hex: '#FFE66D', name: 'Butter' }, { hex: '#FF8C42', name: 'Mango' }, { hex: '#06A77D', name: 'Mint' }),
      p('Bubblegum', 'The one that tastes pink.', { hex: '#FFF0F5', name: 'Cotton' }, { hex: '#FF85A1', name: 'Bubblegum' }, { hex: '#5E60CE', name: 'Grape' }),
      p('Storybook', 'Paper-soft, clearly a book, clearly a friend.', { hex: '#FDF6E3', name: 'Paper' }, { hex: '#B58863', name: 'Oak' }, { hex: '#D64933', name: 'Apple' })
    ]
  ),
  bundle(
    ['brutalist', 'tech', 'startup', 'raw', 'grid', 'bold', 'indie'],
    "Loud, on-grid, allergic to gradients. You won't get a stock logo out of this.",
    [
      f('Display headlines', 'Space Grotesk', 'Sans-serif', 'Ship it.', 'Space Grotesk at body size has a quiet weirdness. Trust it.', 'Geometric sans', "Didn't go to design school. Doesn't care.", 'Space+Grotesk:wght@400;500;700'),
      f('Editorial / quotes', 'IBM Plex Serif', 'Serif', 'Plain speech.', 'Plex is what you get when IBM hires designers who read books.', 'Plain serif', 'Reads like a whitepaper, looks like a zine.', 'IBM+Plex+Serif:wght@400;600'),
      f('Body', 'JetBrains Mono', 'Monospace', "'hello world'", 'Mono body is a statement. Make sure you meant to make it. Works for ~200 char blocks.', 'Monospace', 'You are not writing code. You just want to look like you do.', 'JetBrains+Mono:wght@400;500'),
      f('Accents', 'Archivo Black', 'Display', 'LABEL.', 'Uppercase short phrases only. Do not let it near a paragraph.', 'Heavy sans', 'Signs and stamps. Shouting a single word.', 'Archivo+Black')
    ],
    [
      p('Concrete', 'Grey, louder grey, one colour.', { hex: '#EDEDED', name: 'Bone' }, { hex: '#1A1A1A', name: 'Ink' }, { hex: '#FE5F55', name: 'Signal' }),
      p('Yellow Tape', 'Do not cross.', { hex: '#FFFFFF', name: 'Paper' }, { hex: '#0A0A0A', name: 'Black' }, { hex: '#FFD400', name: 'Hazard' }),
      p('Riso', 'The photocopier in your friend\u2019s studio.', { hex: '#F7F4EC', name: 'Off-white' }, { hex: '#2D3047', name: 'Midnight' }, { hex: '#FF4365', name: 'Fluoro' }),
      p('Terminal', 'Phosphor on a CRT.', { hex: '#0A0F0D', name: 'Scope' }, { hex: '#1F2A24', name: 'Board' }, { hex: '#39FF14', name: 'Phosphor' })
    ]
  ),
  bundle(
    ['wellness', 'calm', 'organic', 'skincare', 'soft', 'natural', 'earthy', 'beige'],
    'Beige with intentions. Nothing loud survives contact with your bathroom.',
    [
      f('Display headlines', 'Fraunces', 'Serif \u00b7 Variable', 'Slow down.', 'Fraunces at 1.7 leading on a muted background is the whole aesthetic.', 'Humanist serif', 'Knows what an ingredient is.', 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,700'),
      f('Alt display', 'Cormorant Garamond', 'Serif', 'Rituals.', 'Cormorant is thinner than you think. Pair with heavier body type.', 'Thin serif', 'Claims to be French. Is Korean.', 'Cormorant+Garamond:wght@300;400;500;700'),
      f('Body', 'Work Sans', 'Sans-serif', 'Simple and calm.', 'Work Sans is a gentle geometric. It doesn\u2019t yell. It doesn\u2019t try.', 'Neutral sans', 'Wears linen and means it.', 'Work+Sans:wght@300;400;500;600'),
      f('Label type', 'Syne', 'Sans-serif', 'Fine Object', 'For pricing pages and product names. Small doses.', 'Weird sans', 'Unexpected curves. You\u2019ll pay more for it.', 'Syne:wght@400;500;700')
    ],
    [
      p('Linen', 'Beige, off-beige, one warm accent.', { hex: '#F5F0E8', name: 'Oat' }, { hex: '#D9CBB8', name: 'Driftwood' }, { hex: '#A47148', name: 'Clay' }),
      p('Sage Bath', 'Green that agrees with itself.', { hex: '#F1EFE7', name: 'Chalk' }, { hex: '#AEB5A3', name: 'Sage' }, { hex: '#3D4B3A', name: 'Moss' }),
      p('Rose Water', 'Blush without the wink.', { hex: '#FAF1EC', name: 'Shell' }, { hex: '#E2B6A7', name: 'Rose' }, { hex: '#5C3A3A', name: 'Wine' }),
      p('Dune', 'Desert light, twelve minutes before sunset.', { hex: '#EFE4D2', name: 'Sand' }, { hex: '#B8946B', name: 'Dune' }, { hex: '#5E3C23', name: 'Umber' })
    ]
  ),
  bundle(
    ['retro', 'vintage', '70s', 'warm', 'funk', 'disco', 'groovy'],
    "Seventies palette, sixties shapes, eighties confidence. It's a lot.",
    [
      f('Display', 'Bagel Fat One', 'Display', 'GROOVY', 'Use for one word, max. Otherwise it becomes a traffic sign.', 'Retro display', "Doesn't take phone calls before noon.", 'Bagel+Fat+One'),
      f('Headlines', 'DM Serif Display', 'Serif', 'Classic Hour.', 'A display serif with a flared elegance. Pair with a simple body.', 'Modern serif', 'Attended the opening.', 'DM+Serif+Display:ital@0;1'),
      f('Body', 'DM Sans', 'Sans-serif', 'Quiet body.', 'DM Sans is the responsible sibling. Everyone else gets to be weird.', 'Neutral sans', 'Owns a calendar.', 'DM+Sans:wght@400;500;700'),
      f('Script accents', 'Cookie', 'Handwriting', 'Cheers!', "Script fonts live and die by size. Don't let this one near a paragraph.", 'Script', 'Says "hi" in pen on a paper napkin.', 'Cookie')
    ],
    [
      p('Sunset 77', 'Orange, rust, cream. The carpet of your parents\u2019 first apartment.', { hex: '#FFF1DE', name: 'Cream' }, { hex: '#E07A5F', name: 'Rust' }, { hex: '#3D405B', name: 'Denim' }),
      p('Wood Panel', 'Brown is a colour and this proves it.', { hex: '#F5E9D3', name: 'Parchment' }, { hex: '#8B5A2B', name: 'Walnut' }, { hex: '#F2A541', name: 'Amber' }),
      p('Avocado', 'Seventies kitchen tile.', { hex: '#F3EFD9', name: 'Eggshell' }, { hex: '#7A8B5A', name: 'Avocado' }, { hex: '#D16666', name: 'Brick' }),
      p('Disco', 'Cosmic purple, sugar pink, one glint of gold.', { hex: '#2E1A47', name: 'Amethyst' }, { hex: '#E36588', name: 'Bubblegum' }, { hex: '#F5D65A', name: 'Gold' })
    ]
  ),
  bundle(
    ['fintech', 'finance', 'banking', 'serious', 'professional', 'b2b', 'saas', 'corporate'],
    "Trustworthy. Not dull. There's a difference. Most of your competitors missed it.",
    [
      f('Display', 'Inter', 'Sans-serif', 'Invest.', 'Inter scales. Use it for display at 64px+ with tight tracking.', 'Neutral sans', 'The default. Used well.', 'Inter:wght@400;500;600;700'),
      f('Editorial', 'IBM Plex Serif', 'Serif', 'Annual Report', 'Plex Serif for emphasis paragraphs or pull quotes. Not the whole body.', 'Technical serif', 'Designed by IBM, which explains a lot.', 'IBM+Plex+Serif:wght@400;500;600'),
      f('Body', 'Inter', 'Sans-serif', 'Clear numbers and careful prose.', 'Inter at 16px with tabular-nums enabled. Numbers line up. CFOs notice.', 'Neutral sans', 'Tabular numerals for days.', 'Inter:wght@400;500;600'),
      f('Data', 'JetBrains Mono', 'Monospace', '1,284,902.00', 'Monospace only for numbers, not paragraphs.', 'Monospace', 'For the column where precision matters.', 'JetBrains+Mono:wght@400;500')
    ],
    [
      p('Blue Chip', 'Navy and white. The universal uniform of trust.', { hex: '#FFFFFF', name: 'Paper' }, { hex: '#0A2540', name: 'Navy' }, { hex: '#635BFF', name: 'Electric' }),
      p('Treasury', 'Dark, green, credible. A central bank in a hoodie.', { hex: '#0F1A14', name: 'Forest Ink' }, { hex: '#1E3A2F', name: 'Pine' }, { hex: '#C8A96A', name: 'Brass' }),
      p('Ledger', 'Off-white, slate, one warm accent.', { hex: '#F7F5F0', name: 'Paper' }, { hex: '#2F3E46', name: 'Slate' }, { hex: '#E76F51', name: 'Clay' }),
      p('Obsidian', 'Dark mode that means business.', { hex: '#0B0F14', name: 'Obsidian' }, { hex: '#1B2330', name: 'Shadow' }, { hex: '#3DCCC7', name: 'Current' })
    ]
  ),
  bundle(
    ['cyber', 'neon', 'gaming', 'esports', 'future', 'synthwave', 'dark'],
    "Dark mode, but with something to prove. Don't overdo the neon. Actually, do.",
    [
      f('Display', 'Orbitron', 'Display', 'LAUNCH', 'Geometric, wide, slightly alien. One-word glory only.', 'Futurist display', 'Stares at you from across the arcade.', 'Orbitron:wght@500;700;900'),
      f('Subheads', 'Chakra Petch', 'Sans-serif', 'Latency: low.', 'Tech sans with flair. Works at small sizes and large.', 'Tech sans', 'Looks like a HUD element. Is one now.', 'Chakra+Petch:wght@400;500;700'),
      f('Body', 'Rajdhani', 'Sans-serif', 'Ready player one.', 'Rajdhani reads well in body sizes and has that condensed stadium feel.', 'Condensed sans', 'Always a little in a hurry.', 'Rajdhani:wght@400;500;600;700'),
      f('Data', 'JetBrains Mono', 'Monospace', '> ready', 'Use for stats, timers, anything with numbers.', 'Monospace', 'Terminal-ready.', 'JetBrains+Mono:wght@400;500')
    ],
    [
      p('Neon Alley', 'Dark grey, electric pink, one cyan hit.', { hex: '#0A0A12', name: 'Void' }, { hex: '#1D1D2B', name: 'Shadow' }, { hex: '#FF2A6D', name: 'Signal Pink' }),
      p('Synthwave', 'Magenta, purple, sunset horizon.', { hex: '#150A2B', name: 'Midnight' }, { hex: '#5D0E90', name: 'Dusk' }, { hex: '#00F0FF', name: 'Laser' }),
      p('Forge', 'Metal and fire.', { hex: '#16181D', name: 'Iron' }, { hex: '#2C2F36', name: 'Steel' }, { hex: '#FF6B00', name: 'Flame' }),
      p('Terminal', 'The phosphor CRT look, done properly.', { hex: '#001014', name: 'Deep' }, { hex: '#002B36', name: 'Board' }, { hex: '#39FF14', name: 'Phosphor' })
    ]
  ),
  bundle(
    ['DEFAULT', 'minimal', 'clean', 'modern'],
    "The safe choice. Not boring. Just clear. Sometimes that's exactly what you need.",
    [
      f('Display', 'Fraunces', 'Serif \u00b7 Variable', 'Hello.', 'Fraunces at 64px+ is a headline that has opinions.', 'Variable serif', 'Has a voice. Doesn\u2019t overuse it.', 'Fraunces:opsz,wght@9..144,400;9..144,700'),
      f('Alt display', 'Space Grotesk', 'Sans-serif', 'Good type.', 'Geometric but warm. Works at every size.', 'Geometric sans', 'Wears the same t-shirt every day. On purpose.', 'Space+Grotesk:wght@400;500;700'),
      f('Body', 'Inter', 'Sans-serif', 'Works every single time.', 'Inter at 16–18px, line-height 1.6, is the best body type decision you will make today.', 'Neutral sans', 'The quiet workhorse.', 'Inter:wght@400;500;600;700'),
      f('Mono', 'JetBrains Mono', 'Monospace', 'const kerning = true', 'For code and tabular data. Nothing else.', 'Monospace', 'Pretends to be Swiss. Isn\u2019t.', 'JetBrains+Mono:wght@400;500')
    ],
    [
      p('Paper', 'Off-white, ink, one accent. Classic is classic.', { hex: '#FAF7F2', name: 'Paper' }, { hex: '#0E0E10', name: 'Ink' }, { hex: '#FF5B3A', name: 'Signal' }),
      p('Atelier', 'Cool grey and warm cream.', { hex: '#F2F2EF', name: 'Bone' }, { hex: '#343A40', name: 'Slate' }, { hex: '#6C9A8B', name: 'Celadon' }),
      p('Dusk', 'Dark mode with warmth.', { hex: '#121417', name: 'Ink' }, { hex: '#1E2126', name: 'Shadow' }, { hex: '#F2B134', name: 'Amber' }),
      p('Cobalt', 'Blue, cream, and intent.', { hex: '#F4F2EC', name: 'Cream' }, { hex: '#13335C', name: 'Cobalt' }, { hex: '#E87722', name: 'Orange' })
    ]
  )
]

export const quickChips = [
  'dark moody luxury',
  'playful learning app',
  'brutalist tech startup',
  'calm wellness brand',
  'retro 70s poster',
  'fintech dashboard',
  'cyber gaming',
  'minimal clean modern'
]

const DEFAULT_BUNDLE = fontBundles[fontBundles.length - 1]

export function findBundle(input) {
  if (!input) return DEFAULT_BUNDLE
  const q = input.toLowerCase()
  let best = null
  let bestScore = 0
  for (const b of fontBundles) {
    let score = 0
    for (const k of b.keywords) {
      if (q.includes(k)) score += 1
    }
    if (score > bestScore) {
      bestScore = score
      best = b
    }
  }
  return best || DEFAULT_BUNDLE
}
