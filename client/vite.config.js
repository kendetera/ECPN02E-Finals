import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // In development, API calls go to the Express server on port 3000.
  server: { proxy: { '/api': 'http://localhost:3000' } },
});
