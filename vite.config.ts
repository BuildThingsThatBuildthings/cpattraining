import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize bundle splitting for luxury components
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          luxury: ['lucide-react'],
          utils: ['html2canvas', 'jspdf']
        }
      }
    },
    // Minimize bundle size
    minify: 'terser',
    // Source maps for debugging
    sourcemap: true,
    // Set target for modern browsers
    target: 'esnext'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@luxury': resolve(__dirname, './src/components/luxury'),
      '@utils': resolve(__dirname, './src/utils'),
      '@pages': resolve(__dirname, './src/pages')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
})
