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
      '/events': 'http://localhost:8080',
      '/users': 'http://localhost:8080',
      '/auth': 'http://localhost:8080',
      '/contact': 'http://localhost:8080'
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
