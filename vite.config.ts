import { defineConfig } from 'vite';

// If you're using React, include the plugin:
// import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Required for GitHub Pages to avoid white screen
  // plugins: [react()], // Uncomment if you're using React
  build: {
    outDir: 'dist', // You can change this if GitHub Pages is using /docs
    emptyOutDir: true,
  }
});
