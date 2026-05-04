// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {
//       colors: {
//         gh: {
//           bg: '#0d1117',
//           surface: '#161b22',
//           border: '#30363d',
//           muted: '#8b949e',
//           accent: '#58a6ff',
//           green: '#3fb950',
//           orange: '#d29922',
//           red: '#f85149',
//           purple: '#bc8cff',
//         },
//         void: {
//           950: '#0a0e27',
//           900: '#0f1419',
//           800: '#161b22',
//           700: '#21262d',
//           600: '#30363d',
//         },
//         cyber: {
//           400: '#22d3ee',
//           500: '#06b6d4',
//           600: '#0891b2',
//         },
//         neon: {
//           purple: '#a855f7',
//           pink: '#ec4899',
//           blue: '#3b82f6',
//           cyan: '#06b6d4',
//         },
//         glass: {
//           light: 'rgba(229, 229, 229, 0.1)',
//           medium: 'rgba(229, 229, 229, 0.15)',
//           dark: 'rgba(22, 27, 34, 0.8)',
//         },
//       },
//       fontFamily: {
//         mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
//         sans: ['"Inter"', 'system-ui', 'sans-serif'],
//       },
//       animation: {
//         aurora: 'aurora 12s ease infinite',
//         'fade-in': 'fadeIn 0.6s ease forwards',
//         'slide-up': 'slideUp 0.5s ease forwards',
//         'pulse-slow': 'pulse 4s ease-in-out infinite',
//       },
//       keyframes: {
//         aurora: {
//           '0%, 100%': { backgroundPosition: '0% 50%' },
//           '50%': { backgroundPosition: '100% 50%' },
//         },
//         fadeIn: {
//           from: { opacity: 0 },
//           to: { opacity: 1 },
//         },
//         slideUp: {
//           from: { opacity: 0, transform: 'translateY(20px)' },
//           to: { opacity: 1, transform: 'translateY(0)' },
//         },
//       },
//     },
//   },
//   plugins: [],
// }
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {
//       colors: {
//         // Sophisticated dark theme with warm accents
//         dark: {
//           950: '#0a0d12',
//           900: '#0f1419',
//           850: '#14181f',
//           800: '#1a1f26',
//           750: '#1f252e',
//           700: '#252b36',
//           600: '#2f3640',
//           500: '#3d4553',
//           400: '#4d5766',
//           300: '#6b7280',
//         },
//         warm: {
//           50: '#fef8f3',
//           100: '#fef0e6',
//           200: '#fcd9c0',
//           300: '#f9bc8f',
//           400: '#f49d5d',
//           500: '#e67e3c',
//           600: '#c96428',
//           700: '#a44d20',
//           800: '#7d3b1c',
//           900: '#5a2b16',
//         },
//         sage: {
//           50: '#f6f8f6',
//           100: '#e8ede8',
//           200: '#d1dbd2',
//           300: '#aabcac',
//           400: '#7d9a80',
//           500: '#5a7a5e',
//           600: '#456149',
//           700: '#364d3a',
//           800: '#2a3b2e',
//           900: '#1f2c23',
//         },
//         slate: {
//           50: '#f8f9fa',
//           100: '#e9ecef',
//           200: '#d3d8dd',
//           300: '#b1bac4',
//           400: '#8893a3',
//           500: '#6b7684',
//           600: '#545d6b',
//           700: '#3f4753',
//           800: '#2d333d',
//           900: '#1e2229',
//         },
//         amber: {
//           50: '#fffbf0',
//           100: '#fef5d9',
//           200: '#fde8b2',
//           300: '#fbd889',
//           400: '#f8c55f',
//           500: '#f4b03e',
//           600: '#d89220',
//           700: '#b57317',
//           800: '#8f5812',
//           900: '#6a400d',
//         },
//         // Code syntax colors
//         gh: {
//           bg: '#0d1117',
//           surface: '#161b22',
//           border: '#30363d',
//           muted: '#8b949e',
//           accent: '#58a6ff',
//           green: '#3fb950',
//           orange: '#d29922',
//           red: '#f85149',
//           purple: '#bc8cff',
//         },
//       },
//       fontFamily: {
//         display: ['"Playfair Display"', 'Georgia', 'serif'],
//         sans: ['"Inter"', 'system-ui', 'sans-serif'],
//         mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
//         body: ['"Crimson Pro"', 'Georgia', 'serif'],
//       },
//       animation: {
//         'float': 'float 6s ease-in-out infinite',
//         'float-delayed': 'float 8s ease-in-out infinite 1s',
//         'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
//         'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
//         'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
//         'parallax-slow': 'parallaxSlow 20s linear infinite',
//         'parallax-medium': 'parallaxMedium 15s linear infinite',
//         'parallax-fast': 'parallaxFast 10s linear infinite',
//       },
//       keyframes: {
//         float: {
//           '0%, 100%': { transform: 'translateY(0px)' },
//           '50%': { transform: 'translateY(-20px)' },
//         },
//         slideUp: {
//           '0%': { opacity: '0', transform: 'translateY(30px)' },
//           '100%': { opacity: '1', transform: 'translateY(0)' },
//         },
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' },
//         },
//         scaleIn: {
//           '0%': { opacity: '0', transform: 'scale(0.95)' },
//           '100%': { opacity: '1', transform: 'scale(1)' },
//         },
//         parallaxSlow: {
//           '0%': { transform: 'translateY(0)' },
//           '100%': { transform: 'translateY(-10%)' },
//         },
//         parallaxMedium: {
//           '0%': { transform: 'translateY(0)' },
//           '100%': { transform: 'translateY(-20%)' },
//         },
//         parallaxFast: {
//           '0%': { transform: 'translateY(0)' },
//           '100%': { transform: 'translateY(-30%)' },
//         },
//       },
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
//       },
//     },
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Enhanced dark theme with warm accents
        dark: {
          950: '#0a0d12',
          900: '#0f1419',
          850: '#14181f',
          800: '#1a1f26',
          750: '#1f252e',
          700: '#252b36',
          600: '#2f3640',
          500: '#3d4553',
          400: '#4d5766',
          300: '#6b7280',
        },
        warm: {
          50: '#fef8f3',
          100: '#fef0e6',
          200: '#fcd9c0',
          300: '#f9bc8f',
          400: '#f49d5d',
          500: '#e67e3c',
          600: '#c96428',
          700: '#a44d20',
          800: '#7d3b1c',
          900: '#5a2b16',
        },
        sage: {
          50: '#f6f8f6',
          100: '#e8ede8',
          200: '#d1dbd2',
          300: '#aabcac',
          400: '#7d9a80',
          500: '#5a7a5e',
          600: '#456149',
          700: '#364d3a',
          800: '#2a3b2e',
          900: '#1f2c23',
        },
        slate: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#d3d8dd',
          300: '#b1bac4',
          400: '#8893a3',
          500: '#6b7684',
          600: '#545d6b',
          700: '#3f4753',
          800: '#2d333d',
          900: '#1e2229',
        },
        amber: {
          50: '#fffbf0',
          100: '#fef5d9',
          200: '#fde8b2',
          300: '#fbd889',
          400: '#f8c55f',
          500: '#f4b03e',
          600: '#d89220',
          700: '#b57317',
          800: '#8f5812',
          900: '#6a400d',
        },
        // Code syntax colors
        gh: {
          bg: '#0d1117',
          surface: '#161b22',
          border: '#30363d',
          muted: '#8b949e',
          accent: '#58a6ff',
          green: '#3fb950',
          orange: '#d29922',
          red: '#f85149',
          purple: '#bc8cff',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        body: ['"Crimson Pro"', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 1s',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'parallax-slow': 'parallaxSlow 20s linear infinite',
        'parallax-medium': 'parallaxMedium 15s linear infinite',
        'parallax-fast': 'parallaxFast 10s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        parallaxSlow: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10%)' },
        },
        parallaxMedium: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20%)' },
        },
        parallaxFast: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-30%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(230, 126, 60, 0.3)',
        'glow-md': '0 0 30px rgba(230, 126, 60, 0.4)',
        'glow-lg': '0 0 45px rgba(230, 126, 60, 0.5)',
        'depth-1': '0 2px 4px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.2)',
        'depth-2': '0 4px 8px rgba(0, 0, 0, 0.3), 0 12px 24px rgba(0, 0, 0, 0.25)',
        'depth-3': '0 8px 16px rgba(0, 0, 0, 0.35), 0 16px 32px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}