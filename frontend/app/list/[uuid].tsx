import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, StyleSheet, 
  TextInput, KeyboardAvoidingView, Platform, ActivityIndicator, Keyboard, Pressable
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { useAnimatedStyle, SharedValue } from 'react-native-reanimated';

import { useGroceryList } from '../../hooks/useGroceryList';

export default function ListDetailScreen() {
  const { uuid } = useLocalSearchParams(); 
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const { list, loading, addItem, toggleItem, deleteListItem } = useGroceryList(uuid);
  const [newItemName, setNewItemName] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );
    return () => { showSub.remove(); hideSub.remove(); };
  }, []);

  const handleAddPress = () => {
    if (newItemName.trim()) {
      addItem(newItemName.trim());
      setNewItemName('');
    }
  };

  if (loading) return <View style={styles.centered}><ActivityIndicator size="large" /></View>;
  if (!list) return <View style={styles.centered}><Text>List not found</Text></View>;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          keyboardVerticalOffset={Platform.OS === "ios" ? insets.bottom : 10}
        >
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.5 }]}>
              <Ionicons name="arrow-back" size={24} color="#007AFF" />
            </Pressable>
            <Text style={styles.title}>{list.name}</Text>
            <View style={{ width: 24 }} />
          </View>

          <FlatList
            data={list.items}
            keyExtractor={(item) => item.uuid}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
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
                      onPress={() => deleteListItem(item.uuid)}
                    >
                      <Ionicons name="trash-outline" size={24} color="white" />
                    </Pressable>
                  </View>
                )}
              >
                <Pressable 
                  style={({ pressed }) => [
                    styles.itemRow, 
                    pressed && { opacity: 0.7, backgroundColor: '#F2F2F7' }
                  ]}
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
                </Pressable>
              </ReanimatedSwipeable>
            )}
          />

          <View style={[styles.inputContainer, { paddingBottom: isKeyboardVisible ? 0 : insets.bottom }]}>
            <TextInput
              style={styles.input}
              placeholder="Add item..."
              value={newItemName}
              onChangeText={setNewItemName}
              onSubmitEditing={handleAddPress}
              returnKeyType="done"
            />
            <Pressable onPress={handleAddPress} style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.5 }]}>
              <Ionicons name="arrow-up-circle" size={40} color="#007AFF" />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' }, 
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10, height: 50 },
  backButton: { padding: 5 },
  title: { fontSize: 24, fontWeight: 'bold' },
  
  itemRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F2F2F7',
    backgroundColor: 'white',
    height: 60,
  },
  itemText: { fontSize: 18, marginLeft: 15, flex: 1 },
  itemTextChecked: { textDecorationLine: 'line-through', color: '#C7C7CC' },
  
  deleteButtonContainer: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 60,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  inputContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F2F2F7', backgroundColor: 'white' },
  input: { flex: 1, backgroundColor: '#F2F2F7', padding: 10, borderRadius: 20, marginRight: 10, fontSize: 16 },
  addButton: { padding: 5 }
});