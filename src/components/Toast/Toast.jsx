import { useEffect, useState } from 'react';
import './Toast.css';

const DEFAULT_TITLES = {
  success: 'Sucesso',
  error: 'Erro',
  info: 'Informação',
  warning: 'Atenção',
};

const ICONS = {
  success: <path d="m6 10.5 2.5 2.5L14 7.5" />,
  error: <path d="m7 7 6 6m0-6-6 6" />,
  info: <path d="M10 9v5M10 6.2v.1" />,
  warning: <path d="M10 6v5M10 13.8v.1" />,
};

/** Tempo da animação de saída (deve ser igual ao do CSS) */
const EXIT_ANIMATION_MS = 200;

/**
 * Componente NOTIFICAÇÃO TOAST
 * - Recebe tipo, título, mensagem e duração via props.
 * - Gerencia seu estado de saída e se fecha sozinho após `duration` ms (useEffect + setTimeout).
 * - Também pode ser fechado pelo usuário no botão "×".
 *
 * @param {{
 *   id: number,
 *   type?: 'success'|'error'|'info'|'warning',
 *   title?: string,
 *   message: string,
 *   duration?: number,
 *   onClose: (id: number) => void
 * }} props
 */
export default function Toast({ id, type = 'info', title, message, duration = 4000, onClose }) {
  const [isLeaving, setIsLeaving] = useState(false);

  // Fecha automaticamente após o tempo definido
  useEffect(() => {
    const timer = setTimeout(() => setIsLeaving(true), duration);
    return () => clearTimeout(timer); // limpa o timer se o toast for removido antes
  }, [duration]);

  // Quando começa a sair, espera a animação terminar e então remove do estado global
  useEffect(() => {
    if (!isLeaving) return;
    const timer = setTimeout(() => onClose(id), EXIT_ANIMATION_MS);
    return () => clearTimeout(timer);
  }, [isLeaving, id, onClose]);

  return (
    <li
      className={`toast toast--${type}${isLeaving ? ' is-leaving' : ''}`}
      // Erros usam role="alert" para serem anunciados imediatamente por leitores de tela
      role={type === 'error' ? 'alert' : 'status'}
    >
      <svg className="toast__icon" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <circle cx="10" cy="10" r="9" />
        <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {ICONS[type]}
        </g>
      </svg>

      <div className="toast__body">
        <p className="toast__title">{title ?? DEFAULT_TITLES[type]}</p>
        <p className="toast__message">{message}</p>
      </div>

      <button
        type="button"
        className="toast__close"
        aria-label="Fechar notificação"
        onClick={() => setIsLeaving(true)}
      >
        <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
          <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Barra que diminui indicando o tempo restante */}
      <span className="toast__timer" style={{ animationDuration: `${duration}ms` }} aria-hidden="true" />
    </li>
  );
}
