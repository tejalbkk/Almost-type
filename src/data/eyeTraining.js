// Eye Training rounds. PRD §4.5 — pre-authored, deliberately not AI-generated
// so correctness is guaranteed. Each round: one typographic problem, two
// solutions, correct answer, and a "why" reveal.

// `render` is a small rendering descriptor — the EyeTraining component
// interprets it. Keeping rounds as data (not JSX) means we can shuffle, split
// by topic, and eventually serve from a backend without component changes.

export const eyeRounds = [
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
    why: 'Body text wants 1.4\u20131.6 line-height. 1.2 is fine for display but claustrophobic at 16px. B lets the letters breathe.'
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
    why: 'B has clear, intentional contrast between the three roles. A is all the same weight and size \u2014 visually flat, which is visually confusing.'
  },
  {
    id: 'pairing-1',
    topic: 'Font Pairing Contrast',
    prompt: 'Which pairing has better contrast?',
    render: {
      type: 'pairing',
      options: [
        {
          label: 'A',
          head: { text: 'Almost, Type.', family: 'Inter', style: { fontSize: '28px', fontWeight: 700 } },
          body: { text: "Typography is a choice. Make it on purpose.", family: 'Inter', style: { fontSize: '15px', color: '#444' } }
        },
        {
          label: 'B',
          head: { text: 'Almost, Type.', family: 'Fraunces', style: { fontSize: '28px', fontWeight: 700, fontStyle: 'italic' } },
          body: { text: "Typography is a choice. Make it on purpose.", family: 'Inter', style: { fontSize: '15px', color: '#444' } }
        }
      ]
    },
    correct: 'B',
    why: 'B pairs a characterful serif display with a neutral sans body \u2014 classic contrast in shape and mood. A is one font doing two jobs, which flattens the feeling.'
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
    why: 'A has a contrast ratio around 2.7:1 \u2014 fails WCAG AA. B is about 12:1. Lower contrast isn\u2019t elegant; it\u2019s an exclusion.'
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
      text: "Line length matters more than you think. The eye has to travel from the end of one line back to the start of the next, and the farther it travels, the more often it loses its place. The rule of thumb is 45 to 75 characters per line. Shorter feels twitchy. Longer feels exhausting. Most body text on the web is set too wide, because designers forget that readable is not the same as wide.",
      options: [
        { label: 'A', style: { fontSize: '16px', lineHeight: 1.55, maxWidth: '90%' } },
        { label: 'B', style: { fontSize: '16px', lineHeight: 1.55, maxWidth: '36ch' } }
      ]
    },
    correct: 'B',
    why: 'Line length above ~75 characters breaks reading rhythm. B sits around 36 characters \u2014 comfortable mobile reading. A lets lines run edge-to-edge, which is why long blog posts are exhausting.'
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
    why: 'Capitals need a little positive tracking to breathe \u2014 5\u201310% works. Without it, capital letters collide at the shoulders and read as a solid block. B adds space; A doesn\u2019t.'
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
    why: 'A headline needs to be loud enough to be heard before the subtitle. B has the right 2:1 ratio and a breath of space between them. A is a whisper followed by another whisper.'
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
    why: 'Small all-caps labels need generous tracking \u2014 10\u201315%. Without it the letters jam together and lose legibility. B is a product label. A is a typo.'
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
    why: "Display type wants tighter leading (1.05\u20131.2). 1.5 is for body. B reads as one considered headline. A reads as two disconnected lines."
  }
]

export function shuffleRounds(n = 5) {
  const copy = [...eyeRounds]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, n)
}
