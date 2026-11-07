import Tabs from '../components/Tabs/Tabs';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import BookCover from './BookCover';
import { BOOKS, FEATURED_BOOK_ID, getGenreLabel } from '../data/books';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency, formatRating } from '../utils/format';

// Distribuição fictícia das avaliações (em %), exibida com a Barra de Progresso
const RATING_DISTRIBUTION = [
  { stars: 5, percent: 82 },
  { stars: 4, percent: 12 },
  { stars: 3, percent: 4 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

const REVIEWS = [
  {
    id: 1,
    name: 'Mariana S.',
    rating: 5,
    text: 'Um dos livros de fantasia mais bonitos que li nos últimos anos. A ambientação na floresta é hipnotizante.',
  },
  {
    id: 2,
    name: 'Rodrigo A.',
    rating: 4,
    text: 'História envolvente e personagens marcantes. O ritmo do meio do livro é um pouco mais lento, mas o final compensa.',
  },
];

/**
 * Seção "Livro em destaque".
 * Usa o componente de Abas, passando título e conteúdo de cada aba via props.
 */
export default function FeaturedBook() {
  const book = BOOKS.find((item) => item.id === FEATURED_BOOK_ID);
  const { addItem } = useCart();
  const { showToast } = useToast();

  function handleAddToCart() {
    addItem(book);
    showToast({ type: 'success', title: 'Adicionado ao carrinho', message: `“${book.title}” está no seu carrinho.` });
  }

  const tabs = [
    {
      id: 'sinopse',
      label: 'Sinopse',
      content: (
        <>
          <p>
            Na vila de Aracê, toda criança recebe um nome sussurrado pelas árvores do bosque. Quando Jurema completa doze
            anos e a floresta permanece em silêncio, ela parte em busca do próprio nome — e descobre que dezenas de outros
            também foram roubados.
          </p>
          <p>
            Uma fantasia sobre memória, pertencimento e a força das histórias contadas em voz alta, inspirada em lendas do
            interior do Brasil.
          </p>
        </>
      ),
    },
    {
      id: 'autora',
      label: 'Sobre a autora',
      content: (
        <p>
          <strong>{book.author}</strong> é escritora e contadora de histórias. Nasceu no Rio Grande do Norte e vive em
          Salvador. Seus livros já foram traduzidos para quatro idiomas, e este romance recebeu o Prêmio Jovem Leitor de
          2025 (prêmio fictício).
        </p>
      ),
    },
    {
      id: 'detalhes',
      label: 'Ficha técnica',
      content: (
        <dl className="spec-list">
          <div>
            <dt>Gênero</dt>
            <dd>{getGenreLabel(book.genre)}</dd>
          </div>
          <div>
            <dt>Editora</dt>
            <dd>Página Aberta</dd>
          </div>
          <div>
            <dt>Páginas</dt>
            <dd>384</dd>
          </div>
          <div>
            <dt>Idioma</dt>
            <dd>Português</dd>
          </div>
          <div>
            <dt>Ano</dt>
            <dd>2024</dd>
          </div>
          <div>
            <dt>Encadernação</dt>
            <dd>Brochura</dd>
          </div>
        </dl>
      ),
    },
    {
      id: 'avaliacoes',
      label: 'Avaliações',
      content: (
        <div className="reviews">
          <div className="reviews__summary">
            <p className="reviews__score">
              {formatRating(book.rating)}
              <span> de 5</span>
            </p>
            <div className="reviews__bars">
              {RATING_DISTRIBUTION.map((row) => (
                <ProgressBar
                  key={row.stars}
                  value={row.percent}
                  label={`${row.stars} ${row.stars === 1 ? 'estrela' : 'estrelas'}`}
                  size="sm"
                />
              ))}
            </div>
          </div>

          <ul className="reviews__list">
            {REVIEWS.map((review) => (
              <li key={review.id} className="review">
                <p className="review__header">
                  <strong>{review.name}</strong>
                  <span aria-label={`${review.rating} de 5 estrelas`}>
                    <span aria-hidden="true">{'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</span>
                  </span>
                </p>
                <p className="review__text">{review.text}</p>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section id="destaque" className="section featured" aria-labelledby="destaque-titulo">
      <div className="featured__media">
        <BookCover book={book} size="lg" />
      </div>

      <div className="featured__content">
        <p className="eyebrow">Livro do mês</p>
        <h2 id="destaque-titulo" className="section__title">
          {book.title}
        </h2>
        <p className="featured__author">por {book.author}</p>

        <div className="featured__buy">
          <p className="featured__price">{formatCurrency(book.price)}</p>
          <button type="button" className="button" onClick={handleAddToCart}>
            Adicionar ao carrinho
          </button>
        </div>

        <Tabs tabs={tabs} label={`Informações sobre ${book.title}`} />
      </div>
    </section>
  );
}
