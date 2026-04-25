import { useEffect, useMemo, useState } from 'react'
import { findBundle, quickChips } from '../data/fonts.js'
import { loadFontsBundle, loadGoogleFont } from '../lib/fontLoader.js'
import { readableOn, subduedOn } from '../lib/contrast.js'

// Font Finder per PRD §4.3. Keyword → 4 fonts + 4 palettes + live preview.

export default function FontFinder() {
  const [query, setQuery] = useState('')
  const [bundle, setBundle] = useState(null)
  const [selectedFont, setSelectedFont] = useState(null)
  const [selectedPalette, setSelectedPalette] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (bundle) loadFontsBundle(bundle)
  }, [bundle])

  const generate = (input) => {
    setLoading(true)
    // Simulate the "< 4s" PRD target with a short delay for perceived responsiveness
    window.setTimeout(() => {
      const b = findBundle(input)
      setBundle(b)
      setSelectedFont(b.fonts.find((f) => /body/i.test(f.role)) || b.fonts[0])
      // Pick the first palette by default; user can change it
      setSelectedPalette(b.palettes[0])
      setLoading(false)
    }, 280)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    generate(query.trim())
  }

  const headingFont = bundle?.fonts.find((f) => /display|headline/i.test(f.role)) || bundle?.fonts[0]
  const bodyFont = bundle?.fonts.find((f) => /body/i.test(f.role)) || bundle?.fonts[0]

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-5 pt-5">
        <div className="font-serif font-semibold text-[24px] leading-none text-ink">Font Finder</div>
        <div className="text-[13px] text-muted mt-1">
          Describe the vibe. Get fonts, palettes, and a mock you can read.
        </div>

        <form onSubmit={onSubmit} className="mt-4">
          <div className="flex items-center gap-2 rounded-2xl border hair bg-white p-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='e.g. "dark moody luxury fashion"'
              className="flex-1 bg-transparent px-3 py-2 text-[15px] outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-ink text-paper text-[13px] font-medium disabled:opacity-40"
              disabled={loading || !query.trim()}
            >
              {loading ? 'Looking…' : 'Find fonts'}
            </button>
          </div>
        </form>

        <div className="mt-3 flex flex-wrap gap-2">
          {quickChips.map((q) => (
            <button
              key={q}
              onClick={() => {
                setQuery(q)
                generate(q)
              }}
              className="text-[12px] font-medium px-3 py-1.5 rounded-full border hair bg-white text-ink/75 hover:text-ink hover:bg-ink/5"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {!bundle && !loading && (
        <Empty />
      )}

      {bundle && (
        <div className="px-5 mt-5 pb-8 space-y-6">
          <div>
            <SectionLabel>Summary</SectionLabel>
            <p className="text-[14.5px] leading-snug text-ink/85 italic">{bundle.summary}</p>
          </div>

          <div>
            <SectionLabel>Fonts</SectionLabel>
            <div className="grid grid-cols-1 gap-3">
              {bundle.fonts.map((f) => (
                <FontCard
                  key={f.family + f.role}
                  font={f}
                  selected={selectedFont?.family === f.family}
                  onSelect={() => {
                    loadGoogleFont(f.googleParam)
                    setSelectedFont(f)
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Palettes</SectionLabel>
            <div className="grid grid-cols-1 gap-3">
              {bundle.palettes.map((p) => (
                <PaletteCard
                  key={p.name}
                  palette={p}
                  selected={selectedPalette?.name === p.name}
                  onSelect={() => setSelectedPalette(p)}
                />
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Live preview</SectionLabel>
            <LivePreview
              headingFont={selectedFont?.family || headingFont?.family}
              bodyFont={bodyFont?.family}
              palette={selectedPalette}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="text-[11px] font-mono uppercase tracking-widest text-muted mb-2">
      {children}
    </div>
  )
}

function Empty() {
  return (
    <div className="px-5 mt-6">
      <div className="rounded-2xl border hair bg-white p-5">
        <div className="font-serif font-semibold text-[18px] text-ink leading-snug">
          Tell us a vibe. We’ll give you four fonts, four palettes, and a mock you can almost ship.
        </div>
        <div className="text-[13px] text-muted mt-2">
          Try: “playful learning app”, “brutalist tech startup”, or “calm wellness brand.”
        </div>
      </div>
    </div>
  )
}

function FontCard({ font, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-2xl border p-4 transition ${
        selected ? 'border-ink bg-white shadow-card' : 'hair bg-white hover:bg-ink/5'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-mono uppercase tracking-widest text-muted">{font.role}</div>
        <div className="text-[11px] font-mono text-muted">{font.style}</div>
      </div>
      <div
        className="text-[34px] leading-none text-ink mt-2"
        style={{ fontFamily: `"${font.family}", serif` }}
      >
        {font.sample}
      </div>
      <div
        className="text-[14px] leading-snug text-ink/75 mt-2"
        style={{ fontFamily: `"${font.family}", serif` }}
      >
        {font.body}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-ink/5 border hair text-ink/70 font-medium">
          {font.family}
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-ink/5 border hair text-ink/70 font-medium">
          {font.tag}
        </span>
      </div>
      <div className="text-[13px] italic text-ink/70 mt-2">{font.blurb}</div>
    </button>
  )
}

function PaletteCard({ palette, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-2xl border p-4 transition ${
        selected ? 'border-ink bg-white shadow-card' : 'hair bg-white hover:bg-ink/5'
      }`}
    >
      <div className="flex items-baseline justify-between">
        <div className="font-serif font-semibold text-[18px] text-ink">{palette.name}</div>
        <div className="text-[11px] font-mono uppercase tracking-widest text-muted">60 · 30 · 10</div>
      </div>
      <div className="text-[12.5px] italic text-ink/70 mt-1 mb-3">{palette.blurb}</div>
      <div className="flex h-12 rounded-xl overflow-hidden border hair">
        {palette.swatches.map((s, i) => (
          <div
            key={s.hex + i}
            className={i === 0 ? 'prop-60' : i === 1 ? 'prop-30' : 'prop-10'}
            style={{ background: s.hex }}
            title={`${s.role} · ${s.hex}`}
          />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3 text-[11px]">
        {palette.swatches.map((s) => (
          <div key={s.hex}>
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-sm border hair" style={{ background: s.hex }} />
              <span className="font-mono text-ink/70">{s.hex.toUpperCase()}</span>
            </div>
            <div className="text-ink/60 mt-0.5">{s.role}</div>
          </div>
        ))}
      </div>
    </button>
  )
}

function LivePreview({ headingFont, bodyFont, palette }) {
  const bg = palette?.swatches[0]?.hex || '#FAF7F2'
  const mid = palette?.swatches[1]?.hex || '#0E0E10'
  const accent = palette?.swatches[2]?.hex || '#FF5B3A'
  const text = readableOn(bg)
  const textMid = readableOn(mid)
  const sub = subduedOn(bg)

  return (
    <div className="rounded-2xl overflow-hidden border hair shadow-card">
      <div style={{ background: bg, color: text }}>
        <div
          className="flex items-center justify-between px-5 py-3 border-b"
          style={{ borderColor: 'rgba(0,0,0,0.08)' }}
        >
          <div
            className="font-serif font-semibold text-[18px]"
            style={{ fontFamily: `"${headingFont}", serif` }}
          >
            almost, type.
          </div>
          <div className="flex items-center gap-3 text-[12px]" style={{ color: sub, fontFamily: `"${bodyFont}", sans-serif` }}>
            <span>Products</span>
            <span>Pricing</span>
            <span
              className="px-3 py-1 rounded-full text-[12px] font-medium"
              style={{ background: accent, color: readableOn(accent) }}
            >
              Start
            </span>
          </div>
        </div>

        <div className="px-5 py-8 text-center">
          <div
            className="text-[36px] leading-[1.05] italic"
            style={{ fontFamily: `"${headingFont}", serif`, color: text }}
          >
            Typography,<br />quietly opinionated.
          </div>
          <div
            className="text-[14px] leading-snug mt-3 max-w-[36ch] mx-auto"
            style={{ color: sub, fontFamily: `"${bodyFont}", sans-serif` }}
          >
            A short description that would live on your homepage. Readable at a glance. Doesn’t ask for much.
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span
              className="px-4 py-2 rounded-full text-[13px] font-medium"
              style={{ background: accent, color: readableOn(accent), fontFamily: `"${bodyFont}", sans-serif` }}
            >
              Get started
            </span>
            <span
              className="px-4 py-2 rounded-full text-[13px] font-medium border"
              style={{ borderColor: 'rgba(0,0,0,0.15)', fontFamily: `"${bodyFont}", sans-serif` }}
            >
              Read docs
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 px-3 pb-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-xl p-3"
              style={{ background: mid, color: textMid, fontFamily: `"${bodyFont}", sans-serif` }}
            >
              <div className="text-[10px] uppercase tracking-widest" style={{ color: subduedOn(mid) }}>
                Card
              </div>
              <div className="text-[14px] font-medium mt-1" style={{ fontFamily: `"${headingFont}", serif` }}>
                Feature {i + 1}
              </div>
              <div className="text-[11px] leading-snug mt-1" style={{ color: subduedOn(mid) }}>
                One short line about what this is and why you want it.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
