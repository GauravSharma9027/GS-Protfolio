/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      'sm': '320px',
      // => @media (min-width: 320px(620px)) { ... }

      'md': '468px',
      // => @media (min-width: 468px(768px)) { ... }

      'MD': '668px',
      // => @media (min-width: 668px) { ... }

      'lg': '968px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1132px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1400px',
      // => @media (min-width: 1536px) { ... }

      // agar sm , md , lg mene manually define kr diye to mujhe max-sm,md,lg ko bhi manually hi define krna padega raw(keyword) ka use krke
      // "max-sm": { raw: "(max-width: 639px)" },
      // "max-md": { raw: "(max-width: 767px)" },
      // "max-lg": { raw: "(max-width: 1023px)" },
      
     'h-sm': { raw: '(max-height: 600px)' },  // small height
     'h-md': { raw: '(min-height: 601px) and (max-width: 884px )' }, // Medium height
     'h-MD': { raw: '(min-height: 1024px) and (max-height: 1900px )' },
     'h-lg': { raw: '(min-height: 927px)'},  // large height


    },
    extend: {
      keyframes: {
        widthOscillation: {
          "0%": { width: "0" },
          "50%": { width: "100%" },
          "100%": { width: "0" },
        },
      },
      animation: {
        width: "widthOscillation 8s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded'], // Adds support for rounded scrollbars
  },
}

