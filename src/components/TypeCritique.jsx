import { useRef, useState } from 'react'
import { Upload, ImagePlus, X, ExternalLink, Sparkles } from 'lucide-react'

// Type Critique, v2: no typing — upload a screenshot of your design,
// run the typography self-rubric, and (for a deep read) hand it to
// Claude with a prefilled prompt. Plus a few quick tools you can lean on.
//
// The rubric is opinionated and useful on its own; it doesn't need an AI
// to make you a better designer. That's the point.

const RUBRIC = [
  {
    id: 'hier',
    q: 'Is your headline at least 2× the size of your body text?',
    why: 'A clear visual ratio (≈2:1 or more) is what makes one thing feel important. Same-size everything reads as a list.',
    fix: 'Bump the headline by 6–10px, or drop the body 1–2px until the gap feels obvious from across the room.'
  },
  {
    id: 'body',
    q: 'Is your body text 16px or larger on mobile?',
    why: 'Below 16px iOS Safari often auto-zooms on focus, and most people have to lean in.',
    fix: 'Set body to 16px minimum (17–18px is friendlier). Reserve 12–13px for captions only.'
  },
  {
    id: 'leading',
    q: 'Is body line-height between 1.4 and 1.6?',
    why: 'Tighter than 1.4 reads cramped. Looser than 1.7 starts to feel disconnected.',
    fix: 'Try 1.5 first. If your font has a tall x-height (like Inter), 1.6 reads better.'
  },
  {
    id: 'families',
    q: 'Are you using two or fewer type families?',
    why: "More than two and the design starts to feel like it can't decide what it is.",
    fix: 'Pick one workhorse (body) and one character lead (headline). Use weights for the rest.'
  },
  {
    id: 'measure',
    q: 'Is your body line length between 45 and 75 characters?',
    why: 'The eye loses its place on long lines and gets twitchy on short ones.',
    fix: 'On desktop, cap your reading column at ~36–40em. On mobile it usually sorts itself out.'
  },
  {
    id: 'contrast',
    q: 'Does your text-to-background contrast pass 4.5:1 (WCAG AA)?',
    why: 'Lower contrast looks elegant on your screen. It looks unreadable on a phone in sunlight.',
    fix: 'Run it through webaim.org/resources/contrastchecker. If it fails, darken text or lighten background.'
  },
  {
    id: 'displayLead',
    q: 'Are display headlines using tight leading (1.05–1.2)?',
    why: 'Body leading on a headline makes the lines feel disconnected — like two separate sentences.',
    fix: 'Set display line-height to 1.1. Keep body at 1.5. They are different jobs.'
  },
  {
    id: 'caps',
    q: 'If you are using ALL CAPS, is there at least 8% letter-spacing?',
    why: 'Capitals were drawn to sit close together. Without tracking they collide.',
    fix: 'Add letter-spacing of 0.08–0.12em on uppercase labels. Never set paragraphs in caps.'
  }
]

const QUICK_TOOLS = [
  {
    name: 'WebAIM Contrast Checker',
    url: 'https://webaim.org/resources/contrastchecker/',
    desc: 'Verify your text vs. background passes WCAG.'
  },
  {
    name: 'Type Scale',
    url: 'https://typescale.com/',
    desc: 'Pick a modular scale and size your hierarchy in one go.'
  },
  {
    name: 'Fontjoy',
    url: 'https://fontjoy.com/',
    desc: 'Generate font pairings with a similarity slider.'
  },
  {
    name: 'Modern Font Stacks',
    url: 'https://modernfontstacks.com/',
    desc: 'System-font stacks that load instantly and look intentional.'
  }
]

const CLAUDE_PROMPT = `I'm designing something and I want a deep typography critique. I'm about to paste a screenshot. Please critique only the typography (not the colours, illustrations or copy unless they affect the type). Cover:

1. Hierarchy — is the order of importance obvious within 2 seconds?
2. Pairing — do the type families have enough contrast in mood and shape?
3. Sizing & leading — body, headline, captions
4. Spacing & rhythm — is white space doing work?
5. Tracking & kerning, especially on display sizes and all-caps
6. Contrast & readability

For each issue, tell me the specific fix (number, value, or technique) — not just "make it bigger."

Then end with the ONE thing I should fix first.`

export default function TypeCritique() {
  const [imageUrl, setImageUrl] = useState(null)
  const [imageName, setImageName] = useState(null)
  const [rubricOpen, setRubricOpen] = useState(false)
  const [answers, setAnswers] = useState({})
  const [dragActive, setDragActive] = useState(false)
  const fileRef = useRef(null)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    setImageUrl(url)
    setImageName(file.name)
    setRubricOpen(false)
    setAnswers({})
  }

  const onPick = (e) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const clearImage = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    setImageUrl(null)
    setImageName(null)
    setRubricOpen(false)
    setAnswers({})
  }

  const setAnswer = (id, value) => setAnswers((a) => ({ ...a, [id]: value }))
  const answered = Object.keys(answers).length
  const passed = Object.values(answers).filter((v) => v === 'yes').length
  const failedItems = RUBRIC.filter((r) => answers[r.id] === 'no')

  const askClaude = () => {
    const url = `https://claude.ai/new?q=${encodeURIComponent(CLAUDE_PROMPT)}`
    window.open(url, '_blank', 'noopener')
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-8">
      <div className="px-5 pt-5">
        <div className="font-serif font-semibold text-[24px] leading-none text-ink">Type Critique</div>
        <div className="text-[13px] text-muted mt-1">
          Drop a screenshot. Run the rubric. We won't lie to protect your feelings.
        </div>
      </div>

      <div className="px-5 mt-4">
        {!imageUrl ? (
          <UploadZone
            onPick={() => fileRef.current?.click()}
            onDrop={onDrop}
            dragActive={dragActive}
            setDragActive={setDragActive}
          />
        ) : (
          <div className="rounded-2xl border hair bg-white overflow-hidden">
            <div className="relative bg-[#0E0E10]/5">
              <img
                src={imageUrl}
                alt="Your design"
                className="w-full max-h-[420px] object-contain bg-white"
              />
              <button
                type="button"
                onClick={clearImage}
                aria-label="Remove image"
                className="absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink/80 text-paper hover:bg-ink"
              >
                <X size={16} strokeWidth={2.4} />
              </button>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="text-[12px] text-muted truncate">{imageName}</div>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="text-[12px] font-medium text-ink/70 hover:text-ink"
              >
                Replace
              </button>
            </div>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onPick}
        />
      </div>

      {imageUrl && !rubricOpen && (
        <div className="px-5 mt-4 space-y-2">
          <button
            type="button"
            onClick={() => setRubricOpen(true)}
            className="w-full py-3.5 rounded-2xl bg-ink text-paper text-[14px] font-medium"
          >
            Run the typography rubric
          </button>
          <button
            type="button"
            onClick={askClaude}
            className="w-full py-3.5 rounded-2xl border hair bg-white text-ink text-[14px] font-medium inline-flex items-center justify-center gap-2"
          >
            <Sparkles size={15} strokeWidth={2} />
            Get a deep critique from Claude
            <ExternalLink size={13} strokeWidth={2} />
          </button>
          <div className="text-[11px] text-muted text-center pt-1">
            Both work. The rubric is faster. Claude is deeper.
          </div>
        </div>
      )}

      {imageUrl && rubricOpen && (
        <Rubric
          answers={answers}
          setAnswer={setAnswer}
          answered={answered}
          passed={passed}
          failedItems={failedItems}
          onAskClaude={askClaude}
        />
      )}

      <QuickTools />

      <div className="text-[11px] text-muted text-center px-5 mt-4">
        AI-assisted, not gospel. Typography opinions are a dialogue, not a verdict.
      </div>
    </div>
  )
}

function UploadZone({ onPick, onDrop, dragActive, setDragActive }) {
  return (
    <button
      type="button"
      onClick={onPick}
      onDragOver={(e) => {
        e.preventDefault()
        setDragActive(true)
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={onDrop}
      className={`w-full rounded-3xl border-2 border-dashed p-8 text-center transition ${
        dragActive ? 'border-almost bg-almost/5' : 'border-ink/15 bg-white hover:bg-ink/5'
      }`}
    >
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper mb-3">
        <ImagePlus size={22} strokeWidth={2} />
      </div>
      <div className="font-serif font-semibold text-[20px] text-ink">
        Drop your design here
      </div>
      <div className="text-[13px] text-muted mt-1">
        Or tap to choose a screenshot from your device
      </div>
      <div className="text-[11px] text-muted mt-3 inline-flex items-center gap-1.5">
        <Upload size={12} strokeWidth={2} />
        PNG, JPG, WebP — anything an image
      </div>
    </button>
  )
}

function Rubric({ answers, setAnswer, answered, passed, failedItems, onAskClaude }) {
  const allAnswered = answered === RUBRIC.length
  return (
    <div className="px-5 mt-5 space-y-4 animate-fade-in">
      <div className="flex items-baseline justify-between">
        <div className="text-[11px] font-mono uppercase tracking-widest text-muted">
          The rubric · {answered}/{RUBRIC.length}
        </div>
        {answered > 0 && (
          <div className="text-[11px] font-mono text-ink/70">
            {passed}/{answered} passing
          </div>
        )}
      </div>

      <div className="space-y-3">
        {RUBRIC.map((r) => (
          <RubricItem
            key={r.id}
            item={r}
            answer={answers[r.id]}
            onAnswer={(v) => setAnswer(r.id, v)}
          />
        ))}
      </div>

      {allAnswered && (
        <div className="rounded-2xl bg-ink text-paper p-5 animate-fade-in">
          <div className="text-[10px] font-mono uppercase tracking-widest text-paper/60 mb-2">
            Your read
          </div>
          {failedItems.length === 0 ? (
            <div className="text-[15.5px] leading-snug">
              Eight passes. The bones of your typography are honest. Now it's polish, not repair — kerning, optical adjustments, the boring final 10%.
            </div>
          ) : (
            <div>
              <div className="text-[15.5px] leading-snug mb-3">
                {failedItems.length === 1
                  ? 'One thing to fix. Worth doing now — it will lift everything else.'
                  : `${failedItems.length} fixes to make. Don't try them all at once — go in order, top to bottom.`}
              </div>
              <ul className="space-y-2 text-[14px] leading-snug text-paper/85">
                {failedItems.map((f) => (
                  <li key={f.id} className="flex gap-2">
                    <span className="text-almost shrink-0">→</span>
                    <span>{f.fix}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={onAskClaude}
        className="w-full py-3.5 rounded-2xl border hair bg-white text-ink text-[14px] font-medium inline-flex items-center justify-center gap-2"
      >
        <Sparkles size={15} strokeWidth={2} />
        Want a deeper read? Ask Claude
        <ExternalLink size={13} strokeWidth={2} />
      </button>
    </div>
  )
}

function RubricItem({ item, answer, onAnswer }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <div
      className={`rounded-2xl border p-4 bg-white transition ${
        answer === 'yes' ? 'border-success-mid' : answer === 'no' ? 'border-danger-mid' : 'hair'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-[14.5px] leading-snug text-ink flex-1 font-medium">{item.q}</div>
      </div>
      <div className="text-[12.5px] text-ink/65 leading-snug mt-1.5">{item.why}</div>

      <div className="mt-3 flex items-center gap-2">
        <Pill onClick={() => onAnswer('yes')} active={answer === 'yes'} variant="pass">
          Pass
        </Pill>
        <Pill onClick={() => onAnswer('no')} active={answer === 'no'} variant="fail">
          Needs fixing
        </Pill>
        <Pill onClick={() => onAnswer('na')} active={answer === 'na'} variant="muted">
          N/A
        </Pill>
        <button
          type="button"
          onClick={() => setRevealed((v) => !v)}
          className="ml-auto text-[12px] font-medium text-ink/60 hover:text-ink"
        >
          {revealed ? 'Hide fix' : 'Show fix'}
        </button>
      </div>

      {revealed && (
        <div className="mt-3 rounded-xl bg-ink/5 px-3 py-2 text-[13px] leading-snug text-ink/80">
          <span className="font-mono uppercase text-[10px] tracking-widest text-muted mr-2">Fix</span>
          {item.fix}
        </div>
      )}
    </div>
  )
}

function Pill({ children, onClick, active, variant }) {
  const styles = active
    ? variant === 'pass'
      ? 'bg-success text-white border-success'
      : variant === 'fail'
      ? 'bg-danger text-white border-danger'
      : 'bg-ink text-paper border-ink'
    : 'hair bg-white text-ink/70 hover:text-ink'
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-[12px] font-medium border ${styles}`}
    >
      {children}
    </button>
  )
}

function QuickTools() {
  return (
    <div className="px-5 mt-6">
      <div className="text-[11px] font-mono uppercase tracking-widest text-muted mb-2">
        Quick tools
      </div>
      <div className="grid grid-cols-1 gap-2">
        {QUICK_TOOLS.map((t) => (
          <a
            key={t.url}
            href={t.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border hair bg-white p-3 hover:bg-ink/5 inline-flex items-center justify-between gap-2"
          >
            <div className="min-w-0">
              <div className="text-[14px] font-medium text-ink truncate">{t.name}</div>
              <div className="text-[12px] text-muted truncate">{t.desc}</div>
            </div>
            <ExternalLink size={14} strokeWidth={2} className="text-ink/50 shrink-0" />
          </a>
        ))}
      </div>
    </div>
  )
}
