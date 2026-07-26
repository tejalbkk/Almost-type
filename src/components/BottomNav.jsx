import { GraduationCap, Palette, Bookmark } from 'lucide-react'

// Bottom nav — glassmorphism pill.
// 4 tabs: Lessons, Fonts (Aa text), Color palate, Library.

const tabs = [
  { id: 'lessons',  label: 'Lessons',      icon: GraduationCap },
  { id: 'finder',   label: 'Fonts',        icon: null }, // "Aa" text glyph
  { id: 'palettes', label: 'Color palate', icon: Palette },
  { id: 'saved',    label: 'Library',      icon: Bookmark }
]

export default function BottomNav({ tab, onChange }) {
  return (
    <nav className="px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-1 shrink-0 flex justify-center">
      <div
        className="flex items-center gap-1 rounded-full px-3 py-2 border"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0.22), rgba(255,255,255,0.10))',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          borderColor: 'rgba(255,255,255,0.28)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.45),' +
            ' inset 0 -1px 0 rgba(255,255,255,0.08),' +
            ' 0 8px 32px rgba(0,0,0,0.35)'
        }}
      >
        {tabs.map(({ id, label, icon: Icon }) => {
          const active = tab === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-pressed={active}
              className={`flex min-w-[64px] min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-full px-2 text-white transition-opacity duration-200 ${
                active ? 'opacity-100' : 'opacity-55'
              }`}
            >
              {Icon ? (
                <Icon size={22} strokeWidth={1.75} />
              ) : (
                <span className="text-[19px] font-medium leading-none tracking-tight">
                  Aa
                </span>
              )}
              <span className="font-mono text-[11px] leading-tight">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
