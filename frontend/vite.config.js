import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Adjust as necessary
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://shopkart-sarq.onrender.com/', // Your backend server URL
        changeOrigin: true, // Ensures the origin of the host header matches the target
        secure: false, // Allows proxying to servers with self-signed certificates
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['redux'], // Externalize redux to avoid import resolution issues
    },
  },
});
