import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Clean import mapping inside src/
      '@': '/src',
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
