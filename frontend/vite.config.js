import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/convert': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false, // Allow self-signed certificates
      },
    },
  },
})
