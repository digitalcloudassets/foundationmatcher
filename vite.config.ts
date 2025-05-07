export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist'
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
