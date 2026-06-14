import { useEffect, useState } from 'react'

// Bottom-sheet share per PRD §4.2.5. Copy / X / WhatsApp.
// Formats share text as: "{title}\n\ntry: {tip}\n\n— Almost, Type."

function buildShareText(card) {
  return `${card.title}\n\ntry: ${card.tip}\n\n— Almost, Type.`
}

export default function ShareSheet({ card, onClose }) {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!card) return null
  const text = buildShareText(card)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setToast('Copied')
      setTimeout(() => setToast(null), 1400)
    } catch {
      setToast("Couldn't copy")
      setTimeout(() => setToast(null), 1400)
    }
  }

  const handleX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.slice(0, 270))}`
    window.open(url, '_blank', 'noopener')
  }

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.65)' }} />
      <div
        className="relative w-full max-w-[480px] rounded-t-2xl shadow-lift safe-bottom animate-slide-up"
        style={{ background: '#181410', borderTop: '1px solid #2A2118' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3">
          <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(238,229,206,0.12)' }} />
        </div>
        <div className="px-5 pt-2 pb-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted mb-1">Share</div>
          <div className="font-display font-medium text-[19px] leading-snug text-ink mb-4" style={{ letterSpacing: '-0.01em' }}>{card.title}</div>

          <ShareRow onClick={handleCopy} icon={<CopyIcon />} iconBg="#221E17" label="Copy text" sub="Paste anywhere" />
          <div className="h-2" />
          <ShareRow onClick={handleX} icon={<XIcon />} iconBg="#181410" label="Post on X" sub="Opens in a new tab" />
          <div className="h-2" />
          <ShareRow onClick={handleWhatsApp} icon={<WhatsAppIcon />} iconBg="#0a3d1f" label="WhatsApp" sub="Send to a chat" />

          <button
            type="button"
            onClick={onClose}
            className="w-full mt-4 py-3 text-[12px] font-mono uppercase tracking-[0.12em] text-muted hover:text-ink transition-colors"
          >
            Cancel
          </button>
        </div>
        {toast && (
          <div className="absolute inset-x-0 -top-10 flex justify-center pointer-events-none">
            <div className="px-3 py-1.5 rounded-full bg-almost text-paper text-[11px] font-mono uppercase tracking-[0.1em] shadow-card animate-fade-in">
              {toast}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ShareRow({ onClick, icon, iconBg, label, sub }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-hair hover:border-ink/20 transition-colors"
      style={{ background: '#221E17' }}
    >
      <span
        className="inline-flex h-10 w-10 items-center justify-center rounded-full shrink-0"
        style={{ background: iconBg, border: '1px solid #2A2118' }}
      >
        {icon}
      </span>
      <span className="flex-1 text-left">
        <span className="block text-[14px] font-medium text-ink">{label}</span>
        <span className="block text-[11px] text-muted font-light">{sub}</span>
      </span>
    </button>
  )
}

function CopyIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(238,229,206,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(238,229,206,0.7)">
      <path d="M18.244 2H21l-6.52 7.45L22 22h-6.828l-4.74-6.2L4.9 22H2l6.97-7.96L2 2h6.914l4.29 5.67L18.244 2Zm-1.195 18h1.78L7.02 4H5.18l11.87 16Z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="#25D366">
      <path d="M20.52 3.48A11.87 11.87 0 0 0 12.04 0C5.47 0 .13 5.33.13 11.9c0 2.1.55 4.14 1.6 5.95L0 24l6.33-1.66a11.9 11.9 0 0 0 5.71 1.46h.01c6.56 0 11.9-5.33 11.9-11.9 0-3.18-1.24-6.17-3.43-8.42ZM12.05 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.76.98 1-3.66-.24-.38a9.88 9.88 0 1 1 18.36-5.26c0 5.46-4.45 9.91-9.95 9.91Zm5.44-7.43c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.48-1.78-1.66-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  )
}
