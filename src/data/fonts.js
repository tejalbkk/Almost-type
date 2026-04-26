// Font Finder data. Each bundle has a POOL of fonts and palettes —
// the UI surfaces a random 4 of each, and Refresh re-rolls without
// immediately repeating the same set.
//
// All fonts are free Google Fonts. Innovative picks (Bricolage,
// Instrument Serif, Newsreader, Anton, Big Shoulders, Recursive, etc.)
// are mixed in alongside the dependable workhorses.

const bundle = (keywords, summary, fontPool, palettePool) => ({
  keywords,
  summary,
  fontPool,
  palettePool
})

const f = (role, family, style, sample, body, tag, blurb, googleParam) => ({
  role,
  family,
  style,
  sample,
  body,
  tag,
  blurb,
  googleParam
})

const p = (name, blurb, c60, c30, c10) => ({
  name,
  blurb,
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
      f('Display headlines', 'Fraunces', 'Serif · Variable', 'Almost.', 'Body text in Fraunces feels like it was set in 1910 by someone wearing gloves.', 'Editorial serif', "Has opinions. Knows you're watching.", 'Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400'),
      f('Display headlines', 'Instrument Serif', 'Serif · Italic', 'Quiet velvet.', 'Instrument Serif at display sizes has a stage-curtain energy. Use sparingly.', 'Editorial italic serif', 'Catwalk lighting in font form.', 'Instrument+Serif:ital@0;1'),
      f('Editorial subheads', 'Playfair Display', 'Serif', 'Quiet power.', 'Body text in Playfair — technically legible, spiritually gothic.', 'High-contrast serif', 'The font your editor uses when she means it.', 'Playfair+Display:ital,wght@0,400;0,700;1,400'),
      f('Display headlines', 'Bodoni Moda', 'Serif · High contrast', 'Almost.', 'Bodoni Moda with thin strokes — needs dark backgrounds and big sizes.', 'Didone serif', 'The fashion magazine cover, every fashion magazine cover.', 'Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,700;1,6..96,400'),
      f('Display headlines', 'Italiana', 'Serif', 'Couture.', 'One word, big, in italic-leaning roman. Whispers expensive.', 'Display serif', 'Thinks it lives in Milan.', 'Italiana'),
      f('Body', 'Inter', 'Sans-serif', 'Readable. Honest.', 'Inter is the default for a reason. It does not get in the way.', 'Neutral sans', "Doesn't want to be noticed. That's why it works.", 'Inter:wght@400;500;600;700'),
      f('Body', 'Newsreader', 'Serif', 'Long-form reading.', 'Newsreader is a serif for actually reading. Warm, inviting, optical sizing.', 'Reading serif', 'Editorially curious. Slightly bookish.', 'Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600'),
      f('Accents', 'Unica One', 'Display', 'ALMOST.', 'All caps only. Do not use this for body. Seriously.', 'Condensed display', 'For signage, not sentences.', 'Unica+One')
    ],
    [
      p('Oak & Smoke', 'Black tie, low lighting, no small talk.', { hex: '#0E0E10', name: 'Ink' }, { hex: '#2A2622', name: 'Espresso' }, { hex: '#C8A96A', name: 'Brass' }),
      p('Bone China', 'The beige that costs more than all the other beiges.', { hex: '#F4EFE6', name: 'Bone' }, { hex: '#8C7E6B', name: 'Driftwood' }, { hex: '#1A1916', name: 'Obsidian' }),
      p('Noir', 'All the blacks, plus one red for emphasis.', { hex: '#111111', name: 'Carbon' }, { hex: '#3A3A3A', name: 'Graphite' }, { hex: '#C0392B', name: 'Signal' }),
      p('Dusk', 'Unexpected. Midnight blue doing a black impression.', { hex: '#121622', name: 'Midnight' }, { hex: '#3A4058', name: 'Indigo Smoke' }, { hex: '#E8C07D', name: 'Candle' }),
      p('Velvet', 'Wine-dark depths and warm metal.', { hex: '#1A0F12', name: 'Mulled' }, { hex: '#3D1F2A', name: 'Bordeaux' }, { hex: '#D4A857', name: 'Old Gold' }),
      p('Marble', 'Cool stone with one decisive accent.', { hex: '#EFEAE2', name: 'Linen' }, { hex: '#7A6F65', name: 'Greige' }, { hex: '#1F2937', name: 'Pen' })
    ]
  ),
  bundle(
    ['playful', 'kids', 'children', 'fun', 'friendly', 'learning', 'school', 'bright'],
    'Friendly without being cringe. Hard to do. We did it.',
    [
      f('Display headlines', 'Fraunces', 'Serif · Variable', 'Hi there.', 'Fraunces for body works at warm, generous settings. Try 1.6 line-height.', 'Warm serif', 'Has eyebrows. Uses them.', 'Fraunces:opsz,wght@9..144,400;9..144,700'),
      f('Playful accents', 'Caprasimo', 'Display', 'Wheeeee.', 'One word at a time. Not for paragraphs.', 'Chunky display', "Looks like it's having a very good day.", 'Caprasimo'),
      f('Body', 'Nunito', 'Sans-serif', 'Soft and round.', 'Nunito is Inter in a hoodie. Softer shoulders, warmer mood, still legible at 16px.', 'Rounded sans', "Can't take it too seriously, and that's the point.", 'Nunito:wght@400;600;700'),
      f('Subheads', 'Baloo 2', 'Sans-serif', 'Bouncy.', 'Baloo 2 carries a lot of personality. Use it sparingly.', 'Rounded display sans', 'Says "learn" without saying "lesson".', 'Baloo+2:wght@400;600;700'),
      f('Display', 'Bricolage Grotesque', 'Sans-serif · Variable', 'Made by hand.', 'Bricolage Grotesque has the energy of a printed risograph. Variable opsz lets it scale beautifully.', 'Indie grotesque', 'Drew its own logo at 2am.', 'Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700'),
      f('Display', 'DynaPuff', 'Display · Variable', 'Yay!', "Inflatable letterforms. Best for cover headlines and merch.", 'Inflated display', "Looks like a balloon at a child's birthday.", 'DynaPuff:wght@500;600;700'),
      f('Body', 'Quicksand', 'Sans-serif', 'Round and clear.', 'Quicksand at 16px is the friendliest paragraph on the internet.', 'Geometric round sans', "The bubble letters that grew up.", 'Quicksand:wght@400;500;600;700')
    ],
    [
      p('Playground', 'Primary colours pretending to be grown up.', { hex: '#FFF9EF', name: 'Cream' }, { hex: '#FF6B6B', name: 'Tomato' }, { hex: '#2E86AB', name: 'Blue Jay' }),
      p('Recess', 'Sunny, loud, a little exhausting. Perfect.', { hex: '#FFE66D', name: 'Butter' }, { hex: '#FF8C42', name: 'Mango' }, { hex: '#06A77D', name: 'Mint' }),
      p('Bubblegum', 'The one that tastes pink.', { hex: '#FFF0F5', name: 'Cotton' }, { hex: '#FF85A1', name: 'Bubblegum' }, { hex: '#5E60CE', name: 'Grape' }),
      p('Storybook', 'Paper-soft, clearly a book, clearly a friend.', { hex: '#FDF6E3', name: 'Paper' }, { hex: '#B58863', name: 'Oak' }, { hex: '#D64933', name: 'Apple' }),
      p('Crayon Box', 'A little chaos, on purpose.', { hex: '#FFFAF0', name: 'Sketch' }, { hex: '#5C80BC', name: 'Sky Crayon' }, { hex: '#F4A261', name: 'Sun Crayon' }),
      p('Marker', 'Bright, blunt, joyful.', { hex: '#F8F1E5', name: 'Page' }, { hex: '#7A5FFF', name: 'Highlighter' }, { hex: '#FFD23F', name: 'Glow' })
    ]
  ),
  bundle(
    ['brutalist', 'tech', 'startup', 'raw', 'grid', 'bold', 'indie'],
    "Loud, on-grid, allergic to gradients. You won't get a stock logo out of this.",
    [
      f('Display headlines', 'Space Grotesk', 'Sans-serif', 'Ship it.', 'Space Grotesk at body size has a quiet weirdness. Trust it.', 'Geometric sans', "Didn't go to design school. Doesn't care.", 'Space+Grotesk:wght@400;500;700'),
      f('Editorial / quotes', 'IBM Plex Serif', 'Serif', 'Plain speech.', 'Plex is what you get when IBM hires designers who read books.', 'Plain serif', 'Reads like a whitepaper, looks like a zine.', 'IBM+Plex+Serif:wght@400;600'),
      f('Body', 'JetBrains Mono', 'Monospace', "'hello world'", 'Mono body is a statement. Make sure you meant to make it.', 'Monospace', 'You are not writing code. You just want to look like you do.', 'JetBrains+Mono:wght@400;500'),
      f('Accents', 'Archivo Black', 'Display', 'LABEL.', 'Uppercase short phrases only.', 'Heavy sans', 'Signs and stamps. Shouting a single word.', 'Archivo+Black'),
      f('Display headlines', 'Bricolage Grotesque', 'Sans · Variable', 'Build it.', 'Bricolage has the rough confidence of a homemade type — perfect for a small label that wants to look bigger.', 'Indie grotesque', 'Hand-cut shapes, mathematical mind.', 'Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800'),
      f('Display', 'Anton', 'Sans-serif', 'NOTICE.', 'Anton is a vertical brick. Use for big headlines on small screens.', 'Condensed display', "Stands six-foot-five in font form.", 'Anton'),
      f('Display', 'Big Shoulders Display', 'Sans · Variable', 'Built local.', 'Big Shoulders is from the Chicago Design Archive. Industrial, square, proud.', 'Industrial display', 'Has callouses.', 'Big+Shoulders+Display:wght@400;600;700;900'),
      f('Body / mono', 'Departure Mono', 'Pixel monospace', 'COMPILED.OK', 'Departure Mono is a CRT-era pixel font. Feels like firmware. Limited weights.', 'Pixel mono', 'Dropped out of art school to make games.', 'JetBrains+Mono:wght@400;500')
    ],
    [
      p('Concrete', 'Grey, louder grey, one colour.', { hex: '#EDEDED', name: 'Bone' }, { hex: '#1A1A1A', name: 'Ink' }, { hex: '#FE5F55', name: 'Signal' }),
      p('Yellow Tape', 'Do not cross.', { hex: '#FFFFFF', name: 'Paper' }, { hex: '#0A0A0A', name: 'Black' }, { hex: '#FFD400', name: 'Hazard' }),
      p('Riso', 'The photocopier in your friend’s studio.', { hex: '#F7F4EC', name: 'Off-white' }, { hex: '#2D3047', name: 'Midnight' }, { hex: '#FF4365', name: 'Fluoro' }),
      p('Terminal', 'Phosphor on a CRT.', { hex: '#0A0F0D', name: 'Scope' }, { hex: '#1F2A24', name: 'Board' }, { hex: '#39FF14', name: 'Phosphor' }),
      p('Blueprint', 'Paper grid, blue ink, one warning.', { hex: '#F4F1E8', name: 'Vellum' }, { hex: '#1B3A5C', name: 'Drafting Blue' }, { hex: '#E94F37', name: 'Stop' }),
      p('Cargo', 'Industrial yard at sunrise.', { hex: '#1B1A17', name: 'Tar' }, { hex: '#3F3A36', name: 'Steel' }, { hex: '#FFB600', name: 'High-vis' })
    ]
  ),
  bundle(
    ['wellness', 'calm', 'organic', 'skincare', 'soft', 'natural', 'earthy', 'beige'],
    'Beige with intentions. Nothing loud survives contact with your bathroom.',
    [
      f('Display headlines', 'Fraunces', 'Serif · Variable', 'Slow down.', 'Fraunces at 1.7 leading on a muted background is the whole aesthetic.', 'Humanist serif', 'Knows what an ingredient is.', 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,700'),
      f('Alt display', 'Cormorant Garamond', 'Serif', 'Rituals.', 'Cormorant is thinner than you think. Pair with heavier body type.', 'Thin serif', 'Claims to be French. Is Korean.', 'Cormorant+Garamond:wght@300;400;500;700'),
      f('Body', 'Work Sans', 'Sans-serif', 'Simple and calm.', 'Work Sans is a gentle geometric. It doesn’t yell. It doesn’t try.', 'Neutral sans', 'Wears linen and means it.', 'Work+Sans:wght@300;400;500;600'),
      f('Label type', 'Syne', 'Sans-serif', 'Fine Object', 'For pricing pages and product names. Small doses.', 'Weird sans', 'Unexpected curves. You’ll pay more for it.', 'Syne:wght@400;500;700'),
      f('Display headlines', 'Instrument Serif', 'Serif · Italic', 'Soften.', 'Instrument Serif italic at 48px on cream is a whole brand.', 'Editorial italic serif', 'Gentle authority.', 'Instrument+Serif:ital@0;1'),
      f('Body', 'Lora', 'Serif', 'Quiet warmth.', 'Lora reads beautifully at 16–18px. A serif body that doesn’t feel old.', 'Reading serif', 'Bookish but unfussy.', 'Lora:ital,wght@0,400;0,500;0,600;1,400'),
      f('Display', 'Nourd', 'Sans-serif', 'Rest.', 'Hanken Grotesk in disguise — honest, soft, modern. (Loaded as Hanken Grotesk.)', 'Soft sans', 'Doesn’t need to prove anything.', 'Hanken+Grotesk:wght@300;400;500;600'),
      f('Body', 'EB Garamond', 'Serif', 'Considered.', 'EB Garamond is a free, restored Garamond. Quiet, classical, generous.', 'Old-style serif', 'Has read all the books.', 'EB+Garamond:wght@400;500;600')
    ],
    [
      p('Linen', 'Beige, off-beige, one warm accent.', { hex: '#F5F0E8', name: 'Oat' }, { hex: '#D9CBB8', name: 'Driftwood' }, { hex: '#A47148', name: 'Clay' }),
      p('Sage Bath', 'Green that agrees with itself.', { hex: '#F1EFE7', name: 'Chalk' }, { hex: '#AEB5A3', name: 'Sage' }, { hex: '#3D4B3A', name: 'Moss' }),
      p('Rose Water', 'Blush without the wink.', { hex: '#FAF1EC', name: 'Shell' }, { hex: '#E2B6A7', name: 'Rose' }, { hex: '#5C3A3A', name: 'Wine' }),
      p('Dune', 'Desert light, twelve minutes before sunset.', { hex: '#EFE4D2', name: 'Sand' }, { hex: '#B8946B', name: 'Dune' }, { hex: '#5E3C23', name: 'Umber' }),
      p('Eucalyptus', 'Bath salts and morning fog.', { hex: '#F0F2EC', name: 'Mist' }, { hex: '#93B0A6', name: 'Eucalyptus' }, { hex: '#2F4F4A', name: 'Spruce' }),
      p('Terracotta', 'Sun-warmed clay.', { hex: '#F7EDE2', name: 'Bisque' }, { hex: '#E29578', name: 'Terracotta' }, { hex: '#3D2C2E', name: 'Cocoa' })
    ]
  ),
  bundle(
    ['retro', 'vintage', '70s', 'warm', 'funk', 'disco', 'groovy'],
    "Seventies palette, sixties shapes, eighties confidence. It's a lot.",
    [
      f('Display', 'Bagel Fat One', 'Display', 'GROOVY', 'Use for one word, max. Otherwise it becomes a traffic sign.', 'Retro display', "Doesn't take phone calls before noon.", 'Bagel+Fat+One'),
      f('Headlines', 'DM Serif Display', 'Serif', 'Classic Hour.', 'A display serif with a flared elegance. Pair with a simple body.', 'Modern serif', 'Attended the opening.', 'DM+Serif+Display:ital@0;1'),
      f('Body', 'DM Sans', 'Sans-serif', 'Quiet body.', 'DM Sans is the responsible sibling. Everyone else gets to be weird.', 'Neutral sans', 'Owns a calendar.', 'DM+Sans:wght@400;500;700'),
      f('Script accents', 'Cookie', 'Handwriting', 'Cheers!', "Script fonts live and die by size.", 'Script', 'Says "hi" in pen on a paper napkin.', 'Cookie'),
      f('Display', 'Yeseva One', 'Serif Display', 'Velvet.', 'Yeseva One has high contrast and a friendly curl. Reads as warm-vintage.', 'Disco serif', 'Velvet rope, but you’re on the list.', 'Yeseva+One'),
      f('Display', 'Monoton', 'Display', 'NEON', 'Monoton is a striped, marquee-style display. One word, big, lit.', 'Marquee display', 'Las Vegas, 1972.', 'Monoton'),
      f('Display', 'Bungee', 'Display', 'BOUNCE', 'Bungee is built for vertical signage and chunky banners.', 'Sign display', 'Drawn for street signs that wanted personality.', 'Bungee')
    ],
    [
      p('Sunset 77', 'Orange, rust, cream. The carpet of your parents’ first apartment.', { hex: '#FFF1DE', name: 'Cream' }, { hex: '#E07A5F', name: 'Rust' }, { hex: '#3D405B', name: 'Denim' }),
      p('Wood Panel', 'Brown is a colour and this proves it.', { hex: '#F5E9D3', name: 'Parchment' }, { hex: '#8B5A2B', name: 'Walnut' }, { hex: '#F2A541', name: 'Amber' }),
      p('Avocado', 'Seventies kitchen tile.', { hex: '#F3EFD9', name: 'Eggshell' }, { hex: '#7A8B5A', name: 'Avocado' }, { hex: '#D16666', name: 'Brick' }),
      p('Disco', 'Cosmic purple, sugar pink, one glint of gold.', { hex: '#2E1A47', name: 'Amethyst' }, { hex: '#E36588', name: 'Bubblegum' }, { hex: '#F5D65A', name: 'Gold' }),
      p('Polaroid', 'Faded film, sun-bleached corners.', { hex: '#F2EBDD', name: 'Faded' }, { hex: '#C49A6C', name: 'Sepia' }, { hex: '#A23E2A', name: 'Brick Sun' }),
      p('Lava Lamp', 'Glow without the haze.', { hex: '#FFF3E0', name: 'Apricot' }, { hex: '#F77F00', name: 'Lava' }, { hex: '#003049', name: 'Deep Sea' })
    ]
  ),
  bundle(
    ['fintech', 'finance', 'banking', 'serious', 'professional', 'b2b', 'saas', 'corporate'],
    "Trustworthy. Not dull. There's a difference. Most of your competitors missed it.",
    [
      f('Display', 'Inter', 'Sans-serif', 'Invest.', 'Inter scales. Use it for display at 64px+ with tight tracking.', 'Neutral sans', 'The default. Used well.', 'Inter:wght@400;500;600;700'),
      f('Editorial', 'IBM Plex Serif', 'Serif', 'Annual Report', 'Plex Serif for emphasis paragraphs or pull quotes. Not the whole body.', 'Technical serif', 'Designed by IBM, which explains a lot.', 'IBM+Plex+Serif:wght@400;500;600'),
      f('Body', 'Inter', 'Sans-serif', 'Clear numbers and careful prose.', 'Inter at 16px with tabular-nums enabled. Numbers line up. CFOs notice.', 'Neutral sans', 'Tabular numerals for days.', 'Inter:wght@400;500;600'),
      f('Data', 'JetBrains Mono', 'Monospace', '1,284,902.00', 'Monospace only for numbers, not paragraphs.', 'Monospace', 'For the column where precision matters.', 'JetBrains+Mono:wght@400;500'),
      f('Display', 'Manrope', 'Sans-serif · Variable', 'Compounding.', 'Manrope is a clean geometric sans with humanist quirks. Modern fintech default.', 'Geometric sans', "Wears a fleece vest. Means it.", 'Manrope:wght@400;500;600;700'),
      f('Display', 'Albert Sans', 'Sans-serif · Variable', 'Index.', 'Albert Sans is wide and quiet. Reads as institutional without being stuffy.', 'Wide sans', 'Has ergonomic shoes.', 'Albert+Sans:wght@400;500;600;700'),
      f('Editorial', 'Newsreader', 'Serif · Variable', 'Issue 04.', 'Newsreader for thought-leadership posts. Reads as prestige media.', 'Reading serif', 'Bookish CFO.', 'Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600')
    ],
    [
      p('Blue Chip', 'Navy and white. The universal uniform of trust.', { hex: '#FFFFFF', name: 'Paper' }, { hex: '#0A2540', name: 'Navy' }, { hex: '#635BFF', name: 'Electric' }),
      p('Treasury', 'Dark, green, credible. A central bank in a hoodie.', { hex: '#0F1A14', name: 'Forest Ink' }, { hex: '#1E3A2F', name: 'Pine' }, { hex: '#C8A96A', name: 'Brass' }),
      p('Ledger', 'Off-white, slate, one warm accent.', { hex: '#F7F5F0', name: 'Paper' }, { hex: '#2F3E46', name: 'Slate' }, { hex: '#E76F51', name: 'Clay' }),
      p('Obsidian', 'Dark mode that means business.', { hex: '#0B0F14', name: 'Obsidian' }, { hex: '#1B2330', name: 'Shadow' }, { hex: '#3DCCC7', name: 'Current' }),
      p('Memo', 'Manila folder modernised.', { hex: '#F4EDDB', name: 'Manila' }, { hex: '#2C3E50', name: 'Pen' }, { hex: '#C44536', name: 'Stamp' }),
      p('Index', 'Cool grey with one quiet teal.', { hex: '#F2F4F7', name: 'Page' }, { hex: '#475467', name: 'Slate' }, { hex: '#0E9594', name: 'Quiet Teal' })
    ]
  ),
  bundle(
    ['cyber', 'neon', 'gaming', 'esports', 'future', 'synthwave', 'dark'],
    "Dark mode, but with something to prove. Don't overdo the neon. Actually, do.",
    [
      f('Display', 'Orbitron', 'Display', 'LAUNCH', 'Geometric, wide, slightly alien. One-word glory only.', 'Futurist display', 'Stares at you from across the arcade.', 'Orbitron:wght@500;700;900'),
      f('Subheads', 'Chakra Petch', 'Sans-serif', 'Latency: low.', 'Tech sans with flair. Works at small sizes and large.', 'Tech sans', 'Looks like a HUD element. Is one now.', 'Chakra+Petch:wght@400;500;700'),
      f('Body', 'Rajdhani', 'Sans-serif', 'Ready player one.', 'Rajdhani reads well in body sizes and has that condensed stadium feel.', 'Condensed sans', 'Always a little in a hurry.', 'Rajdhani:wght@400;500;600;700'),
      f('Data', 'JetBrains Mono', 'Monospace', '> ready', 'Use for stats, timers, anything with numbers.', 'Monospace', 'Terminal-ready.', 'JetBrains+Mono:wght@400;500'),
      f('Display', 'Audiowide', 'Display', 'OVERDRIVE', 'Audiowide is built for arcade marquees and racing games.', 'Arcade display', 'Eats coins.', 'Audiowide'),
      f('Display', 'Black Ops One', 'Display', 'MISSION', 'Black Ops One is military stencil meets HUD.', 'Stencil display', 'Brought a sidearm.', 'Black+Ops+One'),
      f('Body / display', 'Sora', 'Sans-serif · Variable', 'Coordinates.', 'Sora is a clean sci-fi sans. Wide enough to feel cinematic at headline sizes.', 'Sci-fi sans', 'Designed by an indie game studio.', 'Sora:wght@400;500;600;700')
    ],
    [
      p('Neon Alley', 'Dark grey, electric pink, one cyan hit.', { hex: '#0A0A12', name: 'Void' }, { hex: '#1D1D2B', name: 'Shadow' }, { hex: '#FF2A6D', name: 'Signal Pink' }),
      p('Synthwave', 'Magenta, purple, sunset horizon.', { hex: '#150A2B', name: 'Midnight' }, { hex: '#5D0E90', name: 'Dusk' }, { hex: '#00F0FF', name: 'Laser' }),
      p('Forge', 'Metal and fire.', { hex: '#16181D', name: 'Iron' }, { hex: '#2C2F36', name: 'Steel' }, { hex: '#FF6B00', name: 'Flame' }),
      p('Terminal', 'The phosphor CRT look, done properly.', { hex: '#001014', name: 'Deep' }, { hex: '#002B36', name: 'Board' }, { hex: '#39FF14', name: 'Phosphor' }),
      p('Vapor', 'Cotton candy on a CRT.', { hex: '#1E0936', name: 'Deep Plum' }, { hex: '#2C1E5F', name: 'Indigo' }, { hex: '#FF77E9', name: 'Vapor' }),
      p('Cobalt Strike', 'Tactical and tasteful.', { hex: '#0A0E14', name: 'Op Black' }, { hex: '#1D2B3A', name: 'Cobalt' }, { hex: '#FFD23F', name: 'Tracer' })
    ]
  ),
  bundle(
    ['art', 'gallery', 'museum', 'curator', 'exhibition', 'design', 'portfolio'],
    "Quiet wall labels. Loud work. The type stays out of the way until it doesn't.",
    [
      f('Display headlines', 'Italiana', 'Serif', 'Curated.', 'Italiana for big titles, set centred, with generous whitespace.', 'Display serif', 'A wall label at a Frieze booth.', 'Italiana'),
      f('Display headlines', 'Instrument Serif', 'Serif · Italic', 'On view through April.', 'Instrument Serif italic for exhibition titles. Period.', 'Editorial italic', 'Catalog cover energy.', 'Instrument+Serif:ital@0;1'),
      f('Display', 'Big Shoulders Stencil Display', 'Stencil display', 'CONCRETE', 'A stencil display from the Chicago Design Archive.', 'Stencil display', 'Cuts through walls.', 'Big+Shoulders+Stencil+Display:wght@400;700;900'),
      f('Body', 'Albert Sans', 'Sans · Variable', 'Wall text.', 'Albert Sans for the small, reverent paragraph beside the work.', 'Wide sans', 'Speaks softly.', 'Albert+Sans:wght@400;500;600'),
      f('Body', 'EB Garamond', 'Serif', 'Considered.', 'EB Garamond for catalogue essays.', 'Old-style serif', 'Has a footnote.', 'EB+Garamond:wght@400;500;600'),
      f('Display', 'Bricolage Grotesque', 'Sans · Variable', 'Bricolage.', 'Bricolage Grotesque looks at home in a modern art catalogue.', 'Indie grotesque', 'Knows what bricolage means. Makes some.', 'Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700'),
      f('Display', 'Hedvig Letters Serif', 'Serif', 'Hedvig.', 'Hedvig Letters Serif has handmade warmth.', 'Hand-finished serif', 'Drawn with a chisel-tip pen on Tuesday.', 'Hedvig+Letters+Serif')
    ],
    [
      p('Gallery White', 'Pure white, ink, one accent for the artwork to play against.', { hex: '#FFFFFF', name: 'Wall' }, { hex: '#0E0E10', name: 'Ink' }, { hex: '#FF5B3A', name: 'Signal' }),
      p('Concrete Floor', 'Industrial grey with a single warm hit.', { hex: '#E8E5E0', name: 'Concrete' }, { hex: '#3D3B36', name: 'Iron' }, { hex: '#D4651E', name: 'Burnt Orange' }),
      p('Soft Plinth', 'Bone and chalk and one quiet plum.', { hex: '#F4F0E8', name: 'Bone' }, { hex: '#A19A8E', name: 'Stone' }, { hex: '#5C2C4F', name: 'Plum' }),
      p('Warm Catalog', 'Cream paper, warm grey type, one earth.', { hex: '#FAF4E6', name: 'Cream' }, { hex: '#5A4A3A', name: 'Walnut' }, { hex: '#0E5A56', name: 'Pine' })
    ]
  ),
  bundle(
    ['creative', 'agency', 'experimental', 'expressive', 'innovative', 'design system'],
    'Distinct without being chaotic. Pick the experiment, give it room.',
    [
      f('Display headlines', 'Bricolage Grotesque', 'Sans · Variable', 'Made local.', 'Bricolage Grotesque is the contemporary indie type pick. Reads warm at any size.', 'Indie grotesque', 'Hand-feel, machine-perfect.', 'Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700'),
      f('Display headlines', 'Instrument Serif', 'Serif · Italic', 'Considered.', 'Instrument Serif italic at 56px is a brand by itself.', 'Editorial italic', 'Quietly expensive.', 'Instrument+Serif:ital@0;1'),
      f('Display', 'Anton', 'Sans-serif', 'POSTER', 'Anton compresses everything you say into a single confident column.', 'Condensed display', 'Six-foot-five poster type.', 'Anton'),
      f('Body', 'Hanken Grotesk', 'Sans · Variable', 'Reads cleanly.', 'Hanken Grotesk is the new neutral. Reads warmer than Inter, friendlier than Helvetica.', 'Modern sans', 'Has a personality you have to look twice for.', 'Hanken+Grotesk:wght@300;400;500;600;700'),
      f('Display', 'Climate Crisis', 'Variable display', '2050.', 'Climate Crisis has a single variable axis: year. Letters thin out as the planet warms. Loud, conceptual.', 'Concept display', 'Type with a thesis.', 'Climate+Crisis'),
      f('Body / mono', 'Geist Mono', 'Mono', 'system.run()', 'Geist Mono is the Vercel mono — clean, modern, just enough character. (Loaded as JetBrains Mono fallback in this preview.)', 'Modern mono', 'Designed for code that ships.', 'JetBrains+Mono:wght@400;500'),
      f('Display', 'Funnel Display', 'Sans Display · Variable', 'Funnel.', 'Funnel Display is a modern stylised display sans with confident geometric forms.', 'Display sans', 'Designed for the brand reveal.', 'Funnel+Display:wght@400;500;700;900')
    ],
    [
      p('Studio', 'Concrete-cool, paper-bright, one signal red.', { hex: '#F5F4F0', name: 'Studio Paper' }, { hex: '#1F1F1F', name: 'Studio Ink' }, { hex: '#FF5B3A', name: 'Signal' }),
      p('Process', 'Cyan, magenta, key. Print room standard.', { hex: '#FFFFFF', name: 'Page' }, { hex: '#000000', name: 'Key' }, { hex: '#00B0FF', name: 'Cyan' }),
      p('Workshop', 'Warm wood, soft paper, one green sticker.', { hex: '#F2EAD9', name: 'Birch' }, { hex: '#8C5E3C', name: 'Walnut' }, { hex: '#3FA34D', name: 'Sticker Green' }),
      p('Lab', 'Off-white, deep navy, one chartreuse.', { hex: '#F1F2F4', name: 'Lab Coat' }, { hex: '#0E1B33', name: 'Lab Ink' }, { hex: '#D4FF4F', name: 'Chartreuse' }),
      p('Quiet Bold', 'Three calm tones, one shock pink.', { hex: '#EFEAE0', name: 'Bisque' }, { hex: '#2A2D34', name: 'Stone Ink' }, { hex: '#FF3DBA', name: 'Shock' })
    ]
  ),
  bundle(
    ['DEFAULT', 'minimal', 'clean', 'modern'],
    "The safe choice. Not boring. Just clear. Sometimes that's exactly what you need.",
    [
      f('Display', 'Fraunces', 'Serif · Variable', 'Hello.', 'Fraunces at 64px+ is a headline that has opinions.', 'Variable serif', 'Has a voice. Doesn’t overuse it.', 'Fraunces:opsz,wght@9..144,400;9..144,700'),
      f('Alt display', 'Space Grotesk', 'Sans-serif', 'Good type.', 'Geometric but warm. Works at every size.', 'Geometric sans', 'Wears the same t-shirt every day. On purpose.', 'Space+Grotesk:wght@400;500;700'),
      f('Body', 'Inter', 'Sans-serif', 'Works every single time.', 'Inter at 16–18px, line-height 1.6, is the best body type decision you will make today.', 'Neutral sans', 'The quiet workhorse.', 'Inter:wght@400;500;600;700'),
      f('Mono', 'JetBrains Mono', 'Monospace', 'const kerning = true', 'For code and tabular data. Nothing else.', 'Monospace', 'Pretends to be Swiss. Isn’t.', 'JetBrains+Mono:wght@400;500'),
      f('Display', 'Bricolage Grotesque', 'Sans · Variable', 'Default+', 'Bricolage as your headline gives the default look a small but unmistakeable signature.', 'Indie grotesque', 'Same outfit, different shoes.', 'Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700'),
      f('Body', 'Hanken Grotesk', 'Sans · Variable', 'Comfortable to read.', 'Hanken Grotesk is the friendlier Inter. Reads warmer at body sizes.', 'Modern sans', 'New default candidate.', 'Hanken+Grotesk:wght@400;500;600'),
      f('Body', 'Newsreader', 'Serif · Variable', 'Long form.', 'Newsreader for blog posts and long body — adapts to opsz.', 'Reading serif', 'Bookish, friendly, not stuffy.', 'Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600')
    ],
    [
      p('Paper', 'Off-white, ink, one accent. Classic is classic.', { hex: '#FAF7F2', name: 'Paper' }, { hex: '#0E0E10', name: 'Ink' }, { hex: '#FF5B3A', name: 'Signal' }),
      p('Atelier', 'Cool grey and warm cream.', { hex: '#F2F2EF', name: 'Bone' }, { hex: '#343A40', name: 'Slate' }, { hex: '#6C9A8B', name: 'Celadon' }),
      p('Dusk', 'Dark mode with warmth.', { hex: '#121417', name: 'Ink' }, { hex: '#1E2126', name: 'Shadow' }, { hex: '#F2B134', name: 'Amber' }),
      p('Cobalt', 'Blue, cream, and intent.', { hex: '#F4F2EC', name: 'Cream' }, { hex: '#13335C', name: 'Cobalt' }, { hex: '#E87722', name: 'Orange' }),
      p('Mint Office', 'Almost-white walls, one very small mint.', { hex: '#F6F8F5', name: 'Snow' }, { hex: '#384B47', name: 'Pine Ink' }, { hex: '#5DD39E', name: 'Mint' }),
      p('Postcard', 'Sun-faded paper and a postage red.', { hex: '#F8F2E2', name: 'Postcard' }, { hex: '#1B262C', name: 'Postal Ink' }, { hex: '#BC4749', name: 'Stamp Red' })
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
  'art gallery',
  'creative agency',
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

// Pick N items from a pool with light "no immediate repeat" memory.
// `excludeKeys` is a Set of keys (strings) to deprioritise.
// `keyOf` extracts a comparable key from each item.
export function pickN(pool, n, excludeKeys = new Set(), keyOf = (x) => x.family || x.name) {
  if (!pool || pool.length === 0) return []
  const fresh = pool.filter((x) => !excludeKeys.has(keyOf(x)))
  const source = fresh.length >= n ? fresh : pool
  // Fisher-Yates shuffle, then take n
  const copy = [...source]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, Math.min(n, copy.length))
}
