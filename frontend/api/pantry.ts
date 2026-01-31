import { apiClient } from './client';
import { Location } from '../types/api';

export const pantryApi = {

    getLocations: async () => {
        const response = await apiClient.get<Location[]>('inventory/locations/');
        return response.data;
    }


}