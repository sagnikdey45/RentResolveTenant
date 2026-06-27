import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Plus, ClipboardList, Wallet, AlertTriangle, Bell,
  Clock, CheckCircle, AlertCircle, BarChart3, Megaphone,
} from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { MOCK_REQUESTS, MOCK_ANNOUNCEMENTS, MOCK_ACTIVITY, MOCK_PROPERTY, MOCK_RENT_PAYMENTS } from '@/data/mockData';
import { StatCard } from '@/components/StatCard';
import { SectionHeader } from '@/components/SectionHeader';

export default function DashboardScreen() {
  const { user } = useAuth();
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
      className="flex-1 bg-slate-50 px-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: insets.top + 16 }}
    >
      <View className="flex-row justify-between items-start mb-5">
        <View>
          <Text className="text-[15px] text-slate-400">Good morning,</Text>
          <Text className="text-2xl font-extrabold text-slate-900 mt-0.5">{user?.name || 'Tenant'}</Text>
          <Text className="text-[13px] text-blue-600 font-medium mt-1">
            {MOCK_PROPERTY.name} - {MOCK_PROPERTY.unit}
          </Text>
        </View>
        <Pressable
          className="w-11 h-11 rounded-full bg-white items-center justify-center shadow-sm"
          onPress={() => router.push('/notifications')}
        >
          <Bell size={22} color="#0F172A" />
          <View className="absolute top-2.5 right-3 w-2 h-2 rounded-full bg-red-500 border-[1.5px] border-white" />
        </Pressable>
      </View>

      {emergencyRequests.length > 0 && (
        <Pressable
          className="bg-red-50 rounded-xl p-4 flex-row items-center gap-3 mb-4 border border-red-200"
          onPress={() => router.push({ pathname: '/request-detail', params: { id: emergencyRequests[0].id } })}
        >
          <AlertTriangle size={20} color="#DC2626" />
          <View className="flex-1">
            <Text className="text-[13px] font-bold text-red-600">
              {emergencyRequests.length} Emergency {emergencyRequests.length === 1 ? 'Issue' : 'Issues'}
            </Text>
            <Text className="text-[11px] text-red-600 mt-0.5">{emergencyRequests[0].title}</Text>
          </View>
        </Pressable>
      )}

      {nextRent && (
        <View className="bg-blue-600 rounded-xl p-5 flex-row items-center justify-between mb-5">
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
        <QuickAction icon={<Plus size={20} color="#2563EB" />} label="Raise Request" onPress={() => router.push('/create-request')} />
        <QuickAction icon={<ClipboardList size={20} color="#059669" />} label="View Requests" onPress={() => router.push('/(tabs)/requests')} />
        <QuickAction icon={<Wallet size={20} color="#D97706" />} label="Rent Overview" onPress={() => router.push('/(tabs)/rent')} />
        <QuickAction icon={<AlertTriangle size={20} color="#DC2626" />} label="Raise Dispute" onPress={() => router.push('/dispute')} />
      </View>

      <SectionHeader title="Recent Activity" actionLabel="View All" onAction={() => router.push('/activity-history')} />
      {recentActivity.map(item => (
        <View key={item.id} className="flex-row gap-3 mb-4">
          <View className="w-2 h-2 rounded-full bg-blue-600 mt-1.5" />
          <View className="flex-1">
            <Text className="text-[13px] font-semibold text-slate-900">{item.title}</Text>
            <Text className="text-[11px] text-slate-600 mt-0.5">{item.description}</Text>
            <Text className="text-[11px] text-slate-400 mt-1">{item.timestamp}</Text>
          </View>
        </View>
      ))}

      <SectionHeader title="Announcements" actionLabel="View All" onAction={() => router.push('/announcements')} />
      {latestAnnouncements.map(ann => (
        <View key={ann.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
          <View className="flex-row items-center gap-2 mb-2">
            <Megaphone size={16} color={ann.priority === 'High' ? '#DC2626' : '#D97706'} />
            <Text className="text-[13px] font-semibold text-slate-900 flex-1">{ann.title}</Text>
          </View>
          <Text className="text-[11px] text-slate-600 leading-[18px]" numberOfLines={2}>{ann.message}</Text>
          <Text className="text-[11px] text-slate-400 mt-2">{ann.date} - {ann.postedBy}</Text>
        </View>
      ))}

      <View className="h-8" />
    </ScrollView>
  );
}

function QuickAction({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress: () => void }) {
  return (
    <Pressable className="bg-white rounded-xl p-4 items-center w-[48%] shadow-sm active:opacity-90" onPress={onPress}>
      <View className="w-11 h-11 rounded-xl bg-slate-50 items-center justify-center mb-2">{icon}</View>
      <Text className="text-[13px] font-semibold text-slate-900">{label}</Text>
    </Pressable>
  );
}
