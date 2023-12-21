/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  mode: 'jit',
  theme: {
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
      Poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      screens: {
        '1260px': '1260px',
        '1250px': { max: '1250px' },
        '1050px': { max: '1050px' },
        '950px': { max: '950px' },
        '801px': { max: '801px' },
        '700px': { max: '700px' },
        '625px': { max: '625px' },
        // '1150px': '1150px',
        '1010px': '1010px',
        '1000px': '1050px',
        '1100px': '1110px',
        '800px': '800px',
        '1300px': '1300px',
        '400px': '400px',
      },
    },
  },
  plugins: [],
};
