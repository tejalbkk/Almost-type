/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E0E10',
        paper: '#FAF7F2',
        almost: '#FF5B3A',
        muted: '#7B7A78',
        hair: '#E7E3DC'
      },
      fontFamily: {
        // `display` is the headline font — Montserrat everywhere.
        display: ['"Montserrat"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Montserrat"', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['"Inter Tight"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        // Logo wordmark — Montserrat (Helvetica isn't free for web embed).
        logo: ['"Montserrat"', 'system-ui', '-apple-system', 'sans-serif']
      },
      boxShadow: {
        card: '0 10px 30px -8px rgba(14,14,16,0.18), 0 2px 8px -2px rgba(14,14,16,0.08)',
        lift: '0 24px 60px -20px rgba(14,14,16,0.35)'
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        pop: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        }
      },
      animation: {
        'slide-up': 'slideUp 220ms cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-in': 'fadeIn 180ms ease-out',
        pop: 'pop 200ms cubic-bezier(0.22, 1, 0.36, 1)'
      }
    }
  },
  plugins: []
}
