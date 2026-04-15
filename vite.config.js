import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves from /home/ — must match the repo name
  base: process.env.NODE_ENV === 'production' ? '/home/' : '/',
})
