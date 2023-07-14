/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        nav_auto: "min(90%, 1200px)",
        width_contenedor: "min(90%, 1000px)",
        width_Perfil: "min(90%, 500px)",
      },
    },
  },
  plugins: [],
};
