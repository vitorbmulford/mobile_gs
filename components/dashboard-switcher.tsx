import { router, type Href } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { FilterChip } from '@/components/filter-chip';

interface DashboardSwitcherProps {
  active: 'executive' | 'environmental';
}

export function DashboardSwitcher({ active }: DashboardSwitcherProps) {
  return (
    <View style={styles.row}>
      <FilterChip
        label="Executivo"
        onPress={() => router.replace('/dashboard')}
        selected={active === 'executive'}
      />
      <FilterChip
        label="Ambiental"
        onPress={() => router.replace('/environmental-dashboard' as Href)}
        selected={active === 'environmental'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
