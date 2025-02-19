import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy:{
    "api/o/auth/google":"http://localhost:5100"
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss       
      ],
    },
  },
})
