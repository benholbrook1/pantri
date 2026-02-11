import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Location } from '../types/api'
import { CapacityBar } from './CapacityBar';

interface PantryHeaderProps {
  location: Location | undefined; // Pass the whole object now
  onEdit: () => void;
}

export const PantryHeader = ({ location, onEdit }: PantryHeaderProps) => {
  // If no location is selected yet (loading state), render nothing
  if (!location) return null;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <CapacityBar 
          current={location.item_count || 0} 
          total={location.capacity} 
        />
      </View>
      
      {/* RIGHT SIDE: Action Button */}
      <TouchableOpacity onPress={onEdit} style={styles.editButton}>
        <Ionicons name="settings-outline" size={20} color="#007AFF" />
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
    gap: 15, 
  },
  infoContainer: {
    flex: 1,
  },
  editButton: {
    padding: 8,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});