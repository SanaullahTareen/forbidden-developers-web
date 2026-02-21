import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: (() => {
    const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
    if (!isGithubActions) return '/'

    const repo = process.env.GITHUB_REPOSITORY
    const repoName = repo?.split('/')?.[1]
    return repoName ? `/${repoName}/` : '/'
  })(),
  plugins: [react()],
  server: {
    host: true, // Allow external access (mobile devices on same network)
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: true, // Allow external access for production preview
    port: 4173,
    strictPort: false,
  },
})
