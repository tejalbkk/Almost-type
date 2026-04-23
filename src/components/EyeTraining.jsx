import { useMemo, useState } from 'react'
import { shuffleRounds } from '../data/eyeTraining.js'

// Eye Training per PRD §4.5. 5 rounds, pick the better one, see why.

export default function EyeTraining() {
  const [rounds, setRounds] = useState(() => shuffleRounds(5))
  const [idx, setIdx] = useState(0)
  const [choice, setChoice] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const round = rounds[idx]

  const pick = (label) => {
    if (choice) return
    setChoice(label)
    if (label === round.correct) setScore((s) => s + 1)
  }

  const next = () => {
    if (idx + 1 >= rounds.length) {
      setDone(true)
      return
    }
    setIdx((i) => i + 1)
    setChoice(null)
  }

  const restart = () => {
    setRounds(shuffleRounds(5))
    setIdx(0)
    setChoice(null)
    setScore(0)
    setDone(false)
  }

  if (done) {
    return <EyeSummary score={score} total={rounds.length} onRestart={restart} />
  }

  const isCorrect = choice === round.correct

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-6">
      <div className="px-5 pt-5 flex items-baseline justify-between">
        <div>
          <div className="font-serif italic text-[24px] leading-none text-ink">Eye Training</div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-muted mt-1">
            Round {idx + 1} of {rounds.length} · {round.topic}
          </div>
        </div>
        <div className="text-[13px] font-mono text-ink/70">Score {score}/{rounds.length}</div>
      </div>

      <div className="px-5 mt-4">
        <div className="text-[16px] text-ink/85">{round.prompt}</div>
      </div>

      <div className="px-5 mt-4 grid grid-cols-1 gap-3">
        {round.render.options.map((opt) => (
          <OptionCard
            key={opt.label}
            label={opt.label}
            render={round.render}
            opt={opt}
            selected={choice === opt.label}
            correct={choice ? opt.label === round.correct : null}
            disabled={!!choice}
            onClick={() => pick(opt.label)}
          />
        ))}
      </div>

      {choice && (
        <div className="px-5 mt-5 animate-fade-in">
          <div
            className={`rounded-2xl p-5 ${
              isCorrect ? 'bg-[#EAF5E8] border-[#C3E0BF]' : 'bg-[#FCE7DE] border-[#F2C1B3]'
            } border`}
          >
            <div className="text-[11px] font-mono uppercase tracking-widest mb-1"
                 style={{ color: isCorrect ? '#2E4A28' : '#7A2F16' }}>
              {isCorrect ? 'Correct' : 'Not quite'}
            </div>
            <div className="text-[14.5px] leading-snug text-ink/85">{round.why}</div>
          </div>
          <button
            type="button"
            onClick={next}
            className="mt-4 w-full py-3 rounded-2xl bg-ink text-paper text-[14px] font-medium"
          >
            {idx + 1 >= rounds.length ? 'See your score' : 'Next round'}
          </button>
        </div>
      )}
    </div>
  )
}

function OptionCard({ label, render, opt, selected, correct, disabled, onClick }) {
  const statusBorder =
    correct === true ? 'border-[#7EB17A]' : correct === false && selected ? 'border-[#C56A4F]' : selected ? 'border-ink' : 'hair'
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative text-left rounded-2xl border bg-white p-4 transition ${statusBorder} ${
        disabled ? 'cursor-default' : 'hover:bg-ink/5'
      }`}
    >
      <div className="text-[11px] font-mono uppercase tracking-widest text-muted mb-2">
        Option {label}
      </div>
      <RoundPreview render={render} opt={opt} />
    </button>
  )
}

// Renders the different round `render` shapes as described in data/eyeTraining.js
function RoundPreview({ render, opt }) {
  switch (render.type) {
    case 'paragraph':
      return (
        <p style={{ ...opt.style, fontFamily: '"Inter", sans-serif' }} className="text-ink">
          {render.text}
        </p>
      )
    case 'display':
      return (
        <div
          style={{ ...opt.style }}
          className="text-ink py-2"
        >
          {opt.text}
        </div>
      )
    case 'headline':
      return (
        <div className="py-1">
          <div style={{ ...opt.titleStyle, fontFamily: '"Fraunces", serif', fontStyle: 'italic' }} className="text-ink">
            {opt.title}
          </div>
          <div style={{ ...opt.subStyle, fontFamily: '"Inter", sans-serif' }} className="text-ink/70">
            {opt.sub}
          </div>
        </div>
      )
    case 'pairing':
      return (
        <div className="py-1">
          <div style={{ ...opt.head.style, fontFamily: `"${opt.head.family}", serif` }}>{opt.head.text}</div>
          <div style={{ ...opt.body.style, fontFamily: `"${opt.body.family}", sans-serif` }} className="mt-1">
            {opt.body.text}
          </div>
        </div>
      )
    case 'card':
      return (
        <div className="py-1">
          <div style={{ ...opt.title.style, fontFamily: '"Fraunces", serif', fontStyle: 'italic' }} className="text-ink">
            {opt.title.text}
          </div>
          <div style={{ ...opt.sub.style, fontFamily: '"Inter", sans-serif' }}>{opt.sub.text}</div>
          <div style={{ ...opt.cta.style, fontFamily: '"Inter", sans-serif', marginTop: 8 }} className="text-almost">
            {opt.cta.text} →
          </div>
        </div>
      )
    case 'stack':
      return (
        <div className="py-1">
          {opt.items.map((it, i) => (
            <div
              key={i}
              style={{
                fontSize: it.size + 'px',
                fontWeight: it.weight || 400,
                color: it.color || '#0E0E10',
                fontFamily: '"Inter", sans-serif',
                marginTop: it.gap + 'px'
              }}
            >
              {it.text}
            </div>
          ))}
        </div>
      )
    default:
      return null
  }
}

function EyeSummary({ score, total, onRestart }) {
  const pct = Math.round((score / total) * 100)
  const line = pct >= 80
    ? 'Your eye has receipts. Keep going — this is how taste compounds.'
    : pct >= 60
    ? 'Solid. You saw things most people wouldn’t. Now repeat the drill.'
    : pct >= 40
    ? 'Mixed. That’s fine. You’re seeing things you didn’t before — stay with it.'
    : 'Rough round. Good. You’re here because you noticed something was off. That’s the whole skill.'
  return (
    <div className="flex flex-col h-full items-center justify-center px-6 text-center">
      <div className="text-[11px] font-mono uppercase tracking-widest text-muted">Session complete</div>
      <div className="font-serif italic text-[48px] leading-none text-ink mt-2">{score}/{total}</div>
      <div className="text-[15px] text-ink/75 mt-3 max-w-[32ch]">{line}</div>
      <button
        onClick={onRestart}
        className="mt-6 px-5 py-3 rounded-full bg-ink text-paper text-[14px] font-medium"
      >
        Another round
      </button>
    </div>
  )
}
