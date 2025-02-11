// Do not use CLI in this project. Use IDE integration instead (i.e. VS Code "Prettier - Code formatter" extension).

/** @type {import("prettier").Config} */
const config = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  ignorePath: '.prettierignore',
  insertPragma: false,
  jsxSingleQuote: true,
  printWidth: 128,
  proseWrap: 'preserve',
  quoteProps: 'preserve',
  requireConfig: false,
  requirePragma: false,
  resolveGlobalModules: false,
  semi: true,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useEditorConfig: true,
  useTabs: false,
};

export default config;
