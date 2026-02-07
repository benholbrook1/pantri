import { useState, useEffect, useCallback, useMemo } from 'react';
import { pantryApi } from '../api/pantry'; 
import { PantryItem } from '../types/api';

export function usePantryItems(selectedLocation: string | null) {
  const [allItems, setAllItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch everything once
      const data = await pantryApi.getPantryItems();
      setAllItems(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load pantry items');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Filter the items client-side whenever the selectedLocation changes
  const filteredItems = useMemo(() => {
    if (!selectedLocation) return [];
    return allItems.filter(item => item.location === selectedLocation);
  }, [allItems, selectedLocation]);

  return { 
    items: filteredItems, 
    loading, 
    error, 
    refresh: fetchItems 
  };
}