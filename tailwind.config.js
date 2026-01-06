/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./api/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./data/**/*.{js,ts,jsx,tsx}",
        "./hooks/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./store/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#16a34a", // Professional Green (Green 600)
                "primary-hover": "#15803d",
                "background-light": "#f8fafc",
                "background-dark": "#0f172a",
                "surface-dark": "#1e293b",
                "surface-light": "#ffffff",
                "border-light": "#e2e8f0",
                "border-dark": "#334155",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            borderRadius: {
                "admin": "6px" // Professional standard rounding
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
