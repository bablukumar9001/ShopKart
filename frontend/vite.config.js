import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  // Load environment variables based on the mode
  const env = loadEnv(mode, process.cwd());

  // Log the environment base URL for debugging
  console.log("VITE_BASE_URL:", env.VITE_BASE_URL);

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src', // Set up alias for cleaner imports
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL, // Use environment variable for base URL
          changeOrigin: true, // Modify the origin header to match the target
          secure: false, // Allow self-signed certificates
          // rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Adjust path if needed
        },
      },
    },
    optimizeDeps: {
      include: ['redux', 'redux-thunk'], // Pre-bundle these dependencies
      exclude: ['redux-devtools-extension'], // Avoid bundling devtools for production
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined, // Avoid splitting into manual chunks
        },
      },
      chunkSizeWarningLimit: 1000, // Adjust chunk size warning limit
    },
  });
};
