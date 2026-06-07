import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, usePathname, type Href } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { navigationTargets } from '@/data/riskMetrics.mock';
import { useAppTheme } from '@/contexts/theme-context';

export function BottomNav() {
  const pathname = usePathname();
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const drawerWidth = Math.min(Math.max(width * 0.82, 280), 340);

  const activeTarget = useMemo(
    () => navigationTargets.find((target) => target.href === pathname) ?? navigationTargets[0],
    [pathname]
  );

  useEffect(() => {
    Animated.timing(progress, {
      toValue: isOpen ? 1 : 0,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [isOpen, progress]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const drawerTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-drawerWidth - 24, 0],
  });

  const launcherTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const launcherOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const backdropOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View pointerEvents="box-none" style={styles.overlay}>
      {isOpen ? (
        <Animated.View
          style={[
            styles.backdrop,
            {
              backgroundColor: theme.colors.overlay,
              opacity: backdropOpacity,
            },
          ]}>
          <Pressable onPress={() => setIsOpen(false)} style={StyleSheet.absoluteFillObject} />
        </Animated.View>
      ) : null}

      <Animated.View
        pointerEvents={isOpen ? 'none' : 'auto'}
        style={[
          styles.launcherWrap,
          {
            opacity: launcherOpacity,
            transform: [{ translateX: launcherTranslateX }],
          },
        ]}>
        <Pressable
          onPress={() => setIsOpen(true)}
          style={[
            styles.launcher,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              shadowColor: theme.colors.shadow,
            },
          ]}>
          <View style={[styles.launcherIcon, { backgroundColor: theme.colors.chip }]}>
            <MaterialCommunityIcons color={theme.colors.primary} name="menu" size={20} />
          </View>
          <View style={styles.launcherTextWrap}>
            <Text style={[styles.launcherLabel, { color: theme.colors.textMuted }]}>Navegacao</Text>
            <Text numberOfLines={1} style={[styles.launcherTitle, { color: theme.colors.text }]}>
              {activeTarget.label}
            </Text>
          </View>
          <MaterialCommunityIcons color={theme.colors.textMuted} name="chevron-right" size={18} />
        </Pressable>
      </Animated.View>

      <Animated.View
        style={[
          styles.drawer,
          {
            width: drawerWidth,
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            shadowColor: theme.colors.shadow,
            transform: [{ translateX: drawerTranslateX }],
          },
        ]}>
        <View style={styles.drawerHeader}>
          <View style={styles.drawerCopy}>
            <Text style={[styles.drawerEyebrow, { color: theme.colors.secondary }]}>Navegacao</Text>
            <Text style={[styles.drawerTitle, { color: theme.colors.text }]}>
              Central DefenseShield
            </Text>
            <Text style={[styles.drawerSubtitle, { color: theme.colors.textMuted }]}>
              Acesse os modulos do aplicativo de forma rapida e organizada.
            </Text>
          </View>
          <Pressable
            onPress={() => setIsOpen(false)}
            style={[
              styles.closeButton,
              {
                backgroundColor: theme.colors.surfaceStrong,
                borderColor: theme.colors.border,
              },
            ]}>
            <MaterialCommunityIcons color={theme.colors.primary} name="close" size={18} />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}>
          {navigationTargets.map((target) => {
            const isActive = pathname === target.href;

            return (
              <Link key={target.href} href={target.href as Href} asChild>
                <Pressable
                  style={({ pressed }) => [
                    styles.item,
                    {
                      backgroundColor: isActive ? theme.colors.chip : theme.colors.surfaceStrong,
                      borderColor: isActive ? theme.colors.border : 'transparent',
                      opacity: pressed ? 0.9 : 1,
                    },
                  ]}>
                  <View
                    style={[
                      styles.itemIcon,
                      {
                        backgroundColor: isActive
                          ? `${theme.colors.primary}22`
                          : theme.colors.surfaceMuted,
                      },
                    ]}>
                    <MaterialCommunityIcons
                      color={isActive ? theme.colors.primary : theme.colors.textMuted}
                      name={target.icon}
                      size={22}
                    />
                  </View>

                  <View style={styles.itemCopy}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.label,
                        { color: isActive ? theme.colors.text : theme.colors.textMuted },
                      ]}>
                      {target.label}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.itemSubtitle,
                        { color: isActive ? theme.colors.textMuted : theme.colors.textMuted },
                      ]}>
                      {target.subtitle}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.trailing,
                      {
                        backgroundColor: isActive
                          ? `${theme.colors.secondary}22`
                          : 'transparent',
                      },
                    ]}>
                    <MaterialCommunityIcons
                      color={isActive ? theme.colors.secondary : theme.colors.textMuted}
                      name={isActive ? 'orbit' : 'chevron-right'}
                      size={18}
                    />
                  </View>
                </Pressable>
              </Link>
            );
          })}
        </ScrollView>

        <View
          style={[
            styles.drawerFooter,
            {
              backgroundColor: theme.colors.surfaceStrong,
              borderColor: theme.colors.border,
            },
          ]}>
          <Text style={[styles.footerTitle, { color: theme.colors.text }]}>DefenseShield</Text>
          <Text style={[styles.footerText, { color: theme.colors.textMuted }]}>
            Painel orbital mobile para monitoramento de riscos simulados.
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 30,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  launcherWrap: {
    position: 'absolute',
    left: 18,
    top: 20,
  },
  launcher: {
    minWidth: 164,
    maxWidth: 220,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 10,
  },
  launcherIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  launcherTextWrap: {
    flex: 1,
    gap: 2,
  },
  launcherLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  launcherTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  drawer: {
    position: 'absolute',
    left: 12,
    top: 12,
    bottom: 12,
    borderRadius: 30,
    borderWidth: 1,
    padding: 16,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.26,
    shadowRadius: 24,
    elevation: 14,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 18,
  },
  drawerCopy: {
    flex: 1,
    gap: 4,
    paddingTop: 2,
  },
  drawerEyebrow: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
  },
  drawerSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    gap: 10,
    paddingBottom: 18,
  },
  item: {
    width: '100%',
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  itemIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemCopy: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '800',
  },
  itemSubtitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  trailing: {
    width: 30,
    height: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerFooter: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 14,
  },
  footerTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  footerText: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 17,
  },
});
