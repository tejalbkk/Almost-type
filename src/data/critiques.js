// Seed Type Critique generator. No API — deterministic analysis of the user's input
// plus a rotating pool of feedback lines. The PRD §4.4.2 structure is exact.

const verdicts = {
  low: [
    'The hierarchy is reading as a flat list, and your fonts are fighting for the same job.',
    "It's readable, but nothing is telling the eye where to go first. That's the fix.",
    "The bones are here. The spacing and weight choices are holding it back."
  ],
  mid: [
    'Solid foundation, one or two decisions away from clicking.',
    'Close. The hierarchy is there; the spacing is undercooked.',
    'Competent. One cut, one size bump, and it lands.'
  ],
  high: [
    'This is doing most of the work. Tighten two details and it\u2019s done.',
    'You\u2019re there. The remaining notes are polish, not repair.',
    'Confident choices. A few small refinements and you ship it.'
  ]
}

const workingLines = [
  'Your body type size sounds readable — don\u2019t let anyone talk you out of 16px+.',
  'The font pairing is at least in the same family of good taste.',
  'You clearly thought about what the design is *for*, which is half the battle.',
  'Keeping the palette tight was the right call.',
  "Restraint on weights — you didn't bold everything. Noticed."
]

const fixingLines = {
  kerning: 'Kerning at display sizes is manual work. Zoom to 400% and fix the worst two pairs.',
  leading: 'Your line-height is almost certainly too tight. 1.5 on body. 1.15 on display. Adjust.',
  hierarchy: 'Three levels max: display, body, caption. If you have four, one has to lose.',
  contrast: 'Your text-to-background contrast is probably under 4.5:1. Darken the text or lighten the background.',
  fontSize: 'Body copy under 16px is cruelty. Bump it.',
  tooManyFonts: 'More than two type families in one layout is a red flag. Pick a workhorse and a character lead.',
  allCaps: "All-caps paragraphs strip the eye of word-shape cues. If it's a paragraph, it can't be caps.",
  alignment: 'Centred body text is harder to read than left-aligned. Save centre for ceremony.',
  measure: "Line length over 75 characters breaks reading rhythm. Cap your max-width at ~36em.",
  generic: 'The first thing to fix is the most visible thing. Walk across the room from your screen. What catches your eye? If it\u2019s not the most important thing, that\u2019s your fix.'
}

const hierarchyAssessments = [
  "There's a display, a body, and a caption, but the display isn't loud enough to own the role.",
  'Everything is the same weight. That means nothing is emphasised — no matter what you intended.',
  'The ratio between your largest and smallest type needs to be at least 3:1. Right now it sounds closer to 1.5:1.',
  'Your call-to-action is competing with the body text. Make it bigger, or bolder, or both.',
  'You\u2019re using colour and size to say the same thing. Pick one lever per level.'
]

const closings = [
  'Fix the one thing. The rest will start working immediately.',
  "Type doesn't forgive 'almost right' — but it rewards one intentional decision instantly.",
  "Your eye is better than you think. Trust the discomfort you already feel.",
  'Ship it when the hierarchy is honest. Not before.',
  'Keep going. Taste is built, not born.'
]

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

// Lightweight keyword scoring — produces a pseudo-score and selects relevant fixes.
export function generateCritique(text) {
  const t = (text || '').toLowerCase()
  const signals = {
    kerning: /\b(kern|kerning|logo|wordmark)\b/.test(t),
    leading: /\b(leading|line[- ]?height|line spacing|cramped|tight|breath)\b/.test(t),
    hierarchy: /\b(hierarchy|priority|heading|order|scan|confus|clutter)\b/.test(t),
    contrast: /\b(grey|gray|light|faded|wash|#[a-f0-9]{3,6}|contrast|accessible|wcag)\b/.test(t),
    fontSize: /\b(12px|13px|14px|tiny|small body|small text)\b/.test(t),
    tooManyFonts: ((t.match(/\b(helvetica|inter|fraunces|playfair|poppins|roboto|arial|georgia|serif|sans|mono|font|typeface)\b/g) || []).length) >= 3,
    allCaps: /\b(all caps|uppercase|caps lock|shouting)\b/.test(t),
    alignment: /\b(centre|center|centred|centered|justified)\b/.test(t),
    measure: /\b(wide|full[- ]?width|long line|one column|1200px|1400px)\b/.test(t)
  }

  const positives = []
  if (/\b(16px|17px|18px|19px|20px|1rem|1\.1rem|1\.125rem|body 1\.|body: 1\.)/.test(t)) positives.push(workingLines[0])
  if (/\b(fraunces|inter|ibm plex|space grotesk|work sans|dm sans)\b/.test(t)) positives.push(workingLines[1])
  if (/\b(for|brand|client|campaign|product|app|deck|startup|portfolio)\b/.test(t)) positives.push(workingLines[2])
  if (positives.length === 0) positives.push(pick(workingLines))

  const issues = []
  for (const key of Object.keys(signals)) {
    if (signals[key]) issues.push(fixingLines[key])
  }
  if (issues.length === 0) issues.push(fixingLines.generic)

  const score = Math.max(3, Math.min(9, 9 - issues.length))
  const tier = score <= 5 ? 'low' : score <= 7 ? 'mid' : 'high'

  const priority = signals.hierarchy
    ? fixingLines.hierarchy
    : signals.contrast
    ? fixingLines.contrast
    : signals.leading
    ? fixingLines.leading
    : issues[0]

  return {
    verdict: pick(verdicts[tier]),
    score,
    working: positives.slice(0, 2),
    fixing: Array.from(new Set(issues)).slice(0, 3),
    hierarchy: pick(hierarchyAssessments),
    priority,
    closing: pick(closings)
  }
}
