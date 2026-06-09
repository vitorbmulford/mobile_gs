import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { getNavigationTheme } from '@/constants/theme';
import { DefenseShieldProvider } from '@/contexts/defense-shield-context';
import { ThemeModeProvider, useAppTheme } from '@/contexts/theme-context';

function RootNavigator() {
  const { colorScheme, theme } = useAppTheme();

  return (
    <ThemeProvider value={getNavigationTheme(theme)}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
          animation: 'fade',
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="environmental-dashboard" />
        <Stack.Screen name="alerts" />
        <Stack.Screen name="monitoring" />
        <Stack.Screen name="simulation" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="cybersecurity" />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeModeProvider>
      <DefenseShieldProvider>
        <RootNavigator />
      </DefenseShieldProvider>
    </ThemeModeProvider>
  );
}
