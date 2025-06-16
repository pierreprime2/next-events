import daisyui from 'daisyui';
import { withUt } from 'uploadthing/tw'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [daisyui]
};

export default withUt(config)
