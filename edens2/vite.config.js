import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'  // or other plugins you're using

export default defineConfig({
  root: './edens2',
  base: '/',           // use '/edens2/' if publishing at chengmarc.github.io/edens2/
  build: {
    outDir: '../dist', // relative path so build goes to repo-root/dist
    emptyOutDir: true,
  },
  plugins: [react()],
})
