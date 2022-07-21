module.exports = {
  theme: {
    extend: {
      fontFamily: {
        title: ['"Rubik Glitch"', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dark: {
          secondary: '#e95374',
          'secondary-focus': '#d94f6d',
          'secondary-content': '#000',
          primary: '#34d399',
          'primary-focus': '#14b8a6',
          'primary-content': '#000',
          accent: '#2e97f3',
          'accent-focus': '#2a92ed',
          'accent-content': '#fff',
          'base-100': '#16121a',
          'base-200': '#1a161f',
          'base-300': '#201926',
          'base-content': '#ffffff',
          neutral: '#1a161f',
          'neutral-focus': '#201926',
          'neutral-content': '#ffffff',
          info: '#247cd9',
          success: '#32a57b',
          warning: '#f9cb33',
          error: '#c55757',
          '--rounded-box': '1rem',
          '--rounded-btn': '.3rem',
          '--rounded-badge': '.1rem',
          '--tab-radius': '.3rem',
          '--btn-text-case': 'normal-case',
        },
      },
      {
        light: {
          'base-100': '#ffffff',
          'base-200': '#eeeeee',
          'base-300': '#dddddd',
          'base-content': '#000000',
          'secondary-content': '#000',
        },
      },
    ],
  },
}
