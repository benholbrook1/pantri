import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { inventoryApi } from '../../api/inventory';
import { GroceryList } from '../../types/api';
import { GroceryListCard } from '../../components/GroceryListCard';
import { CreateListModal } from '../../components/CreateListModal';

export default function ShoppingListScreen() {
  const [lists, setLists] = useState<GroceryList[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  const router = useRouter();

  const loadData = async () => {
    try {
      const data = await inventoryApi.getLists();
      setLists(data);
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Could not fetch lists");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleCreate = async (name: string) => {
    try {
      await inventoryApi.createList(name);
      setModalVisible(false);
      loadData(); 
    } catch (e) {
      Alert.alert("Error", "Could not create list");
    }
  };

  const handleListPress = (uuid: string) => {
    router.push(`/list/${uuid}`);
  };

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#007AFF" /></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Lists</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle" size={36} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={lists}
        keyExtractor={(item) => item.uuid}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} />}
        renderItem={({ item }) => (
          <GroceryListCard list={item} onPress={handleListPress} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No lists yet. Tap + to add one!</Text>
        }
      />

      <CreateListModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onSubmit={handleCreate} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F2F2F7', paddingTop: 60 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 34, fontWeight: 'bold', color: '#000' },
  emptyText: { textAlign: 'center', marginTop: 50, color: 'gray', fontSize: 16 },
});