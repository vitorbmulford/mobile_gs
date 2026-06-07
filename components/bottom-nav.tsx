import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { navigationTargets } from '@/data/riskMetrics.mock';
import { useAppTheme } from '@/contexts/theme-context';

export function BottomNav() {
  const pathname = usePathname();
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.overlay,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.shadow,
        },
      ]}>
      {navigationTargets.map((target) => {
        const isActive = pathname === target.href;

        return (
          <Link key={target.href} href={target.href} asChild>
            <Pressable
              style={[
                styles.item,
                isActive && { backgroundColor: theme.colors.chip, borderColor: theme.colors.border },
              ]}>
              <MaterialCommunityIcons
                color={isActive ? theme.colors.primary : theme.colors.textMuted}
                name={target.icon}
                size={20}
              />
              <Text
                style={[
                  styles.label,
                  { color: isActive ? theme.colors.text : theme.colors.textMuted },
                ]}>
                {target.label}
              </Text>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    gap: 8,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 10,
  },
  item: {
    minWidth: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
  },
});
