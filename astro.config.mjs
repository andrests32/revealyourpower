import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// No site URL is invented for this local-only project.
const site = process.env.PUBLIC_SITE_URL;

export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static',
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
