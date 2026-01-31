import { apiClient } from './client';
import { GroceryList, ListItem } from '../types/api';

export const inventoryApi = {
  // Fetch all lists with their items nested inside
  getLists: async () => {
    const response = await apiClient.get<GroceryList[]>('/inventory/grocery-lists/');
    return response.data;
  },

  // Create a new empty list
  createList: async (name: string) => {
    const response = await apiClient.post<GroceryList>('/inventory/grocery-lists/', { name });
    return response.data;
  },

  // Add a specific item to a list
  addItem: async (listId: string, name: string) => {
    const response = await apiClient.post<ListItem>('/inventory/list-items/', { 
      list: listId, 
      name 
    });
    return response.data;
  },

  // Check or Uncheck an item
  toggleItem: async (itemId: string, isChecked: boolean) => {
    const response = await apiClient.patch<ListItem>(`/inventory/list-items/${itemId}/`, {
      is_checked: isChecked
    });
    return response.data;
  },

  deleteList: async (listId: string) => {
    await apiClient.delete(`/inventory/grocery-lists/${listId}/`);
  },

  deleteListItem: async (uuid: string) => {
    return apiClient.delete(`/inventory/list-items/${uuid}/`);
  },
};