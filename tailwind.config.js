/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  darkMode: "class",
  theme: {
    extend: {
      // Define dark mode styles
      // dark: 'class',
      backgroundImage: {
        'medi1': "url('/medi.jpg')",
        'categories' : "url('/categories.jpg')",
        'therapists' : "url('/therapists.jpg')",
        'pre-surgical': "url('/pre-surgical.jpg')",
        'header-bg-img': "url('/images/gallery/hero-bg.png')",
        'bg-departments': "url('/images/gallery/bg-departments.png')",
        'chat': " url('/images/chat/chat1.jpg')",
        'about-us': " url('/images/home/about-us.png')",
        'about-bg': " url('/images/home/about-bg.png')",
        'appointment': " url('/images/home/appointment.png')",
      },
      fontFamily: {
        'roboto' : ['Roboto', 'sans-serif'] ,
        'orbitron' : ['Orbitron', 'sans-serif'] ,
        'poppins' : ['Poppins', 'sans-serif'] ,
        'roboto-mono' : ['Roboto Mono', 'monospace'] ,
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('preline/plugin'),
],
}

