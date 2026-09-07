import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/kits/',
  build: {
    outDir: path.resolve(__dirname, '../public/kits'),
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0',
    port: 43128,
    strictPort: true,
  },
})
