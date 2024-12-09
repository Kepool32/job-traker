import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Настройка алиасов путей
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@assets': '/src/assets',
      '@hooks': '/src/hooks',
      '@pages': '/src/pages',
      '@services': '/src/services',
      '@validation': '/src/validation', // Алиас для валидации
      '@store': '/src/store',           // Алиас для стора
      '@api': '/src/api',               // Алиас для API
      '@utils': '/src/utils',
      '@types': '/src/types',   // Алиас для утилит
    },
  },
});
