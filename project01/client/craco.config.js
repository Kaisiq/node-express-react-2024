const MillionLint = require("@million/lint");
/* craco.config.js */
const path = require(`path`);
const plugins = [
  MillionLint.webpack({
    legacyHmr: true,
  }),
];
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "~": path.resolve(__dirname, "src/"),
    },
    add: plugins,
  },
};
