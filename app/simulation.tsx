import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { FilterChip } from '@/components/filter-chip';
import { FormField } from '@/components/form-field';
import { ScreenContainer } from '@/components/screen-container';
import { getRiskToneLabel } from '@/constants/theme';
import { useDefenseShield } from '@/contexts/defense-shield-context';
import { useAppTheme } from '@/contexts/theme-context';
import type { AlertType, RiskLevel, SimulationFormData } from '@/types/defense-shield';

const eventTypes: AlertType[] = ['Queimada', 'Enchente', 'Falha Operacional', 'Anomalia Climatica'];
const severityLevels: RiskLevel[] = ['low', 'medium', 'high', 'critical'];
const regionOptions = [
  'Amazonia',
  'Area Costeira',
  'Usina Solar Orbital',
  'Porto Estrategico',
  'Base Lunar Simulada',
];

const initialState: SimulationFormData = {
  occurrenceName: '',
  eventType: '',
  region: '',
  severity: '',
  description: '',
};

export default function SimulationScreen() {
  const { theme } = useAppTheme();
  const { createSimulationEvent } = useDefenseShield();
  const [formData, setFormData] = useState<SimulationFormData>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof SimulationFormData, string>>>({});

  function setField<K extends keyof SimulationFormData>(field: K, value: SimulationFormData[K]) {
    setFormData((currentData) => ({ ...currentData, [field]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
  }

  function validateForm() {
    const nextErrors: Partial<Record<keyof SimulationFormData, string>> = {};

    if (!formData.occurrenceName.trim()) {
      nextErrors.occurrenceName = 'O nome da ocorrencia e obrigatorio.';
    }
    if (!formData.eventType) {
      nextErrors.eventType = 'Selecione um tipo de risco.';
    }
    if (!formData.region) {
      nextErrors.region = 'Selecione uma regiao monitorada.';
    }
    if (!formData.severity) {
      nextErrors.severity = 'Selecione um nivel de severidade.';
    }
    if (!formData.description.trim()) {
      nextErrors.description = 'Descreva a ocorrencia simulada.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit() {
    if (!validateForm()) {
      return;
    }

    createSimulationEvent(formData);
    setFormData(initialState);
    router.push('/alerts');
  }

  return (
    <ScreenContainer
      eyebrow="Simulacao de missao"
      subtitle="Registre novas ocorrencias orbitais com validacao e persistencia local."
      title="Simulacao / Cadastro de evento">
      <View
        style={[
          styles.panel,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}>
        <FormField
          error={errors.occurrenceName}
          label="Nome da ocorrencia"
          onChangeText={(value) => setField('occurrenceName', value)}
          placeholder="Exemplo: Intrusao de poeira no corredor do habitat"
          value={formData.occurrenceName}
        />

        <Text style={[styles.sectionLabel, { color: theme.colors.text }]}>Tipo de risco</Text>
        <View style={styles.chips}>
          {eventTypes.map((type) => (
            <FilterChip
              key={type}
              label={type}
              onPress={() => setField('eventType', type)}
              selected={formData.eventType === type}
            />
          ))}
        </View>
        {errors.eventType ? (
          <Text style={[styles.error, { color: theme.colors.critical }]}>{errors.eventType}</Text>
        ) : null}

        <Text style={[styles.sectionLabel, { color: theme.colors.text }]}>Regiao</Text>
        <View style={styles.chips}>
          {regionOptions.map((region) => (
            <FilterChip
              key={region}
              label={region}
              onPress={() => setField('region', region)}
              selected={formData.region === region}
            />
          ))}
        </View>
        {errors.region ? (
          <Text style={[styles.error, { color: theme.colors.critical }]}>{errors.region}</Text>
        ) : null}

        <Text style={[styles.sectionLabel, { color: theme.colors.text }]}>Severidade</Text>
        <View style={styles.chips}>
          {severityLevels.map((level) => (
            <FilterChip
              key={level}
              label={getRiskToneLabel(level)}
              onPress={() => setField('severity', level)}
              selected={formData.severity === level}
            />
          ))}
        </View>
        {errors.severity ? (
          <Text style={[styles.error, { color: theme.colors.critical }]}>{errors.severity}</Text>
        ) : null}

        <FormField
          error={errors.description}
          label="Descricao"
          multiline
          onChangeText={(value) => setField('description', value)}
          placeholder="Explique o que o sistema detectou e por que isso importa."
          value={formData.description}
        />

        <Button label="Salvar evento simulado" onPress={handleSubmit} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: 16,
    borderRadius: 26,
    borderWidth: 1,
    padding: 18,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  error: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: -6,
  },
});
