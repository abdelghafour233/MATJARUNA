
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, AppSettings, CartItem } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_SETTINGS: AppSettings = {
  fbPixelId: '',
  googleAnalyticsId: '',
  tiktokPixelId: '',
  googleSheetUrl: '',
  domainName: 'myshop.com',
  nameServers: 'ns1.hosting.com, ns2.hosting.com'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
    // Simulate Pixel Injections
    if (settings.fbPixelId) console.log(`Injected FB Pixel: ${settings.fbPixelId}`);
  }, [settings]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{
      products, setProducts,
      orders, setOrders,
      settings, setSettings,
      cart, addToCart, removeFromCart, clearCart, updateCartQuantity
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
