import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Plus, ClipboardList, Wallet, AlertTriangle, Bell,
  Clock, CheckCircle, AlertCircle, BarChart3, Megaphone,
} from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_REQUESTS, MOCK_ANNOUNCEMENTS, MOCK_ACTIVITY, MOCK_PROPERTY, MOCK_RENT_PAYMENTS } from '@/data/mockData';
import { StatCard } from '@/components/StatCard';
import { SectionHeader } from '@/components/SectionHeader';

export default function DashboardScreen() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const total = MOCK_REQUESTS.length;
  const open = MOCK_REQUESTS.filter(r => ['Submitted', 'Under Review'].includes(r.status)).length;
  const inProgress = MOCK_REQUESTS.filter(r => ['Approved', 'Assigned', 'In Progress'].includes(r.status)).length;
  const resolved = MOCK_REQUESTS.filter(r => ['Resolved', 'Closed'].includes(r.status)).length;
  const nextRent = MOCK_RENT_PAYMENTS.find(r => r.status === 'Pending');
  const emergencyRequests = MOCK_REQUESTS.filter(r => r.isEmergency && !['Resolved', 'Closed'].includes(r.status));
  const recentActivity = MOCK_ACTIVITY.slice(0, 3);
  const latestAnnouncements = MOCK_ANNOUNCEMENTS.slice(0, 2);

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      className="flex-1 px-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 120 }}
    >
      <View className="flex-row justify-between items-start mb-5">
        <View>
          <Text style={{ color: colors.textMuted }} className="text-[15px]">Good morning,</Text>
          <Text style={{ color: colors.textPrimary }} className="text-2xl font-extrabold mt-0.5">{user?.name || 'Tenant'}</Text>
          <Text style={{ color: colors.primary }} className="text-[13px] font-medium mt-1">
            {MOCK_PROPERTY.name} - {MOCK_PROPERTY.unit}
          </Text>
        </View>
        <Pressable
          style={{ backgroundColor: colors.surface }}
          className="w-11 h-11 rounded-full items-center justify-center"
          onPress={() => router.push('/notifications')}
        >
          <Bell size={22} color={colors.textPrimary} />
          <View style={{ borderColor: colors.surface }} className="absolute top-2.5 right-3 w-2 h-2 rounded-full bg-red-500 border-[1.5px]" />
        </Pressable>
      </View>

      {emergencyRequests.length > 0 && (
        <Pressable
          style={{ backgroundColor: colors.dangerLight, borderColor: colors.danger + '40' }}
          className="rounded-xl p-4 flex-row items-center gap-3 mb-4 border"
          onPress={() => router.push({ pathname: '/request-detail', params: { id: emergencyRequests[0].id } })}
        >
          <AlertTriangle size={20} color={colors.danger} />
          <View className="flex-1">
            <Text style={{ color: colors.danger }} className="text-[13px] font-bold">
              {emergencyRequests.length} Emergency {emergencyRequests.length === 1 ? 'Issue' : 'Issues'}
            </Text>
            <Text style={{ color: colors.danger }} className="text-[11px] mt-0.5">{emergencyRequests[0].title}</Text>
          </View>
        </Pressable>
      )}

      {nextRent && (
        <View style={{ backgroundColor: colors.primary }} className="rounded-xl p-5 flex-row items-center justify-between mb-5">
          <View>
            <Text className="text-[11px] text-white/70 font-medium">Rent Due</Text>
            <Text className="text-2xl font-extrabold text-white mt-1">
              Rs. {nextRent.amount.toLocaleString()}
            </Text>
            <Text className="text-[11px] text-white/80 mt-1">Due by {nextRent.dueDate}</Text>
          </View>
          <Pressable
            className="bg-white/20 px-5 py-2.5 rounded-lg"
            onPress={() => router.push('/(tabs)/rent')}
          >
            <Text className="text-white font-semibold text-[13px]">View</Text>
          </Pressable>
        </View>
      )}

      <View className="flex-row flex-wrap justify-between">
        <StatCard label="Total Requests" value={total} color="#2563EB" icon={<BarChart3 size={18} color="#2563EB" />} />
        <StatCard label="Open Issues" value={open} color="#0284C7" icon={<AlertCircle size={18} color="#0284C7" />} />
        <StatCard label="In Progress" value={inProgress} color="#D97706" icon={<Clock size={18} color="#D97706" />} />
        <StatCard label="Resolved" value={resolved} color="#059669" icon={<CheckCircle size={18} color="#059669" />} />
      </View>

      <SectionHeader title="Quick Actions" />
      <View className="flex-row flex-wrap gap-3">
        <QuickAction colors={colors} icon={<Plus size={20} color={colors.primary} />} label="Raise Request" onPress={() => router.push('/create-request')} />
        <QuickAction colors={colors} icon={<ClipboardList size={20} color={colors.accent} />} label="View Requests" onPress={() => router.push('/(tabs)/requests')} />
        <QuickAction colors={colors} icon={<Wallet size={20} color={colors.warning} />} label="Rent Overview" onPress={() => router.push('/(tabs)/rent')} />
        <QuickAction colors={colors} icon={<AlertTriangle size={20} color={colors.danger} />} label="Raise Dispute" onPress={() => router.push('/dispute')} />
      </View>

      <SectionHeader title="Recent Activity" actionLabel="View All" onAction={() => router.push('/activity-history')} />
      {recentActivity.map(item => (
        <View key={item.id} className="flex-row gap-3 mb-4">
          <View style={{ backgroundColor: colors.primary }} className="w-2 h-2 rounded-full mt-1.5" />
          <View className="flex-1">
            <Text style={{ color: colors.textPrimary }} className="text-[13px] font-semibold">{item.title}</Text>
            <Text style={{ color: colors.textSecondary }} className="text-[11px] mt-0.5">{item.description}</Text>
            <Text style={{ color: colors.textMuted }} className="text-[11px] mt-1">{item.timestamp}</Text>
          </View>
        </View>
      ))}

      <SectionHeader title="Announcements" actionLabel="View All" onAction={() => router.push('/announcements')} />
      {latestAnnouncements.map(ann => (
        <View key={ann.id} style={{ backgroundColor: colors.surface }} className="rounded-xl p-4 mb-3">
          <View className="flex-row items-center gap-2 mb-2">
            <Megaphone size={16} color={ann.priority === 'High' ? colors.danger : colors.warning} />
            <Text style={{ color: colors.textPrimary }} className="text-[13px] font-semibold flex-1">{ann.title}</Text>
          </View>
          <Text style={{ color: colors.textSecondary }} className="text-[11px] leading-[18px]" numberOfLines={2}>{ann.message}</Text>
          <Text style={{ color: colors.textMuted }} className="text-[11px] mt-2">{ann.date} - {ann.postedBy}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function QuickAction({ colors, icon, label, onPress }: { colors: any; icon: React.ReactNode; label: string; onPress: () => void }) {
  return (
    <Pressable
      style={{ backgroundColor: colors.surface }}
      className="rounded-xl p-4 items-center w-[48%] active:opacity-90"
      onPress={onPress}
    >
      <View style={{ backgroundColor: colors.surfaceSecondary }} className="w-11 h-11 rounded-xl items-center justify-center mb-2">{icon}</View>
      <Text style={{ color: colors.textPrimary }} className="text-[13px] font-semibold">{label}</Text>
    </Pressable>
  );
}
