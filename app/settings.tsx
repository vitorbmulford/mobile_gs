import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/screen-container';
import { teamMembersMock } from '@/data/riskMetrics.mock';
import { useAppTheme } from '@/contexts/theme-context';

export default function SettingsScreen() {
  const { colorScheme, setThemeMode, theme } = useAppTheme();

  return (
    <ScreenContainer
      eyebrow="Preferencias de comando"
      subtitle="Preferencias locais e contexto do projeto para o MVP academico."
      title="Configuracoes">
      <View
        style={[
          styles.card,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}>
        <View style={styles.rowBetween}>
          <View style={styles.copy}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Modo de tema</Text>
            <Text style={[styles.cardText, { color: theme.colors.textMuted }]}>
              Alterne entre os modos claro e escuro da central de comando. Sua escolha fica salva localmente.
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
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Recursos academicos</Text>
        <Pressable
          onPress={() => router.push('/cybersecurity')}
          style={({ pressed }) => [
            styles.linkCard,
            {
              backgroundColor: theme.colors.surfaceStrong,
              borderColor: theme.colors.border,
              opacity: pressed ? 0.86 : 1,
            },
          ]}>
          <View
            style={[
              styles.linkIcon,
              { backgroundColor: theme.colors.chip, borderColor: theme.colors.border },
            ]}>
            <MaterialCommunityIcons
              color={theme.colors.primary}
              name="shield-lock-outline"
              size={22}
            />
          </View>
          <View style={styles.copy}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Cybersecurity</Text>
            <Text style={[styles.cardText, { color: theme.colors.textMuted }]}>
              Consulte a arquitetura de seguranca planejada para o MVP da Global Solution 2026.
            </Text>
          </View>
          <MaterialCommunityIcons
            color={theme.colors.textMuted}
            name="chevron-right"
            size={22}
          />
        </Pressable>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Visao do projeto</Text>
        <Text style={[styles.cardText, { color: theme.colors.textMuted }]}>
          O DefenseShield Orbital Intelligence e um prototipo academico que simula dados satelitais,
          sensores IoT, drones e recomendacoes orientadas por inteligencia para prevencao de desastres
          e planejamento de operacoes orbitais.
        </Text>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Integrantes</Text>
        <View style={styles.teamList}>
          {teamMembersMock.map((member) => (
            <View key={member.name} style={styles.member}>
              <Text style={[styles.memberName, { color: theme.colors.text }]}>{member.name}</Text>
              <Text style={[styles.memberRole, { color: theme.colors.textMuted }]}>
                {member.rm ? `RM ${member.rm} | ` : ''}
                {member.role}
              </Text>
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
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 20,
    borderWidth: 1,
    padding: 14,
  },
  linkIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
