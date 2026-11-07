import { createContext, useCallback, useContext, useMemo, useState } from 'react';

/** Valor mínimo da compra para ganhar frete grátis */
export const FREE_SHIPPING_THRESHOLD = 150;

/**
 * Contexto global do carrinho (Context API).
 * Compartilha os itens do carrinho entre componentes que NÃO são diretamente
 * relacionados: o cabeçalho (contador), o catálogo, o livro em destaque e o
 * resumo do carrinho.
 */
const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Cada item tem o formato { book, quantity }
  const [items, setItems] = useState([]);

  const addItem = useCallback((book) => {
    setItems((current) => {
      const alreadyInCart = current.some((item) => item.book.id === book.id);
      if (alreadyInCart) {
        return current.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { book, quantity: 1 }];
    });
  }, []);

  const decreaseItem = useCallback((bookId) => {
    setItems((current) =>
      current
        .map((item) => (item.book.id === bookId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((bookId) => {
    setItems((current) => current.filter((item) => item.book.id !== bookId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  // Valores derivados do estado (calculados a cada mudança em `items`)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.book.price, 0);

  const value = useMemo(
    () => ({ items, totalItems, totalPrice, addItem, decreaseItem, removeItem, clearCart }),
    [items, totalItems, totalPrice, addItem, decreaseItem, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/** Hook personalizado para consumir o contexto do carrinho. */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de <CartProvider>.');
  }
  return context;
}
