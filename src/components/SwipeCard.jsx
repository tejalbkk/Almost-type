import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'
import { MessageCircle, Share2 } from 'lucide-react'

// Pointer-events based card drag with spring physics.
//
// Spec (per design ref):
//  - Drag the card and it tilts up to 15° in direction of motion
//  - Release without threshold → spring snap back (~0.3 bounce) via
//    cubic-bezier(0.34, 1.56, 0.64, 1) — overshoots ~12% then settles
//  - Release past threshold → quick exit, no bounce
//
// Gesture arbitration: touch-action: pan-y on the card lets the browser
// handle vertical scroll inside the card. We only capture horizontal
// swipes once dx beats dy past a small dead zone.

const THRESHOLD = 70
const DIRECTION_LOCK_PX = 6
const ROTATION_PER_PX = 1 / 9 // 9px of drag = 1° tilt; caps at 15°
const ROTATION_MAX = 15

const SPRING_TRANSITION = 'transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1)'
const FLY_TRANSITION = 'transform 320ms cubic-bezier(0.4, 0, 0.2, 1)'

const SwipeCard = forwardRef(function SwipeCard(
  {
    card,
    depth = 0, // 0 = front, 1/2 = background
    onDecision, // (id, 'like' | 'notnow') => void
    onExpandToggle,
    expanded = false,
    onShare,
    onNote,
    hasNote = false
  },
  ref
) {
  const rootRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [dx, setDx] = useState(0)
  const pointerStart = useRef({ x: 0, y: 0, id: null, locked: false, decided: 'pending' })
  const decidedRef = useRef(false)

  const isFront = depth === 0

  const reset = () => {
    setDragging(false)
    setDx(0)
  }

  const flyOut = (direction) => {
    if (decidedRef.current) return
    decidedRef.current = true
    const width = rootRef.current?.offsetWidth || 400
    const target = direction === 'like' ? width * 1.4 : -width * 1.4
    setDragging(false)
    setDx(target)
    window.setTimeout(() => {
      onDecision?.(card.id, direction)
    }, 320)
  }

  useImperativeHandle(
    ref,
    () => ({
      fly: (direction) => flyOut(direction)
    }),
    [card?.id]
  )

  const handlePointerDown = (e) => {
    if (!isFront) return
    if (e.target.closest('[data-nodrag]')) return
    pointerStart.current = {
      x: e.clientX,
      y: e.clientY,
      id: e.pointerId,
      locked: false,
      decided: 'pending'
    }
    setDragging(true)
  }

  const handlePointerMove = (e) => {
    if (!isFront || !dragging) return
    if (pointerStart.current.id !== e.pointerId) return

    const dxRaw = e.clientX - pointerStart.current.x
    const dyRaw = e.clientY - pointerStart.current.y

    if (!pointerStart.current.locked) {
      const absX = Math.abs(dxRaw)
      const absY = Math.abs(dyRaw)
      // Wait for a small dead-zone before committing to the swipe
      if (absX < DIRECTION_LOCK_PX && absY < DIRECTION_LOCK_PX) return
      // No inner scroll to defer to — always lock into swipe
      pointerStart.current.locked = true
      pointerStart.current.decided = 'swipe'
      try {
        rootRef.current?.setPointerCapture?.(e.pointerId)
      } catch {
        /* noop */
      }
    }

    setDx(dxRaw)
  }

  const handlePointerEnd = () => {
    if (!isFront) return
    if (pointerStart.current.decided !== 'swipe') {
      reset()
      return
    }
    if (Math.abs(dx) > THRESHOLD) {
      flyOut(dx > 0 ? 'like' : 'notnow')
    } else {
      reset()
    }
  }

  useEffect(() => {
    decidedRef.current = false
    setDx(0)
  }, [card?.id])

  // 15° max tilt, proportional to drag distance
  const rotation = Math.max(-ROTATION_MAX, Math.min(ROTATION_MAX, dx * ROTATION_PER_PX))
  const stampLikeOpacity = Math.min(1, Math.max(0, dx / 90))
  const stampSkipOpacity = Math.min(1, Math.max(0, -dx / 90))

  // Background cards stack: slight scale + vertical offset + subtle tint
  const bgAlpha = depth > 0 ? Math.max(0, 1 - depth * 0.15) : 1

  // Pick the right release transition based on whether we're flying out or snapping back
  const releaseTransition = decidedRef.current ? FLY_TRANSITION : SPRING_TRANSITION

  const baseStyle = {
    transform: `translate3d(${dx}px, ${depth * 10}px, 0) rotate(${rotation}deg) scale(${1 - depth * 0.045})`,
    transition: dragging ? 'none' : releaseTransition,
    zIndex: 30 - depth,
    opacity: bgAlpha,
    pointerEvents: isFront ? 'auto' : 'none',
    willChange: 'transform'
  }

  // Card surface — vertical linear gradient from deep blue-black to burnt
  // orange, with a subtle warm outer glow that picks up the body gradient.
  const cardStyle = {
    background: 'linear-gradient(180deg, #010013 0%, #551E01 100%)',
    border: '1px solid rgba(255, 91, 58, 0.12)',
    boxShadow:
      '0 24px 60px -16px rgba(85, 30, 1, 0.55), 0 8px 24px -8px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)'
  }

  return (
    <div
      ref={rootRef}
      className={`swipe-surface absolute inset-0 select-none rounded-3xl overflow-hidden ${
        isFront ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
      style={{ ...baseStyle, ...cardStyle }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      aria-hidden={!isFront}
    >
      {/* Liked stamp */}
      {isFront && (
        <div
          className="pointer-events-none absolute top-5 left-5 z-10 rotate-[-12deg] px-3 py-1 rounded font-mono uppercase tracking-widest text-almost text-sm font-medium"
          style={{
            opacity: stampLikeOpacity,
            border: '2px solid #FF5B3A',
            boxShadow: '0 0 16px rgba(255,91,58,0.35)',
            background: 'rgba(255,91,58,0.06)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)'
          }}
        >
          liked ♥
        </div>
      )}
      {/* Skip stamp */}
      {isFront && (
        <div
          className="pointer-events-none absolute top-5 right-5 z-10 rotate-[12deg] px-3 py-1 rounded font-mono uppercase tracking-widest text-ink/70 text-sm font-medium"
          style={{
            opacity: stampSkipOpacity,
            border: '2px solid rgba(238,229,206,0.4)',
            background: 'rgba(238,229,206,0.04)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)'
          }}
        >
          not now
        </div>
      )}

      <div className="h-full w-full flex flex-col">
        {/* Header — tag + brand label */}
        <div className="px-5 pt-5 pb-0 flex items-center justify-between shrink-0">
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.15em] text-almost border border-almost/40 bg-almost/[0.08]">
            <span className="h-1.5 w-1.5 rounded-full bg-almost" />
            {card.tag}
          </span>
          <span
            className="text-[10px] font-mono tracking-[0.15em] uppercase"
            style={{ color: 'rgba(206,206,206,0.5)' }}
          >
            a, t.
          </span>
        </div>

        {/* Content body — no scroll; cards curate to fit */}
        <div className="flex-1 overflow-hidden px-5 pt-4 pb-3">
          {/* Title — editorial hero type, set in #cecece */}
          <h2
            className="font-display leading-[1.0]"
            style={{
              fontSize: 'clamp(34px, 9vw, 46px)',
              fontWeight: 500,
              color: '#cecece'
            }}
          >
            {card.title}
          </h2>

          {/* Body */}
          <p
            className="text-[14.5px] leading-[1.6] mt-4 font-light"
            style={{ color: 'rgba(206,206,206,0.78)' }}
          >
            {card.body}
          </p>

          {/* Try block — deep burnt-orange callout, flat */}
          <div
            className="rounded-xl mt-5 p-4 relative overflow-hidden"
            style={{
              background: '#8E2B03',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div
              className="text-[9px] font-mono uppercase tracking-[0.2em] mb-1.5 relative"
              style={{ color: 'rgba(206,206,206,0.7)' }}
            >
              try this
            </div>
            <div
              className="text-[14.5px] leading-snug font-medium relative"
              style={{ color: '#cecece' }}
            >
              {card.tip}
            </div>
          </div>

        </div>

        {/* Footer — action buttons only, no Read More toggle */}
        <div
          className="px-5 pt-3 pb-5 flex items-center justify-end shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          data-nodrag
        >
          <div className="flex items-center gap-1.5">
            <IconButton label="Add note" onClick={() => onNote?.(card)} active={hasNote}>
              <MessageCircle size={16} strokeWidth={2} />
            </IconButton>
            <IconButton label="Share card" onClick={() => onShare?.(card)}>
              <Share2 size={16} strokeWidth={2} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
})

function IconButton({ children, onClick, label, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition ${
        active
          ? 'bg-almost text-paper shadow-glow'
          : 'text-ink/55 hover:text-ink'
      }`}
      style={
        !active
          ? {
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }
          : undefined
      }
    >
      {children}
    </button>
  )
}

export default SwipeCard
