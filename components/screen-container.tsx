import React, { useEffect, useRef } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';

import { BottomNav } from '@/components/bottom-nav';
import { useAppTheme } from '@/contexts/theme-context';

interface ScreenContainerProps {
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
}

export function ScreenContainer({
  title,
  eyebrow,
  subtitle,
  children,
  contentContainerStyle,
}: ScreenContainerProps) {
  const { theme } = useAppTheme();
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, slide]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={StyleSheet.absoluteFillObject}>
        <View
          style={[
            styles.glowOne,
            { backgroundColor: theme.colors.primary, opacity: theme.isDark ? 0.18 : 0.1 },
          ]}
        />
        <View
          style={[
            styles.glowTwo,
            { backgroundColor: theme.colors.secondary, opacity: theme.isDark ? 0.16 : 0.1 },
          ]}
        />
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fade,
            transform: [{ translateY: slide }],
          },
        ]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            contentContainerStyle,
            { backgroundColor: 'transparent' },
          ]}
          showsVerticalScrollIndicator={false}>
          {(eyebrow || title || subtitle) && (
            <View style={styles.header}>
              {eyebrow ? (
                <Text style={[styles.eyebrow, { color: theme.colors.secondary }]}>{eyebrow}</Text>
              ) : null}
              {title ? (
                <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
              ) : null}
              {subtitle ? (
                <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>{subtitle}</Text>
              ) : null}
            </View>
          )}
          {children}
        </ScrollView>
        <BottomNav />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    gap: 18,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
  },
  header: {
    gap: 8,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  glowOne: {
    position: 'absolute',
    top: -80,
    right: -20,
    width: 220,
    height: 220,
    borderRadius: 220,
  },
  glowTwo: {
    position: 'absolute',
    bottom: 120,
    left: -50,
    width: 180,
    height: 180,
    borderRadius: 180,
  },
});
