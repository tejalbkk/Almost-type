import { GraduationCap, Type, ScanEye, Eye, BookMarked } from 'lucide-react'

// Bottom tab bar per PRD §7.1. 44px tap targets, native-feeling patterns.
// Icons sourced from lucide.dev for visual consistency.

export default function BottomNav({ tab, onChange }) {
  const items = [
    { id: 'school', label: 'School', Icon: GraduationCap },
    { id: 'finder', label: 'Fonts', Icon: Type },
    { id: 'critique', label: 'Critique', Icon: ScanEye },
    { id: 'eye', label: 'Eye', Icon: Eye },
    { id: 'library', label: 'Library', Icon: BookMarked }
  ]
  return (
    <nav className="safe-bottom border-t hair bg-paper">
      <ul className="mx-auto max-w-[480px] grid grid-cols-5">
        {items.map(({ id, label, Icon }) => {
          const active = tab === id
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onChange(id)}
                aria-pressed={active}
                className="w-full h-14 flex flex-col items-center justify-center gap-0.5"
              >
                <Icon
                  size={22}
                  strokeWidth={1.8}
                  className={active ? 'text-ink' : 'text-ink/45'}
                />
                <span
                  className={`text-[10px] font-medium tracking-wide ${
                    active ? 'text-ink' : 'text-ink/45'
                  }`}
                >
                  {label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
