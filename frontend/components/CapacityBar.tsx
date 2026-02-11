import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CapacityBarProps {
  current: number;
  total: number;
}

export const CapacityBar = ({ current, total }: CapacityBarProps) => {
  // 1. Safe Math
  const safeTotal = total || 50; // Default fallback
  const percentage = Math.min((current / safeTotal) * 100, 100);

  // 2. Color Logic
  let barColor = '#007AFF'; // Blue (Normal)
  if (percentage > 90) barColor = '#FF3B30'; // Red (Critical)
  else if (percentage > 75) barColor = '#FF9500'; // Orange (Warning)

  return (
    <View style={styles.container}>
      {/* Label Row */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>Inventory Level</Text>
        <Text style={styles.countText}>
          {current} <Text style={styles.totalText}>/ {safeTotal}</Text>
        </Text>
      </View>

      {/* Bar Row */}
      <View style={styles.track}>
        <View 
          style={[
            styles.fill, 
            { width: `${percentage}%`, backgroundColor: barColor }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 5,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
  },
  totalText: {
    color: '#999',
    fontWeight: '400',
  },
  track: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});