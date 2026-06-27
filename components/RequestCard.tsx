import { View, Text, Pressable } from 'react-native';
import { Clock, AlertTriangle } from 'lucide-react-native';
import { StatusBadge } from './StatusBadge';
import type { MaintenanceRequest } from '@/data/mockData';

interface RequestCardProps {
  request: MaintenanceRequest;
  onPress: () => void;
}

export function RequestCard({ request, onPress }: RequestCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`bg-white rounded-xl p-4 mb-3 shadow-sm active:opacity-95 ${
        request.isEmergency ? 'border-l-[3px] border-l-red-600' : ''
      }`}
    >
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center gap-2">
          <Text className="text-[11px] text-slate-400 font-medium">{request.id}</Text>
          {request.isEmergency && (
            <View className="flex-row items-center gap-1 bg-red-50 px-1.5 py-0.5 rounded-full">
              <AlertTriangle size={10} color="#DC2626" />
              <Text className="text-[9px] font-bold text-red-600">EMERGENCY</Text>
            </View>
          )}
        </View>
        <StatusBadge label={request.status} small />
      </View>
      <Text className="text-[15px] font-semibold text-slate-900 mb-2" numberOfLines={1}>
        {request.title}
      </Text>
      <View className="flex-row items-center gap-2 mb-3">
        <Text className="text-[11px] text-slate-600">{request.category}</Text>
        <Text className="text-[11px] text-slate-400">-</Text>
        <StatusBadge label={request.priority} type="priority" small />
      </View>
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-1">
          <Clock size={12} color="#94A3B8" />
          <Text className="text-[11px] text-slate-400">{request.submittedDate}</Text>
        </View>
        {request.expectedResolution && (
          <Text className="text-[11px] text-amber-600 font-medium">
            Due: {request.expectedResolution}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
