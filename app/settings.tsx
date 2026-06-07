import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

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
