import { useState } from 'react'
import { Heart, HelpCircle } from 'lucide-react'
import ShareSheet from './ShareSheet.jsx'
import NoteSheet from './NoteSheet.jsx'
import EyeShareSheet from './EyeShareSheet.jsx'

// Library — what you saved.
//   Tab 1 (heart icon, Liked cards): cards you swiped right on in Type School
//   Tab 2 (Liked Questions): questions you liked in Eye Training
//
// We dropped "Not now" — skipped cards are gone forever.

export default function Library({ library, setLibrary }) {
  const [tab, setTab] = useState('cards')
  const [shareCard, setShareCard] = useState(null)
  const [noteCard, setNoteCard] = useState(null)
  const [shareQuestion, setShareQuestion] = useState(null)

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
        <div className="font-serif font-semibold text-[24px] leading-none text-ink">Library</div>
        <div className="text-[13px] text-muted mt-1">
          The ones that clicked. From swipes and from Eye Training.
        </div>
      </div>

      <div className="px-5 mt-4 flex items-center gap-2">
        <TabChip active={tab === 'cards'} onClick={() => setTab('cards')}>
          <Heart
            size={14}
            strokeWidth={2.2}
            fill="#FF5B3A"
            color="#FF5B3A"
            className="mr-0"
          />
          <span className="text-[13px]">{library.liked.length}</span>
        </TabChip>
        <TabChip active={tab === 'questions'} onClick={() => setTab('questions')}>
          <HelpCircle size={14} strokeWidth={2} />
          <span>Liked Questions · {(library.likedQuestions || []).length}</span>
        </TabChip>
      </div>

      <div className="px-5 mt-4 space-y-3">
        {tab === 'cards' && library.liked.length === 0 && <EmptyCards />}
        {tab === 'cards' &&
          library.liked.map((card) => (
            <SavedCardRow
              key={card.id}
              card={card}
              note={library.notes[card.id]}
              onShare={() => setShareCard(card)}
              onEditNote={() => setNoteCard(card)}
              onDelete={() => deleteCard(card)}
            />
          ))}

        {tab === 'questions' && (library.likedQuestions || []).length === 0 && <EmptyQuestions />}
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
      {shareQuestion && <EyeShareSheet round={shareQuestion} onClose={() => setShareQuestion(null)} />}
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

function TabChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[13px] font-medium ${
        active ? 'bg-ink text-paper border-ink' : 'hair bg-white text-ink/70 hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}

function EmptyCards() {
  return (
    <div className="rounded-2xl border hair bg-white p-6 text-center">
      <div className="font-serif font-semibold text-[18px] leading-snug text-ink">
        Nothing here yet.
      </div>
      <div className="text-[13px] text-muted mt-2">
        Swipe right on cards in Type School. They'll land here with your notes.
      </div>
    </div>
  )
}

function EmptyQuestions() {
  return (
    <div className="rounded-2xl border hair bg-white p-6 text-center">
      <div className="font-serif font-semibold text-[18px] leading-snug text-ink">
        No saved questions yet.
      </div>
      <div className="text-[13px] text-muted mt-2">
        Tap the heart on a question in Eye Training to keep it for later.
      </div>
    </div>
  )
}

function SavedCardRow({ card, note, onShare, onEditNote, onDelete }) {
  return (
    <div className="rounded-2xl border hair bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-ink/5 border hair text-[11px] font-medium text-ink/70">
          <span className="h-1.5 w-1.5 rounded-full bg-almost" />
          {card.tag}
        </span>
        <Heart size={14} strokeWidth={2.2} fill="#FF5B3A" color="#FF5B3A" />
      </div>
      <div className="font-serif font-semibold text-[18px] leading-snug text-ink mt-2">{card.title}</div>
      <div className="text-[13px] text-ink/75 mt-1">try: {card.tip}</div>
      {note?.text && (
        <div className="mt-3 rounded-xl bg-warning-bg border border-warning-mid p-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-warning mb-1">
            {note.visibility === 'public' ? 'Public note' : 'Your note'}
          </div>
          <div className="text-[13px] leading-snug text-ink/85">{note.text}</div>
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <SmallBtn onClick={onEditNote}>{note?.text ? 'Edit note' : 'Add note'}</SmallBtn>
        <SmallBtn onClick={onShare}>Share</SmallBtn>
        <SmallBtn onClick={onDelete} danger>Delete</SmallBtn>
      </div>
    </div>
  )
}

function SavedQuestionRow({ question, onShare, onDelete }) {
  return (
    <div className="rounded-2xl border hair bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-ink/5 border hair text-[11px] font-medium text-ink/70">
          <span className="h-1.5 w-1.5 rounded-full bg-almost" />
          {question.topic}
        </span>
        <Heart size={14} strokeWidth={2.2} fill="#FF5B3A" color="#FF5B3A" />
      </div>
      <div className="font-serif font-semibold text-[17px] leading-snug text-ink mt-2">{question.prompt}</div>
      <div className="text-[12.5px] text-ink/70 mt-1">
        <span className="font-mono uppercase text-[10px] tracking-widest text-muted mr-1.5">Answer · {question.correct}</span>
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
      className={`px-2.5 py-1 rounded-full border text-[12px] font-medium ${
        danger ? 'hair bg-white text-ink/60 hover:text-[#A0422A]' : 'hair bg-white text-ink/70 hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}
