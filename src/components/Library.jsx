import { useState } from 'react'
import ShareSheet from './ShareSheet.jsx'
import NoteSheet from './NoteSheet.jsx'

// Liked library + Not Now pile per PRD §4.1, §4.2.4. Notes surface alongside cards.

export default function Library({ library, setLibrary }) {
  const [tab, setTab] = useState('liked')
  const [shareCard, setShareCard] = useState(null)
  const [noteCard, setNoteCard] = useState(null)

  const list = tab === 'liked' ? library.liked : library.notnow

  const handleNoteSave = ({ text, visibility }) => {
    if (!noteCard) return
    setLibrary((lib) => ({
      ...lib,
      notes: { ...lib.notes, [noteCard.id]: { text, visibility, updatedAt: Date.now() } }
    }))
  }

  const moveCard = (card) => {
    if (tab === 'liked') {
      setLibrary((lib) => ({
        ...lib,
        liked: lib.liked.filter((c) => c.id !== card.id),
        notnow: [card, ...lib.notnow.filter((c) => c.id !== card.id)]
      }))
    } else {
      setLibrary((lib) => ({
        ...lib,
        notnow: lib.notnow.filter((c) => c.id !== card.id),
        liked: [card, ...lib.liked.filter((c) => c.id !== card.id)]
      }))
    }
  }

  const removeCard = (card) => {
    setLibrary((lib) => ({
      ...lib,
      liked: lib.liked.filter((c) => c.id !== card.id),
      notnow: lib.notnow.filter((c) => c.id !== card.id)
    }))
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-8">
      <div className="px-5 pt-5">
        <div className="font-serif italic text-[24px] leading-none text-ink">Library</div>
        <div className="text-[13px] text-muted mt-1">
          The ones that clicked. And the ones that didn’t — yet.
        </div>
      </div>

      <div className="px-5 mt-4 flex items-center gap-2">
        <TabChip active={tab === 'liked'} onClick={() => setTab('liked')}>
          Liked · {library.liked.length}
        </TabChip>
        <TabChip active={tab === 'notnow'} onClick={() => setTab('notnow')}>
          Not now · {library.notnow.length}
        </TabChip>
      </div>

      <div className="px-5 mt-4 space-y-3">
        {list.length === 0 && <EmptyState tab={tab} />}
        {list.map((card) => (
          <SavedRow
            key={card.id}
            card={card}
            note={library.notes[card.id]}
            inLiked={tab === 'liked'}
            onShare={() => setShareCard(card)}
            onEditNote={() => setNoteCard(card)}
            onMove={() => moveCard(card)}
            onRemove={() => removeCard(card)}
          />
        ))}
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

function TabChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full border text-[13px] font-medium ${
        active ? 'bg-ink text-paper border-ink' : 'hair bg-white text-ink/70 hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}

function EmptyState({ tab }) {
  return (
    <div className="rounded-2xl border hair bg-white p-6 text-center">
      <div className="font-serif italic text-[18px] leading-snug text-ink">
        {tab === 'liked' ? 'Nothing here yet.' : 'Nothing skipped — yet.'}
      </div>
      <div className="text-[13px] text-muted mt-2">
        {tab === 'liked'
          ? 'Swipe right on cards that click. They’ll land here with your notes.'
          : 'Cards you skip go here. No judgment. Revisit anytime.'}
      </div>
    </div>
  )
}

function SavedRow({ card, note, inLiked, onShare, onEditNote, onMove, onRemove }) {
  return (
    <div className="rounded-2xl border hair bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-ink/5 border hair text-[11px] font-medium text-ink/70">
          <span className="h-1.5 w-1.5 rounded-full bg-almost" />
          {card.tag}
        </span>
        <span className="text-[11px] text-muted font-mono">
          {inLiked ? 'Liked' : 'Not now'}
        </span>
      </div>
      <div className="font-serif italic text-[18px] leading-snug text-ink mt-2">{card.title}</div>
      <div className="text-[13px] text-ink/75 mt-1">try: {card.tip}</div>
      {note?.text && (
        <div className="mt-3 rounded-xl bg-[#FFF8E7] border border-[#F2E2A8] p-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#7A6E2A] mb-1">
            {note.visibility === 'public' ? 'Public note' : 'Your note'}
          </div>
          <div className="text-[13px] leading-snug text-ink/85">{note.text}</div>
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <SmallBtn onClick={onEditNote}>
          {note?.text ? 'Edit note' : 'Add note'}
        </SmallBtn>
        <SmallBtn onClick={onShare}>Share</SmallBtn>
        <SmallBtn onClick={onMove}>
          {inLiked ? 'Move to Not now' : 'Move to Liked'}
        </SmallBtn>
        <SmallBtn onClick={onRemove} danger>
          Remove
        </SmallBtn>
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
