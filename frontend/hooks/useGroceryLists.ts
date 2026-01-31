import { useState, useEffect, useCallback } from 'react';
import { groceryListApi } from '../api/groceryList';
import { GroceryList } from '../types/api';

import uuid from 'react-native-uuid';


export function useGroceryLists() {
  const [lists, setLists] = useState<GroceryList[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Helper to fetch data
  const refreshLists = useCallback(async () => {
    try {
      const data = await groceryListApi.getLists();
      setLists(data);
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refreshLists();
  }, [refreshLists]);

  // Logic: Create List
  const createList = async (name: string) => {
    if (!name.trim()) return;

    // Optimistic Update
    const tempList: GroceryList = {
      uuid: uuid.v4() as string,
      name,
      items: [],
      created_at: new Date().toISOString(), // Add created_at timestamp
    };
    setLists(prev => [...prev, tempList]);

    try {
      await groceryListApi.createList(name);
      await refreshLists(); // Sync with server
    } catch (e) {
      // Revert on failure
      setLists(prev => prev.filter(list => list.uuid !== tempList.uuid));
      throw e;
    }
  };

  // Logic: Delete List
  const deleteList = async (listUuid: string) => {
    // 1. Optimistic Update (Remove it from screen immediately)
    const listToDelete = lists.find(list => list.uuid === listUuid);
    setLists(prev => prev.filter(list => list.uuid !== listUuid));

    try {
      // 2. Send delete request to server
      await groceryListApi.deleteList(listUuid);
    } catch (e) {
      console.error("Failed to delete list");
      // Revert if it fails
      if (listToDelete) {
        setLists(prev => [...prev, listToDelete]);
      }
      throw e;
    }
  };

  // Manual refresh for pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshLists();
  };

  return { 
    lists, 
    loading, 
    refreshing,
    createList, 
    deleteList, 
    refreshLists,
    onRefresh,
  };
}