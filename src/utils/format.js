// Funções utilitárias de formatação (pt-BR)

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

/** Formata um número como moeda brasileira. Ex.: 49.9 -> "R$ 49,90" */
export function formatCurrency(value) {
  return currencyFormatter.format(value);
}

/** Formata uma nota com uma casa decimal. Ex.: 4.5 -> "4,5" */
export function formatRating(value) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

/** Converte bytes em um texto legível. Ex.: 1536 -> "1,5 KB" */
export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} KB`;
  return `${(bytes / (1024 * 1024)).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} MB`;
}
