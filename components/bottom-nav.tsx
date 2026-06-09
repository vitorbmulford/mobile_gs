import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, usePathname, type Href } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { navigationTargets } from '@/data/riskMetrics.mock';
import { useAppTheme } from '@/contexts/theme-context';

export function BottomNav() {
  const pathname = usePathname();
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View pointerEvents="box-none" style={styles.overlay}>
      <View
        style={[
          styles.bar,
          {
            bottom: Math.max(insets.bottom, 10),
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            shadowColor: theme.colors.shadow,
          },
        ]}>
        {navigationTargets.map((target) => {
          const isActive = pathname === target.href;

          return (
            <Link key={target.href} href={target.href as Href} asChild>
              <Pressable
                style={({ pressed }) => [
                  styles.tab,
                  {
                    backgroundColor: isActive ? theme.colors.chip : 'transparent',
                    opacity: pressed ? 0.82 : 1,
                  },
                ]}>
                <MaterialCommunityIcons
                  color={isActive ? theme.colors.primary : theme.colors.textMuted}
                  name={target.icon}
                  size={24}
                />
              </Pressable>
            </Link>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 30,
  },
  bar: {
    position: 'absolute',
    left: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 28,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 12,
  },
  tab: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
