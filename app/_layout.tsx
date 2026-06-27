import '../global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

function AppStack() {
  const { isDark, colors } = useTheme();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="create-request" />
        <Stack.Screen name="request-detail" />
        <Stack.Screen name="reopen-request" />
        <Stack.Screen name="feedback" />
        <Stack.Screen name="dispute" />
        <Stack.Screen name="visit-scheduling" />
        <Stack.Screen name="conversation" />
        <Stack.Screen name="lease-documents" />
        <Stack.Screen name="property-info" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="announcements" />
        <Stack.Screen name="activity-history" />
        <Stack.Screen name="help-support" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppStack />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
