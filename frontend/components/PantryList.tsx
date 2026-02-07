import React, { useMemo } from 'react';
import { 
  View, 
  Text, 
  SectionList, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';
import { PantryItem } from '../types/api';

interface PantryListProps {
  items: PantryItem[];
  loading: boolean;
  refresh: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'FULL': return { bg: '#e6f4ea', text: '#137333' }; // Green
    case 'HALF': return { bg: '#feefc3', text: '#b06000' }; // Yellow
    case 'LOW':  return { bg: '#fce8e6', text: '#c5221f' }; // Red
    default:     return { bg: '#f1f3f4', text: '#5f6368' }; // Grey
  }
};

export const PantryList = ({ items, loading, refresh }: PantryListProps) => {

  // Group items by Category
  const sections = useMemo(() => {
    const grouped = items.reduce((acc, item) => {
      // Handle cases where category might be null or empty
      const catName = item.category || 'Other';
      
      if (!acc[catName]) {
        acc[catName] = [];
      }
      acc[catName].push(item);
      return acc;
    }, {} as Record<string, PantryItem[]>);

    // Convert to SectionList format and sort alphabetically
    return Object.keys(grouped)
      .sort()
      .map(key => ({
        title: key,
        data: grouped[key]
      }));
  }, [items]);

  if (loading && items.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.uuid}
      contentContainerStyle={styles.listContent}
      refreshing={loading}
      onRefresh={refresh}
      stickySectionHeadersEnabled={false}
      
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
      )}

      renderItem={({ item }) => {
        const statusStyle = getStatusColor(item.status);
        return (
          <View style={styles.row}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              {item.expiry_date && (
                <Text style={styles.expiryText}>Expires: {item.expiry_date}</Text>
              )}
            </View>
            
            <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
              <Text style={[styles.statusText, { color: statusStyle.text }]}>
                {item.status}
              </Text>
            </View>
          </View>
        );
      }}

      ListEmptyComponent={
        <View style={styles.center}>
          <Text style={styles.emptyText}>No items found in this location.</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  listContent: { paddingBottom: 100 },
  center: { padding: 40, alignItems: 'center' },
  sectionHeader: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemName: { fontSize: 16, fontWeight: '500', color: '#333' },
  expiryText: { fontSize: 12, color: '#999', marginTop: 4 },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    minWidth: 50,
    alignItems: 'center',
  },
  statusText: { fontSize: 11, fontWeight: '700' },
  emptyText: { color: '#ccc', fontSize: 16 }
});