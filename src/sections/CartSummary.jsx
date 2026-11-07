import ProgressBar from '../components/ProgressBar/ProgressBar';
import { FREE_SHIPPING_THRESHOLD, useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../utils/format';

/**
 * Resumo do carrinho (lateral no desktop, abaixo do catálogo no celular).
 * - Lê e altera o carrinho pelo CartContext (estado global).
 * - Reutiliza a Barra de Progresso para mostrar quanto falta para o frete grátis.
 */
export default function CartSummary() {
  const { items, totalItems, totalPrice, addItem, decreaseItem, removeItem, clearCart } = useCart();
  const { showToast } = useToast();

  const shippingProgress = (totalPrice / FREE_SHIPPING_THRESHOLD) * 100;
  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const hasFreeShipping = missingForFreeShipping === 0;

  function handleCheckout() {
    showToast({
      type: 'success',
      title: 'Pedido confirmado!',
      message: `${totalItems} ${totalItems === 1 ? 'livro' : 'livros'} · total de ${formatCurrency(totalPrice)}.`,
      duration: 5000,
    });
    clearCart();
  }

  function handleRemove(item) {
    removeItem(item.book.id);
    showToast({ type: 'info', message: `“${item.book.title}” foi removido do carrinho.` });
  }

  return (
    <aside id="carrinho" className="cart" aria-labelledby="carrinho-titulo">
      <h2 id="carrinho-titulo" className="cart__title">
        Seu carrinho
        <span className="cart__count">{totalItems}</span>
      </h2>

      {items.length === 0 ? (
        <p className="cart__empty">Seu carrinho está vazio. Adicione um livro do catálogo para começar.</p>
      ) : (
        <ul className="cart__list">
          {items.map((item) => (
            <li key={item.book.id} className="cart__item">
              <div className="cart__item-info">
                <p className="cart__item-title">{item.book.title}</p>
                <p className="cart__item-price">{formatCurrency(item.book.price * item.quantity)}</p>
              </div>

              <div className="cart__item-actions">
                <div className="quantity" role="group" aria-label={`Quantidade de “${item.book.title}”`}>
                  <button type="button" className="quantity__button" onClick={() => decreaseItem(item.book.id)} aria-label="Diminuir quantidade">
                    −
                  </button>
                  <span className="quantity__value" aria-live="polite">
                    {item.quantity}
                  </span>
                  <button type="button" className="quantity__button" onClick={() => addItem(item.book)} aria-label="Aumentar quantidade">
                    +
                  </button>
                </div>
                <button type="button" className="link-button" onClick={() => handleRemove(item)}>
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="cart__shipping">
        <ProgressBar
          value={shippingProgress}
          label={
            hasFreeShipping ? 'Você ganhou frete grátis!' : `Faltam ${formatCurrency(missingForFreeShipping)} para o frete grátis`
          }
          variant={hasFreeShipping ? 'success' : 'accent'}
          size="sm"
        />
      </div>

      <dl className="cart__total">
        <dt>Total</dt>
        <dd>{formatCurrency(totalPrice)}</dd>
      </dl>

      <button type="button" className="button button--block" onClick={handleCheckout} disabled={items.length === 0}>
        Finalizar compra
      </button>
    </aside>
  );
}
