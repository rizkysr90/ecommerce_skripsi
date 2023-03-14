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
          bumbleebee: {
            ...require("daisyui/src/colors/themes")["[data-theme=bumblebee]"],
            primary: "#f1c642",
            secondary: "#0079c2",
            "secondary-content" : "#ffffff",
            "base-200" : "#f5f5f5",
            "success" : "#1eb854",
            "success-content" : "#c2ffd7"
          },
        },
      ],
    }
  }