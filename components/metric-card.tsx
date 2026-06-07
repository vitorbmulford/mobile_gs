import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';

interface MetricCardProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
  helper: string;
}

export function MetricCard({ icon, label, value, helper }: MetricCardProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.shadow,
        },
      ]}>
      <View style={[styles.iconWrap, { backgroundColor: theme.colors.chip }]}>
        <MaterialCommunityIcons color={theme.colors.primary} name={icon} size={20} />
      </View>
      <Text style={[styles.value, { color: theme.colors.text }]}>{value}</Text>
      <Text style={[styles.label, { color: theme.colors.textMuted }]}>{label}</Text>
      <Text style={[styles.helper, { color: theme.colors.textMuted }]}>{helper}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 150,
    gap: 8,
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  iconWrap: {
    alignSelf: 'flex-start',
    borderRadius: 14,
    padding: 10,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  helper: {
    fontSize: 13,
    lineHeight: 18,
  },
});
