import { useEffect, useId, useRef, useState } from 'react';
import './Dropdown.css';

/**
 * Componente MENU SUSPENSO
 * - Gerencia a própria visibilidade (aberto/fechado) via state.
 * - Recebe as opções via props; cada opção pode ter seu próprio callback (`onSelect`).
 * - Fecha ao selecionar uma opção, ao clicar fora ou ao pressionar Esc.
 * - Se `selectedValue` for informado, funciona como seletor (ex.: filtro);
 *   caso contrário, funciona como menu de ações (ex.: "Minha conta").
 *
 * @param {{
 *   options: {value: string, label: string, onSelect?: (option) => void}[],
 *   label?: string,
 *   buttonText?: string,
 *   selectedValue?: string,
 *   onSelect?: (value: string, option: object) => void,
 *   align?: 'left'|'right'
 * }} props
 */
export default function Dropdown({ options, label, buttonText, selectedValue, onSelect, align = 'left' }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);
  const menuId = useId();

  const isSelectable = selectedValue !== undefined;
  const selectedOption = options.find((option) => option.value === selectedValue);
  const triggerText = buttonText ?? selectedOption?.label ?? 'Selecione';

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    // Função de limpeza: remove o listener quando o menu fecha ou o componente é desmontado
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  // Ao abrir, move o foco para a opção selecionada (ou para a primeira)
  useEffect(() => {
    if (!isOpen) return;
    const selectedIndex = options.findIndex((option) => option.value === selectedValue);
    optionRefs.current[Math.max(0, selectedIndex)]?.focus();
  }, [isOpen, options, selectedValue]);

  function closeMenu({ returnFocus = true } = {}) {
    setIsOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }

  function handleOptionClick(option) {
    option.onSelect?.(option); // callback específico da opção
    onSelect?.(option.value, option); // callback geral do componente
    closeMenu();
  }

  function handleTriggerKeyDown(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setIsOpen(true);
    }
  }

  function handleMenuKeyDown(event) {
    const total = options.length;
    const currentIndex = optionRefs.current.indexOf(document.activeElement);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        optionRefs.current[(currentIndex + 1) % total]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        optionRefs.current[(currentIndex - 1 + total) % total]?.focus();
        break;
      case 'Home':
        event.preventDefault();
        optionRefs.current[0]?.focus();
        break;
      case 'End':
        event.preventDefault();
        optionRefs.current[total - 1]?.focus();
        break;
      case 'Escape':
        event.preventDefault();
        closeMenu();
        break;
      case 'Tab':
        closeMenu({ returnFocus: false });
        break;
      default:
        break;
    }
  }

  return (
    <div className="dropdown" ref={wrapperRef}>
      {label && (
        <span className="dropdown__label" aria-hidden="true">
          {label}
        </span>
      )}

      <button
        ref={triggerRef}
        type="button"
        className="dropdown__trigger"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={label ? `${label}: ${triggerText}` : undefined}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="dropdown__trigger-text">{triggerText}</span>
        <svg className="dropdown__chevron" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
          <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <ul
        id={menuId}
        role="menu"
        aria-label={label ?? triggerText}
        className={`dropdown__menu dropdown__menu--${align}`}
        hidden={!isOpen}
        onKeyDown={handleMenuKeyDown}
      >
        {options.map((option, index) => {
          const isSelected = isSelectable && option.value === selectedValue;
          return (
            <li key={option.value} role="none">
              <button
                ref={(element) => (optionRefs.current[index] = element)}
                type="button"
                role={isSelectable ? 'menuitemradio' : 'menuitem'}
                aria-checked={isSelectable ? isSelected : undefined}
                tabIndex={-1}
                className={`dropdown__option${isSelected ? ' is-selected' : ''}${option.danger ? ' is-danger' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                    <path d="m4.5 10.5 3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
