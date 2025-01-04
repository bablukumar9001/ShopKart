import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  // Load environment variables based on the mode (e.g., development or production)
  const env = loadEnv(mode, process.cwd());


console.log(env.VITE_BASE_URL)


  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL ,  // Access environment variable here
          changeOrigin: true, // Change the origin header to the target URL
          secure: false, // Allow self-signed SSL certificates
          rewrite: (path) => path.replace(/^\/api/, ''),
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
};
