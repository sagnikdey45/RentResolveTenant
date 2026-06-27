import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react-native';
import { MOCK_NOTIFICATIONS } from '@/data/mockData';

const TYPE_CONFIG = {
  info: { icon: Info, color: '#0284C7', bg: '#E0F2FE' },
  success: { icon: CheckCircle, color: '#059669', bg: '#D1FAE5' },
  warning: { icon: AlertTriangle, color: '#D97706', bg: '#FEF3C7' },
  error: { icon: AlertCircle, color: '#DC2626', bg: '#FEE2E2' },
};

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;

  return (
    <View className="flex-1 bg-slate-50">
      <View className="flex-row items-center justify-between px-5 pb-4 bg-white border-b border-slate-100" style={{ paddingTop: insets.top }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center"><ArrowLeft size={22} color="#0F172A" /></Pressable>
        <Text className="text-[17px] font-bold text-slate-900">Notifications</Text>
        <View className="w-10" />
      </View>
      {unreadCount > 0 && (
        <View className="bg-blue-50 py-2 px-5">
          <Text className="text-[11px] text-blue-600 font-semibold">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</Text>
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        {MOCK_NOTIFICATIONS.map(notif => {
          const config = TYPE_CONFIG[notif.type];
          const Icon = config.icon;
          return (
            <Pressable
              key={notif.id}
              className={`bg-white rounded-xl p-4 flex-row gap-3 mb-3 shadow-sm ${
                !notif.isRead ? 'border-l-[3px] border-l-blue-600' : ''
              }`}
              onPress={() => notif.linkedRequestId && router.push({ pathname: '/request-detail', params: { id: notif.linkedRequestId } })}
            >
              <View className="w-10 h-10 rounded-xl items-center justify-center" style={{ backgroundColor: config.bg }}>
                <Icon size={18} color={config.color} />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center gap-2">
                  <Text className="text-[13px] font-semibold text-slate-900 flex-1" numberOfLines={1}>{notif.title}</Text>
                  {!notif.isRead && <View className="w-2 h-2 rounded-full bg-blue-600" />}
                </View>
                <Text className="text-[11px] text-slate-600 leading-[18px] mt-1" numberOfLines={2}>{notif.message}</Text>
                <Text className="text-[11px] text-slate-400 mt-1.5">{notif.timestamp}</Text>
              </View>
            </Pressable>
          );
        })}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
