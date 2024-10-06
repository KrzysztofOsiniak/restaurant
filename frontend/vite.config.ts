import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: '',
    sourcemap: true,
  },
  server: {
    port: 5173,
    proxy: {
        '/graphql': {
            target: 'http://localhost:8080/',
        },
    },
  },
})
