module.exports = {
  content: [
    "./src/**/*.html",
    "./src/partials/**/*.htm",
    "./src/**/*.js",
    "./src/**/*.scss",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        "2xl": "1430px",
      },
      fontFamily: {
        satoshi: ["'Satoshi'"],
        instrument: ["'Instrument Serif', system-ui"],
      },
      colors: {
        primary: "#12D8CC",
        secondary: "#181818",
        backgroundBody: "#EDF0F5",
        black: "#181818",
        colorText: "#181818b3",
        dark: {
          DEFAULT: "#151515",
          100: "#ffffffb3",
          200: "#212220",
          300: "#191A17",
          gradient: "#191917",
        },
      },
      borderColor: {
        DEFAULT: "#1818181a",
        dark: "#edf0f51a",
      },
      cursor: {
        fancy: "url(../images/cursor.svg), default",
        pause: "url(../images/pause.png), default",
      },
      backgroundImage: {
        "home-ai-hero": "url('/images/home-ai/hero-ai.png')",
        "portfoliio-hover": "url('/images/portfolio/portfolio-hover-demo.png')",
      },
      transitionTimingFunction: {
        "faq-body-transition": "cubic-bezier(0.165, 0.84, 0.44, 1)",
        "in-expo": "cubic-bezier(0.6,-0.28,0.74,0.05);",
        "team-bezier": "cubic-bezier(.21,.25,.76,.71)",
      },
      boxShadow: {
        nav: "0px 0px 30px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  safelist: [
    {
      pattern: /scale-/,
    },
  ],
  plugins: [],
  textRendering: {
    "optimize-legibility": "optimizeLegibility",
    "optimize-speed": "optimizeSpeed",
  },
};
