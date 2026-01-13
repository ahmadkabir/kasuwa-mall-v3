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
          DEFAULT: '#0E54AF', // NACCIMA Primary Blue
          foreground: '#FFFFFF', // White text on primary
          50: '#E6F0FA',
          100: '#CCE1F5',
          200: '#99C3EB',
          300: '#66A5E1',
          400: '#3387D7',
          500: '#0E54AF', // Main blue
          600: '#0B3F8F',
          700: '#082A6F',
          800: '#05154F',
          900: '#02002F',
          950: '#01001F',
        },
        secondary: {
          DEFAULT: '#167146', // NACCIMA Secondary Green (Success)
          foreground: '#FFFFFF', // White text on secondary
          50: '#E6F5EC',
          100: '#CCEBD9',
          200: '#99D7B3',
          300: '#66C38D',
          400: '#33AF67',
          500: '#167146', // Main green
          600: '#115A38',
          700: '#0C432A',
          800: '#082C1C',
          900: '#04150E',
          950: '#020A07',
        },
        destructive: {
          DEFAULT: '#D90B0B', // NACCIMA Accent Red (Danger)
          foreground: '#FFFFFF', // White text on destructive
          50: '#FCE6E6',
          100: '#F9CCCC',
          200: '#F39999',
          300: '#ED6666',
          400: '#E73333',
          500: '#D90B0B', // Main red
          600: '#AD0909',
          700: '#820707',
          800: '#570505',
          900: '#2C0202',
          950: '#160101',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: '#90B3B9', // NACCIMA Soft Neutral Blue-Gray
          foreground: '#FFFFFF', // White text on accent
          50: '#F0F7F8',
          100: '#E1EFF1',
          200: '#C3DFE3',
          300: '#A5CFD5',
          400: '#87BFC7',
          500: '#90B3B9', // Main soft neutral
          600: '#738F94',
          700: '#566B6F',
          800: '#39474A',
          900: '#1C2325',
          950: '#0E1213',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: '#FFFFFF', // White background
          foreground: '#333333', // Dark gray text
        },
        // NACCIMA Brand Colors (for backward compatibility and specific use cases)
        'kasuwa-primary': {
          DEFAULT: '#0E54AF', // NACCIMA Primary Blue
          50: '#E6F0FA',
          100: '#CCE1F5',
          200: '#99C3EB',
          300: '#66A5E1',
          400: '#3387D7',
          500: '#0E54AF',
          600: '#0B3F8F',
          700: '#082A6F',
          800: '#05154F',
          900: '#02002F',
        },
        'kasuwa-secondary': {
          DEFAULT: '#167146', // NACCIMA Secondary Green
          50: '#E6F5EC',
          100: '#CCEBD9',
          200: '#99D7B3',
          300: '#66C38D',
          400: '#33AF67',
          500: '#167146',
          600: '#115A38',
          700: '#0C432A',
          800: '#082C1C',
          900: '#04150E',
        },
        // Text colors
        'text-default': '#333333',
        'text-muted': '#6B7280',
        // Border color
        'border-light': '#E5E7EB',
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
        'glass-gradient': 'linear-gradient(135deg, rgba(14, 84, 175, 0.1), rgba(22, 113, 70, 0.05))', // NACCIMA primary to secondary
        'kasuwa-gradient': 'linear-gradient(135deg, #0E54AF 0%, #167146 100%)', // NACCIMA primary blue to secondary green
        'kasuwa-radial': 'radial-gradient(circle at center, #0E54AF 0%, #167146 100%)', // NACCIMA primary to secondary
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
