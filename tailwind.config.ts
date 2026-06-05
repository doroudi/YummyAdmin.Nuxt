/** @type {import('tailwindcss').Config} */

export default {
    darkMode: 'class',
    // safelist: ["dark"],
    prefix: "",
    content: [
        "./app/components/**/*.{js,vue,ts}",
        "./app/layouts/**/*.vue",
        "./app/pages/**/*.vue",
        "./app/plugins/**/*.{js,ts}",
        "./app/app.vue",
        "./app/error.vue",
    ],
    theme: {
        
    },
    corePlugins: {
        preflight: false  // Disable Tailwind's base style reset
    },
    plugins: [],
}

