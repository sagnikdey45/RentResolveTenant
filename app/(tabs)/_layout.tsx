import { Tabs } from 'expo-router';
import { Platform, View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, ClipboardList, MessageSquare, Wallet, User } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

const TABS = [
  { name: 'index', label: 'Dashboard', Icon: LayoutDashboard },
  { name: 'requests', label: 'Requests', Icon: ClipboardList },
  { name: 'messages', label: 'Messages', Icon: MessageSquare, badge: 2 },
  { name: 'rent', label: 'Rent', Icon: Wallet },
  { name: 'profile', label: 'Profile', Icon: User },
];

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom > 0 ? insets.bottom : 12 }]}>
      <View style={[styles.bar, { backgroundColor: colors.tabBarBg }]}>
        {state.routes.map((route, index) => {
          const tab = TABS[index];
          if (!tab) return null;
          const focused = state.index === index;
          const { Icon, label, badge } = tab;

          return (
            <Pressable
              key={route.key}
              onPress={() => {
                const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
              }}
              android_ripple={null}
              style={styles.tabBtn}
            >
              <View style={[styles.iconContainer, focused && { backgroundColor: colors.tabBarActiveBg }]}>
                <Icon
                  size={22}
                  color={focused ? '#FFFFFF' : colors.tabBarLabel}
                  strokeWidth={focused ? 2.4 : 1.8}
                />
                {badge && !focused && (
                  <View style={[styles.badge, { borderColor: colors.tabBarBg }]}>
                    <Text style={styles.badgeText}>{badge}</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.label, { color: focused ? colors.tabBarActiveLabel : colors.tabBarLabel }]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="requests" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="rent" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingTop: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bar: {
    flexDirection: 'row',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 16,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: Platform.OS === 'android' ? 4 : 2,
  },
  iconContainer: {
    width: 44,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    borderRadius: 999,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
    lineHeight: 12,
  },
});
