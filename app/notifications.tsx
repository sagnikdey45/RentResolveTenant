import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
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
  const { colors } = useTheme();
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-row items-center justify-between px-5 pb-4 border-b" style={{ backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder, paddingTop: insets.top }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center"><ArrowLeft size={22} color={colors.textPrimary} /></Pressable>
        <Text className="text-[17px] font-bold" style={{ color: colors.textPrimary }}>Notifications</Text>
        <View className="w-10" />
      </View>
      {unreadCount > 0 && (
        <View className="py-2 px-5" style={{ backgroundColor: colors.primaryLight }}>
          <Text className="text-[11px] font-semibold" style={{ color: colors.primary }}>{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</Text>
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        {MOCK_NOTIFICATIONS.map(notif => {
          const config = TYPE_CONFIG[notif.type];
          const Icon = config.icon;
          return (
            <Pressable
              key={notif.id}
              className="rounded-xl p-4 flex-row gap-3 mb-3 shadow-sm"
              style={{
                backgroundColor: colors.surface,
                borderLeftWidth: !notif.isRead ? 3 : 0,
                borderLeftColor: !notif.isRead ? colors.primary : 'transparent',
              }}
              onPress={() => notif.linkedRequestId && router.push({ pathname: '/request-detail', params: { id: notif.linkedRequestId } })}
            >
              <View className="w-10 h-10 rounded-xl items-center justify-center" style={{ backgroundColor: config.bg }}>
                <Icon size={18} color={config.color} />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center gap-2">
                  <Text className="text-[13px] font-semibold flex-1" numberOfLines={1} style={{ color: colors.textPrimary }}>{notif.title}</Text>
                  {!notif.isRead && <View className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }} />}
                </View>
                <Text className="text-[11px] leading-[18px] mt-1" numberOfLines={2} style={{ color: colors.textSecondary }}>{notif.message}</Text>
                <Text className="text-[11px] mt-1.5" style={{ color: colors.textMuted }}>{notif.timestamp}</Text>
              </View>
            </Pressable>
          );
        })}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
