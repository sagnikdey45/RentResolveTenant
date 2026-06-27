import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft, User, Wrench, Calendar, Clock, MapPin,
  MessageSquare, RotateCcw, Star, AlertTriangle, Image as ImageIcon,
} from 'lucide-react-native';
import { MOCK_REQUESTS } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function RequestDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const request = MOCK_REQUESTS.find(r => r.id === id);

  if (!request) {
    return (
      <View className="flex-1 bg-slate-50">
        <View className="flex-row items-center justify-between px-5 pb-4 bg-white border-b border-slate-100" style={{ paddingTop: insets.top }}>
          <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
            <ArrowLeft size={22} color="#0F172A" />
          </Pressable>
          <Text className="text-[17px] font-bold text-slate-900">Request Not Found</Text>
          <View className="w-10" />
        </View>
      </View>
    );
  }

  const isResolved = ['Resolved', 'Closed'].includes(request.status);
  const canEscalate = !isResolved && !['Escalated'].includes(request.status);

  return (
    <View className="flex-1 bg-slate-50">
      <View className="flex-row items-center justify-between px-5 pb-4 bg-white border-b border-slate-100" style={{ paddingTop: insets.top }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <ArrowLeft size={22} color="#0F172A" />
        </Pressable>
        <Text className="text-[17px] font-bold text-slate-900">{request.id}</Text>
        <View className="w-10" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        <View className="mb-5">
          <Text className="text-xl font-bold text-slate-900 mb-3">{request.title}</Text>
          <View className="flex-row gap-2 flex-wrap">
            <StatusBadge label={request.status} />
            <StatusBadge label={request.priority} type="priority" />
            {request.isEmergency && (
              <View className="flex-row items-center gap-1 bg-red-50 px-2 py-1 rounded-full">
                <AlertTriangle size={10} color="#DC2626" />
                <Text className="text-[10px] font-bold text-red-600">EMERGENCY</Text>
              </View>
            )}
          </View>
        </View>

        <View className="bg-white rounded-xl p-4 gap-3 shadow-sm">
          <DetailRow icon={<Clock size={16} color="#94A3B8" />} label="Submitted" value={request.submittedDate} />
          <DetailRow icon={<Calendar size={16} color="#94A3B8" />} label="Expected Resolution" value={request.expectedResolution} />
          <DetailRow icon={<MapPin size={16} color="#94A3B8" />} label="Property Area" value={request.propertyArea} />
          <DetailRow icon={<Wrench size={16} color="#94A3B8" />} label="Category" value={`${request.category} / ${request.subcategory}`} />
        </View>

        <View className="mt-6">
          <Text className="text-[15px] font-bold text-slate-900 mb-3">Description</Text>
          <Text className="text-[13px] text-slate-600 leading-[22px]">{request.description}</Text>
        </View>

        {(request.assignedTo || request.technicianName) && (
          <View className="mt-6">
            <Text className="text-[15px] font-bold text-slate-900 mb-3">Assigned Team</Text>
            <View className="bg-white rounded-xl p-4 gap-3 shadow-sm">
              {request.assignedTo && <DetailRow icon={<User size={16} color="#2563EB" />} label="Manager" value={request.assignedTo} />}
              {request.technicianName && <DetailRow icon={<Wrench size={16} color="#059669" />} label="Technician" value={`${request.technicianName} (${request.technicianPhone})`} />}
            </View>
          </View>
        )}

        {request.evidence.length > 0 && (
          <View className="mt-6">
            <Text className="text-[15px] font-bold text-slate-900 mb-3">Evidence ({request.evidence.length})</Text>
            <View className="flex-row flex-wrap gap-3">
              {request.evidence.map((file, i) => (
                <View key={i} className="bg-white rounded-lg border border-slate-200 p-4 items-center w-[30%] gap-2">
                  <ImageIcon size={24} color="#94A3B8" />
                  <Text className="text-[10px] text-slate-400 text-center" numberOfLines={1}>{file}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {request.resolutionNotes && (
          <View className="mt-6">
            <Text className="text-[15px] font-bold text-slate-900 mb-3">Resolution Notes</Text>
            <View className="bg-emerald-50 rounded-lg p-4">
              <Text className="text-[13px] text-emerald-700 leading-5">{request.resolutionNotes}</Text>
            </View>
          </View>
        )}

        <View className="mt-6">
          <Text className="text-[15px] font-bold text-slate-900 mb-3">Status Timeline</Text>
          {request.timeline.map((event, i) => (
            <View key={event.id} className="flex-row min-h-[64px]">
              <View className="w-6 items-center">
                <View className={`w-2.5 h-2.5 rounded-full mt-1 ${i === 0 ? 'bg-blue-600' : 'bg-slate-400'}`} />
                {i < request.timeline.length - 1 && <View className="w-0.5 flex-1 bg-slate-200 mt-0.5" />}
              </View>
              <View className="flex-1 pl-3 pb-5">
                <Text className="text-[13px] font-semibold text-slate-900">{event.event}</Text>
                <Text className="text-[11px] text-slate-600 mt-0.5">{event.description}</Text>
                <Text className="text-[11px] text-slate-400 mt-1">{event.date} - {event.actor}</Text>
              </View>
            </View>
          ))}
        </View>

        <View className="mt-6 gap-3">
          <PrimaryButton
            title="Message Landlord"
            variant="outline"
            icon={<MessageSquare size={18} color="#2563EB" />}
            onPress={() => router.push('/(tabs)/messages')}
          />
          {isResolved && (
            <>
              <PrimaryButton
                title="Reopen Request"
                variant="outline"
                icon={<RotateCcw size={18} color="#2563EB" />}
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

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
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
