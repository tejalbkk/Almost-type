import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'

// Pointer-events based card drag. Works for mouse and touch.
// PRD §4.2.3: 70px threshold, stamp opacity scales with distance, 3-card stack.

const THRESHOLD = 70

const SwipeCard = forwardRef(function SwipeCard(
  {
    card,
    depth = 0, // 0 = front, 1/2 = background
    onDecision, // (id, 'like' | 'notnow') => void
    onExpandToggle,
    expanded = false
  },
  ref
) {
  const rootRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [dx, setDx] = useState(0)
  const pointerStart = useRef({ x: 0, y: 0, id: null })
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
    }, 220)
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
    rootRef.current?.setPointerCapture?.(e.pointerId)
    pointerStart.current = { x: e.clientX, y: e.clientY, id: e.pointerId }
    setDragging(true)
  }

  const handlePointerMove = (e) => {
    if (!isFront || !dragging) return
    if (pointerStart.current.id !== e.pointerId) return
    const delta = e.clientX - pointerStart.current.x
    setDx(delta)
  }

  const handlePointerEnd = () => {
    if (!isFront || !dragging) return
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

  const rotation = Math.max(-18, Math.min(18, dx / 12))
  const stampLikeOpacity = Math.min(1, Math.max(0, dx / 120))
  const stampSkipOpacity = Math.min(1, Math.max(0, -dx / 120))

  const baseStyle = {
    transform: `translate3d(${dx}px, ${depth * 6}px, 0) rotate(${rotation}deg) scale(${1 - depth * 0.03})`,
    transition: dragging ? 'none' : 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
    zIndex: 30 - depth,
    opacity: depth > 1 ? 0.75 : 1,
    pointerEvents: isFront ? 'auto' : 'none'
  }

  return (
    <div
      ref={rootRef}
      className={`swipe-surface absolute inset-0 select-none rounded-3xl bg-paper shadow-card border hair ${
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
            className="pointer-events-none absolute top-6 left-6 rotate-[-14deg] border-[3px] border-almost px-3 py-1 rounded-md font-mono uppercase tracking-widest text-almost text-sm"
            style={{ opacity: stampLikeOpacity }}
          >
            liked
          </div>
          <div
            className="pointer-events-none absolute top-6 right-6 rotate-[14deg] border-[3px] border-ink px-3 py-1 rounded-md font-mono uppercase tracking-widest text-ink text-sm"
            style={{ opacity: stampSkipOpacity }}
          >
            not now
          </div>
        </>
      )}

      <div className="h-full w-full p-6 flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink/5 border hair text-xs font-medium text-ink/70 tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-almost" />
            {card.tag}
          </span>
          <span className="text-[11px] font-mono text-muted uppercase tracking-widest">almost, type.</span>
        </div>

        <h2 className="font-serif text-[28px] leading-[1.1] text-ink italic">
          {card.title}
        </h2>

        <p className="text-[15.5px] leading-[1.55] text-ink/80">{card.body}</p>

        <div className="mt-auto space-y-4">
          <div className="rounded-2xl bg-ink text-paper p-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-paper/60 mb-1">try</div>
            <div className="text-[15px] leading-snug">{card.tip}</div>
          </div>

          {expanded && card.readMore && (
            <div
              className="text-[14px] leading-[1.6] text-ink/75 animate-fade-in border-t hair pt-4"
              data-nodrag
            >
              {card.readMore}
            </div>
          )}

          <div className="flex items-center justify-between" data-nodrag>
            <button
              type="button"
              onClick={() => onExpandToggle?.(card.id)}
              className="text-[13px] font-medium text-ink/70 hover:text-ink underline-offset-4 hover:underline"
            >
              {expanded ? 'Read less' : 'Read more'}
            </button>
            {card.__actions}
          </div>
        </div>
      </div>
    </div>
  )
})

export default SwipeCard
