import { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Star } from 'lucide-react-native';
import { InputField } from '@/components/InputField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { MOCK_REQUESTS } from '@/data/mockData';

function StarRating({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <View className="mb-6">
      <Text className="text-[13px] font-semibold text-slate-600 mb-2">{label}</Text>
      <View className="flex-row gap-2">
        {[1, 2, 3, 4, 5].map(i => (
          <Pressable key={i} onPress={() => onChange(i)}>
            <Star size={28} color={i <= value ? '#F59E0B' : '#E2E8F0'} fill={i <= value ? '#F59E0B' : 'transparent'} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function FeedbackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const request = MOCK_REQUESTS.find(r => r.id === id);
  const [overall, setOverall] = useState(0);
  const [quality, setQuality] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [techBehavior, setTechBehavior] = useState(0);
  const [resolved, setResolved] = useState<boolean | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const showAlert = (msg: string) => Platform.OS === 'web' ? window.alert(msg) : Alert.alert('', msg);

  const handleSubmit = () => {
    if (overall === 0) { showAlert('Please provide an overall rating.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); showAlert('Thank you for your feedback!'); router.back(); }, 800);
  };

  return (
    <View className="flex-1 bg-slate-50">
      <View className="flex-row items-center justify-between px-5 pb-4 bg-white border-b border-slate-100" style={{ paddingTop: insets.top }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center"><ArrowLeft size={22} color="#0F172A" /></Pressable>
        <Text className="text-[17px] font-bold text-slate-900">Feedback</Text>
        <View className="w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        {request && (
          <View className="bg-blue-50 rounded-lg p-4 mb-6">
            <Text className="text-[11px] text-blue-600 font-semibold">{request.id}</Text>
            <Text className="text-[13px] font-semibold text-slate-900 mt-1">{request.title}</Text>
          </View>
        )}

        <StarRating label="Overall Rating" value={overall} onChange={setOverall} />
        <StarRating label="Repair Quality" value={quality} onChange={setQuality} />
        <StarRating label="Response Time" value={responseTime} onChange={setResponseTime} />
        <StarRating label="Technician Behavior" value={techBehavior} onChange={setTechBehavior} />

        <Text className="text-[13px] font-semibold text-slate-600 mb-2">Was the issue fully resolved?</Text>
        <View className="flex-row gap-3 mb-6">
          <Pressable
            className={`flex-1 py-3 rounded-lg border items-center ${
              resolved === true ? 'bg-emerald-50 border-emerald-500' : 'border-slate-200'
            }`}
            onPress={() => setResolved(true)}
          >
            <Text className={`text-[15px] font-semibold ${resolved === true ? 'text-emerald-700' : 'text-slate-600'}`}>Yes</Text>
          </Pressable>
          <Pressable
            className={`flex-1 py-3 rounded-lg border items-center ${
              resolved === false ? 'bg-red-50 border-red-500' : 'border-slate-200'
            }`}
            onPress={() => setResolved(false)}
          >
            <Text className={`text-[15px] font-semibold ${resolved === false ? 'text-red-600' : 'text-slate-600'}`}>No</Text>
          </Pressable>
        </View>

        <InputField label="Written Feedback" placeholder="Share your experience..." value={comment} onChangeText={setComment} multiline numberOfLines={4} style={{ minHeight: 100, textAlignVertical: 'top' }} />
        <PrimaryButton title="Submit Feedback" onPress={handleSubmit} loading={loading} style={{ marginTop: 12 }} />
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
