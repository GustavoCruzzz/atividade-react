import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import ToastContainer from '../components/Toast/ToastContainer';

/**
 * Contexto global de notificações (Context API).
 * Permite que QUALQUER componente da árvore exiba um toast chamando
 * `showToast(...)`, sem precisar repassar props por vários níveis.
 */
const ToastContext = createContext(null);

export function ToastProvider({ children, maxToasts = 4 }) {
  // Lista de notificações visíveis no momento
  const [toasts, setToasts] = useState([]);
  // Contador para gerar ids únicos (useRef não causa nova renderização)
  const nextIdRef = useRef(1);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Exibe uma nova notificação.
   * @param {{type?: 'success'|'error'|'info'|'warning', title?: string, message: string, duration?: number}} toast
   */
  const showToast = useCallback(
    ({ type = 'info', title, message, duration = 4000 }) => {
      const id = nextIdRef.current++;
      // Mantém apenas as últimas `maxToasts` notificações na tela
      setToasts((current) => [...current, { id, type, title, message, duration }].slice(-maxToasts));
      return id;
    },
    [maxToasts]
  );

  // useMemo evita recriar o objeto (e re-renderizar os consumidores) sem necessidade
  const value = useMemo(() => ({ showToast, removeToast }), [showToast, removeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

/** Hook personalizado para consumir o contexto de notificações. */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de <ToastProvider>.');
  }
  return context;
}
