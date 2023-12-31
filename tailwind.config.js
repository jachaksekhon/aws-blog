/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        blogfont: ['Century Gothic', 'Clarendon Condensed', 'Copperplate Gothic Light', 'Zurich Ex BT']
      },
      width: {
        blogWidth: '900px',
        createBlogWidthL: '1400px',
        createBlogWidthS: '700px'
      },
      colors: {
        'tan' : '#D2B48C'
      }
    },
  },
  plugins: [],
}

