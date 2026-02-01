import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  Button, 
  TouchableOpacity 
} from 'react-native';
import { useLocations } from '../hooks/useLocations'; 

interface LocationFilterProps {
  locations: any[]; // Replace 'any' with your Location type
  loading: boolean;
  error: string | null;
  refresh: () => void;
  selectedLocation: string | null;
  onSelectLocation: (name: string) => void;
}

export const LocationFilter = ({ 
  locations, 
  loading, 
  error, 
  refresh, 
  selectedLocation, 
  onSelectLocation 
}: LocationFilterProps) => {

  const handleCreateNew = () => {
    console.log("Open create dialog here");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error loading filters</Text>
        <Button title="Retry" onPress={refresh} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={locations}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.uuid}
        contentContainerStyle={styles.listContent}
        
        renderItem={({ item }) => {
          const isSelected = selectedLocation === item.name;
          return (
            <TouchableOpacity 
              style={[styles.pill, isSelected && styles.pillSelected]} 
              onPress={() => onSelectLocation(item.name)}
            >
              <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}

        ListFooterComponent={
          <TouchableOpacity style={styles.addButton} onPress={handleCreateNew}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    height: 50,
  },
  listContent: {
    paddingHorizontal: 15,
    alignItems: 'center', 
    gap: 10, 
  },
  pill: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8, 
  },
  pillSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  pillText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  pillTextSelected: {
    color: '#fff', 
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: 20,
    color: '#555',
    marginTop: -2,
  },
  center: { padding: 10, alignItems: 'center' },
  errorText: { color: 'red', fontSize: 12, marginBottom: 5 },
});