import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import { flatConfig as nextFlatConfig } from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import { globalIgnores } from "eslint/config";
import globals from "globals";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";
import stylistic from '@stylistic/eslint-plugin'

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

const configs = [
  globalIgnores(["src/components/ui/**/*", "eslint.config.mjs"]),
  includeIgnoreFile(gitignorePath),

  {
    name: 'globals',
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.serviceworker,
      },
    },
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,

  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  {
    ...pluginReactHooks.configs["recommended-latest"],
    settings: { react: { version: "detect" } },
  },

  nextFlatConfig.coreWebVitals,
  jsxA11y.flatConfigs.recommended,

  stylistic.configs.recommended,
  eslintConfigPrettier,

  {
    files: ["**/*.{ts,tsx}"],
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
    rules: {
      "import/newline-after-import": "error",
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"], // Node.js 内置模块和外部模块
            "internal", // 内部模块（例如 tsconfig.json 中的 paths）
            ["parent", "sibling"], // 父级和同级相对路径
            "index", // index 文件
            "object", // 对象导入
            "type", // 类型导入（TypeScript）
            "unknown", // 其他未分类
          ],
          "newlines-between": "always", // 组之间添加空行
          alphabetize: {
            order: "asc", // 按字母顺序升序排序
            caseInsensitive: true, // 忽略大小写
          },
          pathGroups: [
            {
              pattern: "react", // React 相关模块放最前
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**", // 自定义路径别名（例如 @/components）
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"], // 允许 pathGroups 处理内置模块
        },
      ],
      "react/self-closing-comp": [
        "error",
        {
          "component": true,
          "html": true
        }
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ],
      "jsx-a11y/no-autofocus": "off"
    },
  },
];

export default configs;
