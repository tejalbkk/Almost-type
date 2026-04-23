import { useEffect, useMemo, useRef, useState } from 'react'
import SwipeCard from './SwipeCard.jsx'
import ShareSheet from './ShareSheet.jsx'
import NoteSheet from './NoteSheet.jsx'
import { buildDeck } from '../data/cards.js'

// Type School swipe-stack per PRD §4.2. Front card + 2 background cards,
// undo, programmatic swipes via action buttons, note/share sheets.

export default function TypeSchool({ library, setLibrary }) {
  const [queue, setQueue] = useState(() => buildDeck())
  const [history, setHistory] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [shareCard, setShareCard] = useState(null)
  const [noteCard, setNoteCard] = useState(null)
  const topCardRef = useRef(null)

  // Top up the queue when it runs low (PRD §4.2.3: pre-generate next cards)
  useEffect(() => {
    if (queue.length < 4) {
      setQueue((q) => [...q, ...buildDeck()])
    }
  }, [queue.length])

  const top = queue[0]
  const behind = queue.slice(1, 3)

  const handleDecision = (_id, direction) => {
    const card = top
    if (!card) return
    setHistory((h) => [...h.slice(-9), { card, decision: direction }])
    if (direction === 'like') {
      setLibrary((lib) => ({
        ...lib,
        liked: dedupeById([card, ...lib.liked])
      }))
    } else {
      setLibrary((lib) => ({
        ...lib,
        notnow: dedupeById([card, ...lib.notnow])
      }))
    }
    setQueue((q) => q.slice(1))
    setExpandedId(null)
  }

  const handleLikeBtn = () => topCardRef.current?.fly('like')
  const handleSkipBtn = () => topCardRef.current?.fly('notnow')

  const handleUndo = () => {
    const last = history[history.length - 1]
    if (!last) return
    setHistory((h) => h.slice(0, -1))
    setQueue((q) => [last.card, ...q])
    setLibrary((lib) => ({
      ...lib,
      liked: lib.liked.filter((c) => c.id !== last.card.id),
      notnow: lib.notnow.filter((c) => c.id !== last.card.id)
    }))
  }

  const handleNoteSave = ({ text, visibility }) => {
    if (!noteCard) return
    setLibrary((lib) => ({
      ...lib,
      notes: { ...lib.notes, [noteCard.id]: { text, visibility, updatedAt: Date.now() } }
    }))
  }

  const decoratedTop = useMemo(() => {
    if (!top) return null
    return {
      ...top,
      __actions: (
        <div className="flex items-center gap-1">
          <IconButton
            label="Add note"
            onClick={() => setNoteCard(top)}
            active={!!library.notes[top.id]}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
              <path d="M9 12h6" />
              <path d="M9 16h4" />
            </svg>
          </IconButton>
          <IconButton label="Share card" onClick={() => setShareCard(top)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </IconButton>
        </div>
      )
    }
  }, [top, library.notes])

  return (
    <div className="flex flex-col h-full">
      <Header history={history} />

      <div className="relative flex-1 px-5 pt-3">
        <div className="relative mx-auto w-full max-w-[400px] h-full min-h-[480px]">
          {behind
            .slice()
            .reverse()
            .map((c, i) => (
              <SwipeCard
                key={c.id + '-bg-' + i}
                card={c}
                depth={behind.length - i}
              />
            ))}
          {decoratedTop && (
            <SwipeCard
              ref={topCardRef}
              key={decoratedTop.id}
              card={decoratedTop}
              depth={0}
              expanded={expandedId === top.id}
              onExpandToggle={(id) => setExpandedId((e) => (e === id ? null : id))}
              onDecision={handleDecision}
            />
          )}
        </div>
      </div>

      <div className="px-5 pt-3 pb-4 flex items-center justify-center gap-4 safe-bottom">
        <ControlButton
          label="Not now"
          onClick={handleSkipBtn}
          className="bg-paper border hair text-ink hover:bg-ink/5"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </ControlButton>
        <ControlButton
          label="Undo"
          onClick={handleUndo}
          disabled={history.length === 0}
          size="sm"
          className="bg-paper border hair text-ink/70 hover:text-ink disabled:opacity-30"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7v6h6" />
            <path d="M21 17a9 9 0 0 0-15-6.7L3 13" />
          </svg>
        </ControlButton>
        <ControlButton
          label="Like"
          onClick={handleLikeBtn}
          className="bg-almost text-paper hover:brightness-105"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 19 11c0 5.65-7 10-7 10z" />
          </svg>
        </ControlButton>
      </div>

      {shareCard && <ShareSheet card={shareCard} onClose={() => setShareCard(null)} />}
      {noteCard && (
        <NoteSheet
          card={noteCard}
          initialNote={library.notes[noteCard.id]}
          onSave={handleNoteSave}
          onClose={() => setNoteCard(null)}
        />
      )}
    </div>
  )
}

function Header({ history }) {
  return (
    <div className="px-5 pt-4 pb-2 flex items-baseline justify-between">
      <div>
        <div className="font-serif italic text-[22px] leading-none text-ink">Type School</div>
        <div className="text-[11px] font-mono uppercase tracking-widest text-muted mt-1">
          {history.length === 0 ? 'a fresh stack' : `${history.length} read so far`}
        </div>
      </div>
    </div>
  )
}

function IconButton({ children, onClick, label, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border hair transition ${
        active ? 'bg-ink text-paper border-ink' : 'bg-white text-ink/70 hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}

function ControlButton({ children, onClick, disabled, label, size, className = '' }) {
  const dim = size === 'sm' ? 'h-12 w-12' : 'h-16 w-16'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      className={`inline-flex ${dim} items-center justify-center rounded-full shadow-card transition ${className}`}
    >
      {children}
    </button>
  )
}

function dedupeById(arr) {
  const seen = new Set()
  const out = []
  for (const c of arr) {
    if (seen.has(c.id)) continue
    seen.add(c.id)
    out.push(c)
  }
  return out
}
