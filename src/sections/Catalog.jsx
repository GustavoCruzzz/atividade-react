import { useMemo, useRef, useState } from 'react';
import Dropdown from '../components/Dropdown/Dropdown';
import Pagination from '../components/Pagination/Pagination';
import BookCard from './BookCard';
import { BOOKS, GENRES, SORT_OPTIONS } from '../data/books';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const BOOKS_PER_PAGE = 6;

/** Ordena uma cópia da lista de livros de acordo com o critério escolhido. */
function sortBooks(books, sortBy) {
  const sorted = [...books];
  switch (sortBy) {
    case 'menor-preco':
      return sorted.sort((a, b) => a.price - b.price);
    case 'maior-preco':
      return sorted.sort((a, b) => b.price - a.price);
    case 'avaliacao':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'titulo':
      return sorted.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
    default:
      return sorted; // relevância = ordem original
  }
}

/**
 * Seção do catálogo.
 * - Menus Suspensos para filtrar por gênero e ordenar.
 * - Paginação: este componente (pai) guarda a página atual no state e a repassa via props.
 */
export default function Catalog() {
  const [genre, setGenre] = useState('todos');
  const [sortBy, setSortBy] = useState('relevancia');
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef(null);

  const { addItem } = useCart();
  const { showToast } = useToast();

  // useMemo: só recalcula a lista quando o filtro ou a ordenação mudam
  const filteredBooks = useMemo(() => {
    const byGenre = genre === 'todos' ? BOOKS : BOOKS.filter((book) => book.genre === genre);
    return sortBooks(byGenre, sortBy);
  }, [genre, sortBy]);

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const visibleBooks = filteredBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE);

  function handleGenreChange(value) {
    setGenre(value);
    setCurrentPage(1); // volta para a primeira página ao trocar o filtro
  }

  function handleSortChange(value) {
    setSortBy(value);
    setCurrentPage(1);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    // Leva o usuário de volta ao topo da lista
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleAddToCart(book) {
    if (!book.inStock) {
      showToast({
        type: 'error',
        title: 'Livro esgotado',
        message: `Não foi possível adicionar “${book.title}”: não há exemplares em estoque.`,
      });
      return;
    }
    addItem(book);
    showToast({ type: 'success', title: 'Adicionado ao carrinho', message: `“${book.title}” está no seu carrinho.` });
  }

  return (
    <section id="catalogo" className="section catalog" ref={sectionRef} aria-labelledby="catalogo-titulo">
      <div className="section__header catalog__header">
        <div>
          <h2 id="catalogo-titulo" className="section__title">
            Catálogo
          </h2>
          <p className="section__subtitle">
            {filteredBooks.length} {filteredBooks.length === 1 ? 'livro encontrado' : 'livros encontrados'}
          </p>
        </div>

        <div className="catalog__filters">
          <Dropdown label="Gênero" options={GENRES} selectedValue={genre} onSelect={handleGenreChange} />
          <Dropdown label="Ordenar por" options={SORT_OPTIONS} selectedValue={sortBy} onSelect={handleSortChange} align="right" />
        </div>
      </div>

      <ul className="book-grid">
        {visibleBooks.map((book) => (
          <li key={book.id}>
            <BookCard book={book} onAddToCart={handleAddToCart} />
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        label="Páginas do catálogo"
      />
    </section>
  );
}
