// Pick readable text colour (black/white/off-black) given a background.
// Used by Font Finder live preview per PRD §4.3.4.

export function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean
  const num = parseInt(full, 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

function channel(v) {
  const s = v / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

export function luminance(hex) {
  const { r, g, b } = hexToRgb(hex)
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

export function readableOn(bgHex) {
  return luminance(bgHex) > 0.5 ? '#0E0E10' : '#FAF7F2'
}

// Subdued text for secondary copy on a given background
export function subduedOn(bgHex) {
  return luminance(bgHex) > 0.5 ? '#434348' : '#DDD8CF'
}
