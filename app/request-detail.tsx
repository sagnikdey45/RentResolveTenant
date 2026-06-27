import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft, User, Wrench, Calendar, Clock, MapPin,
  MessageSquare, RotateCcw, Star, AlertTriangle, Image as ImageIcon,
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_REQUESTS } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function RequestDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const request = MOCK_REQUESTS.find(r => r.id === id);

  if (!request) {
    return (
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        <View className="flex-row items-center justify-between px-5 pb-4 border-b" style={{ paddingTop: insets.top, backgroundColor: colors.headerBg, borderColor: colors.headerBorder }}>
          <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
            <ArrowLeft size={22} color={colors.textPrimary} />
          </Pressable>
          <Text className="text-[17px] font-bold" style={{ color: colors.textPrimary }}>Request Not Found</Text>
          <View className="w-10" />
        </View>
      </View>
    );
  }

  const isResolved = ['Resolved', 'Closed'].includes(request.status);
  const canEscalate = !isResolved && !['Escalated'].includes(request.status);

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-row items-center justify-between px-5 pb-4 border-b" style={{ paddingTop: insets.top, backgroundColor: colors.headerBg, borderColor: colors.headerBorder }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <ArrowLeft size={22} color={colors.textPrimary} />
        </Pressable>
        <Text className="text-[17px] font-bold" style={{ color: colors.textPrimary }}>{request.id}</Text>
        <View className="w-10" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        <View className="mb-5">
          <Text className="text-xl font-bold mb-3" style={{ color: colors.textPrimary }}>{request.title}</Text>
          <View className="flex-row gap-2 flex-wrap">
            <StatusBadge label={request.status} />
            <StatusBadge label={request.priority} type="priority" />
            {request.isEmergency && (
              <View className="flex-row items-center gap-1 px-2 py-1 rounded-full" style={{ backgroundColor: colors.dangerLight }}>
                <AlertTriangle size={10} color={colors.danger} />
                <Text className="text-[10px] font-bold" style={{ color: colors.danger }}>EMERGENCY</Text>
              </View>
            )}
          </View>
        </View>

        <View className="rounded-xl p-4 gap-3 shadow-sm" style={{ backgroundColor: colors.surface }}>
          <DetailRow icon={<Clock size={16} color={colors.textMuted} />} label="Submitted" value={request.submittedDate} colors={colors} />
          <DetailRow icon={<Calendar size={16} color={colors.textMuted} />} label="Expected Resolution" value={request.expectedResolution} colors={colors} />
          <DetailRow icon={<MapPin size={16} color={colors.textMuted} />} label="Property Area" value={request.propertyArea} colors={colors} />
          <DetailRow icon={<Wrench size={16} color={colors.textMuted} />} label="Category" value={`${request.category} / ${request.subcategory}`} colors={colors} />
        </View>

        <View className="mt-6">
          <Text className="text-[15px] font-bold mb-3" style={{ color: colors.textPrimary }}>Description</Text>
          <Text className="text-[13px] leading-[22px]" style={{ color: colors.textSecondary }}>{request.description}</Text>
        </View>

        {(request.assignedTo || request.technicianName) && (
          <View className="mt-6">
            <Text className="text-[15px] font-bold mb-3" style={{ color: colors.textPrimary }}>Assigned Team</Text>
            <View className="rounded-xl p-4 gap-3 shadow-sm" style={{ backgroundColor: colors.surface }}>
              {request.assignedTo && <DetailRow icon={<User size={16} color={colors.primary} />} label="Manager" value={request.assignedTo} colors={colors} />}
              {request.technicianName && <DetailRow icon={<Wrench size={16} color={colors.accent} />} label="Technician" value={`${request.technicianName} (${request.technicianPhone})`} colors={colors} />}
            </View>
          </View>
        )}

        {request.evidence.length > 0 && (
          <View className="mt-6">
            <Text className="text-[15px] font-bold mb-3" style={{ color: colors.textPrimary }}>Evidence ({request.evidence.length})</Text>
            <View className="flex-row flex-wrap gap-3">
              {request.evidence.map((file, i) => (
                <View key={i} className="rounded-lg border p-4 items-center w-[30%] gap-2" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
                  <ImageIcon size={24} color={colors.textMuted} />
                  <Text className="text-[10px] text-center" numberOfLines={1} style={{ color: colors.textMuted }}>{file}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {request.resolutionNotes && (
          <View className="mt-6">
            <Text className="text-[15px] font-bold mb-3" style={{ color: colors.textPrimary }}>Resolution Notes</Text>
            <View className="rounded-lg p-4" style={{ backgroundColor: colors.successLight }}>
              <Text className="text-[13px] leading-5" style={{ color: colors.success }}>{request.resolutionNotes}</Text>
            </View>
          </View>
        )}

        <View className="mt-6">
          <Text className="text-[15px] font-bold mb-3" style={{ color: colors.textPrimary }}>Status Timeline</Text>
          {request.timeline.map((event, i) => (
            <View key={event.id} className="flex-row min-h-[64px]">
              <View className="w-6 items-center">
                <View className="w-2.5 h-2.5 rounded-full mt-1" style={{ backgroundColor: i === 0 ? colors.primary : colors.textMuted }} />
                {i < request.timeline.length - 1 && <View className="w-0.5 flex-1 mt-0.5" style={{ backgroundColor: colors.border }} />}
              </View>
              <View className="flex-1 pl-3 pb-5">
                <Text className="text-[13px] font-semibold" style={{ color: colors.textPrimary }}>{event.event}</Text>
                <Text className="text-[11px] mt-0.5" style={{ color: colors.textSecondary }}>{event.description}</Text>
                <Text className="text-[11px] mt-1" style={{ color: colors.textMuted }}>{event.date} - {event.actor}</Text>
              </View>
            </View>
          ))}
        </View>

        <View className="mt-6 gap-3">
          <PrimaryButton
            title="Message Landlord"
            variant="outline"
            icon={<MessageSquare size={18} color={colors.primary} />}
            onPress={() => router.push('/(tabs)/messages')}
          />
          {isResolved && (
            <>
              <PrimaryButton
                title="Reopen Request"
                variant="outline"
                icon={<RotateCcw size={18} color={colors.primary} />}
                onPress={() => router.push({ pathname: '/reopen-request', params: { id: request.id } })}
              />
              <PrimaryButton
                title="Submit Feedback"
                icon={<Star size={18} color="#FFFFFF" />}
                onPress={() => router.push({ pathname: '/feedback', params: { id: request.id } })}
              />
            </>
          )}
          {canEscalate && (
            <PrimaryButton
              title="Escalate Issue"
              variant="danger"
              icon={<AlertTriangle size={18} color="#FFFFFF" />}
              onPress={() => router.push({ pathname: '/dispute', params: { requestId: request.id } })}
            />
          )}
        </View>
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}

function DetailRow({ icon, label, value, colors }: { icon: React.ReactNode; label: string; value: string; colors: any }) {
  return (
    <View className="flex-row items-center gap-3">
      {icon}
      <View className="flex-1">
        <Text className="text-[11px]" style={{ color: colors.textMuted }}>{label}</Text>
        <Text className="text-[13px] font-medium mt-0.5" style={{ color: colors.textPrimary }}>{value}</Text>
      </View>
    </View>
  );
}
