import { useMemo, useState } from 'react'
import { Shuffle, Copy, Check } from 'lucide-react'
import { fontBundles } from '../data/fonts.js'

// Color Palate — browse curated 60/30/10 palettes across every vibe.
// Tap any hex to copy. Shuffle for a fresh 6.

const SHOW = 6

// Flatten palettes from all bundles, tagged with vibe keyword
function allPalettes() {
  const out = []
  for (const b of fontBundles) {
    const primaryKeyword = (b.keywords[0] || '').replace('DEFAULT', 'default')
    for (const p of b.palettePool) {
      out.push({ ...p, vibe: primaryKeyword })
    }
  }
  return out
}

function shuffle(arr) {
  const c = [...arr]
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[c[i], c[j]] = [c[j], c[i]]
  }
  return c
}

export default function ColorPalettes() {
  const pool = useMemo(() => allPalettes(), [])
  const [visible, setVisible] = useState(() => shuffle(pool).slice(0, SHOW))
  const [copied, setCopied] = useState(null)

  const roll = () => setVisible(shuffle(pool).slice(0, SHOW))

  const copyHex = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(hex)
      setTimeout(() => setCopied(null), 1200)
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-8">
      <div className="px-5 pt-5">
        <div
          className="font-display font-medium text-[26px] leading-none text-ink"
          style={{ letterSpacing: '-0.02em' }}
        >
          Color palate
        </div>
        <div className="text-[13px] text-muted mt-1.5 font-light">
          60 · 30 · 10 palettes to steal. Tap any hex to copy.
        </div>

        <button
          type="button"
          onClick={roll}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-hair bg-surface text-[12px] font-mono uppercase tracking-[0.1em] text-muted hover:text-ink hover:border-ink/20 transition-colors"
        >
          <Shuffle size={13} strokeWidth={2} />
          Shuffle six
        </button>
      </div>

      <div className="px-5 mt-4 space-y-3">
        {visible.map((p, i) => (
          <PaletteRow
            key={p.name + i}
            palette={p}
            copied={copied}
            onCopy={copyHex}
          />
        ))}
      </div>
    </div>
  )
}

function PaletteRow({ palette, copied, onCopy }) {
  return (
    <div className="rounded-xl border border-hair bg-surface p-4">
      <div className="flex items-baseline justify-between mb-3">
        <div className="flex items-baseline gap-2">
          <div
            className="font-display font-medium text-[18px] text-ink"
            style={{ letterSpacing: '-0.01em' }}
          >
            {palette.name}
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted/70">
            · {palette.vibe}
          </div>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted">
          60 · 30 · 10
        </div>
      </div>

      <div className="text-[12.5px] text-muted mb-3 font-light">{palette.blurb}</div>

      {/* Proportional swatch bar */}
      <div className="flex h-12 rounded-lg overflow-hidden">
        {palette.swatches.map((s, i) => (
          <div
            key={s.hex + i}
            className={i === 0 ? 'prop-60' : i === 1 ? 'prop-30' : 'prop-10'}
            style={{ background: s.hex }}
            title={`${s.role} · ${s.hex}`}
          />
        ))}
      </div>

      {/* Hex row — each tappable */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {palette.swatches.map((s) => {
          const isCopied = copied === s.hex.toUpperCase()
          return (
            <button
              key={s.hex}
              type="button"
              onClick={() => onCopy(s.hex.toUpperCase())}
              className="text-left group"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-block h-3 w-3 rounded-sm border border-hair"
                  style={{ background: s.hex }}
                />
                <span className="font-mono text-[11px] text-ink/80 uppercase tracking-wide">
                  {s.hex.toUpperCase()}
                </span>
                {isCopied ? (
                  <Check
                    size={11}
                    strokeWidth={2.5}
                    style={{ color: '#7EB17A' }}
                    className="ml-auto"
                  />
                ) : (
                  <Copy
                    size={11}
                    strokeWidth={1.8}
                    className="ml-auto text-muted/50 group-hover:text-ink/70 transition-colors"
                  />
                )}
              </div>
              <div className="text-[10px] text-muted/70 mt-0.5 truncate">{s.role}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
