import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export const CreateListModal = ({ visible, onClose, onSubmit }: Props) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name);
      setName(''); // Reset field
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>New Shopping List</Text>
          
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Costco Run" 
            value={name}
            onChangeText={setName}
            autoFocus={visible} // Auto-keyboard when opened
          />
          
          <View style={styles.modalButtons}>
            <Button title="Cancel" color="red" onPress={onClose} />
            <Button title="Create" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
  modalView: { backgroundColor: 'white', borderRadius: 20, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { backgroundColor: '#F2F2F7', padding: 15, borderRadius: 10, marginBottom: 20, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-around' }
});