import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LayoutDashboard, ClipboardList, MessageSquare, Wallet, User } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  const bottomPadding = Math.max(insets.bottom, Platform.OS === 'android' ? 8 : 0);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.2,
          marginTop: -2,
          paddingBottom: Platform.OS === 'android' ? 4 : 0,
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === 'android' ? 4 : 2,
        },
        tabBarStyle: {
          backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 56 + bottomPadding,
          paddingBottom: bottomPadding,
          paddingTop: 4,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: isDark ? 0.3 : 0.06,
          shadowRadius: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <LayoutDashboard size={size} color={color} strokeWidth={1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'Requests',
          tabBarIcon: ({ color, size }) => (
            <ClipboardList size={size} color={color} strokeWidth={1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarBadge: 2,
          tabBarBadgeStyle: {
            backgroundColor: colors.danger,
            color: '#FFFFFF',
            fontSize: 10,
            fontWeight: '700',
            minWidth: 18,
            height: 18,
            lineHeight: Platform.OS === 'android' ? 16 : 18,
          },
          tabBarIcon: ({ color, size }) => (
            <MessageSquare size={size} color={color} strokeWidth={1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="rent"
        options={{
          title: 'Rent',
          tabBarIcon: ({ color, size }) => (
            <Wallet size={size} color={color} strokeWidth={1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} strokeWidth={1.8} />
          ),
        }}
      />
    </Tabs>
  );
}
