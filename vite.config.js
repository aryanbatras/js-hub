import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/js-hub/' : '/',
  plugins: [react()],
  server: {
    fs: {
      strict: false
    }
  },
  resolve: {
    alias: {
      // This will make '/assets' point to the public directory
      '/assets': resolve(__dirname, 'public')
    }
  }
});