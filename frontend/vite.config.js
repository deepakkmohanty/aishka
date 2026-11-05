import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = process.env.VITE_API_URL || env.VITE_API_URL || '';

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: {
      'process.env.VITE_API_URL': JSON.stringify(apiUrl)
    }
  }
})
