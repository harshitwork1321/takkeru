import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-gsap': ['gsap', 'gsap/ScrollTrigger'],
          'vendor-motion': ['framer-motion'],
          'vendor-react': ['react', 'react-dom'],
        },
      },
    },
  },
})
