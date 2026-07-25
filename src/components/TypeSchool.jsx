import { useEffect, useRef, useState } from 'react'
import { Undo2, ArrowLeft, ArrowRight } from 'lucide-react'
import SwipeCard from './SwipeCard.jsx'
import ShareSheet from './ShareSheet.jsx'
import NoteSheet from './NoteSheet.jsx'
import { buildDeck } from '../data/cards.js'
import { storage } from '../lib/storage.js'

// Type School swipe-stack per PRD §4.2. Full-bleed card stack, swipe-only
// gestures (no action buttons), first-time tutorial overlay with swipe hints.

export default function TypeSchool({ library, setLibrary }) {
  const [queue, setQueue] = useState(() => buildDeck())
  const [history, setHistory] = useState([])
  const [shareCard, setShareCard] = useState(null)
  const [noteCard, setNoteCard] = useState(null)
  const [showTutorial, setShowTutorial] = useState(
    () => !storage.get('seenSwipeTutorial', false)
  )
  const topCardRef = useRef(null)

  // Top up the queue when it runs low (PRD §4.2.3: pre-generate next cards)
  useEffect(() => {
    if (queue.length < 4) {
      setQueue((q) => [...q, ...buildDeck()])
    }
  }, [queue.length])

  const dismissTutorial = () => {
    if (!showTutorial) return
    setShowTutorial(false)
    storage.set('seenSwipeTutorial', true)
  }

  const top = queue[0]
  const behind = queue.slice(1, 3)

  const handleDecision = (_id, direction) => {
    const card = top
    if (!card) return
    dismissTutorial()
    setHistory((h) => [...h.slice(-9), { card, decision: direction }])
    if (direction === 'like') {
      setLibrary((lib) => ({
        ...lib,
        liked: dedupeById([card, ...lib.liked])
      }))
    }
    // Skipped cards just dismiss — we no longer keep a "not now" pile.
    setQueue((q) => q.slice(1))
  }

  const handleUndo = () => {
    const last = history[history.length - 1]
    if (!last) return
    setHistory((h) => h.slice(0, -1))
    setQueue((q) => [last.card, ...q])
    setLibrary((lib) => ({
      ...lib,
      liked: lib.liked.filter((c) => c.id !== last.card.id)
    }))
  }

  const handleNoteSave = ({ text, visibility }) => {
    if (!noteCard) return
    setLibrary((lib) => ({
      ...lib,
      notes: { ...lib.notes, [noteCard.id]: { text, visibility, updatedAt: Date.now() } }
    }))
  }

  return (
    <div className="flex flex-col h-full">
      <Header history={history} onUndo={handleUndo} />

      <div className="relative flex-1 min-h-0 px-4 pt-2 pb-4">
        <div className="relative mx-auto w-full max-w-[440px] h-full">
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
          {top && (
            <SwipeCard
              ref={topCardRef}
              key={top.id}
              card={top}
              depth={0}
              onDecision={handleDecision}
              onShare={(card) => setShareCard(card)}
              onNote={(card) => setNoteCard(card)}
              hasNote={!!library.notes[top.id]}
            />
          )}

          {showTutorial && top && (
            <TutorialOverlay onDismiss={dismissTutorial} />
          )}
        </div>
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

function Header({ history, onUndo }) {
  return (
    <div className="px-5 pt-4 pb-2 flex items-center justify-between">
      <div>
        <div className="font-display font-medium text-[26px] leading-none text-ink" style={{ letterSpacing: '-0.02em' }}>
          Type School
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted mt-1.5">
          {history.length === 0 ? 'a fresh stack' : `${history.length} read so far`}
        </div>
      </div>
      {history.length > 0 && (
        <button
          type="button"
          onClick={onUndo}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-muted hover:text-almost transition-colors"
          aria-label="Undo last swipe"
        >
          <Undo2 size={13} strokeWidth={2} />
          Undo
        </button>
      )}
    </div>
  )
}

function TutorialOverlay({ onDismiss }) {
  return (
    <button
      type="button"
      onClick={onDismiss}
      className="absolute inset-0 z-20 rounded-2xl flex flex-col items-center justify-center px-6 animate-fade-in cursor-pointer"
      style={{ background: 'rgba(13,10,7,0.88)', backdropFilter: 'blur(4px)' }}
      aria-label="Dismiss tutorial"
    >
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-5">
        how it works
      </div>
      <div className="font-display font-medium text-[30px] leading-[1.05] text-ink text-center" style={{ letterSpacing: '-0.02em' }}>
        Swipe right to like.<br />Swipe left to skip.
      </div>
      <div className="mt-8 flex items-center justify-between w-full max-w-[280px]">
        <div className="flex items-center gap-2.5 text-ink/60">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hair">
            <ArrowLeft size={18} strokeWidth={1.8} />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em]">Skip</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-almost">Like</span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-almost text-paper">
            <ArrowRight size={18} strokeWidth={1.8} />
          </span>
        </div>
      </div>
      <div className="mt-8 text-[11px] font-mono text-muted uppercase tracking-[0.15em]">
        tap anywhere to start
      </div>
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
