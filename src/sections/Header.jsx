import { useState } from 'react';
import Dropdown from '../components/Dropdown/Dropdown';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const NAV_LINKS = [
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#destaque', label: 'Destaque' },
  { href: '#manuscritos', label: 'Manuscritos' },
  { href: '#faq', label: 'Dúvidas' },
];

/**
 * Cabeçalho da página.
 * - Lê o total de itens do carrinho pelo CartContext (estado global).
 * - Usa o Menu Suspenso como menu de ações da conta: cada opção tem seu próprio callback.
 */
export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { totalItems } = useCart();
  const { showToast } = useToast();

  const accountOptions = [
    {
      value: 'perfil',
      label: 'Meu perfil',
      onSelect: () => showToast({ type: 'info', message: 'Página de perfil em construção.' }),
    },
    {
      value: 'pedidos',
      label: 'Meus pedidos',
      onSelect: () => showToast({ type: 'info', message: 'Você ainda não fez nenhum pedido.' }),
    },
    {
      value: 'sair',
      label: 'Sair',
      danger: true,
      onSelect: () => showToast({ type: 'warning', title: 'Sessão encerrada', message: 'Você saiu da sua conta.' }),
    },
  ];

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#inicio" className="brand" aria-label="Página Aberta — início">
          <svg className="brand__logo" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
            <rect width="32" height="32" rx="8" />
            <path d="M8 9h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H8zM24 9h-4a2 2 0 0 0-2 2" />
          </svg>
          <span className="brand__name">Página Aberta</span>
        </a>

        {/* Botão "hambúrguer" só aparece em telas pequenas */}
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isNavOpen}
          aria-controls="menu-principal"
          aria-label={isNavOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setIsNavOpen((open) => !open)}
        >
          <span className="nav-toggle__bar" aria-hidden="true" />
        </button>

        <nav id="menu-principal" className={`site-nav${isNavOpen ? ' is-open' : ''}`} aria-label="Menu principal">
          <ul className="site-nav__list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="site-nav__link" onClick={() => setIsNavOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <a href="#carrinho" className="cart-link" aria-label={`Carrinho: ${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="20" r="1.4" fill="currentColor" />
              <circle cx="17" cy="20" r="1.4" fill="currentColor" />
            </svg>
            {totalItems > 0 && (
              <span key={totalItems} className="cart-link__badge" aria-hidden="true">
                {totalItems}
              </span>
            )}
          </a>

          <Dropdown buttonText="Minha conta" options={accountOptions} align="right" />
        </div>
      </div>
    </header>
  );
}
