import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/js-hub/' : '/',
  plugins: [react()],
  // Add this if you're using Three.js or other heavy libraries
  build: {
    chunkSizeWarningLimit: 1000, // in kbs
  }
})