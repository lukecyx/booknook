module.exports = {
  root: true,
  parser: "@typescript-eslint/parser", // or '@babel/eslint-parser' if using JS
  parserOptions: {
    ecmaVersion: 2025,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es2025: true,
  },
  extends: ["next/core-web-vitals", "next/typescript", "plugin:prettier/recommended"],
  plugins: ["import", "prettier", "stylelint", "react", "@typescript-eslint"],
  rules: {
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", ["parent", "sibling", "index"], "type"],
        pathGroups: [
          { pattern: "react", group: "external", position: "before" },
          { pattern: "next/**", group: "external", position: "after" },
          { pattern: "@types/**", group: "type", position: "after" },
          { pattern: "src/**", group: "internal", position: "after" },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "always",
      },
    ],
    "prettier/prettier": "error",
  },
  settings: {
    "import/resolver": { node: { extensions: [".js", ".jsx", ".ts", ".tsx"] } },
  },
  overrides: [
    {
      files: ["**/*.{js,ts,jsx,tsx}"],
      processor: "stylelint-processor-styled-components",
      rules: {
        "stylelint/block-no-empty": "error",
        "stylelint/declaration-block-trailing-semicolon": "always",
        "stylelint/no-invalid-double-slash-comments": true,
        "stylelint/property-case": "lower",
        "stylelint/color-no-invalid-hex": true,
      },
    },
  ],
};
