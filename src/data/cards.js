// Seed swipe cards. Tone spec (from PRD §7.3): warm, dry, a little roasty.
// Card shape matches PRD §4.2.1 exactly.

let _id = 0
const card = (tag, title, body, tip, readMore) => ({
  id: `seed-${++_id}`,
  tag,
  title,
  body,
  tip,
  readMore
})

export const seedCards = [
  card(
    'Kerning',
    'Kerning is the space between a pair of letters, not all of them.',
    "Tracking spreads the whole word. Kerning fixes the specific gap where 'A' and 'V' are pretending they don't know each other. Most logos fail on one pair.",
    'Zoom in at 400%. Fix two pairs. Move on.',
    "Kerning is pairwise. Tracking is global. You adjust kerning in display sizes (logos, posters, headlines) where a loose pair is visible as a hole in the word. At body text sizes, the browser's defaults are good enough — fussing with kerning in paragraphs is a way to feel productive without being productive."
  ),
  card(
    'Leading',
    'Your line height is probably too tight.',
    "Most body text wants 1.4 to 1.6. Designers default to 1.2 because it looks 'designery' and then wonder why the paragraph feels claustrophobic. It is. The letters need room to breathe.",
    'Try 1.5× the font size. Adjust down, never up.',
    "Leading (line-height) is measured from baseline to baseline. A good starting rule: longer line length = more leading. Short line (≤40 chars): 1.3 is fine. Long line (60–75 chars): 1.5–1.7. Display type can go tighter because the eye tracks big shapes more easily than small ones."
  ),
  card(
    'Hierarchy',
    'If everything is important, nothing is.',
    "Three levels is the sweet spot. Display, body, caption. Bold every third word and you have built a ransom note. Decide what matters most, make that loudest, make everything else quieter.",
    'Cut one level of emphasis. The page gets louder.',
    "Visual hierarchy is about contrast in size, weight, colour, and space — not just font choice. A 48px headline paired with 16px body text has a 3× ratio. Anything less than 1.5× reads as 'almost the same'. If you want to whisper something, use a smaller size AND lighter weight AND lower contrast colour."
  ),
  card(
    'Pairing',
    'Two fonts is a pairing. Three is a typo.',
    "Pick a workhorse for body (Inter, Source Sans, IBM Plex) and a character font for display (Fraunces, Playfair, Space Grotesk). Done. Your deck doesn't need a third voice.",
    'One display, one body. Resist the third.',
    "The reason pairings fail: both fonts compete for attention. Good pairings have contrast in one dimension (serif vs sans, geometric vs humanist) and agreement in another (x-height, stroke contrast). Super-family pairings (e.g., Source Sans + Source Serif) cheat by sharing DNA."
  ),
  card(
    'Contrast',
    'Grey text on white is not minimal. It is unreadable.',
    "#999 on white fails WCAG AA. Half the internet is doing it because it 'looks clean'. It looks clean because you can't read it. Your body text wants at least 4.5:1 contrast.",
    'Use #333 or darker on white. #666 is the absolute floor.',
    "WCAG AA requires 4.5:1 for body text, 3:1 for large text (18pt+). Tools like whocanuse.com tell you what fails and for whom. Low contrast isn't a style choice; it's a decision to exclude anyone with less-than-perfect eyes. Which will be you, in about fifteen years."
  ),
  card(
    'Measure',
    'Your line length is a reading experience, not a layout choice.',
    "45 to 75 characters per line. Beyond that, the eye loses its place returning to the left margin. Your 1200px-wide blog post is technically legible and emotionally exhausting.",
    'Aim for ~65 characters. max-width around 36em.',
    "'Measure' is the typographic term for line length. Too short: the eye ping-pongs and loses rhythm. Too long: returning to the next line is a guessing game. 65 characters is the long-accepted sweet spot. On mobile, this happens naturally. On desktop, it requires discipline."
  ),
  card(
    'All Caps',
    'All caps is shouting, and shouting has no rhythm.',
    "Capital letters are all the same height. You lose the ascenders and descenders that help the eye recognise word shapes. Use caps for single words, short labels, or moments — never paragraphs.",
    'Add 5–10% letter-spacing on caps. They need room.',
    "Lowercase letters have x-heights, ascenders (h, k, l), and descenders (p, q, y) that create a distinctive silhouette for each word. All caps strips this out and forces the reader to process each letter individually. It's slower by about 10–15%. Fine for a logo. Cruel for a paragraph."
  ),
  card(
    'Widows',
    'A single word on its own line is called a widow. Fix it.',
    "When a paragraph ends with one lonely word, it breaks the rhythm of the page. Tighten the tracking of the line above, or reword the sentence. Both are easier than pretending it looks fine.",
    'Negative tracking on the penultimate line usually fixes it.',
    "Widows are the single words stranded at the end of a paragraph. Orphans are single lines stranded at the top of a new page/column. Both are typographic cringe. Print designers agonise over them; the web lets you ignore them, which is exactly why the web often looks worse than print."
  ),
  card(
    'Vertical Rhythm',
    'Your spacing should feel like a beat, not a guess.',
    "Pick a base unit (usually 8px) and multiply. Margins, padding, gaps all land on the grid. Your design will feel like it was composed, not assembled. Because it was.",
    'Use 8, 16, 24, 32, 48, 64. Never 17.',
    "A consistent spacing scale is the single cheapest way to make a design look intentional. 8px base is common; 4px is tighter; 10px feels looser but breaks at retina edges. The scale should be geometric (doubling) or Fibonacci-like, not linear — the eye reads the rhythm as natural."
  ),
  card(
    'Font Size',
    '14px body text is a cry for help.',
    "16px is the minimum. 18px is where most reading-focused sites live now. Your 14px 'clean, minimal' body text is a text message written for ants. The ants are struggling.",
    '16px minimum on body. 18px on long-form. Never 14px.',
    "16px is the browser default for a reason — it approximates the size of text in a book held at normal reading distance. Reducing it saves pixels you don't need to save. Medium, Substack, and the New York Times all use 18–20px for a reason. Their eyes also aged."
  ),
  card(
    'Italics',
    'Italics emphasise. They do not decorate.',
    "An italicised paragraph is a design choice that tells the reader 'this entire section is an aside.' If you italicise for vibes, you're spending emphasis you can't get back.",
    'Use italics for titles, species names, thoughts — not decoration.',
    "True italics are a different cut of the typeface (sloped, often with different letterforms) — not just the regular tilted. Oblique versions exist and are usually fine, but true italics (found in most serif fonts) carry more voice. Save them for where voice helps."
  ),
  card(
    'White Space',
    'White space is not emptiness. It is tension.',
    "Space around an element says 'look at this.' Space between elements says 'these belong together.' Uniform spacing says nothing. Your design needs to tell the reader where to look — let the gaps do the work.",
    'Double the margin on what matters most.',
    "The principle is called 'proximity' — items placed close together are read as related; items with space between them are read as separate. This is why your pricing page needs more space around the recommended tier. The space is the hierarchy."
  ),
  card(
    'Alignment',
    'Left-align body text. Centred body text is a choice, and usually the wrong one.',
    "Centred text gives the eye no consistent starting point. Each line begins in a new place. For poetry: fine. For a product description: punishing. Left-align unless you have a reason.",
    'Left for paragraphs. Centre for single lines and ceremony.',
    "Justified text (both edges aligned) was the default in print for centuries but requires hyphenation to avoid ugly 'rivers' of white space. On the web, justified body text without hyphenation looks broken. Left-aligned with a ragged right is the safe, readable default."
  ),
  card(
    'Numerals',
    'Your numbers probably should be tabular.',
    "Lining numerals (all the same width) are great in tables and data. Old-style numerals (varying heights, like letters) belong in body text. Most fonts have both — you just have to ask for them.",
    'Use font-variant-numeric: tabular-nums on tables.',
    "Proportional numerals are the default (each has its own width, like letters). Tabular numerals are monospaced so columns align. Old-style (text) numerals have ascenders and descenders so they look like letters in running text. High-quality fonts give you all three; cheap ones give you one and hope."
  ),
  card(
    'Fallbacks',
    'Your font might not load. Style the fallback too.',
    "If the first font in your stack is a web font and it takes 800ms to arrive, the user reads the fallback. Fallback looks nothing like your font? They read garbage for a second. Match the metrics.",
    'Use the CSS size-adjust descriptor to match fallback x-heights.',
    "Modern font-stack best practice: a locally-available fallback with similar metrics (x-height, width) to your web font, using @font-face size-adjust and ascent-override to minimise layout shift when the web font loads. Look up 'fontfallbacks.com' for generated matches."
  ),
  card(
    'Punctuation',
    'Smart quotes are not a preference. They are correct.',
    "\"Straight quotes\" are typewriter artefacts. \u201CSmart quotes\u201D are real quotation marks. Apostrophes are \u2019 not '. If your design tool uses straight quotes by default, it\u2019s wrong and you should override it.",
    'Enable "smart quotes" in every text tool you use.',
    "Straight quotes (\" and ') existed to save keys on typewriters. They're ambiguous — the opening and closing quote look identical. Smart quotes (\u201C\u201D and \u2018\u2019) are unambiguous, correct, and how all books are typeset. Using them in your marketing copy is a one-second decision that makes the whole thing look professional."
  ),
  card(
    'Dashes',
    'There are three. Learn them. Use them.',
    "Hyphen (-) joins words. En dash (\u2013) spans ranges: 3\u20135pm. Em dash (\u2014) marks asides \u2014 like this. Most writing uses hyphens for all three. All three are free; you just have to type them.",
    'Em dash: Option+Shift+-. En dash: Option+-. Look smarter.',
    "Typographic precision: hyphen for compound words (well-known), en dash for numeric ranges and open compounds (New York\u2013based, 2023\u20132025), em dash for parenthetical thoughts \u2014 like this one. Some publications use spaced en dashes instead of em dashes; both are defensible. Using a hyphen for all three is not."
  ),
  card(
    'Ligatures',
    "Your 'ff' and 'fi' are fighting. Ligatures stop the fight.",
    "Some letter pairs (fi, fl, ff, ffi) collide at their terminals when set next to each other. Ligatures merge them into one glyph that avoids the collision. Most modern fonts have them. Most designers forget to turn them on.",
    'Add font-feature-settings: "liga" 1 to your body CSS.',
    "Standard ligatures are on by default in most browsers for most fonts \u2014 but some setups disable them, and discretionary ligatures (\u2018st\u2019, \u2018ct\u2019) usually require explicit opt-in. Ligatures are most noticeable in serif fonts at display sizes. If you don\u2019t see them in your logotype, your font might be shipping a crippled feature set."
  ),
  card(
    'Width',
    'Condensed fonts exist. Use them when space is tight, not for vibes.',
    "A condensed typeface is a tool — narrower letterforms to fit more per line. Condensed for its own sake reads as 'I am trying very hard to look editorial.' You can tell.",
    'Condensed for posters and navs. Not for body text.',
    "Condensed and extended widths are solving specific problems. Condensed: dense information environments (newspapers, data-heavy nav). Extended: display and branding where a word needs to occupy horizontal space for presence. Using extended for body text is painful; using condensed for body text is illegal in some countries."
  ),
  card(
    'Colour',
    'Pure black is rarely right.',
    "#000 on #FFF has the highest contrast possible — which is why it looks harsh on a bright screen at night. Off-black (#111, #1a1a1a) is softer on the eye and still plenty readable. Your users' retinas thank you.",
    'Try #111 on #FAFAFA. Same contrast, less glare.',
    "The reason pure-black-on-pure-white feels harsh is edge contrast: the extreme transition creates chromatic aberration on some displays and real discomfort on OLED screens at full brightness. Most polished products use a slight off-black (Apple uses #1d1d1f). It reads as 'considered' without registering as 'different'."
  ),
  card(
    'Readability',
    'If you have to squint, the design failed. Not you.',
    "Readability is not the reader's problem. It's the designer's. Blaming the user for not reading your 13px grey-on-beige body text is a career limiter.",
    'If you doubt it, it fails. Make it bigger, darker, or both.',
    "A useful test: open your design on the cheapest phone you can find, outside, in daylight, and try to read it. If you can't, neither can most of your users. Designers tend to work on 27\" retina monitors in calm indoor lighting. That is not the environment your design lives in."
  ),
  card(
    'Display Type',
    "Display fonts don't follow body-text rules.",
    "At 96px, you can (and should) tighten the tracking. At 12px, you need to loosen it. Body-text rules compress as size grows and expand as size shrinks. One trick doesn't fit all scales.",
    'Tighten tracking on display. Loosen on tiny type.',
    "The rule: as type gets larger, it can afford less space; as type gets smaller, it needs more. Display headlines: -10 to -30 tracking units. Body: 0. Fine print: +10 to +30. High-quality typefaces have separate 'optical sizes' that do this automatically — Fraunces, Roboto Flex, and others ship this for free. Use them."
  )
]

// Return a shuffled deep copy so sessions aren't identical.
export function buildDeck() {
  const copy = seedCards.map((c) => ({ ...c }))
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
