import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 43127,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 43127,
    strictPort: true,
  },
  // no embed proxy — kit visuals are local under /kits
  resolve: {
    alias: {
      // unused in shell; kits-app has its own config
      '@shell': path.resolve(__dirname, './src'),
    },
  },
})
