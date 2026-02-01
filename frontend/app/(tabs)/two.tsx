import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { LocationFilter } from '@/components/LocationFilter';
import { PantryHeader } from '@/components/PantryHeader';

// Hooks
import { useLocations } from '@/hooks/useLocations';

export default function TabTwoScreen() {
  // Lift the locations hook here so we have access to the state
  const { 
    locations, 
    loading, 
    error, 
    refresh, 
    selectedLocation, 
    selectLocation 
  } = useLocations();

  const handleEditLocation = () => {
    console.log(`Edit clicked for: ${selectedLocation}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        
        {/* 2. Pass props down to Filter */}
        <LocationFilter 
          locations={locations}
          loading={loading}
          error={error}
          refresh={refresh}
          selectedLocation={selectedLocation}
          onSelectLocation={selectLocation}
        />

        {/* 3. Pass props down to Header */}
        <PantryHeader 
          selectedLocation={selectedLocation}
          onEdit={handleEditLocation}
        />

        {/* Future: <PantryList location={selectedLocation} /> */}
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});