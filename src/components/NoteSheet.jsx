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
      <div className="absolute inset-0 bg-ink/40" />
      <div
        className="relative w-full max-w-[480px] bg-paper rounded-t-3xl border-t hair shadow-lift safe-bottom animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3">
          <div className="w-10 h-1 rounded-full bg-ink/15" />
        </div>
        <div className="px-5 pt-2 pb-5">
          <div className="text-xs font-mono uppercase tracking-widest text-muted mb-1">Note</div>
          <div className="font-serif italic text-lg leading-snug text-ink mb-3">{card.title}</div>
          <textarea
            ref={ref}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="What clicked? What’s still fuzzy? Note it here."
            className="w-full resize-none rounded-2xl border hair bg-white px-4 py-3 text-[15px] leading-snug text-ink outline-none focus:border-ink/40"
          />
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setVisibility('private')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border ${visibility === 'private' ? 'bg-ink text-paper border-ink' : 'hair bg-white text-ink/70 hover:text-ink'}`}
            >
              Private
            </button>
            <button
              type="button"
              onClick={() => setVisibility('public')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border ${visibility === 'public' ? 'bg-ink text-paper border-ink' : 'hair bg-white text-ink/70 hover:text-ink'}`}
              title="Public notes ship in v1.2"
            >
              Public
            </button>
            <span className="text-[11px] text-muted ml-auto">
              {visibility === 'public' ? 'Public notes go live in v1.2.' : 'Only you see this.'}
            </span>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl border hair bg-white text-[14px] font-medium text-ink/70 hover:text-ink"
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
              className="flex-1 py-3 rounded-2xl bg-ink text-paper text-[14px] font-medium disabled:opacity-40"
            >
              Save note
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
