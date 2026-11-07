import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração do Vite (ferramenta de build/servidor de desenvolvimento)
export default defineConfig({
  plugins: [react()],
  server: {
    // Necessário para o GitHub Codespaces encaminhar a porta corretamente
    host: true,
    port: 5173,
  },
});
