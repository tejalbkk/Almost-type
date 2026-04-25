import { useEffect, useState } from 'react'
import BottomNav from './components/BottomNav.jsx'
import TypeSchool from './components/TypeSchool.jsx'
import FontFinder from './components/FontFinder.jsx'
import TypeCritique from './components/TypeCritique.jsx'
import EyeTraining from './components/EyeTraining.jsx'
import Library from './components/Library.jsx'
import { storage } from './lib/storage.js'

// Global status-bar-style app shell. Designed for a 390px phone canvas
// per PRD §6.1. Desktop falls back to a centred column that keeps the
// phone-native feel.

const emptyLibrary = { liked: [], notnow: [], notes: {} }

export default function App() {
  const [tab, setTab] = useState('school')
  const [library, setLibrary] = useState(() => storage.get('library', emptyLibrary))
  const [seenIntro, setSeenIntro] = useState(() => storage.get('seenIntro', false))

  // v1.1 preview: persist liked/notes to localStorage. Safe to ship now.
  useEffect(() => {
    storage.set('library', library)
  }, [library])

  useEffect(() => {
    storage.set('seenIntro', seenIntro)
  }, [seenIntro])

  return (
    <div className="min-h-full bg-paper flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen flex flex-col bg-paper border-x hair relative">
        <TopBar tab={tab} />
        <main className="flex-1 min-h-0">
          {tab === 'school' && <TypeSchool library={library} setLibrary={setLibrary} />}
          {tab === 'finder' && <FontFinder />}
          {tab === 'critique' && <TypeCritique />}
          {tab === 'eye' && <EyeTraining />}
          {tab === 'library' && <Library library={library} setLibrary={setLibrary} />}
        </main>
        <BottomNav tab={tab} onChange={setTab} />
        {!seenIntro && <Intro onDone={() => setSeenIntro(true)} onStart={(t) => { setSeenIntro(true); setTab(t) }} />}
      </div>
    </div>
  )
}

function TopBar({ tab }) {
  const labels = {
    school: 'type school',
    finder: 'font finder',
    critique: 'type critique',
    eye: 'eye training',
    library: 'library'
  }
  return (
    <div className="safe-top px-5 pb-1 flex items-center justify-between">
      <div className="flex items-baseline gap-2">
        <span className="font-display italic text-[18px] text-ink leading-none">almost,</span>
        <span className="font-display italic text-[18px] text-almost leading-none">type.</span>
      </div>
      <span className="text-[11px] font-mono uppercase tracking-widest text-muted">{labels[tab]}</span>
    </div>
  )
}

function Intro({ onDone, onStart }) {
  return (
    <div className="absolute inset-0 z-40 bg-paper flex flex-col p-6 animate-fade-in">
      <div className="mt-auto mb-auto">
        <div className="text-[11px] font-mono uppercase tracking-widest text-muted mb-3">
          almost, type.
        </div>
        <h1 className="font-display italic text-[44px] leading-[1.02] text-ink">
          you're learning.<br />it shows.
        </h1>
        <p className="font-display italic text-[22px] text-almost mt-2">that's the point.</p>
        <p className="text-[15px] leading-snug text-ink/75 mt-5 max-w-[32ch]">
          Typography, one swipe at a time. No login. No homework. Just the muscle your designer friend built over years — compressed.
        </p>

        <div className="mt-8 space-y-2">
          <IntroBtn primary onClick={() => onStart('school')}>
            Start swiping
          </IntroBtn>
          <IntroBtn onClick={() => onStart('finder')}>Find fonts for a project</IntroBtn>
          <IntroBtn onClick={() => onStart('critique')}>Roast my design</IntroBtn>
        </div>
      </div>
      <div className="text-[11px] text-muted text-center">
        No account needed. Works in your browser.
      </div>
    </div>
  )
}

function IntroBtn({ children, onClick, primary }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full py-3.5 rounded-2xl text-[14px] font-medium ${
        primary ? 'bg-ink text-paper' : 'border hair bg-white text-ink/80 hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}
