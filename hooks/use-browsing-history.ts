'use client';

import { useState, useEffect, useCallback } from 'react';

const HISTORY_KEY = 'kriti-browsing-history';
const MAX_HISTORY_SIZE = 20;

export function useBrowsingHistory() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Failed to read browsing history from localStorage', error);
    }
  }, []);

  const addProductToHistory = useCallback((productId: string) => {
    setHistory((prevHistory) => {
      // Remove the product if it already exists to move it to the front
      const newHistory = prevHistory.filter((id) => id !== productId);
      // Add the new product to the front
      newHistory.unshift(productId);
      // Limit the history size
      const limitedHistory = newHistory.slice(0, MAX_HISTORY_SIZE);

      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
      } catch (error) {
        console.error('Failed to save browsing history to localStorage', error);
      }
      
      return limitedHistory;
    });
  }, []);

  return { history, addProductToHistory };
}
