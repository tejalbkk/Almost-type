import { useMemo, useState } from 'react'
import { Shuffle, Sparkles, Plus } from 'lucide-react'
import { fontBundles, findBundle } from '../data/fonts.js'

// Color palate — search by vibe, browse curated palettes, or build your
// own from 1–3 hex colors and get a smart 60/30/10 distribution.
// Tap any hex to copy.

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

function shuffleArr(arr) {
  const c = [...arr]
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[c[i], c[j]] = [c[j], c[i]]
  }
  return c
}

// ─────────── Color math helpers ───────────

function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim()
  if (clean.length !== 6) return null
  const n = parseInt(clean, 16)
  if (Number.isNaN(n)) return null
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function rgbToHex({ r, g, b }) {
  const t = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')
  return `#${t(r)}${t(g)}${t(b)}`.toUpperCase()
}

function rgbToHsl({ r, g, b }) {
  const R = r / 255, G = g / 255, B = b / 255
  const max = Math.max(R, G, B), min = Math.min(R, G, B)
  const l = (max + min) / 2
  let h = 0, s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case R: h = ((G - B) / d + (G < B ? 6 : 0)); break
      case G: h = ((B - R) / d + 2); break
      case B: h = ((R - G) / d + 4); break
    }
    h *= 60
  }
  return { h, s: s * 100, l: l * 100 }
}

function hslToRgb({ h, s, l }) {
  const S = s / 100, L = l / 100
  const k = (n) => (n + h / 30) % 12
  const a = S * Math.min(L, 1 - L)
  const f = (n) => L - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))
  return { r: f(0) * 255, g: f(8) * 255, b: f(4) * 255 }
}

function luminance({ r, g, b }) {
  const t = (v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * t(r) + 0.7152 * t(g) + 0.0722 * t(b)
}

// Given the colors the user provided, suggest a role assignment (60/30/10)
// AND generate any missing color(s) that follow color-theory sense.
function buildPalette(inputHexes) {
  // Parse valid hexes, drop invalid
  const parsed = inputHexes
    .map((h) => (h ? { hex: h.trim().toUpperCase(), rgb: hexToRgb(h) } : null))
    .filter((x) => x && x.rgb)

  let colors = [...parsed]

  // If <3 provided, generate the missing ones using color theory
  while (colors.length < 3) {
    if (colors.length === 0) {
      // Pure blank — no starting point. Use warm neutrals.
      colors.push({ hex: '#F5F0E8', rgb: hexToRgb('#F5F0E8') })
    } else if (colors.length === 1) {
      // Given one color, suggest a contrasting neutral for background
      const hsl = rgbToHsl(colors[0].rgb)
      // If input is bright/saturated, add a near-neutral pale as bg
      const bgHsl = { h: hsl.h, s: Math.min(hsl.s * 0.1, 8), l: hsl.l < 50 ? 96 : 12 }
      const rgb = hslToRgb(bgHsl)
      colors.unshift({ hex: rgbToHex(rgb), rgb })
    } else {
      // Given two colors, generate a third — accent from average hue + 30°
      const h1 = rgbToHsl(colors[0].rgb)
      const h2 = rgbToHsl(colors[1].rgb)
      const avgHue = ((h1.h + h2.h) / 2 + 30) % 360
      const accHsl = { h: avgHue, s: Math.max(h1.s, h2.s, 65), l: 55 }
      const rgb = hslToRgb(accHsl)
      colors.push({ hex: rgbToHex(rgb), rgb })
    }
  }

  // Take first 3 only
  colors = colors.slice(0, 3)

  // Assign roles by luminance: lightest → BG (60), darkest → UI (30), most saturated → accent (10)
  const withMeta = colors.map((c) => ({
    ...c,
    lum: luminance(c.rgb),
    sat: rgbToHsl(c.rgb).s
  }))
  const byLumDesc = [...withMeta].sort((a, b) => b.lum - a.lum)
  const bg = byLumDesc[0]
  const remaining = withMeta.filter((c) => c !== bg)
  const bySat = [...remaining].sort((a, b) => b.sat - a.sat)
  const accent = bySat[0]
  const mid = remaining.find((c) => c !== accent)

  return {
    name: 'Your palette',
    blurb: parsed.length < 3
      ? `You gave ${parsed.length}. We generated ${3 - parsed.length}.`
      : 'Distributed 60 · 30 · 10 by luminance + saturation.',
    generated: parsed.length < 3,
    swatches: [
      { role: 'Background & large surfaces', hex: bg.hex, weight: 60 },
      { role: 'UI elements & sections', hex: mid.hex, weight: 30 },
      { role: 'Accent & CTAs', hex: accent.hex, weight: 10 }
    ]
  }
}

// Search across all palettes: match keyword against bundle keywords, palette
// names, blurbs, and vibe tag
function searchPalettes(query, pool) {
  const q = query.trim().toLowerCase()
  if (!q) return null
  // Bundle-level match first
  const bundle = findBundle(q)
  const bundleName = bundle?.keywords[0] || ''
  const results = pool.filter((p) => {
    if (p.vibe && p.vibe.toLowerCase().includes(bundleName)) return true
    if (p.name.toLowerCase().includes(q)) return true
    if (p.blurb.toLowerCase().includes(q)) return true
    if (p.vibe && p.vibe.toLowerCase().includes(q)) return true
    return false
  })
  // Also include palettes from the matched bundle if not already
  if (bundle) {
    for (const p of bundle.palettePool) {
      if (!results.some((r) => r.name === p.name)) {
        results.push({ ...p, vibe: bundleName })
      }
    }
  }
  return results.slice(0, 8)
}

const PALETTE_CHIPS = [
  'fintech',
  'warm gradient',
  'wellness',
  'wedding',
  'retro 70s',
  'cyber',
  'brutalist',
  'art gallery'
]

export default function ColorPalettes() {
  const pool = useMemo(() => allPalettes(), [])
  const [query, setQuery] = useState('')
  const [activeQuery, setActiveQuery] = useState('')
  const [browsed, setBrowsed] = useState(() => shuffleArr(pool).slice(0, SHOW))
  const [copied, setCopied] = useState(null)
  const [loading, setLoading] = useState(false)

  // Build-your-own state
  const [byoOpen, setByoOpen] = useState(false)
  const [c1, setC1] = useState('#FAF7F2')
  const [c2, setC2] = useState('#0E0E10')
  const [c3, setC3] = useState('')
  const [byoResult, setByoResult] = useState(null)

  const searchResults = activeQuery.trim() ? searchPalettes(activeQuery, pool) : null
  const activeList = searchResults ?? browsed

  const runSearch = (input) => {
    const q = (input ?? query).trim()
    if (!q) return
    setLoading(true)
    window.setTimeout(() => {
      setActiveQuery(q)
      setLoading(false)
    }, 220)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    runSearch()
  }

  const roll = () => {
    setActiveQuery('')
    setQuery('')
    setBrowsed(shuffleArr(pool).slice(0, SHOW))
  }

  const generateByo = () => {
    const r = buildPalette([c1, c2, c3])
    setByoResult(r)
  }

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
          Describe the vibe. Get palettes, distributed 60 · 30 · 10.
        </div>

        {/* Search bar — matches Font Finder pattern */}
        <form onSubmit={onSubmit} className="mt-4">
          <div className="flex items-center gap-2 rounded-xl border hair bg-surface p-1.5">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='e.g. "fintech", "warm gradient", "student forum"'
              className="flex-1 bg-transparent px-3 py-2 text-[14px] outline-none placeholder:text-muted/60 text-ink"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-almost text-paper text-[12px] font-medium disabled:opacity-40 hover:bg-almost/90 transition-colors"
              disabled={loading || !query.trim()}
            >
              {loading ? 'Looking…' : 'Find colors'}
            </button>
          </div>
        </form>

        {/* Quick chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          {PALETTE_CHIPS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                setQuery(q)
                runSearch(q)
              }}
              className="text-[11px] font-mono uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border hair bg-surface text-muted hover:text-ink hover:border-ink/20 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Results / browse list */}
      <div className="px-5 mt-5 space-y-3">
        {activeQuery && searchResults?.length === 0 && (
          <div className="rounded-xl border border-hair bg-surface p-6 text-center">
            <div
              className="font-display font-medium text-[17px] text-ink"
              style={{ letterSpacing: '-0.01em' }}
            >
              No palettes matched "{activeQuery}"
            </div>
            <div className="text-[12.5px] text-muted mt-2 font-light">
              Try: fintech, wellness, retro, cyber, wedding, brutalist, playful.
            </div>
          </div>
        )}
        {activeList?.map((p, i) => (
          <PaletteRow key={p.name + i} palette={p} copied={copied} onCopy={copyHex} />
        ))}

        {/* Shuffle a fresh set — bottom, like Font Finder's "Surprise me" */}
        {!activeQuery && (
          <button
            type="button"
            onClick={roll}
            className="w-full py-3.5 rounded-xl border border-hair bg-surface text-ink/70 hover:text-ink text-[13px] font-medium inline-flex items-center justify-center gap-2 hover:border-ink/20 transition-colors mt-1"
          >
            <Shuffle size={15} strokeWidth={2} />
            Shuffle a fresh set
          </button>
        )}
      </div>

      {/* Build Your Own — collapsible */}
      <div className="px-5 mt-6">
        <button
          type="button"
          onClick={() => setByoOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-hair bg-surface hover:border-ink/20 transition-colors"
        >
          <span className="inline-flex items-center gap-2 text-[13px] font-medium text-ink">
            <Sparkles size={14} strokeWidth={2} />
            Build your own palette
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted">
            {byoOpen ? '×' : '+'}
          </span>
        </button>

        {byoOpen && (
          <div className="mt-3 rounded-xl border border-hair bg-surface p-4 space-y-3 animate-fade-in">
            <div className="text-[12px] text-muted font-light">
              Enter 1–3 hex codes. We'll fill in the missing ones and assign
              60 · 30 · 10 roles by luminance and saturation.
            </div>
            <HexInput value={c1} onChange={setC1} label="Color 1" />
            <HexInput value={c2} onChange={setC2} label="Color 2" />
            <HexInput value={c3} onChange={setC3} label="Color 3 (optional)" placeholder="Leave blank to auto-generate" />

            <button
              type="button"
              onClick={generateByo}
              className="w-full py-3 rounded-lg bg-almost text-paper text-[13px] font-medium inline-flex items-center justify-center gap-2 hover:bg-almost/90 transition-colors"
            >
              <Plus size={14} strokeWidth={2.5} />
              Generate 60 · 30 · 10
            </button>

            {byoResult && (
              <div className="pt-2 animate-fade-in">
                <PaletteRow palette={byoResult} copied={copied} onCopy={copyHex} isByo />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function HexInput({ value, onChange, label, placeholder }) {
  const rgb = hexToRgb(value)
  const isValid = !!rgb
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block h-9 w-9 rounded-md border border-hair shrink-0"
        style={{ background: isValid ? value : 'transparent' }}
      />
      <div className="flex-1">
        <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted mb-0.5">
          {label}
        </div>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || '#RRGGBB'}
          className="w-full bg-transparent border-b border-hair px-1 py-1 text-[13px] font-mono outline-none focus:border-ink/40 text-ink placeholder:text-muted/60"
        />
      </div>
    </div>
  )
}

function PaletteRow({ palette, copied, onCopy, isByo }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        borderColor: isByo ? 'rgba(255,91,58,0.35)' : undefined,
        background: 'var(--tw-bg-opacity, 1) transparent'
      }}
    >
      <div className="flex items-baseline justify-between mb-3">
        <div className="flex items-baseline gap-2">
          <div
            className="font-display font-medium text-[18px] text-ink"
            style={{ letterSpacing: '-0.01em' }}
          >
            {palette.name}
          </div>
          {palette.vibe && (
            <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted/70">
              · {palette.vibe}
            </div>
          )}
          {palette.generated && (
            <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-almost">
              · auto
            </div>
          )}
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

      {/* Hex row — no copy icons; tap the hex text to copy */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {palette.swatches.map((s) => {
          const isCopied = copied === s.hex.toUpperCase()
          return (
            <button
              key={s.hex}
              type="button"
              onClick={() => onCopy(s.hex.toUpperCase())}
              className="text-left group"
              aria-label={`Copy ${s.hex}`}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-block h-3 w-3 rounded-sm border border-hair shrink-0"
                  style={{ background: s.hex }}
                />
                <span
                  className={`font-mono text-[11px] uppercase tracking-wide transition-colors ${
                    isCopied ? 'text-almost' : 'text-ink/80 group-hover:text-ink group-active:text-almost'
                  }`}
                >
                  {isCopied ? 'Copied' : s.hex.toUpperCase()}
                </span>
              </div>
              <div className="text-[10px] text-muted/70 mt-0.5 truncate">{s.role}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
