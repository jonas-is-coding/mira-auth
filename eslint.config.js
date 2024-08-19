// eslint.config.js
module.exports = {
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    // customize your rules
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
