import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#542b2b', // Kasuwa v2 primary (color1)
          foreground: '#f2eadb', // Kasuwa v2 cream (color2 as text on primary)
          50: '#f3ebe3',
          100: '#e6d5c1',
          200: '#d4b896',
          300: '#c09b68',
          400: '#ac7e3a',
          500: '#99611a',
          600: '#542b2b', // Main dark brown
          700: '#4a2626',
          800: '#3f2121',
          900: '#341c1c',
          950: '#241414',
        },
        secondary: {
          DEFAULT: '#f2eadb', // Kasuwa v2 secondary (color2)
          foreground: '#542b2b', // Kasuwa v2 primary (color1 as text on secondary)
          50: '#faf7f1',
          100: '#f5eee4',
          200: '#efe4d6',
          300: '#e8d5c4',
          400: '#e0c6b2',
          500: '#d8b7a0',
          600: '#cfaa8e',
          700: '#c69d7c',
          800: '#bd906a',
          900: '#b48358',
          950: '#aa7646',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: '#a52a2a', // Kasuwa v2 accent (color3)
          foreground: '#f2eadb', // kasuwa cream
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: '#f2eadb', // Kasuwa v2 cream color
          foreground: '#542b2b',
        },
        // Kasuwa Mall Brand Colors (from v2)
        'kasuwa-primary': {
          DEFAULT: '#8B4513', // Saddle Brown
          50: '#F5F0E8',
          100: '#E8D5C4',
          200: '#D4B896',
          300: '#C09B68',
          400: '#AC7E3A',
          500: '#8B4513', // Main brown
          600: '#7A3C11',
          700: '#69330F',
          800: '#582A0D',
          900: '#47210B',
        },
        'kasuwa-brown': {
          DEFAULT: '#654321', // Dark Brown
          50: '#F2EDE6',
          100: '#E0D0C0',
          200: '#CCB299',
          300: '#B89472',
          400: '#A4764B',
          500: '#654321', // Main dark brown
          600: '#5A3B1E',
          700: '#4F331A',
          800: '#442B17',
          900: '#392313',
        },
        'kasuwa-secondary': {
          DEFAULT: '#f2eadb', // Cream/Beige
          50: '#fefcfa',
          100: '#fdf8f3',
          200: '#fbf1e7',
          300: '#f8e9db',
          400: '#f5e2cf',
          500: '#f2eadb', // Main cream
          600: '#e8d4c1',
          700: '#ddbea7',
          800: '#d3a88d',
          900: '#c89273',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'slide-in-from-top': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-in',
        'fade-out': 'fade-out 0.3s ease-out',
        'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
        'slide-in-from-left': 'slide-in-from-left 0.3s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
        shimmer: 'shimmer 2s infinite linear',
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(242, 234, 219, 0.1), rgba(84, 43, 43, 0.05))', // kasuwa secondary to primary
        'kasuwa-gradient': 'linear-gradient(135deg, #f2eadb 0%, #8B4513 50%, #654321 100%)', // cream to saddle brown to dark brown
        'kasuwa-radial': 'radial-gradient(circle at center, #8B4513 0%, #654321 100%)', // saddle brown to dark brown
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
