// Dynamic Google Fonts injection. Idempotent \u2014 same familyParam only loaded once.
// familyParam is the string passed to the `family=` query (e.g. 'Fraunces:opsz,wght@9..144,400;9..144,700').

const loaded = new Set()

export function loadGoogleFont(familyParam) {
  if (!familyParam || loaded.has(familyParam)) return
  loaded.add(familyParam)
  const href = `https://fonts.googleapis.com/css2?family=${familyParam}&display=swap`
  // Reuse existing link if somehow present
  if (document.querySelector(`link[href="${href}"]`)) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.crossOrigin = 'anonymous'
  document.head.appendChild(link)
}

export function loadFontsBundle(fontBundle) {
  if (!fontBundle) return
  for (const f of fontBundle.fonts) {
    loadGoogleFont(f.googleParam)
  }
}
