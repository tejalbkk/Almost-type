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
  const [expandedId, setExpandedId] = useState(null)
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
    } else {
      setLibrary((lib) => ({
        ...lib,
        notnow: dedupeById([card, ...lib.notnow])
      }))
    }
    setQueue((q) => q.slice(1))
    setExpandedId(null)
  }

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
              expanded={expandedId === top.id}
              onExpandToggle={(id) => setExpandedId((e) => (e === id ? null : id))}
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
    <div className="px-5 pt-3 pb-2 flex items-center justify-between">
      <div>
        <div className="font-display font-semibold text-[22px] leading-none text-ink">
          Type School
        </div>
        <div className="text-[11px] font-mono uppercase tracking-widest text-muted mt-1">
          {history.length === 0 ? 'a fresh stack' : `${history.length} read so far`}
        </div>
      </div>
      {history.length > 0 && (
        <button
          type="button"
          onClick={onUndo}
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink/60 hover:text-ink"
          aria-label="Undo last swipe"
        >
          <Undo2 size={14} strokeWidth={2} />
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
      className="absolute inset-0 z-20 rounded-3xl bg-ink/40 backdrop-blur-[2px] flex flex-col items-center justify-center px-6 animate-fade-in cursor-pointer"
      aria-label="Dismiss tutorial"
    >
      <div className="text-[11px] font-mono uppercase tracking-widest text-paper/80 mb-4">
        how it works
      </div>
      <div className="font-display font-semibold text-[28px] leading-[1.1] text-paper text-center">
        Swipe right to like.<br />Swipe left to skip.
      </div>
      <div className="mt-7 flex items-center justify-between w-full max-w-[300px]">
        <div className="flex items-center gap-2 text-paper">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 border border-paper/30">
            <ArrowLeft size={20} strokeWidth={2.2} />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest">Skip</span>
        </div>
        <div className="flex items-center gap-2 text-paper">
          <span className="font-mono text-[11px] uppercase tracking-widest">Like</span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-almost border border-almost text-paper">
            <ArrowRight size={20} strokeWidth={2.2} />
          </span>
        </div>
      </div>
      <div className="mt-8 text-[12px] text-paper/70 font-medium">
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
