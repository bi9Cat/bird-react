import { defineConfig } from "eslint/config";
import reactPlugin from 'eslint-plugin-react';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": typescriptEslintPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
    ],
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    extends: "eslint:recommended",
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: ["plugin:@typescript-eslint/recommended"],
  },
  {
    files: ["**/*.jsx", "**/*.tsx"],
    extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
  },
]);
