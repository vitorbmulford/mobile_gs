import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

import type { RiskLevel, ThemeMode } from '@/types/defense-shield';

export interface AppTheme {
  mode: ThemeMode;
  isDark: boolean;
  colors: {
    background: string;
    backgroundAlt: string;
    surface: string;
    surfaceStrong: string;
    surfaceMuted: string;
    border: string;
    text: string;
    textMuted: string;
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    critical: string;
    chip: string;
    overlay: string;
    white: string;
    shadow: string;
  };
}

const shared = {
  primary: '#59D3FF',
  secondary: '#84F7D3',
  success: '#4ADE80',
  warning: '#FACC15',
  danger: '#FB923C',
  critical: '#F87171',
  white: '#F8FAFC',
};

export const appThemes: Record<ThemeMode, AppTheme> = {
  dark: {
    mode: 'dark',
    isDark: true,
    colors: {
      background: '#05101C',
      backgroundAlt: '#091A2D',
      surface: '#0D1E31',
      surfaceStrong: '#132844',
      surfaceMuted: '#173252',
      border: 'rgba(116, 183, 255, 0.18)',
      text: '#E6F1FF',
      textMuted: '#93A9C9',
      primary: shared.primary,
      secondary: shared.secondary,
      success: shared.success,
      warning: shared.warning,
      danger: shared.danger,
      critical: shared.critical,
      chip: 'rgba(89, 211, 255, 0.12)',
      overlay: 'rgba(4, 10, 18, 0.72)',
      white: shared.white,
      shadow: 'rgba(2, 8, 20, 0.55)',
    },
  },
  light: {
    mode: 'light',
    isDark: false,
    colors: {
      background: '#EEF6FF',
      backgroundAlt: '#D8E8FF',
      surface: '#FFFFFF',
      surfaceStrong: '#F4F9FF',
      surfaceMuted: '#E6F0FF',
      border: 'rgba(38, 87, 141, 0.12)',
      text: '#11253D',
      textMuted: '#5D6F87',
      primary: '#0077B6',
      secondary: '#0EA5A8',
      success: '#1F9D55',
      warning: '#C68B00',
      danger: '#D97706',
      critical: '#DC2626',
      chip: 'rgba(0, 119, 182, 0.1)',
      overlay: 'rgba(238, 246, 255, 0.74)',
      white: '#FFFFFF',
      shadow: 'rgba(17, 37, 61, 0.08)',
    },
  },
};

export const Colors = {
  light: {
    text: appThemes.light.colors.text,
    background: appThemes.light.colors.background,
    tint: appThemes.light.colors.primary,
    icon: appThemes.light.colors.textMuted,
    tabIconDefault: appThemes.light.colors.textMuted,
    tabIconSelected: appThemes.light.colors.primary,
  },
  dark: {
    text: appThemes.dark.colors.text,
    background: appThemes.dark.colors.background,
    tint: appThemes.dark.colors.primary,
    icon: appThemes.dark.colors.textMuted,
    tabIconDefault: appThemes.dark.colors.textMuted,
    tabIconSelected: appThemes.dark.colors.primary,
  },
} as const;

export function getNavigationTheme(theme: AppTheme): Theme {
  const baseTheme = theme.isDark ? DarkTheme : DefaultTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.critical,
    },
  };
}

export function getRiskToneColor(level: RiskLevel, theme: AppTheme) {
  switch (level) {
    case 'low':
      return theme.colors.success;
    case 'medium':
      return theme.colors.warning;
    case 'high':
      return theme.colors.danger;
    case 'critical':
      return theme.colors.critical;
    default:
      return theme.colors.primary;
  }
}

export function getRiskToneLabel(level: RiskLevel) {
  switch (level) {
    case 'low':
      return 'Baixo';
    case 'medium':
      return 'Medio';
    case 'high':
      return 'Alto';
    case 'critical':
      return 'Critico';
    default:
      return level;
  }
}
