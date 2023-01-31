module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: [
        {
          mytheme: {
            primary: "#2F56AA",
            secondary: "#27ae60",
            accent: "#E570A1",
            neutral: "#1D1820",
            "base-100": "#FCFCFD",
            "base-200" : "#F4F4F4",
            "base-300" : "#141414",
            "error" : "#F87272"
            
          }
        }
      ]
    }
  }