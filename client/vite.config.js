import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': '/src'
    }
  },
  server: {
    proxy: {
      '/events': 'https://zynk-d1b9.onrender.com',
      '/users': 'https://zynk-d1b9.onrender.com',
      '/auth': 'https://zynk-d1b9.onrender.com',
      '/contact': 'https://zynk-d1b9.onrender.com'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
