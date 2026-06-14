import { useEffect, useRef, useState } from 'react'

// Private/public notes per PRD §4.2.4. Public is scaffolded but gated in v1.0.

export default function NoteSheet({ card, initialNote, onSave, onClose }) {
  const [text, setText] = useState(initialNote?.text || '')
  const [visibility, setVisibility] = useState(initialNote?.visibility || 'private')
  const ref = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus(), 100)
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!card) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.65)' }} />
      <div
        className="relative w-full max-w-[480px] rounded-t-2xl shadow-lift safe-bottom animate-slide-up"
        style={{ background: '#181410', borderTop: '1px solid #2A2118' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3">
          <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(238,229,206,0.15)' }} />
        </div>
        <div className="px-5 pt-2 pb-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted mb-1">Note</div>
          <div className="font-display font-medium text-[19px] leading-snug text-ink mb-3" style={{ letterSpacing: '-0.01em' }}>{card.title}</div>
          <textarea
            ref={ref}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="What clicked? What's still fuzzy? Note it here."
            className="w-full resize-none rounded-xl border border-hair px-4 py-3 text-[14px] leading-snug text-ink outline-none"
            style={{ background: '#221E17' }}
          />
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setVisibility('private')}
              className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-[0.1em] border transition-colors ${
                visibility === 'private'
                  ? 'bg-almost text-paper border-almost'
                  : 'border-hair bg-raised text-muted hover:text-ink'
              }`}
            >
              Private
            </button>
            <button
              type="button"
              onClick={() => setVisibility('public')}
              className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-[0.1em] border transition-colors ${
                visibility === 'public'
                  ? 'bg-almost text-paper border-almost'
                  : 'border-hair bg-raised text-muted hover:text-ink'
              }`}
              title="Public notes ship in v1.2"
            >
              Public
            </button>
            <span className="text-[11px] text-muted ml-auto font-light">
              {visibility === 'public' ? 'Public notes go live in v1.2.' : 'Only you see this.'}
            </span>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-hair text-[13px] font-medium text-muted hover:text-ink transition-colors"
              style={{ background: '#221E17' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onSave?.({ text: text.trim(), visibility })
                onClose?.()
              }}
              disabled={!text.trim()}
              className="flex-1 py-3 rounded-xl bg-almost text-paper text-[13px] font-medium disabled:opacity-40 hover:bg-almost/90 transition-colors"
            >
              Save note
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
