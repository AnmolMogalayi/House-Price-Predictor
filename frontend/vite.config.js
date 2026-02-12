import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change to port 3000 (or keep 5173, your choice)
    open: true, // Automatically open browser
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'icons': ['react-icons'],
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'axios', 'react-icons']
  }
})

