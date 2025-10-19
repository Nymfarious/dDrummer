const preset = (() => {
  try { return require("@mother-project/tokens/tailwind-preset"); }
  catch { return {}; }
})();

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  presets: Object.keys(preset).length ? [preset] : []
};
