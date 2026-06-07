import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/screen-container';
import { teamMembersMock } from '@/data/riskMetrics.mock';
import { useAppTheme } from '@/contexts/theme-context';

export default function SettingsScreen() {
  const { colorScheme, setThemeMode, theme } = useAppTheme();

  return (
    <ScreenContainer
      eyebrow="Command preferences"
      subtitle="Local preferences and project context for the academic MVP."
      title="Settings">
      <View
        style={[
          styles.card,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}>
        <View style={styles.rowBetween}>
          <View style={styles.copy}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Theme mode</Text>
            <Text style={[styles.cardText, { color: theme.colors.textMuted }]}>
              Toggle between light and dark command-center layouts. Your choice is stored locally.
            </Text>
          </View>
          <Switch
            onValueChange={(value) => setThemeMode(value ? 'dark' : 'light')}
            thumbColor={theme.colors.white}
            trackColor={{ false: theme.colors.surfaceMuted, true: theme.colors.primary }}
            value={colorScheme === 'dark'}
          />
        </View>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Project overview</Text>
        <Text style={[styles.cardText, { color: theme.colors.textMuted }]}>
          DefenseShield Orbital Intelligence is an academic prototype that simulates satellite data,
          IoT sensors, drones, and AI-driven recommendations for disaster prevention and orbital
          operations planning.
        </Text>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Team</Text>
        <View style={styles.teamList}>
          {teamMembersMock.map((member) => (
            <View key={member.name} style={styles.member}>
              <Text style={[styles.memberName, { color: theme.colors.text }]}>{member.name}</Text>
              <Text style={[styles.memberRole, { color: theme.colors.textMuted }]}>{member.role}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 14,
    borderRadius: 26,
    borderWidth: 1,
    padding: 18,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  copy: {
    flex: 1,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  cardText: {
    fontSize: 14,
    lineHeight: 21,
  },
  teamList: {
    gap: 12,
  },
  member: {
    gap: 4,
  },
  memberName: {
    fontSize: 15,
    fontWeight: '700',
  },
  memberRole: {
    fontSize: 13,
    lineHeight: 19,
  },
});
