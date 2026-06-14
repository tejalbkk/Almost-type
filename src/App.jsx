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

const emptyLibrary = { liked: [], likedQuestions: [], notes: {} }

function normalizeLibrary(raw) {
  return {
    liked: Array.isArray(raw?.liked) ? raw.liked : [],
    likedQuestions: Array.isArray(raw?.likedQuestions) ? raw.likedQuestions : [],
    notes: raw?.notes && typeof raw.notes === 'object' ? raw.notes : {}
  }
}

export default function App() {
  const [tab, setTab] = useState('school')
  const [library, setLibrary] = useState(() => normalizeLibrary(storage.get('library', emptyLibrary)))
  const [seenIntro, setSeenIntro] = useState(() => storage.get('seenIntro', false))

  // Wrapper so EyeTraining can update likedQuestions in isolation.
  const setLikedQuestions = (updater) => {
    setLibrary((lib) => ({
      ...lib,
      likedQuestions:
        typeof updater === 'function' ? updater(lib.likedQuestions || []) : updater
    }))
  }

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
          {tab === 'eye' && (
            <EyeTraining
              likedQuestions={library.likedQuestions}
              setLikedQuestions={setLikedQuestions}
            />
          )}
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
    <div className="safe-top px-5 pb-2 flex items-center justify-between border-b hair">
      <div className="flex items-baseline gap-[2px]">
        <span className="font-logo font-light italic text-[22px] text-ink/90 leading-none">almost,</span>
        <span className="font-logo font-semibold text-[22px] text-almost leading-none"> type.</span>
      </div>
      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted">{labels[tab]}</span>
    </div>
  )
}

function Intro({ onDone, onStart }) {
  return (
    <div className="absolute inset-0 z-40 bg-paper flex flex-col animate-fade-in overflow-hidden">
      {/* Decorative background element */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 70%, rgba(255,91,58,0.07) 0%, transparent 70%)'
        }}
      />

      <div className="flex-1 flex flex-col justify-center px-7 pt-16 pb-6 relative z-10">
        {/* Wordmark — centrepiece of the intro */}
        <div className="mb-8">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted mb-5">
            v1.0 · typography
          </div>
          <h1 className="font-display font-light italic leading-[0.92]" style={{ fontSize: 'clamp(58px, 18vw, 80px)' }}>
            <span className="text-ink">almost,</span>
            <br />
            <span className="text-almost font-semibold not-italic">type.</span>
          </h1>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-almost mb-6" />

        {/* Tagline */}
        <p className="text-[15px] leading-[1.6] text-ink/65 max-w-[30ch] font-light mb-10">
          Typography, one swipe at a time. No login. No homework. Just the muscle your designer friend built over years — compressed.
        </p>

        {/* CTAs */}
        <div className="space-y-2.5">
          <IntroBtn primary onClick={() => onStart('school')}>
            Start swiping
          </IntroBtn>
          <div className="grid grid-cols-2 gap-2.5">
            <IntroBtn onClick={() => onStart('finder')}>Find fonts</IntroBtn>
            <IntroBtn onClick={() => onStart('critique')}>Roast my design</IntroBtn>
          </div>
        </div>
      </div>

      <div className="pb-8 text-center relative z-10">
        <p className="text-[11px] font-mono text-muted/60 uppercase tracking-[0.15em]">
          No account · works in browser
        </p>
      </div>
    </div>
  )
}

function IntroBtn({ children, onClick, primary }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full py-3.5 rounded-xl text-[13px] font-medium tracking-wide transition-all ${
        primary
          ? 'bg-almost text-paper hover:bg-almost/90 shadow-glow'
          : 'border hair bg-surface text-ink/70 hover:text-ink hover:border-ink/20'
      }`}
    >
      {children}
    </button>
  )
}
