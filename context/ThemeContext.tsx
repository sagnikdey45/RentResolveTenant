import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Platform, useColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceSecondary: string;
  border: string;
  borderLight: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  accent: string;
  accentLight: string;
  warning: string;
  warningLight: string;
  danger: string;
  dangerLight: string;
  info: string;
  infoLight: string;
  success: string;
  successLight: string;
  cardShadow: string;
  headerBg: string;
  headerBorder: string;
  inputBg: string;
  inputBorder: string;
  tabBarBg: string;
  tabBarLabel: string;
  tabBarActiveLabel: string;
  tabBarActiveBg: string;
}

const lightColors: ThemeColors = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSecondary: '#F1F5F9',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#DBEAFE',
  accent: '#059669',
  accentLight: '#D1FAE5',
  warning: '#D97706',
  warningLight: '#FEF3C7',
  danger: '#DC2626',
  dangerLight: '#FEE2E2',
  info: '#0284C7',
  infoLight: '#E0F2FE',
  success: '#16A34A',
  successLight: '#DCFCE7',
  cardShadow: 'rgba(0,0,0,0.04)',
  headerBg: '#FFFFFF',
  headerBorder: '#F1F5F9',
  inputBg: '#FFFFFF',
  inputBorder: '#E2E8F0',
  tabBarBg: '#0F172A',
  tabBarLabel: '#64748B',
  tabBarActiveLabel: '#FFFFFF',
  tabBarActiveBg: '#2563EB',
};

const darkColors: ThemeColors = {
  background: '#0F172A',
  surface: '#1E293B',
  surfaceSecondary: '#334155',
  border: '#334155',
  borderLight: '#1E293B',
  textPrimary: '#F1F5F9',
  textSecondary: '#CBD5E1',
  textMuted: '#64748B',
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  primaryLight: '#1E3A5F',
  accent: '#10B981',
  accentLight: '#064E3B',
  warning: '#F59E0B',
  warningLight: '#78350F',
  danger: '#EF4444',
  dangerLight: '#7F1D1D',
  info: '#38BDF8',
  infoLight: '#0C4A6E',
  success: '#22C55E',
  successLight: '#14532D',
  cardShadow: 'rgba(0,0,0,0.3)',
  headerBg: '#1E293B',
  headerBorder: '#334155',
  inputBg: '#334155',
  inputBorder: '#475569',
  tabBarBg: '#1E293B',
  tabBarLabel: '#64748B',
  tabBarActiveLabel: '#FFFFFF',
  tabBarActiveBg: '#3B82F6',
};

interface ThemeContextType {
  colors: ThemeColors;
  isDark: boolean;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = 'rentresolve_theme';

const ThemeContext = createContext<ThemeContextType>({
  colors: lightColors,
  isDark: false,
  mode: 'system',
  setMode: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');

  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark' || saved === 'system') {
          setModeState(saved);
        }
      } catch {}
    }
  }, []);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    if (Platform.OS === 'web') {
      try { localStorage.setItem(STORAGE_KEY, newMode); } catch {}
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : mode === 'light' ? 'dark' : (systemScheme === 'dark' ? 'light' : 'dark'));
  }, [mode, systemScheme, setMode]);

  const isDark = mode === 'dark' || (mode === 'system' && systemScheme === 'dark');
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ colors, isDark, mode, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
