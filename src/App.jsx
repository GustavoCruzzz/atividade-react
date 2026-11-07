import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import Header from './sections/Header';
import Catalog from './sections/Catalog';
import CartSummary from './sections/CartSummary';
import FeaturedBook from './sections/FeaturedBook';
import ManuscriptUpload from './sections/ManuscriptUpload';
import Faq from './sections/Faq';
import Footer from './sections/Footer';
import './styles/layout.css';

/**
 * Componente principal: orquestra todas as seções da página.
 *
 * Os "Providers" envolvem a aplicação e disponibilizam o estado global (Context API):
 * - ToastProvider: notificações acessíveis de qualquer componente.
 * - CartProvider: carrinho compartilhado entre cabeçalho, catálogo, destaque e resumo.
 */
export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>

        <Header />

        <main id="conteudo" className="container">
          <section id="inicio" className="hero" aria-labelledby="hero-titulo">
            <p className="eyebrow">Livraria independente · desde 2026</p>
            <h1 id="hero-titulo" className="hero__title">
              Histórias que cabem no seu dia.
            </h1>
            <p className="hero__text">
              Escolha seu próximo livro, acompanhe o carrinho em tempo real e envie seu próprio manuscrito para a nossa
              equipe editorial.
            </p>
            <div className="hero__actions">
              <a href="#catalogo" className="button">
                Ver catálogo
              </a>
              <a href="#manuscritos" className="button button--secondary">
                Enviar manuscrito
              </a>
            </div>
          </section>

          <div className="layout-catalog">
            <Catalog />
            <CartSummary />
          </div>

          <FeaturedBook />

          <div className="layout-split">
            <ManuscriptUpload />
            <Faq />
          </div>
        </main>

        <Footer />
      </CartProvider>
    </ToastProvider>
  );
}
