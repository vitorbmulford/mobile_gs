import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

import { useAppTheme } from '@/contexts/theme-context';

const radarPoints = [
  { x: 98, y: 36, label: 'A1' },
  { x: 148, y: 88, label: 'B4' },
  { x: 72, y: 124, label: 'C2' },
  { x: 128, y: 154, label: 'D7' },
];

export function OrbitalRadar() {
  const { theme } = useAppTheme();
  const sweep = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(sweep, {
        toValue: 1,
        duration: 3600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.15,
          duration: 1200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.85,
          duration: 1200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulse, sweep]);

  const rotate = sweep.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const opacity = pulse.interpolate({
    inputRange: [0.85, 1.15],
    outputRange: [0.35, 0.9],
  });

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Radar Orbital</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
          Varredura simulada em tempo real de anomalias monitoradas e eventos orbitais.
        </Text>
      </View>

      <View style={styles.radarStage}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.pulseRing,
            {
              borderColor: theme.colors.secondary,
              opacity,
              transform: [{ scale: pulse }],
            },
          ]}
        />

        <Svg height={220} viewBox="0 0 220 220" width="100%">
          <Circle cx="110" cy="110" fill={theme.colors.backgroundAlt} opacity="0.4" r="94" />
          <Circle cx="110" cy="110" fill="none" r="94" stroke={theme.colors.border} strokeWidth="2" />
          <Circle cx="110" cy="110" fill="none" r="70" stroke={theme.colors.border} strokeWidth="1.5" />
          <Circle cx="110" cy="110" fill="none" r="45" stroke={theme.colors.border} strokeWidth="1.2" />
          <Line stroke={theme.colors.border} strokeWidth="1" x1="16" x2="204" y1="110" y2="110" />
          <Line stroke={theme.colors.border} strokeWidth="1" x1="110" x2="110" y1="16" y2="204" />
          <Line stroke={theme.colors.border} strokeWidth="1" x1="42" x2="178" y1="42" y2="178" />
          <Line stroke={theme.colors.border} strokeWidth="1" x1="178" x2="42" y1="42" y2="178" />
          {radarPoints.map((point) => (
            <Circle
              key={point.label}
              cx={point.x}
              cy={point.y}
              fill={theme.colors.critical}
              opacity="0.95"
              r="4.5"
            />
          ))}
        </Svg>

        <Animated.View
          pointerEvents="none"
          style={[
            styles.sweep,
            {
              backgroundColor: `${theme.colors.primary}22`,
              borderColor: `${theme.colors.primary}44`,
              transform: [{ rotate }],
            },
          ]}
        />
      </View>

      <View style={styles.legendRow}>
        <LegendItem color={theme.colors.secondary} label="Pulso do radar" />
        <LegendItem color={theme.colors.critical} label="Evento critico" />
        <LegendItem color={theme.colors.primary} label="Varredura orbital" />
      </View>
    </View>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  const { theme } = useAppTheme();

  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={[styles.legendLabel, { color: theme.colors.textMuted }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
    borderRadius: 30,
    borderWidth: 1,
    padding: 18,
  },
  header: {
    gap: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  radarStage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
  },
  pulseRing: {
    position: 'absolute',
    width: 172,
    height: 172,
    borderRadius: 172,
    borderWidth: 2,
  },
  sweep: {
    position: 'absolute',
    width: 2,
    height: 94,
    borderRadius: 2,
    top: 16,
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  legendLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
});
