import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
     "https://51f10a69470d.ngrok-free.app",
     "51f10a69470d.ngrok-free.app"
    ]
  }
})
