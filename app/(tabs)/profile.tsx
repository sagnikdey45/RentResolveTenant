import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Mail, Phone, Home, ShieldCheck, LogOut,
  FileText, Building2, Bell, Megaphone, History, HelpCircle, ChevronRight,
} from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
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
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-50 px-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 120 }}
    >
      <View className="mb-5">
        <Text className="text-2xl font-extrabold text-slate-900">Profile</Text>
      </View>

      <View className="bg-white rounded-2xl p-6 items-center mb-4 shadow-sm">
        <View className="w-[72px] h-[72px] rounded-full bg-blue-50 items-center justify-center mb-3">
          <Text className="text-2xl font-bold text-blue-600">
            {user?.name?.split(' ').map(n => n[0]).join('') || 'T'}
          </Text>
        </View>
        <Text className="text-xl font-bold text-slate-900">{user?.name}</Text>
        <Text className="text-[13px] text-slate-400 mt-1">{user?.email}</Text>
        <View className="flex-row items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full mt-3">
          <ShieldCheck size={14} color="#059669" />
          <Text className="text-[11px] font-semibold text-emerald-700">Verified Tenant</Text>
        </View>
      </View>

      <View className="bg-white rounded-xl p-4 mb-4 gap-4">
        <InfoRow icon={<Mail size={18} color="#2563EB" />} label="Email" value={user?.email || ''} />
        <InfoRow icon={<Phone size={18} color="#2563EB" />} label="Phone" value={user?.phone || ''} />
        <InfoRow icon={<Home size={18} color="#2563EB" />} label="Property" value={`${MOCK_PROPERTY.name} - ${MOCK_PROPERTY.unit}`} />
      </View>

      <View className="bg-white rounded-xl overflow-hidden mb-5">
        {MENU_ITEMS.map((item, i) => (
          <Pressable
            key={item.label}
            className={`flex-row items-center gap-3 px-4 py-4 ${
              i < MENU_ITEMS.length - 1 ? 'border-b border-slate-100' : ''
            }`}
            onPress={() => router.push(item.route as any)}
          >
            <item.icon size={20} color="#475569" />
            <Text className="flex-1 text-[15px] text-slate-900 font-medium">{item.label}</Text>
            <ChevronRight size={16} color="#94A3B8" />
          </Pressable>
        ))}
      </View>

      <Pressable
        className="flex-row items-center justify-center gap-2 bg-red-50 rounded-xl py-4"
        onPress={handleLogout}
      >
        <LogOut size={18} color="#DC2626" />
        <Text className="text-[15px] font-semibold text-red-600">Sign Out</Text>
      </Pressable>

      <View className="h-12" />
    </ScrollView>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <View className="flex-row items-center gap-3">
      {icon}
      <View className="flex-1">
        <Text className="text-[11px] text-slate-400">{label}</Text>
        <Text className="text-[13px] font-medium text-slate-900 mt-0.5">{value}</Text>
      </View>
    </View>
  );
}
