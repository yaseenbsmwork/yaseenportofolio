import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allows access via IP like 192.168.x.x
    port:5174,
  },
  resolve: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname
    }
  }
})
