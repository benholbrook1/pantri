// app/list/[uuid].tsx
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// ✅ Import your new Hook
import { useGroceryList } from '../../hooks/useGroceryList';

export default function ListDetailScreen() {
  const { uuid } = useLocalSearchParams(); 
  const router = useRouter();
  
  // ✅ The hook handles all the heavy lifting
  const { list, loading, addItem, toggleItem } = useGroceryList(uuid);
  
  const [newItemName, setNewItemName] = useState('');

  const handleAddPress = () => {
    addItem(newItemName);
    setNewItemName('');
  };

  if (loading) return <View style={styles.centered}><ActivityIndicator size="large" /></View>;
  if (!list) return <View style={styles.centered}><Text>List not found</Text></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>{list.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={list.items}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.itemRow} 
            onPress={() => toggleItem(item.uuid, item.is_checked)}
          >
            <Ionicons 
              name={item.is_checked ? "checkbox" : "square-outline"} 
              size={24} 
              color={item.is_checked ? "#007AFF" : "#C7C7CC"} 
            />
            <Text style={[styles.itemText, item.is_checked && styles.itemTextChecked]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Add item..."
          value={newItemName}
          onChangeText={setNewItemName}
          onSubmitEditing={handleAddPress}
        />
        <TouchableOpacity onPress={handleAddPress} style={styles.addButton}>
          <Ionicons name="arrow-up-circle" size={40} color="#007AFF" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingTop: 60 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
  backButton: { padding: 5 },
  title: { fontSize: 24, fontWeight: 'bold' },
  itemRow: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F2F2F7' },
  itemText: { fontSize: 18, marginLeft: 15 },
  itemTextChecked: { textDecorationLine: 'line-through', color: '#C7C7CC' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 15, borderTopWidth: 1, borderTopColor: '#F2F2F7', backgroundColor: 'white' },
  input: { flex: 1, backgroundColor: '#F2F2F7', padding: 12, borderRadius: 20, marginRight: 10, fontSize: 16 },
  addButton: { padding: 5 }
});