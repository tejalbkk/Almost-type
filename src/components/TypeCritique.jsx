import { useState } from 'react'
import { generateCritique } from '../data/critiques.js'

// Type Critique per PRD §4.4. Honest, scored, structured.

const PLACEHOLDER = `e.g. I used Fraunces for the headline at 36px and Inter at 14px for body. Line height on the body is 1.3. The design is a landing page for my side project. The hero feels flat and the call-to-action gets lost next to the illustration.`

export default function TypeCritique() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const onRun = () => {
    if (!text.trim()) return
    setLoading(true)
    setResult(null)
    window.setTimeout(() => {
      setResult(generateCritique(text))
      setLoading(false)
    }, 350)
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-8">
      <div className="px-5 pt-5">
        <div className="font-serif italic text-[24px] leading-none text-ink">Type Critique</div>
        <div className="text-[13px] text-muted mt-1 italic">
          we will not lie to protect your feelings.
        </div>
      </div>

      <div className="px-5 mt-4 space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder={PLACEHOLDER}
          className="w-full resize-none rounded-2xl border hair bg-white px-4 py-3 text-[15px] leading-snug text-ink outline-none focus:border-ink/40"
        />
        <button
          type="button"
          onClick={onRun}
          disabled={!text.trim() || loading}
          className="w-full py-3 rounded-2xl bg-ink text-paper text-[14px] font-medium disabled:opacity-40"
        >
          {loading ? 'Looking…' : 'Honest critique'}
        </button>
        <div className="text-[11px] text-muted text-center">
          AI-assisted, not gospel. Typography opinions are a dialogue, not a verdict.
        </div>
      </div>

      {result && <CritiqueResult r={result} />}
    </div>
  )
}

function CritiqueResult({ r }) {
  const tone = r.score <= 5 ? 'bg-[#FCE7DE] text-[#7A2F16]' : r.score <= 7 ? 'bg-[#EAE4D4] text-[#4F4628]' : 'bg-[#DDEBDA] text-[#2E4A28]'
  return (
    <div className="px-5 mt-6 space-y-4 animate-fade-in">
      <div className="rounded-2xl border hair bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-mono uppercase tracking-widest text-muted">Verdict</div>
          <span className={`px-3 py-1 rounded-full text-[13px] font-semibold ${tone}`}>
            {r.score}/10
          </span>
        </div>
        <div className="font-serif italic text-[20px] leading-snug text-ink mt-2">{r.verdict}</div>
      </div>

      <Block label="What’s working">
        <ul className="space-y-2">
          {r.working.map((w, i) => (
            <li key={i} className="flex gap-2 text-[14px] leading-snug text-ink/85">
              <span className="text-almost">+</span>
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block label="What needs fixing">
        <ul className="space-y-2">
          {r.fixing.map((f, i) => (
            <li key={i} className="flex gap-2 text-[14px] leading-snug text-ink/85">
              <span className="text-ink/50">–</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block label="Hierarchy">
        <div className="text-[14px] leading-snug text-ink/85">{r.hierarchy}</div>
      </Block>

      <div className="rounded-2xl bg-ink text-paper p-5">
        <div className="text-[10px] font-mono uppercase tracking-widest text-paper/60 mb-2">
          Fix this first
        </div>
        <div className="text-[15.5px] leading-snug">{r.priority}</div>
      </div>

      <div className="rounded-2xl border hair bg-white p-5">
        <div className="font-serif italic text-[16px] leading-snug text-ink">{r.closing}</div>
      </div>
    </div>
  )
}

function Block({ label, children }) {
  return (
    <div className="rounded-2xl border hair bg-white p-5">
      <div className="text-[11px] font-mono uppercase tracking-widest text-muted mb-2">{label}</div>
      {children}
    </div>
  )
}
