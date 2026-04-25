// Minimal service-worker stub for PWA install eligibility.
// v1.1 should replace this with a proper caching strategy (PRD §6.1).

self.addEventListener('install', (e) => self.skipWaiting())
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))
self.addEventListener('fetch', () => {})
