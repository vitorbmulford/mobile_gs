import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { FilterChip } from '@/components/filter-chip';
import { RegionStatusCard } from '@/components/region-status-card';
import { ScreenContainer } from '@/components/screen-container';
import { useDefenseShield } from '@/contexts/defense-shield-context';
import type { RegionCategory } from '@/types/defense-shield';

type MonitoringFilter = 'all' | RegionCategory;

export default function MonitoringScreen() {
  const { regions } = useDefenseShield();
  const [filter, setFilter] = useState<MonitoringFilter>('all');

  const filteredRegions = useMemo(() => {
    if (filter === 'all') {
      return regions;
    }

    return regions.filter((region) => region.category === filter);
  }, [filter, regions]);

  return (
    <ScreenContainer
      eyebrow="Mission watch"
      subtitle="Five monitored regions blend Earth operations, critical infrastructure, and space simulation."
      title="Monitoring">
      <View style={styles.filters}>
        <FilterChip label="All" onPress={() => setFilter('all')} selected={filter === 'all'} />
        <FilterChip label="Earth" onPress={() => setFilter('earth')} selected={filter === 'earth'} />
        <FilterChip
          label="Infrastructure"
          onPress={() => setFilter('critical-infrastructure')}
          selected={filter === 'critical-infrastructure'}
        />
        <FilterChip label="Space" onPress={() => setFilter('space')} selected={filter === 'space'} />
      </View>

      <View style={styles.list}>
        {filteredRegions.map((region) => (
          <RegionStatusCard key={region.id} region={region} />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  list: {
    gap: 14,
  },
});
