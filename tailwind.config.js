const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  
  // Enable dark mode using class strategy
  darkMode: 'class',
  
  theme: {
    // Extend default theme
    extend: {
      // Custom color palette with semantic naming
      colors: {
        primary: {
          50: '#e6f1ff',
          100: '#b3d7ff',
          200: '#80bdff',
          300: '#4da3ff',
          400: '#1a89ff',
          500: '#0070f3', // Base primary color
          600: '#005ac2',
          700: '#004391',
          800: '#002d60',
          900: '#001730'
        },
        secondary: {
          50: '#f0f9ff',
          100: '#b8e0ff',
          200: '#80c7ff',
          300: '#4aadff',
          400: '#1494ff',
          500: '#007bff', // Base secondary color
          600: '#0062cc',
          700: '#004c99',
          800: '#003666',
          900: '#002033'
        },
        
        // Semantic colors
        success: {
          50: '#e6f3e6',
          100: '#b3e0b3',
          200: '#80cc80',
          300: '#4db84d',
          400: '#1aa41a',
          500: '#00a000', // Base success color
          600: '#008000',
          700: '#006000',
          800: '#004000',
          900: '#002000'
        },
        warning: {
          50: '#fff3e0',
          100: '#ffe0b3',
          200: '#ffcc80',
          300: '#ffb84d',
          400: '#ffa41a',
          500: '#ff9000', // Base warning color
          600: '#cc7300',
          700: '#995600',
          800: '#663800',
          900: '#331c00'
        },
        danger: {
          50: '#ffe6e6',
          100: '#ffb3b3',
          200: '#ff8080',
          300: '#ff4d4d',
          400: '#ff1a1a',
          500: '#ff0000', // Base danger color
          600: '#cc0000',
          700: '#990000',
          800: '#660000',
          900: '#330000'
        }
      },
      
      // Custom font family
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      
      // Custom animations
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      // Custom box shadows
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'hard': '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
      },
      
      // Responsive breakpoints
      screens: {
        'xs': '480px',
        ...defaultTheme.screens
      }
    }
  },
  
  // Plugins
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
};