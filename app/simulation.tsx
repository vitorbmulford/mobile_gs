import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { FilterChip } from '@/components/filter-chip';
import { FormField } from '@/components/form-field';
import { ScreenContainer } from '@/components/screen-container';
import { useDefenseShield } from '@/contexts/defense-shield-context';
import { useAppTheme } from '@/contexts/theme-context';
import type { AlertType, RiskLevel, SimulationFormData } from '@/types/defense-shield';

const eventTypes: AlertType[] = ['Wildfire', 'Flood', 'Operational Failure', 'Climate Anomaly'];
const severityLevels: RiskLevel[] = ['low', 'medium', 'high', 'critical'];
const regionOptions = [
  'Amazon Rainforest',
  'Coastal Defense Zone',
  'Orbital Solar Plant',
  'Strategic Port',
  'Simulated Lunar Base',
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
      nextErrors.occurrenceName = 'Occurrence name is required.';
    }
    if (!formData.eventType) {
      nextErrors.eventType = 'Select a risk type.';
    }
    if (!formData.region) {
      nextErrors.region = 'Select a monitored region.';
    }
    if (!formData.severity) {
      nextErrors.severity = 'Select a severity level.';
    }
    if (!formData.description.trim()) {
      nextErrors.description = 'Describe the simulated event.';
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
      eyebrow="Mission simulation"
      subtitle="Register new orbital incidents with validation and persist them locally."
      title="Simulation / Event registration">
      <View
        style={[
          styles.panel,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}>
        <FormField
          error={errors.occurrenceName}
          label="Occurrence name"
          onChangeText={(value) => setField('occurrenceName', value)}
          placeholder="Example: Dust intrusion near habitat corridor"
          value={formData.occurrenceName}
        />

        <Text style={[styles.sectionLabel, { color: theme.colors.text }]}>Risk type</Text>
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

        <Text style={[styles.sectionLabel, { color: theme.colors.text }]}>Region</Text>
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

        <Text style={[styles.sectionLabel, { color: theme.colors.text }]}>Severity</Text>
        <View style={styles.chips}>
          {severityLevels.map((level) => (
            <FilterChip
              key={level}
              label={level}
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
          label="Description"
          multiline
          onChangeText={(value) => setField('description', value)}
          placeholder="Explain what the system detected and why the event matters."
          value={formData.description}
        />

        <Button label="Save simulation event" onPress={handleSubmit} />
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
