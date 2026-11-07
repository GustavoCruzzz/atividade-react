import { useEffect, useRef, useState } from 'react';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { useToast } from '../context/ToastContext';
import { formatFileSize } from '../utils/format';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_EXTENSIONS = ['.pdf', '.docx', '.txt'];

const STATUS_TEXT = {
  idle: 'Nenhum envio em andamento.',
  uploading: 'Enviando arquivo…',
  done: 'Arquivo enviado com sucesso!',
  error: 'O envio falhou. Tente novamente.',
};

/**
 * Seção "Envie seu manuscrito".
 * Simula o upload de um arquivo, atualizando a Barra de Progresso com useEffect + setInterval.
 */
export default function ManuscriptUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // 'idle' | 'uploading' | 'done' | 'error'
  const [simulateFailure, setSimulateFailure] = useState(false);
  const inputRef = useRef(null);
  const { showToast } = useToast();

  // Enquanto estiver "enviando", aumenta o progresso a cada 300 ms
  useEffect(() => {
    if (status !== 'uploading') return;

    const interval = setInterval(() => {
      const step = 4 + Math.random() * 10; // passo aleatório para parecer um upload real
      setProgress((current) => Math.min(100, current + step));
    }, 300);

    return () => clearInterval(interval); // para o intervalo quando o status muda
  }, [status]);

  // Observa o progresso para decidir quando o envio termina (ou falha)
  useEffect(() => {
    if (status !== 'uploading') return;

    if (simulateFailure && progress >= 60) {
      setStatus('error');
      showToast({ type: 'error', title: 'Falha no envio', message: 'A conexão foi interrompida. Tente novamente.' });
    } else if (progress >= 100) {
      setStatus('done');
      showToast({ type: 'success', title: 'Manuscrito enviado', message: `“${file.name}” foi recebido pela nossa equipe.` });
    }
  }, [progress, status, simulateFailure, file, showToast]);

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const extension = selectedFile.name.slice(selectedFile.name.lastIndexOf('.')).toLowerCase();

    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      showToast({ type: 'error', title: 'Formato não aceito', message: 'Envie um arquivo PDF, DOCX ou TXT.' });
      event.target.value = '';
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      showToast({ type: 'error', title: 'Arquivo muito grande', message: 'O tamanho máximo permitido é 10 MB.' });
      event.target.value = '';
      return;
    }

    setFile(selectedFile);
    setProgress(0);
    setStatus('idle');
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!file) {
      showToast({ type: 'warning', message: 'Escolha um arquivo antes de enviar.' });
      return;
    }
    setProgress(0);
    setStatus('uploading');
  }

  function handleCancel() {
    setStatus('idle');
    setProgress(0);
    showToast({ type: 'info', message: 'Envio cancelado.' });
  }

  function handleReset() {
    setFile(null);
    setProgress(0);
    setStatus('idle');
    if (inputRef.current) inputRef.current.value = '';
  }

  const isUploading = status === 'uploading';
  const progressVariant = status === 'error' ? 'error' : status === 'done' ? 'success' : 'accent';

  return (
    <section id="manuscritos" className="section card upload" aria-labelledby="manuscritos-titulo">
      <h2 id="manuscritos-titulo" className="section__title section__title--small">
        Envie seu manuscrito
      </h2>
      <p className="section__subtitle">Escritores iniciantes são bem-vindos. Aceitamos PDF, DOCX ou TXT de até 10 MB.</p>

      <form className="upload__form" onSubmit={handleSubmit}>
        <label className={`file-drop${isUploading ? ' is-disabled' : ''}`}>
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            accept={ACCEPTED_EXTENSIONS.join(',')}
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path
              d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {file ? (
            <span>
              <strong>{file.name}</strong>
              <span className="file-drop__hint">{formatFileSize(file.size)} · clique para trocar</span>
            </span>
          ) : (
            <span>
              <strong>Escolher arquivo</strong>
              <span className="file-drop__hint">Clique para selecionar no seu dispositivo</span>
            </span>
          )}
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={simulateFailure}
            onChange={(event) => setSimulateFailure(event.target.checked)}
            disabled={isUploading}
          />
          Simular falha de conexão (para demonstração)
        </label>

        <ProgressBar value={progress} label="Progresso do envio" variant={progressVariant} />
        <p className="upload__status" aria-live="polite">
          {STATUS_TEXT[status]}
        </p>

        <div className="upload__actions">
          {isUploading ? (
            <button type="button" className="button button--secondary" onClick={handleCancel}>
              Cancelar envio
            </button>
          ) : status === 'done' ? (
            <button type="button" className="button button--secondary" onClick={handleReset}>
              Enviar outro arquivo
            </button>
          ) : (
            <button type="submit" className="button">
              {status === 'error' ? 'Tentar novamente' : 'Enviar manuscrito'}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
