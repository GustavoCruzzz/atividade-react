import './ProgressBar.css';

/**
 * Componente BARRA DE PROGRESSO
 * - Recebe o valor (0 a 100) via props e ajusta a largura do preenchimento.
 * - Pode exibir o percentual (showValue) e ter cores diferentes (variant).
 *
 * @param {{
 *   value: number,
 *   label: string,
 *   showValue?: boolean,
 *   showLabel?: boolean,
 *   variant?: 'accent'|'success'|'error'|'info',
 *   size?: 'sm'|'md',
 *   valueText?: string
 * }} props
 */
export default function ProgressBar({
  value,
  label,
  showValue = true,
  showLabel = true,
  variant = 'accent',
  size = 'md',
  valueText,
}) {
  // Garante que o valor fique sempre entre 0 e 100
  const safeValue = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div className={`progress progress--${variant} progress--${size}`}>
      {(showLabel || showValue) && (
        <div className="progress__header">
          {showLabel && <span className="progress__label">{label}</span>}
          {showValue && <span className="progress__value">{safeValue}%</span>}
        </div>
      )}

      <div
        className="progress__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeValue}
        aria-valuetext={valueText ?? `${safeValue}%`}
      >
        <div className="progress__fill" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
