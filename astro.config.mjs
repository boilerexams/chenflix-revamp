import { defineConfig } from 'astro/config';
import glsl from 'vite-plugin-glsl';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://nemutas.github.io',
  base: '/',
  server: {
    host: false,
    port: 3000
  },
  vite: {
    plugins: [glsl()],
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          assetFileNames: '[ext]/[name][extname]',
          entryFileNames: 'script/entry.js'
        }
      },
      cssCodeSplit: false
    }
  },
  integrations: [react({experimentalReactChildren: true}), tailwind()]
});