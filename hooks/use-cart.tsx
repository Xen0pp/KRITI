
'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
  useCallback,
  useMemo,
} from 'react';
import type { Product } from '@/lib/types';
import { products } from '@/lib/data';
import { useToast } from './use-toast';

const CART_KEY = 'kriti-cart-items';

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getProductFromItem: (item: CartItem) => Product | undefined;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_KEY);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Failed to read cart from localStorage', error);
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      setCartItems(items);
    } catch (error) {
      console.error('Failed to save cart to localStorage', error);
    }
  };

  const addToCart = useCallback((productId: string) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === productId);
      let newItems;
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { productId, quantity: 1 }];
      }
      saveCart(newItems);
      const product = products.find(p => p.id === productId);
      toast({
        title: 'Item Added to Cart!',
        description: `${product?.name} is now in your cart.`,
      });
      return newItems;
    });
  }, [toast]);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.productId !== productId);
      saveCart(newItems);
      const product = products.find(p => p.id === productId);
      toast({
          title: "Item Removed",
          description: `${product?.name} has been removed from your cart.`
      })
      return newItems;
    });
  }, [toast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
        removeFromCart(productId);
        return;
    };
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      );
      saveCart(newItems);
      return newItems;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    saveCart([]);
  }, []);

  const getProductFromItem = useCallback((item: CartItem) => {
    return products.find(p => p.id === item.productId);
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const product = getProductFromItem(item);
      return acc + (product?.price || 0) * item.quantity;
    }, 0);
  }, [cartItems, getProductFromItem]);

  const getItemCount = useCallback(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemCount,
        getProductFromItem,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
