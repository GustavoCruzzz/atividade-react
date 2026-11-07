// Dados fictícios do catálogo de livros (conteúdo apenas para demonstração)

export const GENRES = [
  { value: 'todos', label: 'Todos os gêneros' },
  { value: 'romance', label: 'Romance' },
  { value: 'fantasia', label: 'Fantasia' },
  { value: 'ficcao', label: 'Ficção científica' },
  { value: 'suspense', label: 'Suspense' },
  { value: 'nao-ficcao', label: 'Não ficção' },
];

export const SORT_OPTIONS = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'avaliacao', label: 'Mais bem avaliados' },
  { value: 'titulo', label: 'Título (A–Z)' },
];

/** Retorna o nome legível de um gênero a partir do seu valor. */
export function getGenreLabel(value) {
  return GENRES.find((genre) => genre.value === value)?.label ?? value;
}

export const BOOKS = [
  { id: 1, title: 'O Jardim das Marés', author: 'Helena Duarte', genre: 'romance', price: 49.9, rating: 4.6, inStock: true },
  { id: 2, title: 'Cartografia do Silêncio', author: 'Rafael Moura', genre: 'suspense', price: 54.9, rating: 4.3, inStock: true },
  { id: 3, title: 'A Última Biblioteca de Vênus', author: 'Iara Campos', genre: 'ficcao', price: 62.0, rating: 4.8, inStock: true },
  { id: 4, title: 'Coroa de Cinzas', author: 'Tomás Ventura', genre: 'fantasia', price: 58.5, rating: 4.5, inStock: true },
  { id: 5, title: 'Hábitos de Papel', author: 'Clara Nunes Reis', genre: 'nao-ficcao', price: 39.9, rating: 4.1, inStock: true },
  { id: 6, title: 'Noites em Salvador', author: 'Joana Bastos', genre: 'romance', price: 44.9, rating: 4.4, inStock: true },
  { id: 7, title: 'O Relojoeiro Cego', author: 'Pedro Alencar', genre: 'suspense', price: 47.0, rating: 4.0, inStock: false },
  { id: 8, title: 'Sementes de Marte', author: 'Lia Okafor', genre: 'ficcao', price: 59.9, rating: 4.7, inStock: true },
  { id: 9, title: 'A Torre e o Corvo', author: 'Benício Ramos', genre: 'fantasia', price: 52.0, rating: 4.2, inStock: true },
  { id: 10, title: 'Pensar Devagar, Viver Melhor', author: 'Marta Siqueira', genre: 'nao-ficcao', price: 45.5, rating: 3.9, inStock: true },
  { id: 11, title: 'Cartas para o Farol', author: 'Ana Luíza Prado', genre: 'romance', price: 36.9, rating: 4.5, inStock: true },
  { id: 12, title: 'Código Vermelho', author: 'Diego Matos', genre: 'suspense', price: 41.9, rating: 4.1, inStock: true },
  { id: 13, title: 'Órbita Baixa', author: 'Samuel Teixeira', genre: 'ficcao', price: 55.0, rating: 4.0, inStock: true },
  { id: 14, title: 'O Bosque dos Nomes Perdidos', author: 'Yara Potiguara', genre: 'fantasia', price: 64.9, rating: 4.9, inStock: true },
  { id: 15, title: 'Breve História do Café', author: 'Henrique Lobo', genre: 'nao-ficcao', price: 49.0, rating: 4.3, inStock: false },
  { id: 16, title: 'Entre Dois Verões', author: 'Beatriz Lemos', genre: 'romance', price: 42.0, rating: 4.2, inStock: true },
  { id: 17, title: 'A Casa da Rua Chile', author: 'Marcos Paiva', genre: 'suspense', price: 50.9, rating: 4.6, inStock: true },
  { id: 18, title: 'Protocolo Aurora', author: 'Nina Kawasaki', genre: 'ficcao', price: 57.5, rating: 4.4, inStock: true },
  { id: 19, title: 'Dragões de Areia', author: 'Caio Fontes', genre: 'fantasia', price: 61.0, rating: 4.1, inStock: true },
  { id: 20, title: 'Mentes Inquietas no Trabalho', author: 'Fernanda Rocha', genre: 'nao-ficcao', price: 47.9, rating: 4.0, inStock: true },
  { id: 21, title: 'Um Café em Lisboa', author: 'Sofia Martins', genre: 'romance', price: 39.0, rating: 4.3, inStock: true },
  { id: 22, title: 'Sob a Ponte de Ferro', author: 'Gabriel Antunes', genre: 'suspense', price: 46.5, rating: 4.2, inStock: true },
  { id: 23, title: 'Ecos da Estação Lunar', author: 'Rita Valença', genre: 'ficcao', price: 53.9, rating: 4.5, inStock: true },
  { id: 24, title: 'O Mapa das Sete Luas', author: 'Lucas Barreto', genre: 'fantasia', price: 66.0, rating: 4.7, inStock: true },
];

/** Livro em destaque (usado na seção com Abas). */
export const FEATURED_BOOK_ID = 14;
