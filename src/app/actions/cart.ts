'use server';

import { auth } from '@clerk/nextjs/server';
import { getAdminDb, COLLECTIONS } from '@/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import type { CartItem } from '@/lib/types';

/**
 * Sync cart items to Firestore for the authenticated user.
 * This allows cart persistence across devices.
 */
export async function syncCartToServer(items: CartItem[]): Promise<{ success: boolean; error?: string }> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { success: false, error: 'Not authenticated' };
    }

    const db = getAdminDb();
    const userCartRef = db.collection(COLLECTIONS.USERS).doc(userId).collection('cart');
    
    // Use a batch write to update all items atomically
    const batch = db.batch();
    
    // First, delete all existing cart items
    const existingItems = await userCartRef.get();
    existingItems.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    // Then add all current items
    items.forEach((item) => {
      const itemRef = userCartRef.doc(item.productId);
      batch.set(itemRef, {
        ...item,
        updatedAt: FieldValue.serverTimestamp(),
      });
    });
    
    await batch.commit();
    
    return { success: true };
  } catch (error) {
    console.error('Error syncing cart to server:', error);
    return { success: false, error: 'Failed to sync cart' };
  }
}

/**
 * Fetch cart items from Firestore for the authenticated user.
 */
export async function fetchCartFromServer(): Promise<{ success: boolean; items?: CartItem[]; error?: string }> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { success: false, error: 'Not authenticated' };
    }

    const db = getAdminDb();
    const userCartRef = db.collection(COLLECTIONS.USERS).doc(userId).collection('cart');
    
    const snapshot = await userCartRef.get();
    
    const items: CartItem[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        productId: data.productId,
        title: data.title,
        price: data.price,
        quantity: data.quantity,
        imageId: data.imageId,
        slug: data.slug,
      };
    });
    
    return { success: true, items };
  } catch (error) {
    console.error('Error fetching cart from server:', error);
    return { success: false, error: 'Failed to fetch cart' };
  }
}

/**
 * Clear the cart in Firestore for the authenticated user.
 */
export async function clearServerCart(): Promise<{ success: boolean; error?: string }> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { success: false, error: 'Not authenticated' };
    }

    const db = getAdminDb();
    const userCartRef = db.collection(COLLECTIONS.USERS).doc(userId).collection('cart');
    
    const snapshot = await userCartRef.get();
    const batch = db.batch();
    
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    
    return { success: true };
  } catch (error) {
    console.error('Error clearing server cart:', error);
    return { success: false, error: 'Failed to clear cart' };
  }
}

/**
 * Merge local cart with server cart.
 * Server items take precedence for quantities, but local items are added if not on server.
 */
export async function mergeCartsOnLogin(localItems: CartItem[]): Promise<{ success: boolean; items?: CartItem[]; error?: string }> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { success: false, error: 'Not authenticated' };
    }

    const db = getAdminDb();
    const userCartRef = db.collection(COLLECTIONS.USERS).doc(userId).collection('cart');
    
    // Fetch server cart
    const snapshot = await userCartRef.get();
    const serverItems = new Map<string, CartItem>();
    
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      serverItems.set(data.productId, {
        productId: data.productId,
        title: data.title,
        price: data.price,
        quantity: data.quantity,
        imageId: data.imageId,
        slug: data.slug,
      });
    });
    
    // Merge: add local items that aren't on server, combine quantities
    const batch = db.batch();
    
    localItems.forEach((localItem) => {
      const serverItem = serverItems.get(localItem.productId);
      if (serverItem) {
        // Item exists on server - add quantities
        const newQuantity = serverItem.quantity + localItem.quantity;
        const itemRef = userCartRef.doc(localItem.productId);
        batch.update(itemRef, {
          quantity: newQuantity,
          updatedAt: FieldValue.serverTimestamp(),
        });
        serverItems.set(localItem.productId, { ...serverItem, quantity: newQuantity });
      } else {
        // Item only in local - add to server
        const itemRef = userCartRef.doc(localItem.productId);
        batch.set(itemRef, {
          ...localItem,
          updatedAt: FieldValue.serverTimestamp(),
        });
        serverItems.set(localItem.productId, localItem);
      }
    });
    
    await batch.commit();
    
    // Return merged cart
    const mergedItems = Array.from(serverItems.values());
    
    return { success: true, items: mergedItems };
  } catch (error) {
    console.error('Error merging carts:', error);
    return { success: false, error: 'Failed to merge carts' };
  }
}
