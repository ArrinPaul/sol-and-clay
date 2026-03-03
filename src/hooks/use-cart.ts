'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import type { CartItem } from '@/lib/types';
import { 
  syncCartToServer, 
  fetchCartFromServer, 
  mergeCartsOnLogin,
  clearServerCart 
} from '@/app/actions/cart';

// Debounce delay for syncing to server (ms)
const SYNC_DEBOUNCE_DELAY = 1000;

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { isSignedIn, isLoaded: isAuthLoaded } = useUser();
  
  // Track if we've already synced on login
  const hasSyncedOnLogin = useRef(false);
  // Debounce timer for server sync
  const syncTimerRef = useRef<NodeJS.Timeout | null>(null);
  // Track if this is the initial load
  const isInitialLoad = useRef(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage:', e);
        localStorage.removeItem('cart');
      }
    }
    setLoading(false);
  }, []);

  // Handle cart merge when user signs in
  useEffect(() => {
    if (!isAuthLoaded || loading) return;
    
    const handleAuthChange = async () => {
      if (isSignedIn && !hasSyncedOnLogin.current) {
        hasSyncedOnLogin.current = true;
        
        // Get current cart items from localStorage for merge
        const storedCart = localStorage.getItem('cart');
        const localItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
        
        // If user has local items, merge with server
        if (localItems.length > 0) {
          const result = await mergeCartsOnLogin(localItems);
          if (result.success && result.items) {
            setCartItems(result.items);
            localStorage.setItem('cart', JSON.stringify(result.items));
          }
        } else {
          // No local items, fetch from server
          const result = await fetchCartFromServer();
          if (result.success && result.items && result.items.length > 0) {
            setCartItems(result.items);
            localStorage.setItem('cart', JSON.stringify(result.items));
          }
        }
      } else if (!isSignedIn) {
        // User signed out - reset sync flag
        hasSyncedOnLogin.current = false;
      }
    };
    
    handleAuthChange();
  }, [isSignedIn, isAuthLoaded, loading]);

  // Sync cart to localStorage and server when it changes
  useEffect(() => {
    if (loading || isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    
    // Always save to localStorage immediately
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Debounce server sync for authenticated users
    if (isSignedIn) {
      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current);
      }
      
      syncTimerRef.current = setTimeout(async () => {
        await syncCartToServer(cartItems);
      }, SYNC_DEBOUNCE_DELAY);
    }
    
    return () => {
      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current);
      }
    };
  }, [cartItems, loading, isSignedIn]);

  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.productId === item.productId);
      if (existingItem) {
        return prevItems.map((i) =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prevItems, item];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.productId !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) {
      // If quantity is less than 1, remove the item
      setCartItems((prevItems) => prevItems.filter((i) => i.productId !== itemId));
      return;
    }
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === itemId ? { ...item, quantity } : item
      )
    );
  }, []);

  const incrementQuantity = useCallback((itemId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decrementQuantity = useCallback((itemId: string) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.productId === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(async () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    
    // Also clear server cart if authenticated
    if (isSignedIn) {
      await clearServerCart();
    }
  }, [isSignedIn]);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return {
    cartItems,
    loading,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  };
}
