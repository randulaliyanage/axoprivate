import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; size: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: number; size: string } }
  | { type: 'CHANGE_QTY'; payload: { productId: number; size: string; delta: number } };

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: number, size: string) => void;
  changeQty: (productId: number, size: string, delta: number) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size } = action.payload;
      const idx = state.items.findIndex(
        (i) => i.product.id === product.id && i.size === size
      );
      if (idx >= 0) {
        const updated = [...state.items];
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + 1 };
        return { items: updated };
      }
      return { items: [...state.items, { product, size, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(
          (i) => !(i.product.id === action.payload.productId && i.size === action.payload.size)
        ),
      };
    case 'CHANGE_QTY': {
      const { productId, size, delta } = action.payload;
      const updated = state.items
        .map((i) =>
          i.product.id === productId && i.size === size
            ? { ...i, qty: i.qty + delta }
            : i
        )
        .filter((i) => i.qty > 0);
      return { items: updated };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (product: Product, size: string) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, size } });

  const removeItem = (productId: number, size: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, size } });

  const changeQty = (productId: number, size: string, delta: number) =>
    dispatch({ type: 'CHANGE_QTY', payload: { productId, size, delta } });

  const totalItems = state.items.reduce((s, i) => s + i.qty, 0);
  const subtotal = state.items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, changeQty, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
