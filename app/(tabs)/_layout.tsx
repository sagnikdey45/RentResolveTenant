import { Tabs } from 'expo-router';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LayoutDashboard, ClipboardList, MessageSquare, Wallet, User } from 'lucide-react-native';
import { Colors } from '@/constants/theme';

const TAB_BAR_BASE_HEIGHT = Platform.OS === 'android' ? 72 : 64;
const ICON_SIZE = Platform.OS === 'android' ? 26 : 24;
const LABEL_SIZE = Platform.OS === 'android' ? 12 : 11;

function TabIcon({
  icon: Icon,
  color,
  label,
  focused,
}: {
  icon: React.ElementType;
  color: string;
  label: string;
  focused: boolean;
}) {
  return (
    <View style={styles.tabItem}>
      <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
        <Icon size={ICON_SIZE} color={focused ? Colors.primary : color} strokeWidth={focused ? 2.5 : 1.8} />
      </View>
      <Text
        style={[
          styles.label,
          { color: focused ? Colors.primary : Colors.textMuted },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = TAB_BAR_BASE_HEIGHT + insets.bottom;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: '#E2E8F0',
          borderTopWidth: 1,
          height: tabBarHeight,
          paddingBottom: insets.bottom > 0 ? insets.bottom : Platform.OS === 'android' ? 10 : 8,
          paddingTop: 0,
          paddingHorizontal: 8,
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={LayoutDashboard} color={color} label="Dashboard" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={ClipboardList} color={color} label="Requests" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarBadge: 2,
          tabBarBadgeStyle: {
            backgroundColor: Colors.danger,
            fontSize: 10,
            minWidth: 17,
            height: 17,
            lineHeight: Platform.OS === 'android' ? 15 : 17,
            top: Platform.OS === 'android' ? 6 : 4,
            right: Platform.OS === 'android' ? 14 : 10,
          },
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={MessageSquare} color={color} label="Messages" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="rent"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={Wallet} color={color} label="Rent" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={User} color={color} label="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Platform.OS === 'android' ? 10 : 8,
    gap: Platform.OS === 'android' ? 5 : 4,
    minWidth: 56,
  },
  iconWrap: {
    width: Platform.OS === 'android' ? 44 : 40,
    height: Platform.OS === 'android' ? 32 : 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: '#DBEAFE',
  },
  label: {
    fontSize: LABEL_SIZE,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
