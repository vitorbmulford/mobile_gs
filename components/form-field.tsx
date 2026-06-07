import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';

interface FormFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
  error?: string;
}

export function FormField({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  error,
}: FormFieldProps) {
  const { theme } = useAppTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
      <TextInput
        multiline={multiline}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        style={[
          styles.input,
          multiline && styles.multiline,
          {
            backgroundColor: theme.colors.surface,
            borderColor: error ? theme.colors.critical : theme.colors.border,
            color: theme.colors.text,
          },
        ]}
        value={value}
      />
      {error ? <Text style={[styles.error, { color: theme.colors.critical }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    borderRadius: 18,
    borderWidth: 1,
    fontSize: 15,
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  error: {
    fontSize: 12,
    fontWeight: '600',
  },
});
