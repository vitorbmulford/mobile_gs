import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Polyline, Rect } from 'react-native-svg';

import { useAppTheme } from '@/contexts/theme-context';
import type { ChartDatum } from '@/types/defense-shield';

type ChartVariant = 'bars' | 'line' | 'distribution';

interface ChartSectionProps {
  title: string;
  subtitle: string;
  data: ChartDatum[];
  variant: ChartVariant;
}

export function ChartSection({ title, subtitle, data, variant }: ChartSectionProps) {
  const { theme } = useAppTheme();

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
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>{subtitle}</Text>
      </View>
      {variant === 'bars' ? <BarsChart data={data} /> : null}
      {variant === 'line' ? <LineTrendChart data={data} /> : null}
      {variant === 'distribution' ? <DistributionChart data={data} /> : null}
    </View>
  );
}

function BarsChart({ data }: { data: ChartDatum[] }) {
  const { theme } = useAppTheme();
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  const chartHeight = 160;

  return (
    <View style={styles.chartBody}>
      <View style={styles.barsRow}>
        {data.map((item) => {
          const height = Math.max((item.value / maxValue) * chartHeight, 16);

          return (
            <View key={item.label} style={styles.barItem}>
              <Text style={[styles.barValue, { color: theme.colors.text }]}>{item.value}</Text>
              <View style={[styles.barTrack, { backgroundColor: theme.colors.surfaceStrong }]}>
                <View
                  style={[
                    styles.barFill,
                    {
                      backgroundColor: item.color ?? theme.colors.primary,
                      height,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.axisLabel, { color: theme.colors.textMuted }]}>{item.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function DistributionChart({ data }: { data: ChartDatum[] }) {
  const { theme } = useAppTheme();
  const maxValue = 100;

  return (
    <View style={styles.distributionList}>
      {data.map((item) => (
        <View key={item.label} style={styles.distributionItem}>
          <View style={styles.distributionHeader}>
            <Text style={[styles.distributionLabel, { color: theme.colors.text }]}>{item.label}</Text>
            <Text style={[styles.distributionValue, { color: theme.colors.textMuted }]}>
              {item.value}/100
            </Text>
          </View>
          <View style={[styles.distributionTrack, { backgroundColor: theme.colors.surfaceStrong }]}>
            <View
              style={[
                styles.distributionFill,
                {
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color ?? theme.colors.primary,
                },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

function LineTrendChart({ data }: { data: ChartDatum[] }) {
  const { theme } = useAppTheme();
  const width = 300;
  const height = 160;
  const padding = 16;
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  const minValue = Math.min(...data.map((item) => item.value), 0);

  const points = data
    .map((item, index) => {
      const x =
        padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
      const y =
        height -
        padding -
        ((item.value - minValue) / Math.max(maxValue - minValue, 1)) * (height - padding * 2);

      return `${x},${y}`;
    })
    .join(' ');

  return (
    <View style={styles.lineWrapper}>
      <Svg height={height} viewBox={`0 0 ${width} ${height}`} width="100%">
        <Line
          stroke={theme.colors.border}
          strokeWidth="1"
          x1={padding}
          x2={width - padding}
          y1={height - padding}
          y2={height - padding}
        />
        <Polyline
          fill="none"
          points={points}
          stroke={theme.colors.primary}
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {data.map((item, index) => {
          const x =
            padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
          const y =
            height -
            padding -
            ((item.value - minValue) / Math.max(maxValue - minValue, 1)) *
              (height - padding * 2);

          return (
            <React.Fragment key={item.label}>
              <Circle cx={x} cy={y} fill={theme.colors.background} r="6" stroke={theme.colors.primary} strokeWidth="3" />
              <Rect
                fill="transparent"
                height="18"
                width="30"
                x={x - 15}
                y={y - 26}
              />
            </React.Fragment>
          );
        })}
      </Svg>
      <View style={styles.lineLabels}>
        {data.map((item) => (
          <Text key={item.label} style={[styles.axisLabel, { color: theme.colors.textMuted }]}>
            {item.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
    borderRadius: 28,
    borderWidth: 1,
    padding: 18,
  },
  header: {
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  chartBody: {
    gap: 12,
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 10,
  },
  barItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  barTrack: {
    width: '100%',
    maxWidth: 54,
    height: 160,
    borderRadius: 22,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 22,
  },
  barValue: {
    fontSize: 12,
    fontWeight: '800',
  },
  axisLabel: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  distributionList: {
    gap: 14,
  },
  distributionItem: {
    gap: 8,
  },
  distributionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  distributionLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  distributionValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  distributionTrack: {
    height: 12,
    borderRadius: 999,
    overflow: 'hidden',
  },
  distributionFill: {
    height: '100%',
    borderRadius: 999,
  },
  lineWrapper: {
    gap: 8,
  },
  lineLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
});
