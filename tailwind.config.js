import daisyui from 'daisyui'
import twTypography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    twTypography(),
    daisyui,
  ],
  daisyui: {
    themes: ["winter", "dark"],
  },
  darkMode: ['class', '[data-theme="dark"]']
}

