import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Ensures assets load correctly from root domain
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
