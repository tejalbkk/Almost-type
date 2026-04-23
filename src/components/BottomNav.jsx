// Bottom tab bar per PRD §7.1. 44px tap targets, native-feeling patterns.

export default function BottomNav({ tab, onChange }) {
  const items = [
    { id: 'school', label: 'School', icon: <SchoolIcon /> },
    { id: 'finder', label: 'Fonts', icon: <FinderIcon /> },
    { id: 'critique', label: 'Critique', icon: <CritiqueIcon /> },
    { id: 'eye', label: 'Eye', icon: <EyeIcon /> },
    { id: 'library', label: 'Library', icon: <LibraryIcon /> }
  ]
  return (
    <nav className="safe-bottom border-t hair bg-paper">
      <ul className="mx-auto max-w-[480px] grid grid-cols-5">
        {items.map((it) => {
          const active = tab === it.id
          return (
            <li key={it.id}>
              <button
                type="button"
                onClick={() => onChange(it.id)}
                aria-pressed={active}
                className="w-full h-14 flex flex-col items-center justify-center gap-0.5"
              >
                <span className={active ? 'text-ink' : 'text-ink/45'}>{it.icon}</span>
                <span className={`text-[10px] font-medium tracking-wide ${active ? 'text-ink' : 'text-ink/45'}`}>
                  {it.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

const common = 'w-[22px] h-[22px]'
const stroke = { strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

function SchoolIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke} className={common}>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M8 10h8M8 14h5" />
    </svg>
  )
}
function FinderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke} className={common}>
      <path d="M7 4h10M12 4v16" />
      <path d="M9 20h6" />
    </svg>
  )
}
function CritiqueIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke} className={common}>
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke} className={common}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
function LibraryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke} className={common}>
      <path d="M6 4h10a2 2 0 0 1 2 2v14l-7-4-7 4V6a2 2 0 0 1 2-2z" />
    </svg>
  )
}
