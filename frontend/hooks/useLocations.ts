import { useState, useEffect, useCallback } from 'react';
import { pantryApi } from '../api/pantry'; 
import { Location } from '../types/api';

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await pantryApi.getLocations();
      setLocations(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load locations');
    } finally {
      setLoading(false);
    }
  }, []);

  // Automatically fetch on mount
  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  return { 
    locations, 
    loading, 
    error, 
    refresh: fetchLocations 
  };
}