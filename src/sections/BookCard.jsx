import BookCover from './BookCover';
import { getGenreLabel } from '../data/books';
import { formatCurrency, formatRating } from '../utils/format';

/**
 * Cartão de um livro no catálogo.
 * Recebe o livro e o callback `onAddToCart` via props (comunicação filho -> pai).
 */
export default function BookCard({ book, onAddToCart }) {
  return (
    <article className="book-card">
      <BookCover book={book} />

      <div className="book-card__body">
        <p className="book-card__genre">{getGenreLabel(book.genre)}</p>
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{book.author}</p>

        <p className="book-card__rating" aria-label={`Avaliação: ${formatRating(book.rating)} de 5`}>
          <span aria-hidden="true">★ {formatRating(book.rating)}</span>
        </p>

        <div className="book-card__footer">
          <p className="book-card__price">{formatCurrency(book.price)}</p>
          {/* aria-disabled (em vez de disabled) mantém o botão clicável para mostrar o toast de erro */}
          <button
            type="button"
            className={`button button--small${book.inStock ? '' : ' button--muted'}`}
            aria-disabled={!book.inStock}
            aria-label={book.inStock ? `Adicionar “${book.title}” ao carrinho` : `“${book.title}” está esgotado`}
            onClick={() => onAddToCart(book)}
          >
            {book.inStock ? 'Adicionar' : 'Esgotado'}
          </button>
        </div>
      </div>
    </article>
  );
}
