import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  resolve: {
    alias: {
      '@ams/core': resolve(__dirname, './src', 'app', 'core'),
      '@ams/feature': resolve(__dirname, './src', 'app', 'feature'),
      '@ams/shared': resolve(__dirname, './src', 'app', 'shared'),
      '@ams/environments': resolve(__dirname, './src', 'environments'),
    },
  },
  server: {
    host: 'localhost',
    port: 4200,
  },
});
