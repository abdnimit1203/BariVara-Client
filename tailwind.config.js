/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: [
      {
        mytheme: {
        
            "primary": "#FFDE59",
                    
            "secondary": "#7ED957",
                    
            "accent": "#96d5f7",
                    
            "neutral": "#38393f",
                    
            "base-100": "#ffffff",
                    
            "info": "#fda4af",
                    
            "success": "#18b47b",
                    
            "warning": "#f0d447",
                    
            "error": "#f41042",
        },
      },
    ],
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}