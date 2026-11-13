export default {
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
  tailwindStylesheet: './src/styles/global.css',
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
};
