import { GraduationCap, Type, Palette, Bookmark } from 'lucide-react'

// Bottom nav — floating light-glass pill. 4 items.
// Ref: whitish semi-transparent pill with white icons + labels.

export default function BottomNav({ tab, onChange }) {
  const items = [
    { id: 'lessons',  label: 'Lessons',       Icon: GraduationCap },
    { id: 'finder',   label: 'Fonts',         Icon: Type          },
    { id: 'palettes', label: 'Color palate',  Icon: Palette       },
    { id: 'saved',    label: 'Saved',         Icon: Bookmark      }
  ]

  return (
    <nav className="px-4 pb-4 pt-1 safe-bottom shrink-0">
      <div
        className="rounded-full overflow-hidden"
        style={{
          background: 'rgba(238, 229, 206, 0.14)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid rgba(238, 229, 206, 0.18)',
          boxShadow:
            '0 12px 32px -8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)'
        }}
      >
        <ul className="grid grid-cols-4">
          {items.map(({ id, label, Icon }) => {
            const active = tab === id
            return (
              <li key={id} className="relative">
                <button
                  type="button"
                  onClick={() => onChange(id)}
                  aria-pressed={active}
                  className="w-full h-[56px] flex flex-col items-center justify-center gap-[3px] transition-colors relative"
                >
                  {active && (
                    <span
                      className="absolute top-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full"
                      style={{ background: '#FF5B3A' }}
                    />
                  )}
                  <Icon
                    size={20}
                    strokeWidth={active ? 2 : 1.6}
                    style={{ color: active ? '#EEE5CE' : 'rgba(238,229,206,0.6)' }}
                  />
                  <span
                    className="text-[9.5px] font-medium tracking-[0.02em]"
                    style={{ color: active ? '#EEE5CE' : 'rgba(238,229,206,0.6)' }}
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
