import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    // Bandeiras sempre como arquivos normais (nada embutido no código): é o formato mais compatível com tablets.
    assetsInlineLimit: 0,
  },
});
