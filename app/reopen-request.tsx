import { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { InputField } from '@/components/InputField';
import { PickerSelect } from '@/components/PickerSelect';
import { PrimaryButton } from '@/components/PrimaryButton';
import { REOPEN_REASONS, MOCK_REQUESTS } from '@/data/mockData';

const SEVERITY = ['Minor - Cosmetic issue remains', 'Moderate - Partially fixed', 'Major - Issue persists', 'Critical - Worse than before'];

export default function ReopenRequestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const request = MOCK_REQUESTS.find(r => r.id === id);
  const [reason, setReason] = useState('');
  const [explanation, setExplanation] = useState('');
  const [severity, setSeverity] = useState('');
  const [loading, setLoading] = useState(false);

  const showAlert = (msg: string) => Platform.OS === 'web' ? window.alert(msg) : Alert.alert('', msg);

  const handleSubmit = () => {
    if (!reason || !explanation.trim()) { showAlert('Please select a reason and provide an explanation.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); showAlert('Your request to reopen has been submitted.'); router.back(); }, 800);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-row items-center justify-between px-5 pb-4 border-b" style={{ paddingTop: insets.top, backgroundColor: colors.headerBg, borderColor: colors.headerBorder }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center"><ArrowLeft size={22} color={colors.textPrimary} /></Pressable>
        <Text className="text-[17px] font-bold" style={{ color: colors.textPrimary }}>Reopen Request</Text>
        <View className="w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        {request && (
          <View className="rounded-lg p-4 mb-5" style={{ backgroundColor: colors.primaryLight }}>
            <Text className="text-[11px] font-semibold" style={{ color: colors.primary }}>{request.id}</Text>
            <Text className="text-[13px] font-semibold mt-1" style={{ color: colors.textPrimary }}>{request.title}</Text>
          </View>
        )}
        <PickerSelect label="Reason for Reopening" value={reason} options={REOPEN_REASONS} onSelect={setReason} placeholder="Select reason" />
        <InputField label="Additional Explanation" placeholder="Describe why you are reopening..." value={explanation} onChangeText={setExplanation} multiline numberOfLines={4} style={{ minHeight: 100, textAlignVertical: 'top' }} />
        <PickerSelect label="Severity of Remaining Issue" value={severity} options={SEVERITY} onSelect={setSeverity} placeholder="Select severity" />
        <Pressable className="flex-row items-center justify-center gap-2 rounded-lg py-5 mt-1 border border-dashed" style={{ backgroundColor: colors.surface, borderColor: colors.border }} onPress={() => showAlert('Evidence upload will be available with backend integration.')}>
          <Camera size={20} color={colors.primary} />
          <Text className="text-[13px] font-medium" style={{ color: colors.primary }}>Add New Evidence</Text>
        </Pressable>
        <PrimaryButton title="Submit Reopen Request" onPress={handleSubmit} loading={loading} style={{ marginTop: 20 }} />
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
