import Toast from './Toast';

/**
 * Área fixa na tela onde as notificações são empilhadas.
 * Recebe a lista de toasts do ToastContext via props.
 */
export default function ToastContainer({ toasts, onClose }) {
  return (
    <section className="toast-region" aria-label="Notificações">
      <ol className="toast-list">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </ol>
    </section>
  );
}
