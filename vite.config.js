import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  // Ensure VITE_ prefixed env variables are available in the browser bundle
  // Never expose server-side secrets - only VITE_ prefixed vars are included
  envPrefix: 'VITE_'
})
