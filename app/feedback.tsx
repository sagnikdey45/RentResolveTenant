import { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Star } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { InputField } from '@/components/InputField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { MOCK_REQUESTS } from '@/data/mockData';

function StarRating({ label, value, onChange, colors }: { label: string; value: number; onChange: (v: number) => void; colors: any }) {
  return (
    <View className="mb-6">
      <Text className="text-[13px] font-semibold mb-2" style={{ color: colors.textSecondary }}>{label}</Text>
      <View className="flex-row gap-2">
        {[1, 2, 3, 4, 5].map(i => (
          <Pressable key={i} onPress={() => onChange(i)}>
            <Star size={28} color={i <= value ? colors.warning : colors.border} fill={i <= value ? colors.warning : 'transparent'} />
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
  const { colors } = useTheme();
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
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-row items-center justify-between px-5 pb-4 border-b" style={{ paddingTop: insets.top, backgroundColor: colors.headerBg, borderColor: colors.headerBorder }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center"><ArrowLeft size={22} color={colors.textPrimary} /></Pressable>
        <Text className="text-[17px] font-bold" style={{ color: colors.textPrimary }}>Feedback</Text>
        <View className="w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        {request && (
          <View className="rounded-lg p-4 mb-6" style={{ backgroundColor: colors.primaryLight }}>
            <Text className="text-[11px] font-semibold" style={{ color: colors.primary }}>{request.id}</Text>
            <Text className="text-[13px] font-semibold mt-1" style={{ color: colors.textPrimary }}>{request.title}</Text>
          </View>
        )}

        <StarRating label="Overall Rating" value={overall} onChange={setOverall} colors={colors} />
        <StarRating label="Repair Quality" value={quality} onChange={setQuality} colors={colors} />
        <StarRating label="Response Time" value={responseTime} onChange={setResponseTime} colors={colors} />
        <StarRating label="Technician Behavior" value={techBehavior} onChange={setTechBehavior} colors={colors} />

        <Text className="text-[13px] font-semibold mb-2" style={{ color: colors.textSecondary }}>Was the issue fully resolved?</Text>
        <View className="flex-row gap-3 mb-6">
          <Pressable
            className="flex-1 py-3 rounded-lg border items-center"
            style={{
              backgroundColor: resolved === true ? colors.successLight : colors.surface,
              borderColor: resolved === true ? colors.success : colors.border
            }}
            onPress={() => setResolved(true)}
          >
            <Text className="text-[15px] font-semibold" style={{ color: resolved === true ? colors.success : colors.textSecondary }}>Yes</Text>
          </Pressable>
          <Pressable
            className="flex-1 py-3 rounded-lg border items-center"
            style={{
              backgroundColor: resolved === false ? colors.dangerLight : colors.surface,
              borderColor: resolved === false ? colors.danger : colors.border
            }}
            onPress={() => setResolved(false)}
          >
            <Text className="text-[15px] font-semibold" style={{ color: resolved === false ? colors.danger : colors.textSecondary }}>No</Text>
          </Pressable>
        </View>

        <InputField label="Written Feedback" placeholder="Share your experience..." value={comment} onChangeText={setComment} multiline numberOfLines={4} style={{ minHeight: 100, textAlignVertical: 'top' }} />
        <PrimaryButton title="Submit Feedback" onPress={handleSubmit} loading={loading} style={{ marginTop: 12 }} />
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
