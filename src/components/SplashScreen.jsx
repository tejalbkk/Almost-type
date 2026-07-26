import { ArrowRight, Eye } from 'lucide-react'

// Splash / welcome screen — first-run only.
// Ref: dark-to-orange gradient with mono tick marks, decorative axes,
// big display headline with pill accents, circular controls at bottom.

export default function SplashScreen({ onStart }) {
  return (
    <div className="absolute inset-0 z-40 overflow-hidden animate-fade-in">
      {/* Base — dark top → deep orange bottom via layered gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 80% 100%, #C24A18 0%, #7A2C0A 30%, #1A0F0A 70%, #0D0A07 100%)'
        }}
      />

      {/* Cross-axis decorative lines — vertical + horizontal at 50% */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{ background: 'rgba(238,229,206,0.06)' }}
        />
        <div
          className="absolute top-[42%] left-0 right-0 h-px"
          style={{ background: 'rgba(238,229,206,0.06)' }}
        />
      </div>

      {/* Left-side mono ticks (rotated) */}
      <div className="absolute left-4 top-[22%] flex flex-col gap-6 pointer-events-none">
        <span
          className="text-[10px] font-mono tracking-[0.15em] text-ink/40"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          0921
        </span>
        <span
          className="text-[10px] font-mono tracking-[0.15em] text-ink/40"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          XIO
        </span>
      </div>

      {/* Content — headline sits bottom-left */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-32 pt-12">
        <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink/50 mb-3">
          Welcome
        </div>
        <h1
          className="font-display leading-[1.05] text-ink"
          style={{ fontSize: 'clamp(38px, 10vw, 52px)', fontWeight: 400 }}
        >
          Typography,{' '}
          <span
            className="inline-block align-middle rounded-full border mx-1"
            style={{
              width: '46px',
              height: '18px',
              borderColor: 'rgba(238,229,206,0.35)'
            }}
            aria-hidden
          />
          <br />
          one swipe{' '}
          <span
            className="inline-block align-middle rounded-full border mx-1"
            style={{
              width: '46px',
              height: '18px',
              borderColor: 'rgba(238,229,206,0.35)'
            }}
            aria-hidden
          />{' '}
          at a{' '}
          <span className="font-semibold" style={{ color: '#EEE5CE' }}>
            time
          </span>
          <span
            className="inline-block align-middle rounded-full border ml-1"
            style={{
              width: '46px',
              height: '18px',
              borderColor: 'rgba(238,229,206,0.35)'
            }}
            aria-hidden
          />
        </h1>
      </div>

      {/* Bottom row — small info + big forward button */}
      <div className="absolute bottom-8 inset-x-0 flex items-center justify-between px-6 z-10">
        <button
          type="button"
          onClick={() => onStart('critique')}
          aria-label="Roast my design (Type Critique)"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
          style={{
            background: 'rgba(238,229,206,0.08)',
            borderColor: 'rgba(238,229,206,0.2)',
            color: '#EEE5CE',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
        >
          <Eye size={18} strokeWidth={1.6} />
        </button>

        <button
          type="button"
          onClick={() => onStart('lessons')}
          aria-label="Start with Lessons"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full transition-transform hover:scale-105"
          style={{
            background: '#EEE5CE',
            color: '#0D0A07',
            boxShadow: '0 8px 24px -4px rgba(0,0,0,0.35)'
          }}
        >
          <ArrowRight size={22} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  )
}
