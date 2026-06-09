import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/screen-container';
import { useAppTheme } from '@/contexts/theme-context';

const riskThreats = [
  {
    name: 'Interceptacao de dados',
    impact: 'Exposicao de localizacao, alertas operacionais e contexto sensivel das regioes monitoradas.',
    mitigation: 'HTTPS/TLS, criptografia em transito e segmentacao de acesso por perfil.',
    tone: 'danger',
    icon: 'transmission-tower-export',
  },
  {
    name: 'Manipulacao de telemetria',
    impact: 'Decisoes incorretas podem ser tomadas com base em dados de satelites, IoT e drones adulterados.',
    mitigation: 'Hashing, validacao de integridade e monitoramento continuo dos eventos.',
    tone: 'warning',
    icon: 'satellite-variant',
  },
  {
    name: 'Acesso indevido',
    impact: 'Operadores nao autorizados podem visualizar sensores, ativos e operacoes criticas.',
    mitigation: 'MFA, menor privilegio e politicas de Zero Trust para todo acesso.',
    tone: 'critical',
    icon: 'account-alert-outline',
  },
  {
    name: 'Indisponibilidade de servico (DDoS)',
    impact: 'A plataforma pode perder visibilidade operacional durante eventos criticos.',
    mitigation: 'Firewall, observabilidade de logs e plano de resposta com contencao rapida.',
    tone: 'primary',
    icon: 'server-network-off',
  },
] as const;

const securityArchitecture = [
  {
    title: 'Controles de Acesso',
    icon: 'shield-key-outline',
    items: ['MFA', 'Menor privilegio'],
  },
  {
    title: 'Protecao de Dados',
    icon: 'lock-outline',
    items: ['HTTPS/TLS', 'Criptografia', 'Hashing'],
  },
  {
    title: 'Seguranca da Infraestrutura',
    icon: 'radar',
    items: ['Zero Trust', 'Firewall', 'Monitoramento de logs'],
  },
] as const;

const governance = [
  {
    title: 'ISO 27001',
    icon: 'file-certificate-outline',
    items: ['Gestao de riscos', 'Seguranca da informacao'],
  },
  {
    title: 'LGPD',
    icon: 'scale-balance',
    items: ['Consentimento', 'Minimizacao de dados', 'Protecao da localizacao do usuario'],
  },
] as const;

const incidentPlan = [
  {
    step: '1. Identificacao',
    description: 'Detectar rapidamente alertas, anomalias e evidencias em logs, sensores e telemetria.',
  },
  {
    step: '2. Contencao',
    description: 'Isolar acessos ou servicos afetados para reduzir impacto e evitar propagacao.',
  },
  {
    step: '3. Erradicacao',
    description: 'Remover a causa raiz, corrigir vulnerabilidades e validar integridade operacional.',
  },
  {
    step: '4. Recuperacao',
    description: 'Restabelecer o servico monitorado com acompanhamento reforcado e comunicacao do incidente.',
  },
] as const;

const criticalAssets = [
  'Dados de localizacao',
  'Alertas operacionais',
  'Dados simulados de satelites',
  'Sensores IoT',
  'Drones',
  'Regioes monitoradas',
] as const;

export default function CybersecurityScreen() {
  const { theme } = useAppTheme();

  return (
    <ScreenContainer
      eyebrow="Global Solution 2026"
      subtitle="Representacao visual da arquitetura de seguranca planejada para o DefenseShield Orbital Intelligence."
      title="Cybersecurity">
      <SectionCard
        description="Ativos criticos monitorados e principais riscos considerados para o MVP academico."
        icon="shield-alert-outline"
        title="1. Analise de Riscos e Ameacas">
        <View style={styles.assetWrap}>
          {criticalAssets.map((asset) => (
            <Chip key={asset} label={asset} />
          ))}
        </View>

        <View style={styles.stack}>
          {riskThreats.map((threat) => (
            <View
              key={threat.name}
              style={[
                styles.threatCard,
                {
                  backgroundColor: theme.colors.surfaceStrong,
                  borderColor: theme.colors.border,
                },
              ]}>
              <View style={styles.rowBetween}>
                <View style={styles.threatTitleWrap}>
                  <View
                    style={[
                      styles.iconBadge,
                      {
                        backgroundColor: theme.colors.chip,
                        borderColor: theme.colors.border,
                      },
                    ]}>
                    <MaterialCommunityIcons
                      color={theme.colors[threat.tone]}
                      name={threat.icon}
                      size={20}
                    />
                  </View>
                  <Text style={[styles.threatTitle, { color: theme.colors.text }]}>
                    {threat.name}
                  </Text>
                </View>
              </View>
              <Text style={[styles.label, { color: theme.colors.secondary }]}>Impacto</Text>
              <Text style={[styles.body, { color: theme.colors.textMuted }]}>{threat.impact}</Text>
              <Text style={[styles.label, { color: theme.colors.primary }]}>Mitigacao</Text>
              <Text style={[styles.body, { color: theme.colors.textMuted }]}>
                {threat.mitigation}
              </Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard
        description="Controles planejados para acesso, protecao dos dados e endurecimento da operacao."
        icon="shield-account-outline"
        title="2. Arquitetura de Seguranca">
        <View style={styles.grid}>
          {securityArchitecture.map((section) => (
            <MiniCard key={section.title} icon={section.icon} items={section.items} title={section.title} />
          ))}
        </View>
      </SectionCard>

      <SectionCard
        description="Bases normativas que orientam o tratamento da informacao e a protecao da localizacao dos usuarios."
        icon="book-lock-outline"
        title="3. Governanca e Compliance">
        <View style={styles.grid}>
          {governance.map((section) => (
            <MiniCard key={section.title} icon={section.icon} items={section.items} title={section.title} />
          ))}
        </View>
      </SectionCard>

      <SectionCard
        description="Fluxo resumido para resposta a incidentes com foco em continuidade operacional."
        icon="timeline-clock-outline"
        title="4. Plano de Resposta a Incidentes">
        <View style={styles.timeline}>
          {incidentPlan.map((item, index) => (
            <View key={item.step} style={styles.timelineRow}>
              <View style={styles.timelineRail}>
                <View
                  style={[
                    styles.timelineDot,
                    { backgroundColor: theme.colors.primary, borderColor: theme.colors.background },
                  ]}
                />
                {index < incidentPlan.length - 1 ? (
                  <View style={[styles.timelineLine, { backgroundColor: theme.colors.border }]} />
                ) : null}
              </View>
              <View
                style={[
                  styles.timelineCard,
                  {
                    backgroundColor: theme.colors.surfaceStrong,
                    borderColor: theme.colors.border,
                  },
                ]}>
                <Text style={[styles.timelineTitle, { color: theme.colors.text }]}>{item.step}</Text>
                <Text style={[styles.body, { color: theme.colors.textMuted }]}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </SectionCard>
    </ScreenContainer>
  );
}

function SectionCard({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  children: React.ReactNode;
}) {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.sectionCard,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
      ]}>
      <View style={styles.sectionHeader}>
        <View
          style={[
            styles.sectionIcon,
            { backgroundColor: theme.colors.chip, borderColor: theme.colors.border },
          ]}>
          <MaterialCommunityIcons color={theme.colors.primary} name={icon} size={22} />
        </View>
        <View style={styles.sectionCopy}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{title}</Text>
          <Text style={[styles.body, { color: theme.colors.textMuted }]}>{description}</Text>
        </View>
      </View>
      {children}
    </View>
  );
}

function MiniCard({
  title,
  items,
  icon,
}: {
  title: string;
  items: readonly string[];
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}) {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.miniCard,
        { backgroundColor: theme.colors.surfaceStrong, borderColor: theme.colors.border },
      ]}>
      <View
        style={[
          styles.iconBadge,
          { backgroundColor: theme.colors.chip, borderColor: theme.colors.border },
        ]}>
        <MaterialCommunityIcons color={theme.colors.secondary} name={icon} size={20} />
      </View>
      <Text style={[styles.miniCardTitle, { color: theme.colors.text }]}>{title}</Text>
      <View style={styles.stackCompact}>
        {items.map((item) => (
          <View key={item} style={styles.bulletRow}>
            <View style={[styles.bullet, { backgroundColor: theme.colors.primary }]} />
            <Text style={[styles.body, { color: theme.colors.textMuted }]}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function Chip({ label }: { label: string }) {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.chip,
        { backgroundColor: theme.colors.chip, borderColor: theme.colors.border },
      ]}>
      <Text style={[styles.chipText, { color: theme.colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionCard: {
    gap: 18,
    borderRadius: 26,
    borderWidth: 1,
    padding: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  sectionIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionCopy: {
    flex: 1,
    gap: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
  },
  assetWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  stack: {
    gap: 12,
  },
  threatCard: {
    gap: 8,
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  threatTitleWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  threatTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  grid: {
    gap: 12,
  },
  miniCard: {
    gap: 12,
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
  },
  miniCardTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  stackCompact: {
    gap: 10,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 999,
    marginTop: 7,
  },
  timeline: {
    gap: 4,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 12,
  },
  timelineRail: {
    alignItems: 'center',
    width: 18,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 999,
    borderWidth: 3,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    marginVertical: 4,
  },
  timelineCard: {
    flex: 1,
    gap: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
});
