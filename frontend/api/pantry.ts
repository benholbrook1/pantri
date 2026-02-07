import { apiClient } from './client';
import { Location, PantryItem } from '../types/api';

export const pantryApi = {

    getLocations: async () => {
        const response = await apiClient.get<Location[]>('inventory/locations/');
        return response.data;
    },

    getPantryItems: async () => {{
        const response = await apiClient.get<PantryItem[]>('inventory/pantry-items/');
        return response.data;
    }}


}