/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#0D0B07',
        surface: '#1A1713',
        border: '#3D3020',
        accent: '#C8860A',       // ember amber
        accentSoft: '#7A4F10',
        textPrimary: '#E8DCC8',
        textSecondary: '#8C7B5E',
        danger: '#8B1A1A',
        success: '#1A4D2E',
        hollowed: '#4A7C7C',     // teal-ish
        undead: '#7A4F10',       // amber
        trueLord: '#6B1A1A',     // deep red
      },
      fontFamily: {
        cinzel: ["Cinzel"],
      },
    },
  },
  plugins: [],
}
