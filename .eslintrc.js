module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  globals: {
    importName: true,
    __dirname: true,
    process: true,
    path: true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["react-hooks"],
  rules: {
    semi: 2,
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "no-irregular-whitespace": "off",
    "no-console": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};
