/**
 * @file React + TypeScript + Tailwind + ESLint + Prettier + Husky + lint-staged Setup (with pnpm)
 *
 * @steps
 * 1. Create the React + TypeScript project
 *    pnpm create vite@latest . -- --template react-ts
 *    pnpm install
 *
 * 2. Clean up old package manager files (if switching from npm/yarn)
 *    rd /s /q node_modules
 *    del package-lock.json yarn.lock
 *    del -Force pnpm-lock.yaml
 *    pnpm store prune
 *    pnpm install
 *
 * 3. Setup Tailwind CSS
 *    pnpm install -D tailwindcss postcss autoprefixer
 *    pnpm tailwindcss init -p
 *    // In index.css or main.css, add:
 *    @tailwind base;
 *    @tailwind components;
 *    @tailwind utilities;
 *
 * 4. Install Prettier and ESLint plugins
 *    pnpm add -D prettier eslint eslint-config-prettier eslint-plugin-prettier
 *      @typescript-eslint/parser @typescript-eslint/eslint-plugin
 *      eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import
 *      eslint-plugin-unused-imports
 *
 * 5. Create ESLint config
 *    Option 1: .eslintrc.cjs
 *      module.exports = {
 *        parser: "@typescript-eslint/parser",
 *        parserOptions: { project: "./tsconfig.eslint.json", tsconfigRootDir: __dirname, sourceType: "module" },
 *        plugins: ["@typescript-eslint", "react", "react-hooks", "unused-imports", "import", "prettier"],
 *        extends: [
 *          "eslint:recommended",
 *          "plugin:@typescript-eslint/recommended",
 *          "plugin:react/recommended",
 *          "plugin:react-hooks/recommended",
 *          "plugin:prettier/recommended"
 *        ],
 *        rules: {
 *          quotes: ["error", "single"],
 *          "prettier/prettier": "error",
 *          "unused-imports/no-unused-imports": "error"
 *        },
 *        settings: { react: { version: "detect" } }
 *      };
 *
 *    Option 2: eslint.config.js (flat config, v9+)
 *      import js from "@eslint/js";
 *      import ts from "@typescript-eslint/eslint-plugin";
 *      export default [
 *        js.configs.recommended,
 *        {
 *          files: ["*//*/*.{ts,tsx}"],
 *          parser: "@typescript-eslint/parser",
 *          parserOptions: { project: "./tsconfig.eslint.json" },
 *          plugins: { "@typescript-eslint": ts },
 *          rules: { quotes: ["error", "single"] }
 *        }
 *      ];
 *
 * 6. Create tsconfig.eslint.json
 *    {
 *      "extends": "./tsconfig.json",
 *      "include": ["src/*//*/*"],
 *      "exclude": ["node_modules", "dist"]
 *    }
 *
 * 7. Test ESLint
 *    pnpm exec eslint "src/*//*/*.{js,ts,jsx,tsx}" --fix
 *
 * 8. Setup Prettier config
 *    .prettierrc
 *    {
 *      "singleQuote": true,
 *      "semi": true,
 *      "trailingComma": "all",
 *      "printWidth": 100
 *    }
 *
 * 9. Setup Husky + lint-staged
 *    pnpm add -D husky lint-staged
 *    pnpm exec husky install
 *    pnpm pkg set scripts.prepare="husky install"
 *
 * 10. Create pre-commit hook (.husky/pre-commit)
 *    #!/bin/sh
 *    . "$(dirname "$0")/_/husky.sh"
 *    pnpm exec lint-staged || exit 1
 *    exit 0
 *    // Linux/macOS: chmod +x .husky/pre-commit
 *
 * 11. Configure lint-staged (package.json)
 *    "lint-staged": {
 *      "src/*//*/*.{ts,tsx,js,jsx}": [
 *        "pnpm exec eslint --fix",
 *        "pnpm exec prettier --write"
 *      ]
 *    }
 *    // Do NOT include git add — lint-staged v16+ auto-stages files
 *
 * 12. VS Code integration (.vscode/settings.json)
 *    {
 *      "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
 *      "editor.codeActionsOnSave": { "source.fixAll.eslint": true },
 *      "eslint.packageManager": "pnpm"
 *    }
 *
 * 13. Verify
 *    git add .
 *    git commit -m "first commit"
 *    // Husky runs pre-commit → ESLint + Prettier → commit passes if linting succeeds
 *
 * ✅ This setup provides:
 *    - React + TypeScript project
 *    - Tailwind CSS
 *    - ESLint + Prettier (single quotes)
 *    - Husky + lint-staged pre-commit hooks
 *    - VS Code live linting
 */
