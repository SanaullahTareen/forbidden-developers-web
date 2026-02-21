/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'forbidden': {
                    dark: '#030014',
                    darker: '#020010',
                    purple: '#8b5cf6',
                    blue: '#3b82f6',
                    cyan: '#06b6d4',
                    pink: '#ec4899',
                }
            },
            fontFamily: {
                'display': ['Space Grotesk', 'sans-serif'],
                'body': ['Inter', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
                'float-slow': 'float-slow 8s ease-in-out infinite',
                'spin-slow': 'spin 20s linear infinite',
                'gradient': 'gradient 8s ease infinite',
            },
            keyframes: {
                'pulse-slow': {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%': { opacity: '0.6', transform: 'scale(1.05)' },
                },
                'float-slow': {
                    '0%, 100%': { transform: 'translateY(0) scale(1)' },
                    '50%': { transform: 'translateY(-20px) scale(1.02)' },
                },
                'gradient': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
        },
    },
    plugins: [],
}
