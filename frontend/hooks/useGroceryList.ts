import { useState, useEffect, useCallback } from 'react';
import { inventoryApi } from '../api/inventory';
import { GroceryList, ListItem } from '../types/api';

export function useGroceryList(uuid: string | string[] | undefined) {
  const [list, setList] = useState<GroceryList | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to fetch data
  const refreshList = useCallback(async () => {
    if (!uuid || typeof uuid !== 'string') return;
    try {
      const allLists = await inventoryApi.getLists();
      const found = allLists.find(l => l.uuid === uuid);
      setList(found || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [uuid]);

  // Initial load
  useEffect(() => {
    refreshList();
  }, [refreshList]);

  // Logic: Add Item
  const addItem = async (name: string) => {
    if (!list || !name.trim()) return;
    
    // Optimistic Update
    const tempItem: ListItem = { uuid: 'temp-' + Date.now(), name, is_checked: false };
    setList({ ...list, items: [...list.items, tempItem] });

    await inventoryApi.addItem(list.uuid, name);
    refreshList(); // Sync with server
  };

  // Logic: Toggle Item
  const toggleItem = async (itemId: string, currentStatus: boolean) => {
    if (!list) return;

    // Optimistic Update
    const updatedItems = list.items.map(i => 
      i.uuid === itemId ? { ...i, is_checked: !currentStatus } : i
    );
    setList({ ...list, items: updatedItems });

    await inventoryApi.toggleItem(itemId, !currentStatus);
  };

  return { list, loading, addItem, toggleItem, refreshList };
}