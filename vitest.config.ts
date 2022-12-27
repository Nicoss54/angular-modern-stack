import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
export default defineConfig({
  resolve: {
    alias: {
      '@ams/core': resolve(__dirname, './src', 'app', 'core'),
      '@ams/feature': resolve(__dirname, './src', 'app', 'feature'),
      '@ams/shared': resolve(__dirname, './src', 'app', 'shared'),
      '@ams/environments': resolve(__dirname, './src', 'environments'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true,
    root: 'src',
  },
});
