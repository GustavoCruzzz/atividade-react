import { useId, useState } from 'react';
import './Accordion.css';

/**
 * Componente ACORDEÃO
 * - Recebe os itens (título + conteúdo) via props.
 * - Gerencia no state quais itens estão abertos.
 * - Por padrão, apenas um item fica aberto por vez (allowMultiple = false).
 *
 * @param {{
 *   items: {id: string, title: string, content: React.ReactNode}[],
 *   allowMultiple?: boolean,
 *   defaultOpenId?: string | null,
 *   headingLevel?: 2|3|4|5|6
 * }} props
 */
export default function Accordion({ items, allowMultiple = false, defaultOpenId = null, headingLevel = 3 }) {
  const [openIds, setOpenIds] = useState(defaultOpenId ? [defaultOpenId] : []);
  const baseId = useId(); // gera ids únicos e estáveis para os atributos ARIA

  function toggleItem(id) {
    setOpenIds((current) => {
      const isOpen = current.includes(id);
      if (isOpen) return current.filter((openId) => openId !== id); // fecha o item
      return allowMultiple ? [...current, id] : [id]; // abre (fechando os outros, se necessário)
    });
  }

  // Permite escolher o nível do título (h2, h3...) para manter a hierarquia semântica da página
  const Heading = `h${headingLevel}`;

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const buttonId = `${baseId}-button-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div key={item.id} className={`accordion__item${isOpen ? ' is-open' : ''}`}>
            <Heading className="accordion__heading">
              <button
                type="button"
                id={buttonId}
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
              >
                <span>{item.title}</span>
                <span className="accordion__icon" aria-hidden="true" />
              </button>
            </Heading>

            {/* O painel usa uma transição de grid-template-rows (0fr -> 1fr) para animar a altura */}
            <div id={panelId} role="region" aria-labelledby={buttonId} className="accordion__panel">
              <div className="accordion__inner">
                <div className="accordion__content">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
