import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: env.VITE_BASE_URL, // Use environment variable for backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    include: ['redux', 'redux-thunk'],  // Ensure these dependencies are optimized
    exclude: ['redux-devtools-extension'],  // If you have any unwanted dependencies
  },
  build: {
    rollupOptions: {
      external: [],  // Don't mark 'redux' as external for the build process
      output: {
        manualChunks: undefined, // Remove manual chunking
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});

