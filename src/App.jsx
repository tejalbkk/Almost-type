import { useEffect, useState } from 'react'
import BottomNav from './components/BottomNav.jsx'
import TypeSchool from './components/TypeSchool.jsx'
import FontFinder from './components/FontFinder.jsx'
import TypeCritique from './components/TypeCritique.jsx'
import Library from './components/Library.jsx'
import ColorPalettes from './components/ColorPalettes.jsx'
import SplashScreen from './components/SplashScreen.jsx'
import { storage } from './lib/storage.js'

// Global app shell — pinned nav at bottom via 100dvh viewport lock.
// Four core tabs: Lessons / Fonts / Color palate / Saved.
// Critique remains reachable from the Splash CTA (not in nav).

const emptyLibrary = { liked: [], likedQuestions: [], notes: {} }

function normalizeLibrary(raw) {
  return {
    liked: Array.isArray(raw?.liked) ? raw.liked : [],
    likedQuestions: Array.isArray(raw?.likedQuestions) ? raw.likedQuestions : [],
    notes: raw?.notes && typeof raw.notes === 'object' ? raw.notes : {}
  }
}

export default function App() {
  const [tab, setTab] = useState('lessons')
  const [library, setLibrary] = useState(() => normalizeLibrary(storage.get('library', emptyLibrary)))
  const [seenIntro, setSeenIntro] = useState(() => storage.get('seenIntro', false))

  useEffect(() => {
    storage.set('library', library)
  }, [library])

  useEffect(() => {
    storage.set('seenIntro', seenIntro)
  }, [seenIntro])

  return (
    <div
      className="flex justify-center overflow-hidden"
      style={{ height: '100dvh' }}
    >
      <div className="w-full max-w-[480px] h-full flex flex-col bg-paper border-x hair relative overflow-hidden">
        <TopBar tab={tab} />
        <main className="flex-1 min-h-0 overflow-hidden">
          {tab === 'lessons' && <TypeSchool library={library} setLibrary={setLibrary} />}
          {tab === 'finder' && <FontFinder />}
          {tab === 'palettes' && <ColorPalettes />}
          {tab === 'critique' && <TypeCritique />}
          {tab === 'saved' && <Library library={library} setLibrary={setLibrary} />}
        </main>
        <BottomNav tab={tab} onChange={setTab} />
        {!seenIntro && (
          <SplashScreen
            onStart={(t) => {
              setSeenIntro(true)
              if (t) setTab(t)
            }}
          />
        )}
      </div>
    </div>
  )
}

function TopBar({ tab }) {
  const labels = {
    lessons: 'lessons',
    finder: 'fonts',
    palettes: 'color palate',
    critique: 'critique',
    saved: 'saved'
  }
  return (
    <div className="safe-top px-5 pb-2 flex items-center justify-between border-b hair shrink-0">
      <div className="flex items-baseline gap-[2px]">
        <span className="font-logo font-light italic text-[22px] text-ink/90 leading-none">almost,</span>
        <span className="font-logo font-semibold text-[22px] text-almost leading-none"> type.</span>
      </div>
      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted">
        {labels[tab]}
      </span>
    </div>
  )
}
