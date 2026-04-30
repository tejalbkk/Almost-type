import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'
import { Heart, X, MessageCircle, Share2 } from 'lucide-react'

// Pointer-events based card drag. Works for mouse and touch.
// PRD §4.2.3: 70px threshold, stamp opacity scales with distance, 3-card stack.
//
// Gesture arbitration:
//  - touch-action: pan-y on the outer card lets the browser handle vertical
//    scroll inside the card (so users can reach Read more + actions on small
//    screens). We only capture horizontal swipes.
//  - In pointermove we look at dx vs dy — only lock into swipe mode when
//    the gesture is dominantly horizontal. Otherwise we let scroll happen.

const THRESHOLD = 70
const DIRECTION_LOCK_PX = 6

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
    }, 280)
  }

  // Expose imperative handle so the parent can trigger a programmatic swipe
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
    // Don't capture pointer yet — wait until we know direction. This lets
    // vertical scroll keep working when the user drags up/down.
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
      // Wait until the gesture has clear direction
      if (absX < DIRECTION_LOCK_PX && absY < DIRECTION_LOCK_PX) return
      // Vertical-dominant gesture: bail out so the inner scroll can take over
      if (absY > absX) {
        pointerStart.current.decided = 'scroll'
        setDragging(false)
        return
      }
      pointerStart.current.locked = true
      pointerStart.current.decided = 'swipe'
      // Lock the pointer for swipe so the inner scroll doesn't grab it later
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

  // Reset flags when the card identity changes
  useEffect(() => {
    decidedRef.current = false
    setDx(0)
  }, [card?.id])

  const rotation = Math.max(-14, Math.min(14, dx / 16))
  const stampLikeOpacity = Math.min(1, Math.max(0, dx / 100))
  const stampSkipOpacity = Math.min(1, Math.max(0, -dx / 100))

  const baseStyle = {
    transform: `translate3d(${dx}px, ${depth * 8}px, 0) rotate(${rotation}deg) scale(${1 - depth * 0.04})`,
    transition: dragging
      ? 'none'
      : 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1)',
    zIndex: 30 - depth,
    opacity: depth > 1 ? 0.6 : 1,
    pointerEvents: isFront ? 'auto' : 'none',
    willChange: 'transform'
  }

  return (
    <div
      ref={rootRef}
      className={`swipe-surface absolute inset-0 select-none rounded-3xl bg-paper shadow-card border hair overflow-hidden ${
        isFront ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
      style={baseStyle}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      aria-hidden={!isFront}
    >
      {isFront && (
        <>
          <div
            className="pointer-events-none absolute top-6 left-6 z-10 rotate-[-14deg] border-[3px] border-almost px-3 py-1 rounded-md font-mono uppercase tracking-widest text-almost text-sm"
            style={{ opacity: stampLikeOpacity }}
          >
            liked
          </div>
          <div
            className="pointer-events-none absolute top-6 right-6 z-10 rotate-[14deg] border-[3px] border-ink px-3 py-1 rounded-md font-mono uppercase tracking-widest text-ink text-sm"
            style={{ opacity: stampSkipOpacity }}
          >
            skipped
          </div>
        </>
      )}

      <div className="h-full w-full flex flex-col">
        <div className="px-6 pt-6 pb-3 flex items-center justify-between shrink-0">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink/5 border hair text-xs font-medium text-ink/70 tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-almost" />
            {card.tag}
          </span>
          <span className="text-[11px] font-mono text-muted uppercase tracking-widest">
            almost, type.
          </span>
        </div>

        <div
          className="flex-1 overflow-y-auto px-6 pb-3 card-scroll"
          data-nodrag-vertical
        >
          <h2 className="font-display font-semibold text-[30px] leading-[1.05] text-ink">
            {card.title}
          </h2>

          <p className="text-[15.5px] leading-[1.55] text-ink/80 mt-3">
            {card.body}
          </p>

          <div className="rounded-2xl bg-ink text-paper p-4 mt-5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-paper/60 mb-1">
              try
            </div>
            <div className="text-[15px] leading-snug">{card.tip}</div>
          </div>

          {expanded && card.readMore && (
            <div
              className="text-[14px] leading-[1.6] text-ink/75 animate-fade-in border-t hair pt-4 mt-5"
              data-nodrag
            >
              {card.readMore}
            </div>
          )}
        </div>

        <div
          className="px-6 pt-3 pb-6 flex items-center justify-between border-t hair shrink-0 bg-paper"
          data-nodrag
        >
          <button
            type="button"
            onClick={() => onExpandToggle?.(card.id)}
            className="text-[13px] font-medium text-ink/70 hover:text-ink underline-offset-4 hover:underline"
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
          <div className="flex items-center gap-1">
            <IconButton label="Add note" onClick={() => onNote?.(card)} active={hasNote}>
              <MessageCircle size={18} strokeWidth={2} />
            </IconButton>
            <IconButton label="Share card" onClick={() => onShare?.(card)}>
              <Share2 size={18} strokeWidth={2} />
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
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border hair transition ${
        active ? 'bg-ink text-paper border-ink' : 'bg-white text-ink/70 hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}

export default SwipeCard
