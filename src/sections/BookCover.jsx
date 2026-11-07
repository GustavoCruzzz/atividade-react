/**
 * Capa ilustrativa gerada com CSS (os livros são fictícios, então não há imagens reais).
 * A cor é calculada a partir do id, para cada livro ter uma capa diferente.
 */
export default function BookCover({ book, size = 'md' }) {
  const hue = (book.id * 47) % 360;

  return (
    <div className={`book-cover book-cover--${size}`} style={{ '--cover-hue': hue }} aria-hidden="true">
      <span className="book-cover__title">{book.title}</span>
      <span className="book-cover__author">{book.author}</span>
    </div>
  );
}
