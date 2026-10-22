// ESLint flat config — the quality gate that runs before every deploy.
const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    files: ["site/js/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: globals.browser
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-unused-vars": "error",
      eqeqeq: "error"
    }
  },
  {
    files: ["scripts/**/*.js", "eslint.config.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node
    },
    rules: {
      semi: ["error", "always"]
    }
  }
];
