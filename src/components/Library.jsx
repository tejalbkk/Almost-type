import { useState } from 'react'
import { Heart, HelpCircle, ChevronDown } from 'lucide-react'
import ShareSheet from './ShareSheet.jsx'
import NoteSheet from './NoteSheet.jsx'
import EyeShareSheet from './EyeShareSheet.jsx'

// Library — what you saved.
//   Tab 1 (heart icon + count): cards you swiped right on in Type School
//   Tab 2 (Liked Questions):   questions you liked in Eye Training
//
// Tapping a saved card expands it to show body + read-more.

export default function Library({ library, setLibrary }) {
  const [tab, setTab] = useState('cards')
  const [shareCard, setShareCard] = useState(null)
  const [noteCard, setNoteCard] = useState(null)
  const [shareQuestion, setShareQuestion] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  const handleNoteSave = ({ text, visibility }) => {
    if (!noteCard) return
    setLibrary((lib) => ({
      ...lib,
      notes: { ...lib.notes, [noteCard.id]: { text, visibility, updatedAt: Date.now() } }
    }))
  }

  const deleteCard = (card) => {
    setLibrary((lib) => ({
      ...lib,
      liked: lib.liked.filter((c) => c.id !== card.id)
    }))
    if (expandedId === card.id) setExpandedId(null)
  }

  const deleteQuestion = (q) => {
    setLibrary((lib) => ({
      ...lib,
      likedQuestions: (lib.likedQuestions || []).filter((x) => x.id !== q.id)
    }))
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-8">
      <div className="px-5 pt-5">
        <div
          className="font-display font-medium text-[26px] leading-none text-ink"
          style={{ letterSpacing: '-0.02em' }}
        >
          Library
        </div>
        <div className="text-[13px] text-muted mt-1.5 font-light">
          The ones that clicked. From swipes and from Eye Training.
        </div>
      </div>

      <div className="px-5 mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setTab('cards')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
            tab === 'cards'
              ? 'bg-almost border-almost'
              : 'border-hair bg-surface hover:border-ink/20'
          }`}
        >
          <Heart
            size={14}
            strokeWidth={2.2}
            fill={tab === 'cards' ? '#0D0A07' : '#FF5B3A'}
            color={tab === 'cards' ? '#0D0A07' : '#FF5B3A'}
          />
          <span
            className="text-[12px] font-mono font-medium"
            style={{ color: tab === 'cards' ? '#0D0A07' : '#A89C7F' }}
          >
            {library.liked.length}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setTab('questions')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-mono uppercase tracking-[0.12em] transition-colors ${
            tab === 'questions'
              ? 'bg-almost text-paper border-almost'
              : 'border-hair bg-surface text-muted hover:text-ink hover:border-ink/20'
          }`}
        >
          <HelpCircle size={14} strokeWidth={2} />
          <span>Liked Questions · {(library.likedQuestions || []).length}</span>
        </button>
      </div>

      <div className="px-5 mt-4 space-y-3">
        {tab === 'cards' && library.liked.length === 0 && <EmptyCards />}
        {tab === 'cards' &&
          library.liked.map((card) => (
            <SavedCardRow
              key={card.id}
              card={card}
              note={library.notes[card.id]}
              expanded={expandedId === card.id}
              onToggle={() =>
                setExpandedId((prev) => (prev === card.id ? null : card.id))
              }
              onShare={() => setShareCard(card)}
              onEditNote={() => setNoteCard(card)}
              onDelete={() => deleteCard(card)}
            />
          ))}

        {tab === 'questions' && (library.likedQuestions || []).length === 0 && (
          <EmptyQuestions />
        )}
        {tab === 'questions' &&
          (library.likedQuestions || []).map((q) => (
            <SavedQuestionRow
              key={q.id}
              question={q}
              onShare={() => setShareQuestion(q)}
              onDelete={() => deleteQuestion(q)}
            />
          ))}
      </div>

      {shareCard && <ShareSheet card={shareCard} onClose={() => setShareCard(null)} />}
      {shareQuestion && (
        <EyeShareSheet round={shareQuestion} onClose={() => setShareQuestion(null)} />
      )}
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

function EmptyCards() {
  return (
    <div className="rounded-xl border border-hair bg-surface p-6 text-center">
      <div
        className="font-display font-medium text-[19px] leading-snug text-ink"
        style={{ letterSpacing: '-0.01em' }}
      >
        Nothing here yet.
      </div>
      <div className="text-[13px] text-muted mt-2 font-light">
        Swipe right on cards in Type School. They'll land here with your notes.
      </div>
    </div>
  )
}

function EmptyQuestions() {
  return (
    <div className="rounded-xl border border-hair bg-surface p-6 text-center">
      <div
        className="font-display font-medium text-[19px] leading-snug text-ink"
        style={{ letterSpacing: '-0.01em' }}
      >
        No saved questions yet.
      </div>
      <div className="text-[13px] text-muted mt-2 font-light">
        Tap the heart on a question in Eye Training to keep it for later.
      </div>
    </div>
  )
}

function SavedCardRow({ card, note, expanded, onToggle, onShare, onEditNote, onDelete }) {
  // Buttons should not trigger expand toggle
  const stop = (fn) => (e) => {
    e.stopPropagation()
    fn?.()
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle?.()
        }
      }}
      className="rounded-xl border border-hair bg-surface p-4 cursor-pointer hover:border-ink/20 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-almost/30 bg-almost/[0.08] text-[10px] font-mono uppercase tracking-[0.12em] text-almost">
          <span className="h-1.5 w-1.5 rounded-full bg-almost" />
          {card.tag}
        </span>
        <Heart size={13} strokeWidth={2} fill="#FF5B3A" color="#FF5B3A" />
      </div>

      <div
        className="font-display font-medium text-[19px] leading-snug text-ink mt-2"
        style={{ letterSpacing: '-0.01em' }}
      >
        {card.title}
      </div>

      {!expanded && (
        <div className="text-[12.5px] text-muted mt-1 font-light">try: {card.tip}</div>
      )}

      {expanded && (
        <div className="animate-fade-in">
          {/* Full body */}
          <p
            className="text-[13.5px] leading-[1.6] mt-2 font-light"
            style={{ color: 'rgba(238,229,206,0.78)' }}
          >
            {card.body}
          </p>

          {/* Try block — deep burnt-orange, flat */}
          <div
            className="rounded-lg mt-3 p-3 relative overflow-hidden"
            style={{
              background: '#8E2B03',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div
              className="text-[9px] font-mono uppercase tracking-[0.2em] mb-1"
              style={{ color: 'rgba(206,206,206,0.7)' }}
            >
              try this
            </div>
            <div
              className="text-[13px] leading-snug font-medium"
              style={{ color: '#cecece' }}
            >
              {card.tip}
            </div>
          </div>

          {/* Optional deeper read */}
          {card.readMore && (
            <div
              className="text-[12.5px] leading-[1.65] mt-3 pt-3 font-light"
              style={{
                borderTop: '1px solid rgba(238,229,206,0.08)',
                color: 'rgba(238,229,206,0.65)'
              }}
            >
              {card.readMore}
            </div>
          )}
        </div>
      )}

      {note?.text && (
        <div className="mt-3 rounded-lg bg-raised border border-hair p-3">
          <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted mb-1">
            {note.visibility === 'public' ? 'Public note' : 'Your note'}
          </div>
          <div className="text-[12.5px] leading-snug text-ink/75 font-light">{note.text}</div>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <SmallBtn onClick={stop(onEditNote)}>{note?.text ? 'Edit note' : 'Add note'}</SmallBtn>
        <SmallBtn onClick={stop(onShare)}>Share</SmallBtn>
        <SmallBtn onClick={stop(onDelete)} danger>Delete</SmallBtn>

        <span
          className="ml-auto inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.12em] text-muted/70"
          aria-hidden
        >
          <ChevronDown
            size={12}
            strokeWidth={2}
            className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
          {expanded ? 'Less' : 'Tap to read'}
        </span>
      </div>
    </div>
  )
}

function SavedQuestionRow({ question, onShare, onDelete }) {
  return (
    <div className="rounded-xl border border-hair bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-almost/30 bg-almost/[0.08] text-[10px] font-mono uppercase tracking-[0.12em] text-almost">
          <span className="h-1.5 w-1.5 rounded-full bg-almost" />
          {question.topic}
        </span>
        <Heart size={13} strokeWidth={2} fill="#FF5B3A" color="#FF5B3A" />
      </div>
      <div
        className="font-display font-medium text-[18px] leading-snug text-ink mt-2"
        style={{ letterSpacing: '-0.01em' }}
      >
        {question.prompt}
      </div>
      <div className="text-[12px] text-muted mt-1 font-light">
        <span className="font-mono uppercase text-[9px] tracking-[0.15em] text-muted/70 mr-1.5">
          Answer · {question.correct}
        </span>
        {question.why}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <SmallBtn onClick={onShare}>Share</SmallBtn>
        <SmallBtn onClick={onDelete} danger>Delete</SmallBtn>
      </div>
    </div>
  )
}

function SmallBtn({ children, onClick, danger }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2.5 py-1 rounded-full border text-[10px] font-mono uppercase tracking-[0.1em] transition-colors ${
        danger
          ? 'border-danger/30 bg-danger-bg text-danger hover:border-danger'
          : 'border-hair bg-raised text-muted hover:text-ink hover:border-ink/20'
      }`}
    >
      {children}
    </button>
  )
}
