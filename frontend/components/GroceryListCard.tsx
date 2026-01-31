import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { GroceryList } from '../types/api';

interface Props {
  list: GroceryList;
  onPress: (uuid: string) => void;
  onDelete: (uuid: string) => void;
}

export const GroceryListCard = ({ list, onPress, onDelete }: Props) => {
  return (
    <ReanimatedSwipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={() => (
        <View style={styles.deleteButtonContainer}>
          <Pressable 
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && { opacity: 0.8 }
            ]} 
            onPress={() => onDelete(list.uuid)}
          >
            <Ionicons name="trash-outline" size={24} color="white" />
          </Pressable>
        </View>
      )}
    >
      <Pressable 
        style={({ pressed }) => [
          styles.card,
          pressed && { opacity: 0.7, backgroundColor: '#F2F2F7' }
        ]}
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
      </Pressable>
    </ReanimatedSwipeable>
  );
};

const styles = StyleSheet.create({
  card: { 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 12,
    marginBottom: 12,
  },
  cardContent: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  cardTitle: { fontSize: 17, fontWeight: '600' },
  subtitle: { color: 'gray', marginTop: 4, fontSize: 14 },
  deleteButtonContainer: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 12,
    marginBottom: 12,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});