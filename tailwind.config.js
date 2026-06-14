/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Dark editorial palette — "Midnight Maison"
        ink: '#EEE5CE',       // warm cream — primary text
        paper: '#0D0A07',     // deep warm black — main bg
        almost: '#FF5B3A',    // brand orange — stays
        muted: '#7A6E58',     // warm mid-tone
        hair: '#2A2118',      // dark hairline border
        surface: '#181410',   // slightly elevated surface
        raised: '#221E17',    // further elevated (hover states)
        // Override white so bg-white gives a dark card surface
        white: '#181410',
        success: {
          DEFAULT: '#3DAF72',
          bg: '#0C2016',
          mid: '#3DAF72',
          soft: '#1A3828'
        },
        danger: {
          DEFAULT: '#E06050',
          bg: '#280E0A',
          mid: '#C56A4F',
          soft: '#3F1810'
        },
        warning: {
          DEFAULT: '#F0C040',
          bg: '#201A08',
          mid: '#D4A832'
        }
      },
      fontFamily: {
        // Apfel Grotezk — everywhere. Hanken Grotesk is the fallback
        // while the font files are loading (or if they're missing).
        display: ['"Apfel Grotezk"', '"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        serif:   ['"Apfel Grotezk"', '"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        logo:    ['"Apfel Grotezk"', '"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        sans:    ['"Apfel Grotezk"', '"Hanken Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        // Azeret Mono — technical monospacer for labels & codes
        mono: ['"Azeret Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Display sizes tuned for Cormorant's high contrast
        'display-xl': ['64px', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['52px', { lineHeight: '1.0',  letterSpacing: '-0.02em' }],
        'display-md': ['40px', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-sm': ['32px', { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        card: '0 12px 40px -10px rgba(0,0,0,0.55), 0 2px 8px -2px rgba(0,0,0,0.35)',
        lift: '0 24px 60px -16px rgba(0,0,0,0.70)',
        glow: '0 0 0 1px rgba(255,91,58,0.3), 0 8px 24px -4px rgba(255,91,58,0.15)',
        // Liquid glass — translucent dark surfaces with depth + inner highlight
        glass: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.4)',
        'glass-lg': '0 20px 60px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
        nav: '0 16px 48px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        pop: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      animation: {
        'slide-up':   'slideUp 260ms cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-down': 'slideDown 260ms cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-in':    'fadeIn 200ms ease-out',
        pop:          'pop 220ms cubic-bezier(0.22, 1, 0.36, 1)',
        shimmer:      'shimmer 2s linear infinite',
      },
      transitionTimingFunction: {
        // iOS spring ~0.3 bounce — overshoots ~12% then settles
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    }
  },
  plugins: []
}
