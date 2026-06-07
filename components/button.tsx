import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  disabled?: boolean;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  style,
  disabled = false,
}: ButtonProps) {
  const { theme } = useAppTheme();

  const backgroundColor =
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'secondary'
        ? theme.colors.surfaceMuted
        : variant === 'danger'
          ? theme.colors.critical
          : 'transparent';

  const textColor =
    variant === 'primary' || variant === 'danger' ? theme.colors.background : theme.colors.text;

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        {
          backgroundColor,
          borderColor: variant === 'ghost' ? theme.colors.border : 'transparent',
          opacity: disabled ? 0.45 : pressed ? 0.88 : 1,
        },
      ]}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 48,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
