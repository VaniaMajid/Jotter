import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      Components: path.resolve(__dirname, './src/components'),
      Assets: path.resolve(__dirname, './src/assets'),
      Containers: path.resolve(__dirname, './src/containers'),
      Redux: path.resolve(__dirname, './src/redux'),
      Firebase: path.resolve(__dirname, './src/firebase'),
      Styles: path.resolve(__dirname, './src/styles'),
      Templates: path.resolve(__dirname, './src/Templates'),
    },
  },
})
