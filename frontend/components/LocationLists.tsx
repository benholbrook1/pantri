import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useLocations } from '../hooks/useLocations'; 

export const LocationList = () => {
  const { locations, loading, error, refresh } = useLocations();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="small" color="#0000ff" />
        <Text>Loading locations...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
        <Button title="Retry" onPress={refresh} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Locations ({locations.length})</Text>
      
      <FlatList
        data={locations}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No locations found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { padding: 20, alignItems: 'center' },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  item: { 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee',
    backgroundColor: 'white' 
  },
  text: { fontSize: 16 },
  empty: { fontStyle: 'italic', color: 'gray', marginTop: 10 }
});