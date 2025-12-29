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
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
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
        'header-offset': '9rem', // 144px - espacement pour compenser le header fixe desktop
        'header-offset-md': '7rem', // 112px - espacement tablet
        'header-offset-mobile': '5rem', // 80px - espacement mobile
      },
      screens: {
        'xs': '475px',
        // => @media (min-width: 475px) { ... }
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
        'md': '768px',
        // => @media (min-width: 768px) { ... }
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
}
export default config