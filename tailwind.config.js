const path = require('path');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    path.resolve(__dirname, './node_modules/litepie-datepicker/**/*.js')
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      black: {
        DEFAULT: '#212529'
      },
      white: {
        DEFAULT: '#FFFFFF'
      },
      lightGray: {
        DEFAULT: '#ECECEC'
      },
      darkGray: {
        DEFAULT: '#6C757D'
      },
      midGray: {
        DEFAULT: '#AAAAAA'
      },
      gray: {
        DEFAULT: '#f9f9f9'
      },
      green: {
        DEFAULT: '#7b8f1c'
      },
      lightGreen: {
        DEFAULT: '#C7D121'
      },
      lighterGreen: {
        DEFAULT: '#F4F5D4'
      },
      darkGreen: {
        DEFAULT: '#444f0f'
      },
      red: {
        DEFAULT: '#E00A1E'
      },
      lightRed: {
        DEFAULT: '#FBCCD4'
      },
      orange: {
        DEFAULT: '#EABE22'
      },
      lightOrange: {
        DEFAULT: '#FFE99A'
      },
      dateGreen: {
        light: '#F4F5D4',
        DEFAULT: '#C7D121',
        dark: '#444f0f',
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    },
    extend: {
      colors: {
        // Change with you want it
        'litepie-primary': colors.coolGray, // color system for light mode
        'litepie-secondary': colors.black // color system for dark mode
      },
      gridTemplateColumns: {
        list: '14% 19% 29% 25% 5% 8%',
        claims: '302% 30% 30% 10%'
      },
      screens: {
        smo: { min: '0px', max: '768px' },
        xs: { min: '0px', max: '768px' },
        xxs: { min: '0px', max: '360px' },
        mxs: { min: '360px' }
      },
      keyframes: {
        pulse2: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        pulse2: 'pulse2 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      width: {
        '98': '30rem',
        '99': '32rem'
      }
    }
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      textOpacity: ['disabled'],
      textColor: ['disabled']
    }
  },
  plugins: []
}
