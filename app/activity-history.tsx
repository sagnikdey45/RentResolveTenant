import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft, Plus, RefreshCw, MessageSquare, UserCheck, Calendar,
  Wallet, CheckCircle, RotateCcw, AlertTriangle, FileText, Clock,
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_ACTIVITY } from '@/data/mockData';

const TYPE_CONFIG: Record<string, { icon: any; color: string }> = {
  request_created: { icon: Plus, color: '#2563EB' },
  status_changed: { icon: RefreshCw, color: '#0284C7' },
  comment_added: { icon: MessageSquare, color: '#059669' },
  technician_assigned: { icon: UserCheck, color: '#7C3AED' },
  visit_scheduled: { icon: Calendar, color: '#D97706' },
  rent_paid: { icon: Wallet, color: '#059669' },
  request_resolved: { icon: CheckCircle, color: '#16A34A' },
  request_reopened: { icon: RotateCcw, color: '#DC2626' },
  dispute_escalated: { icon: AlertTriangle, color: '#DC2626' },
  document_uploaded: { icon: FileText, color: '#0284C7' },
  feedback_submitted: { icon: CheckCircle, color: '#F59E0B' },
};

export default function ActivityHistoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View
        className="flex-row items-center justify-between px-5 pb-4 border-b"
        style={{
          paddingTop: insets.top,
          backgroundColor: colors.headerBg,
          borderBottomColor: colors.headerBorder,
        }}
      >
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <ArrowLeft size={22} color={colors.textPrimary} />
        </Pressable>
        <Text className="text-[17px] font-bold" style={{ color: colors.textPrimary }}>Activity History</Text>
        <View className="w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        {MOCK_ACTIVITY.map((item, i) => {
          const config = TYPE_CONFIG[item.type] || { icon: Clock, color: colors.textMuted };
          const Icon = config.icon;
          return (
            <View key={item.id} className="flex-row">
              <View className="w-10 items-center">
                <View
                  className="w-9 h-9 rounded-full items-center justify-center"
                  style={{ backgroundColor: config.color + '18' }}
                >
                  <Icon size={16} color={config.color} />
                </View>
                {i < MOCK_ACTIVITY.length - 1 && <View className="w-0.5 flex-1 my-0.5" style={{ backgroundColor: colors.border }} />}
              </View>
              <Pressable
                className="flex-1 rounded-lg p-4 ml-3 mb-3 shadow-sm"
                style={{ backgroundColor: colors.surface }}
                onPress={() => item.linkedRequestId && router.push({ pathname: '/request-detail', params: { id: item.linkedRequestId } })}
              >
                <Text className="text-[13px] font-semibold" style={{ color: colors.textPrimary }}>{item.title}</Text>
                <Text className="text-[11px] mt-1 leading-[18px]" style={{ color: colors.textSecondary }}>{item.description}</Text>
                <Text className="text-[11px] mt-2" style={{ color: colors.textMuted }}>{item.timestamp}</Text>
              </Pressable>
            </View>
          );
        })}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
