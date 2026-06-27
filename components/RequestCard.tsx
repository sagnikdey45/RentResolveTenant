import { View, Text, Pressable } from 'react-native';
import { Clock, AlertTriangle } from 'lucide-react-native';
import { StatusBadge } from './StatusBadge';
import { useTheme } from '@/context/ThemeContext';
import type { MaintenanceRequest } from '@/data/mockData';

interface RequestCardProps {
  request: MaintenanceRequest;
  onPress: () => void;
}

export function RequestCard({ request, onPress }: RequestCardProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{ backgroundColor: colors.surface, borderLeftWidth: request.isEmergency ? 3 : 0, borderLeftColor: colors.danger }}
      className="rounded-xl p-4 mb-3 active:opacity-95"
    >
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center gap-2">
          <Text style={{ color: colors.textMuted }} className="text-[11px] font-medium">{request.id}</Text>
          {request.isEmergency && (
            <View style={{ backgroundColor: colors.dangerLight }} className="flex-row items-center gap-1 px-1.5 py-0.5 rounded-full">
              <AlertTriangle size={10} color={colors.danger} />
              <Text style={{ color: colors.danger }} className="text-[9px] font-bold">EMERGENCY</Text>
            </View>
          )}
        </View>
        <StatusBadge label={request.status} small />
      </View>
      <Text style={{ color: colors.textPrimary }} className="text-[15px] font-semibold mb-2" numberOfLines={1}>
        {request.title}
      </Text>
      <View className="flex-row items-center gap-2 mb-3">
        <Text style={{ color: colors.textSecondary }} className="text-[11px]">{request.category}</Text>
        <Text style={{ color: colors.textMuted }} className="text-[11px]">-</Text>
        <StatusBadge label={request.priority} type="priority" small />
      </View>
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-1">
          <Clock size={12} color={colors.textMuted} />
          <Text style={{ color: colors.textMuted }} className="text-[11px]">{request.submittedDate}</Text>
        </View>
        {request.expectedResolution && (
          <Text style={{ color: colors.warning }} className="text-[11px] font-medium">
            Due: {request.expectedResolution}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
