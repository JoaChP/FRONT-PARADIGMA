// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate de que apunta a los archivos en tu proyecto
  ],
  theme: {
    extend: {
      colors: {
        primary: '#646cff', // Define tu color "primary" aquí
        secondary: '#535bf2', // Opcional: define un color secundario si lo necesitas
        bgLight: '#ffffff',
        bgDark: '#242424',
        textLight: '#213547',
        textDark: 'rgba(255, 255, 255, 0.87)',
      },
    },
  },
  plugins: [],
};
