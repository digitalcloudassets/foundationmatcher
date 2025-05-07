import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ✅ Required for GitHub Pages to avoid blank screen
  plugins: [react()],
  build: {
    outDir: 'dist',     // make sure GitHub Pages is pointing to this
    emptyOutDir: true
  }
});
