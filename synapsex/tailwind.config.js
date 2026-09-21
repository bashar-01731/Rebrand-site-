/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Near-black with a faint violet bias, to sit with the mauve accent. */
        ink: '#16151A',
        /* Near-white ground, cool rather than the usual warm cream. */
        bone: '#F2F1F4',
      },
      fontFamily: {
        sans: ['"Space Mono"', 'monospace'],
        serif: ['"Space Mono"', 'monospace'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
