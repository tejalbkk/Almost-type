import { GraduationCap, Type, Palette, Bookmark } from 'lucide-react'

// Bottom nav — solid light-glass pill, matching ref image.
// 4 items: Lessons / Fonts / Color palate / Library.

export default function BottomNav({ tab, onChange }) {
  const items = [
    { id: 'lessons',  label: 'Lessons',       Icon: GraduationCap },
    { id: 'finder',   label: 'Fonts',         Icon: Type          },
    { id: 'palettes', label: 'Color palate',  Icon: Palette       },
    { id: 'saved',    label: 'Library',       Icon: Bookmark      }
  ]

  return (
    <nav className="px-4 pb-4 pt-1 safe-bottom shrink-0">
      <div
        className="rounded-full"
        style={{
          background: 'rgba(238, 229, 206, 0.55)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          boxShadow:
            '0 12px 32px -8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.4)'
        }}
      >
        <ul className="grid grid-cols-4">
          {items.map(({ id, label, Icon }) => {
            const active = tab === id
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onChange(id)}
                  aria-pressed={active}
                  className="w-full h-[58px] flex flex-col items-center justify-center gap-[3px] transition-opacity"
                  style={{ opacity: active ? 1 : 0.55 }}
                >
                  <Icon
                    size={20}
                    strokeWidth={active ? 2 : 1.7}
                    style={{ color: '#FFFFFF' }}
                  />
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: '#FFFFFF' }}
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
