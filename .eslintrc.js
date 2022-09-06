module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    ecmaFeatures: {
      jsx: true
    },
    sourceType: "module" // Allows for the use of imports
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    "newline-after-var": "off",
    "vue/no-v-html": "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-non-null-assertion": "off"
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "scripts/",
    "auto-imports.d.ts",
    "components.d.ts"
  ]
};
