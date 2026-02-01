import { useState, useEffect, useCallback } from 'react';
import { pantryApi } from '../api/pantry'; 
import { Location } from '../types/api';

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

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

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  useEffect(() => {
    // Only set default if we have locations and nothing is selected yet
    if (locations.length > 0 && selectedLocation === null) {
      setSelectedLocation(locations[0].name);
    }
  }, [locations, selectedLocation]);

  return { 
    locations, 
    loading, 
    error, 
    refresh: fetchLocations,
    selectedLocation,
    selectLocation: setSelectedLocation
  };
}