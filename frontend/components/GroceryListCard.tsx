import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GroceryList } from '../types/api';

interface Props {
  list: GroceryList;
  onPress: (uuid: string) => void;
}

export const GroceryListCard = ({ list, onPress }: Props) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => onPress(list.uuid)}
    >
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.cardTitle}>{list.name}</Text>
          <Text style={styles.subtitle}>
            {list.items.length} {list.items.length === 1 ? 'item' : 'items'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#C7C7CC" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 12 },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 17, fontWeight: '600' },
  subtitle: { color: 'gray', marginTop: 4, fontSize: 14 },
});