// Lightweight localStorage wrapper. Per PRD §6.4, v1.0 is in-memory only, but
// we scaffold persistence here so the switch to v1.1 is a one-line change.

const NAMESPACE = 'almost-type:'

export const storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(NAMESPACE + key)
      if (raw == null) return fallback
      return JSON.parse(raw)
    } catch {
      return fallback
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(NAMESPACE + key, JSON.stringify(value))
    } catch {
      /* quota or disabled \u2014 non-fatal */
    }
  }
}
