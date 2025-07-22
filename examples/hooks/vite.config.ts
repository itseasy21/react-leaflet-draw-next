import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    outDir: resolve(__dirname, './dist'),
    assetsDir: '',
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0',
    open: true,
    port: 8002,
  },
  optimizeDeps: {
    include: ['leaflet', 'react-leaflet'],
    exclude: ['leaflet-draw']
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      react: resolve(__dirname, '../../node_modules/react'),
      'react-dom': resolve(__dirname, '../../node_modules/react-dom'),
    }
  },
  define: {
    global: 'globalThis',
  },
  esbuild: {
    target: 'es2020'
  }
});
