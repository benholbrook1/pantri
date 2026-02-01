import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PantryHeaderProps {
  selectedLocation: string | null;
  onEdit: () => void;
}

export const PantryHeader = ({ selectedLocation, onEdit }: PantryHeaderProps) => {
  // If no location is selected yet (loading state), render nothing
  if (!selectedLocation) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedLocation}</Text>
      
      <TouchableOpacity onPress={onEdit} style={styles.editButton}>
        <Ionicons name="pencil" size={18} color="#007AFF" />
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  editText: {
    marginLeft: 5,
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
});