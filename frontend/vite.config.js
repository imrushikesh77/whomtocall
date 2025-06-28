// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // If you're using React
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(), // If you're using React
    tailwindcss(),
  ],
});