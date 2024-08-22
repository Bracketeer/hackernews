import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(env.VITE_API_URL)
  return {
    plugins: [
      TanStackRouterVite(),
      react()],
    define: {
      'VITE_API_URL': env.VITE_API_URL,
      },
      
  }     
})
