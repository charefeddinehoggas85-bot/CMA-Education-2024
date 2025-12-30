import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#0D4BD3',
          yellow: '#FADD82',
          cream: '#FDF7E3',
          white: '#FFFFFF',
        },
        neutral: {
          white: '#FFFFFF',
          dark: '#1f2937',
        }
      },
      fontFamily: {
        'sans': [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ],
      },
      fontWeight: {
        'black': '900',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FADD82 0%, #0D4BD3 100%)',
      },
      backdropBlur: {
        'xs': '2px',
        '3xl': '64px',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      spacing: {
        // Espacements fluides universels
        'fluid-xs': 'clamp(0.25rem, 1vw, 0.5rem)',
        'fluid-sm': 'clamp(0.5rem, 2vw, 1rem)',
        'fluid-md': 'clamp(1rem, 3vw, 2rem)',
        'fluid-lg': 'clamp(1.5rem, 4vw, 3rem)',
        'fluid-xl': 'clamp(2rem, 5vw, 4rem)',
        'fluid-2xl': 'clamp(3rem, 6vw, 6rem)',
        'fluid-3xl': 'clamp(4rem, 8vw, 8rem)',
        'fluid-4xl': 'clamp(6rem, 10vw, 12rem)',
        // Espacements adaptatifs pour header
        'header-micro': '2rem',     // 32px - Smartwatch
        'header-xs': '2.5rem',      // 40px - Mobile portrait
        'header-sm': '3rem',        // 48px - Mobile large
        'header-md': '3.5rem',      // 56px - Tablet small
        'header-lg': '4rem',        // 64px - Tablet large
        'header-xl': '4.5rem',      // 72px - Desktop small
        'header-2xl': '5rem',       // 80px - Desktop standard
        'header-3xl': '5.5rem',     // 88px - Desktop large
        'header-4xl': '6rem',       // 96px - 2K displays
        // Espacements de section adaptatifs
        'section-micro': 'clamp(1rem, 4vw, 2rem)',
        'section-xs': 'clamp(1.5rem, 5vw, 3rem)',
        'section-sm': 'clamp(2rem, 6vw, 4rem)',
        'section-md': 'clamp(3rem, 7vw, 5rem)',
        'section-lg': 'clamp(4rem, 8vw, 6rem)',
        'section-xl': 'clamp(5rem, 9vw, 8rem)',
        'section-2xl': 'clamp(6rem, 10vw, 10rem)',
        'section-3xl': 'clamp(8rem, 12vw, 12rem)',
      },
      screens: {
        // Breakpoints universels calculés automatiquement
        'micro': '240px',   // Smartwatches, très petits écrans
        'xs': '320px',      // Mobile portrait minimum
        'sm': '480px',      // Mobile large
        'md': '624px',      // Transition mobile/tablet
        'lg': '896px',      // Tablet portrait
        'xl': '1152px',     // Tablet landscape/Desktop small
        '2xl': '1440px',    // Desktop standard
        '3xl': '1728px',    // Desktop large
        '4xl': '2240px',    // 2K displays
        '5xl': '3200px',    // 4K displays
        '6xl': '4480px',    // 5K displays
        '7xl': '6400px',    // 8K displays
        // Breakpoints spécialisés
        'mobile-s': '375px',
        'mobile-m': '414px',
        'tablet-p': '768px',
        'tablet-l': '1024px',
        'desktop': '1280px',
        'desktop-l': '1366px',
        'desktop-xl': '1536px',
        'fhd': '1920px',
        '2k': '2560px',
        '4k': '3840px',
        '5k': '5120px',
        '8k': '7680px',
      },
      maxWidth: {
        // Containers universels
        'micro': '240px',
        'xs': '320px',
        'sm': '480px',
        'md': '624px',
        'lg': '896px',
        'xl': '1152px',
        '2xl': '1440px',
        '3xl': '1728px',
        '4xl': '2240px',
        '5xl': '3200px',
        '6xl': '4480px',
        '7xl': '6400px',
        // Containers fluides
        'fluid-sm': 'min(90vw, 480px)',
        'fluid-md': 'min(85vw, 768px)',
        'fluid-lg': 'min(80vw, 1024px)',
        'fluid-xl': 'min(75vw, 1280px)',
        'fluid-2xl': 'min(70vw, 1536px)',
        'fluid-3xl': 'min(65vw, 1920px)',
        'fluid-4xl': 'min(60vw, 2560px)',
        // Containers spécialisés
        'content': 'min(65ch, 90vw)',
        'reading': 'min(75ch, 85vw)',
        'full': '100%',
        'screen': '100vw',
      },
      fontSize: {
        // Échelle typographique optimisée - Expert UI/UX
        // Tailles réduites pour un contenu plus lisible et professionnel
        'xs': ['clamp(0.75rem, 1.5vw, 0.8rem)', { lineHeight: '1.3' }],      // 12-13px
        'sm': ['clamp(0.8rem, 2vw, 0.875rem)', { lineHeight: '1.4' }],       // 13-14px
        'base': ['clamp(0.875rem, 2.5vw, 0.95rem)', { lineHeight: '1.5' }],  // 14-15px
        'lg': ['clamp(0.95rem, 3vw, 1.05rem)', { lineHeight: '1.6' }],       // 15-17px
        'xl': ['clamp(1.05rem, 3.5vw, 1.2rem)', { lineHeight: '1.6' }],      // 17-19px
        '2xl': ['clamp(1.2rem, 4vw, 1.4rem)', { lineHeight: '1.4' }],        // 19-22px
        '3xl': ['clamp(1.4rem, 4.5vw, 1.7rem)', { lineHeight: '1.3' }],      // 22-27px
        '4xl': ['clamp(1.7rem, 5vw, 2.1rem)', { lineHeight: '1.2' }],        // 27-34px
        '5xl': ['clamp(2.1rem, 6vw, 2.6rem)', { lineHeight: '1.1' }],        // 34-42px
        '6xl': ['clamp(2.6rem, 7vw, 3.2rem)', { lineHeight: '1.05' }],       // 42-51px
        '7xl': ['clamp(3.2rem, 8vw, 4rem)', { lineHeight: '1' }],            // 51-64px
        '8xl': ['clamp(4rem, 10vw, 5rem)', { lineHeight: '0.95' }],          // 64-80px
        
        // Tailles fixes pour éléments UI précis
        'ui-xs': ['0.75rem', { lineHeight: '1rem' }],     // 12px - Labels, badges
        'ui-sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px - Boutons, navigation
        'ui-base': ['1rem', { lineHeight: '1.5rem' }],    // 16px - Contenu standard
        'ui-lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px - Sous-titres
        'ui-xl': ['1.25rem', { lineHeight: '1.75rem' }],  // 20px - Titres sections
        
        // Tailles pour contenu (plus petites)
        'content-xs': ['0.8rem', { lineHeight: '1.4' }],    // 13px - Métadonnées
        'content-sm': ['0.875rem', { lineHeight: '1.5' }],  // 14px - Descriptions
        'content-base': ['0.9rem', { lineHeight: '1.6' }],  // 14.4px - Paragraphes
        'content-lg': ['1rem', { lineHeight: '1.7' }],      // 16px - Contenu principal
      },
    },
  },
  plugins: [],
}
export default config