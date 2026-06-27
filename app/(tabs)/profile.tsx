import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Mail, Phone, Home, ShieldCheck, LogOut,
  FileText, Building2, Bell, Megaphone, History, HelpCircle, ChevronRight,
  Sun, Moon,
} from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_PROPERTY } from '@/data/mockData';

const MENU_ITEMS = [
  { icon: Building2, label: 'Property Info', route: '/property-info' },
  { icon: FileText, label: 'Lease Documents', route: '/lease-documents' },
  { icon: Bell, label: 'Notifications', route: '/notifications' },
  { icon: Megaphone, label: 'Announcements', route: '/announcements' },
  { icon: History, label: 'Activity History', route: '/activity-history' },
  { icon: HelpCircle, label: 'Help & Support', route: '/help-support' },
] as const;

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { colors, isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      className="flex-1 px-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 24 }}
    >
      <View className="mb-5">
        <Text style={{ color: colors.textPrimary }} className="text-2xl font-extrabold">Profile</Text>
      </View>

      <View style={{ backgroundColor: colors.surface }} className="rounded-2xl p-6 items-center mb-4">
        <View style={{ backgroundColor: colors.primaryLight }} className="w-[72px] h-[72px] rounded-full items-center justify-center mb-3">
          <Text style={{ color: colors.primary }} className="text-2xl font-bold">
            {user?.name?.split(' ').map(n => n[0]).join('') || 'T'}
          </Text>
        </View>
        <Text style={{ color: colors.textPrimary }} className="text-xl font-bold">{user?.name}</Text>
        <Text style={{ color: colors.textMuted }} className="text-[13px] mt-1">{user?.email}</Text>
        <View style={{ backgroundColor: colors.successLight }} className="flex-row items-center gap-1 px-3 py-1 rounded-full mt-3">
          <ShieldCheck size={14} color={colors.success} />
          <Text style={{ color: colors.success }} className="text-[11px] font-semibold">Verified Tenant</Text>
        </View>
      </View>

      <View style={{ backgroundColor: colors.surface }} className="rounded-xl p-4 mb-4 gap-4">
        <InfoRow colors={colors} icon={<Mail size={18} color={colors.primary} />} label="Email" value={user?.email || ''} />
        <InfoRow colors={colors} icon={<Phone size={18} color={colors.primary} />} label="Phone" value={user?.phone || ''} />
        <InfoRow colors={colors} icon={<Home size={18} color={colors.primary} />} label="Property" value={`${MOCK_PROPERTY.name} - ${MOCK_PROPERTY.unit}`} />
      </View>

      <Pressable
        style={{ backgroundColor: colors.surface }}
        className="rounded-xl flex-row items-center justify-between px-4 py-4 mb-4"
        onPress={toggleTheme}
      >
        <View className="flex-row items-center gap-3">
          {isDark ? <Moon size={20} color={colors.primary} /> : <Sun size={20} color={colors.warning} />}
          <Text style={{ color: colors.textPrimary }} className="text-[15px] font-medium">
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </Text>
        </View>
        <View
          style={{ backgroundColor: isDark ? colors.primary : colors.surfaceSecondary }}
          className="w-12 h-7 rounded-full justify-center px-0.5"
        >
          <View
            style={{
              backgroundColor: '#FFFFFF',
              alignSelf: isDark ? 'flex-end' : 'flex-start',
            }}
            className="w-6 h-6 rounded-full"
          />
        </View>
      </Pressable>

      <View style={{ backgroundColor: colors.surface }} className="rounded-xl overflow-hidden mb-5">
        {MENU_ITEMS.map((item, i) => (
          <Pressable
            key={item.label}
            style={i < MENU_ITEMS.length - 1 ? { borderBottomWidth: 1, borderBottomColor: colors.borderLight } : undefined}
            className="flex-row items-center gap-3 px-4 py-4"
            onPress={() => router.push(item.route as any)}
          >
            <item.icon size={20} color={colors.textSecondary} />
            <Text style={{ color: colors.textPrimary }} className="flex-1 text-[15px] font-medium">{item.label}</Text>
            <ChevronRight size={16} color={colors.textMuted} />
          </Pressable>
        ))}
      </View>

      <Pressable
        style={{ backgroundColor: colors.dangerLight }}
        className="flex-row items-center justify-center gap-2 rounded-xl py-4"
        onPress={handleLogout}
      >
        <LogOut size={18} color={colors.danger} />
        <Text style={{ color: colors.danger }} className="text-[15px] font-semibold">Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
}

function InfoRow({ colors, icon, label, value }: { colors: any; icon: React.ReactNode; label: string; value: string }) {
  return (
    <View className="flex-row items-center gap-3">
      {icon}
      <View className="flex-1">
        <Text style={{ color: colors.textMuted }} className="text-[11px]">{label}</Text>
        <Text style={{ color: colors.textPrimary }} className="text-[13px] font-medium mt-0.5">{value}</Text>
      </View>
    </View>
  );
}
