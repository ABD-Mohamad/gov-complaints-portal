import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import million from 'million/compiler'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    million.vite({ auto: true }),
    react()
  ],
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'million']
  },
  server: {
    port: 5173,
    host: true,
    cors: true,
    // Add proxy to avoid CSP issues
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})