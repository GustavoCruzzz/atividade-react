import './Pagination.css';

/**
 * Calcula quais números de página exibir, usando "…" quando há muitas páginas.
 * Ex.: página 5 de 10 -> [1, '…', 4, 5, 6, '…', 10]
 */
function getPageItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) pages.push('ellipsis-start');
  for (let page = start; page <= end; page++) pages.push(page);
  if (end < totalPages - 1) pages.push('ellipsis-end');
  pages.push(totalPages);

  return pages;
}

/**
 * Componente PAGINAÇÃO
 * - Recebe o total de páginas e a página atual via props.
 * - Avisa o componente pai sobre a troca de página pelo callback `onPageChange`.
 * - Desabilita "Anterior"/"Próxima" quando não aplicável.
 *
 * @param {{currentPage: number, totalPages: number, onPageChange: (page: number) => void, label?: string}} props
 */
export default function Pagination({ currentPage, totalPages, onPageChange, label = 'Paginação' }) {
  if (totalPages <= 1) return null;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const pageItems = getPageItems(currentPage, totalPages);

  return (
    <nav className="pagination" aria-label={label}>
      <ul className="pagination__list">
        <li>
          <button
            type="button"
            className="pagination__button pagination__button--nav"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={isFirstPage}
            aria-label="Ir para a página anterior"
          >
            <span aria-hidden="true">‹</span>
            <span className="pagination__nav-text">Anterior</span>
          </button>
        </li>

        {pageItems.map((item) =>
          typeof item === 'string' ? (
            <li key={item} className="pagination__ellipsis" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item} className="pagination__page">
              <button
                type="button"
                className="pagination__button"
                onClick={() => onPageChange(item)}
                aria-current={item === currentPage ? 'page' : undefined}
                aria-label={`Página ${item}`}
              >
                {item}
              </button>
            </li>
          )
        )}

        <li>
          <button
            type="button"
            className="pagination__button pagination__button--nav"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={isLastPage}
            aria-label="Ir para a próxima página"
          >
            <span className="pagination__nav-text">Próxima</span>
            <span aria-hidden="true">›</span>
          </button>
        </li>
      </ul>

      <p className="pagination__status" aria-live="polite">
        Página <strong>{currentPage}</strong> de {totalPages}
      </p>
    </nav>
  );
}
