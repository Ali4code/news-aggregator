import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      '@app': resolve(dirname(fileURLToPath(import.meta.url)), 'src/app'),
      '@widgets': resolve(dirname(fileURLToPath(import.meta.url)), 'src/widgets'),
      '@features': resolve(dirname(fileURLToPath(import.meta.url)), 'src/features'),
      '@entities': resolve(dirname(fileURLToPath(import.meta.url)), 'src/entities'),
      '@shared': resolve(dirname(fileURLToPath(import.meta.url)), 'src/shared'),
    },
  },
  preview: {
    port: 8080,
    strictPort: true,
   },
   server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
   },
})
