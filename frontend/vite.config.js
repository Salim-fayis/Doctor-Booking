import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for production
export default defineConfig({
  plugins: [react()],
});
