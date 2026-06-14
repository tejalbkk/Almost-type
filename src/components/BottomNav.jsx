import { GraduationCap, Type, Eye, BookMarked } from 'lucide-react'

// Bottom tab bar — floating liquid-glass pill.
// 4 items: School, Fonts, Eye, Library. (Critique lives in Intro / future deep links.)

export default function BottomNav({ tab, onChange }) {
  const items = [
    { id: 'school',  label: 'School',  Icon: GraduationCap },
    { id: 'finder',  label: 'Fonts',   Icon: Type          },
    { id: 'eye',     label: 'Eye',     Icon: Eye           },
    { id: 'library', label: 'Library', Icon: BookMarked    }
  ]

  return (
    <nav className="px-3 pb-3 pt-1 safe-bottom">
      <div
        className="rounded-2xl border border-white/[0.08] shadow-nav overflow-hidden"
        style={{
          background: 'rgba(36, 30, 23, 0.55)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)'
        }}
      >
        <ul className="mx-auto max-w-[480px] grid grid-cols-4">
          {items.map(({ id, label, Icon }) => {
            const active = tab === id
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onChange(id)}
                  aria-pressed={active}
                  className="w-full h-[58px] flex flex-col items-center justify-center gap-[3px] relative transition-colors"
                >
                  {/* Active state — orange top indicator + colored icon */}
                  {active && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-b-full bg-almost" />
                  )}

                  <Icon
                    size={20}
                    strokeWidth={active ? 2 : 1.6}
                    style={{ color: active ? '#FF5B3A' : 'rgba(238,229,206,0.45)' }}
                  />
                  <span
                    className="text-[9px] font-mono uppercase tracking-[0.12em]"
                    style={{ color: active ? '#FF5B3A' : 'rgba(238,229,206,0.45)' }}
                  >
                    {label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
