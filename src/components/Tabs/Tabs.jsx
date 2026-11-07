import { useId, useRef, useState } from 'react';
import './Tabs.css';

/**
 * Componente ABAS
 * - Recebe os títulos e conteúdos das abas via props.
 * - Gerencia no state qual aba está ativa e exibe apenas o painel correspondente.
 * - Suporta navegação por teclado (setas, Home e End), conforme o padrão WAI-ARIA.
 *
 * @param {{
 *   tabs: {id: string, label: string, content: React.ReactNode}[],
 *   label: string,
 *   defaultTabId?: string,
 *   onChange?: (tabId: string) => void
 * }} props
 */
export default function Tabs({ tabs, label, defaultTabId, onChange }) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId ?? tabs[0]?.id);
  const tabRefs = useRef([]); // referências aos botões, para mover o foco com o teclado
  const baseId = useId();

  function selectTab(tabId) {
    setActiveTabId(tabId);
    onChange?.(tabId);
  }

  function handleKeyDown(event, index) {
    const lastIndex = tabs.length - 1;
    let nextIndex = null;

    if (event.key === 'ArrowRight') nextIndex = index === lastIndex ? 0 : index + 1;
    if (event.key === 'ArrowLeft') nextIndex = index === 0 ? lastIndex : index - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = lastIndex;

    if (nextIndex !== null) {
      event.preventDefault();
      selectTab(tabs[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  }

  return (
    <div className="tabs">
      <div role="tablist" aria-label={label} className="tabs__list">
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              ref={(element) => (tabRefs.current[index] = element)}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1} /* apenas a aba ativa entra na ordem do Tab */
              className="tabs__tab"
              onClick={() => selectTab(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== activeTabId}
          tabIndex={0}
          className="tabs__panel"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
