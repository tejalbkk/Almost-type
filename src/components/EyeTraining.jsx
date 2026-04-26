import { useEffect, useState } from 'react'
import { Heart, Share2 } from 'lucide-react'
import { eyeRounds, pickNextRound } from '../data/eyeTraining.js'
import EyeShareSheet from './EyeShareSheet.jsx'

// Eye Training, v2: infinite no-repeat stream of typographic exercises.
// Mix of visual comparisons and MCQ trivia. Like a question to keep it
// for later (lands in Library → Liked Questions). Share to send a question
// to a friend.

export default function EyeTraining({ likedQuestions, setLikedQuestions }) {
  const [seen, setSeen] = useState(() => new Set())
  const [round, setRound] = useState(() => pickNextRound(new Set()))
  const [choice, setChoice] = useState(null)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [shareRound, setShareRound] = useState(null)

  // When the round changes (we're starting a fresh question), reset the choice
  useEffect(() => {
    setChoice(null)
  }, [round?.id])

  if (!round) return null

  const isCorrect = choice === round.correct
  const liked = likedQuestions.some((q) => q.id === round.id)

  const pick = (label) => {
    if (choice) return
    setChoice(label)
    setAnswered((n) => n + 1)
    if (label === round.correct) setScore((s) => s + 1)
  }

  const next = () => {
    const ns = new Set(seen)
    ns.add(round.id)
    if (ns.size >= eyeRounds.length) {
      // Exhausted the pool — reset and pick fresh
      const reset = new Set()
      setSeen(reset)
      setRound(pickNextRound(reset))
    } else {
      setSeen(ns)
      setRound(pickNextRound(ns))
    }
  }

  const toggleLike = () => {
    if (liked) {
      setLikedQuestions((arr) => arr.filter((q) => q.id !== round.id))
    } else {
      const saved = {
        id: round.id,
        topic: round.topic,
        prompt: round.prompt,
        correct: round.correct,
        why: round.why,
        savedAt: Date.now()
      }
      setLikedQuestions((arr) => [saved, ...arr])
    }
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-6">
      <div className="px-5 pt-5 flex items-baseline justify-between">
        <div>
          <div className="font-serif font-semibold text-[24px] leading-none text-ink">Eye Training</div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-muted mt-1">
            {round.topic} · {answered === 0 ? 'Round one' : `${score}/${answered} so far`}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <RoundIconButton
            label={liked ? 'Unlike question' : 'Save question for later'}
            onClick={toggleLike}
            active={liked}
          >
            <Heart
              size={16}
              strokeWidth={2}
              fill={liked ? '#FF5B3A' : 'none'}
              color={liked ? '#FF5B3A' : 'currentColor'}
            />
          </RoundIconButton>
          <RoundIconButton
            label="Share question"
            onClick={() => setShareRound(round)}
          >
            <Share2 size={16} strokeWidth={2} />
          </RoundIconButton>
        </div>
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
            <div
              className="text-[11px] font-mono uppercase tracking-widest mb-1"
              style={{ color: isCorrect ? '#2E4A28' : '#7A2F16' }}
            >
              {isCorrect ? 'Correct' : 'Not quite'}
            </div>
            <div className="text-[14.5px] leading-snug text-ink/85">{round.why}</div>
          </div>
          <button
            type="button"
            onClick={next}
            className="mt-4 w-full py-3 rounded-2xl bg-ink text-paper text-[14px] font-medium"
          >
            Next round
          </button>
        </div>
      )}

      {shareRound && <EyeShareSheet round={shareRound} onClose={() => setShareRound(null)} />}
    </div>
  )
}

function RoundIconButton({ children, onClick, label, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border hair transition ${
        active ? 'bg-white text-almost border-almost/30' : 'bg-white text-ink/65 hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}

function OptionCard({ label, render, opt, selected, correct, disabled, onClick }) {
  const statusBorder =
    correct === true
      ? 'border-[#7EB17A]'
      : correct === false && selected
      ? 'border-[#C56A4F]'
      : selected
      ? 'border-ink'
      : 'hair'
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
        <div style={{ ...opt.style }} className="text-ink py-2">
          {opt.text}
        </div>
      )
    case 'headline':
      return (
        <div className="py-1">
          <div
            style={{ ...opt.titleStyle, fontFamily: '"Fraunces", serif' }}
            className="text-ink"
          >
            {opt.title}
          </div>
          <div
            style={{ ...opt.subStyle, fontFamily: '"Inter", sans-serif' }}
            className="text-ink/70"
          >
            {opt.sub}
          </div>
        </div>
      )
    case 'pairing':
      return (
        <div className="py-1">
          <div style={{ ...opt.head.style, fontFamily: `"${opt.head.family}", serif` }}>
            {opt.head.text}
          </div>
          <div
            style={{ ...opt.body.style, fontFamily: `"${opt.body.family}", sans-serif` }}
            className="mt-1"
          >
            {opt.body.text}
          </div>
        </div>
      )
    case 'card':
      return (
        <div className="py-1">
          <div
            style={{ ...opt.title.style, fontFamily: '"Fraunces", serif' }}
            className="text-ink"
          >
            {opt.title.text}
          </div>
          <div style={{ ...opt.sub.style, fontFamily: '"Inter", sans-serif' }}>
            {opt.sub.text}
          </div>
          <div
            style={{ ...opt.cta.style, fontFamily: '"Inter", sans-serif', marginTop: 8 }}
            className="text-almost"
          >
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
    case 'mcq':
      return <div className="text-[14.5px] leading-snug text-ink py-1">{opt.text}</div>
    default:
      return null
  }
}
