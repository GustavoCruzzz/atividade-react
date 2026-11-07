# Livraria Página Aberta — Atividade ReactJS

Aplicação web responsiva feita com **React** (Vite) para a disciplina de Engenharia de Software (UCSAL, Prof. Elton Figueiredo).
O tema é uma livraria fictícia: catálogo com filtros, carrinho, livro em destaque, envio de manuscrito e perguntas frequentes.

## Como executar

### No GitHub Codespaces (ambiente obrigatório)
1. No repositório do GitHub, clique em **Code → Codespaces → Create codespace on main**.
2. O container instala as dependências (`npm install`) e inicia o servidor (`npm run dev`) sozinho.
3. Quando aparecer o aviso da porta **5173**, clique em **Open in Browser**.
   Se o servidor não subir sozinho, rode no terminal: `npm run dev`.

O `.devcontainer/devcontainer.json` já instala o pacote de idioma **Português (Brasil)** do VS Code.

### Localmente
```bash
npm install
npm run dev     # abre em http://localhost:5173
npm run build   # gera a versão de produção em /dist
```

## Os 6 componentes obrigatórios

| Componente | Arquivo | Onde aparece | Props principais | State |
|---|---|---|---|---|
| **Acordeão** | `src/components/Accordion/Accordion.jsx` | Perguntas frequentes | `items`, `allowMultiple`, `defaultOpenId` | `openIds` (qual item está aberto) |
| **Paginação** | `src/components/Pagination/Pagination.jsx` | Catálogo | `currentPage`, `totalPages`, `onPageChange` | controlado pelo pai (`Catalog`) |
| **Barra de Progresso** | `src/components/ProgressBar/ProgressBar.jsx` | Upload de manuscrito, frete grátis no carrinho, distribuição das avaliações | `value` (0–100), `label`, `variant`, `showValue` | — (só exibe o valor recebido) |
| **Abas** | `src/components/Tabs/Tabs.jsx` | Livro em destaque | `tabs` (títulos + conteúdos), `label` | `activeTabId` |
| **Menu Suspenso** | `src/components/Dropdown/Dropdown.jsx` | Filtro de gênero, ordenação, menu "Minha conta" | `options` (cada uma com `onSelect` opcional), `selectedValue`, `onSelect` | `isOpen` |
| **Notificação Toast** | `src/components/Toast/Toast.jsx` + `ToastContainer.jsx` | Toda a aplicação | `type`, `title`, `message`, `duration`, `onClose` | `isLeaving` (animação de saída) |

## Conceitos de React demonstrados

- **Componentes funcionais**: todos os arquivos em `src/components` e `src/sections`.
- **Props**: ex.: `Catalog` passa `currentPage`, `totalPages` e `onPageChange` para `Pagination`, e `onAddToCart` para `BookCard`.
- **State local (`useState`)**: aba ativa (`Tabs`), item aberto (`Accordion`), menu aberto (`Dropdown`), filtros e página atual (`Catalog`), progresso do envio (`ManuscriptUpload`).
- **`useEffect`**:
  - `Toast`: fecha a notificação depois de alguns segundos (`setTimeout` + limpeza).
  - `Dropdown`: fecha ao clicar fora (listener no `document`, removido na limpeza) e move o foco ao abrir.
  - `ManuscriptUpload`: simula o upload com `setInterval` e detecta o fim ou a falha do envio.
- **Outros hooks**: `useMemo` (lista filtrada), `useCallback` (funções dos contextos), `useRef` (foco e rolagem), `useId` (ids para ARIA).
- **Eventos**: `onClick`, `onChange`, `onSubmit`, `onKeyDown` (navegação por teclado nas abas e no menu).

## Desafio extra: estado global com Context API

- `src/context/CartContext.jsx`: o carrinho é compartilhado entre componentes **não relacionados diretamente**: o contador no `Header`, os botões do `Catalog` e do `FeaturedBook`, e o resumo em `CartSummary`.
- `src/context/ToastContext.jsx`: qualquer componente chama `showToast({ type, message })` para exibir uma notificação, sem repassar props. Suporta várias notificações ao mesmo tempo.

## Responsividade

- **Celular (< 560px)**: catálogo em 2 colunas, menu "hambúrguer", filtros lado a lado, paginação só com as setas, toasts na largura da tela.
- **Tablet (560–1023px)**: grade fluida de livros, carrinho abaixo do catálogo, destaque em 2 colunas a partir de 768px.
- **Desktop (≥ 1024px)**: carrinho fixo na lateral, upload e FAQ lado a lado.
- Unidades fluidas (`clamp`, `minmax`, `auto-fill`), sem rolagem horizontal em 375px.

## Acessibilidade e semântica

- Tags semânticas: `header`, `nav`, `main`, `section`, `aside`, `article`, `footer`, `dl`.
- Link "Pular para o conteúdo" e foco visível em todos os controles.
- **Abas**: `role="tablist"`, `tab`, `tabpanel`, `aria-selected`, `aria-controls`, setas/Home/End.
- **Acordeão**: botões dentro de títulos, com `aria-expanded`, `aria-controls` e `role="region"`.
- **Menu Suspenso**: `aria-haspopup`, `aria-expanded`, `role="menu"`/`menuitemradio`, setas e Esc.
- **Paginação**: `nav` com `aria-label` e `aria-current="page"`.
- **Barra de Progresso**: `role="progressbar"` com `aria-valuenow`/`min`/`max`.
- **Toast**: `role="status"` (ou `role="alert"` para erros) e botão de fechar com `aria-label`.
- Tema claro/escuro automático (`prefers-color-scheme`) e respeito a `prefers-reduced-motion`.

## Estrutura de pastas

```
src/
├── App.jsx                 # componente principal: organiza as seções
├── main.jsx                # ponto de entrada
├── components/             # os 6 componentes reutilizáveis
├── context/                # estado global (CartContext, ToastContext)
├── sections/               # partes da página que usam os componentes
├── data/                   # dados fictícios (livros, FAQ)
├── utils/format.js         # formatação de moeda, nota e tamanho de arquivo
└── styles/                 # estilos globais e layout responsivo
```

## Roteiro sugerido para o vídeo

1. Abrir o Codespace e mostrar a aplicação rodando.
2. Mostrar cada componente funcionando:
   - filtrar por gênero e ordenar (Menu Suspenso);
   - trocar de página (Paginação);
   - adicionar livros e ver o contador do cabeçalho e o frete grátis mudarem (Context API + Barra de Progresso);
   - clicar em um livro "Esgotado" (Toast de erro);
   - navegar pelas abas do livro em destaque;
   - enviar um arquivo, com e sem "Simular falha" (Barra de Progresso + Toasts);
   - abrir as perguntas frequentes (Acordeão).
3. Mostrar a responsividade com o DevTools (F12 → modo dispositivo).
4. Passar pelo código: `App.jsx` → contextos → cada componente (props, state, hooks, eventos).
