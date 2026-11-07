import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';

// Ponto de entrada: renderiza o componente principal <App /> dentro da div#root
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
