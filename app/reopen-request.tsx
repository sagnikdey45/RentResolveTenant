import { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { InputField } from '@/components/InputField';
import { PickerSelect } from '@/components/PickerSelect';
import { PrimaryButton } from '@/components/PrimaryButton';
import { REOPEN_REASONS, MOCK_REQUESTS } from '@/data/mockData';

const SEVERITY = ['Minor - Cosmetic issue remains', 'Moderate - Partially fixed', 'Major - Issue persists', 'Critical - Worse than before'];

export default function ReopenRequestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
    <View className="flex-1 bg-slate-50">
      <View className="flex-row items-center justify-between px-5 pb-4 bg-white border-b border-slate-100" style={{ paddingTop: insets.top }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center"><ArrowLeft size={22} color="#0F172A" /></Pressable>
        <Text className="text-[17px] font-bold text-slate-900">Reopen Request</Text>
        <View className="w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        {request && (
          <View className="bg-blue-50 rounded-lg p-4 mb-5">
            <Text className="text-[11px] text-blue-600 font-semibold">{request.id}</Text>
            <Text className="text-[13px] font-semibold text-slate-900 mt-1">{request.title}</Text>
          </View>
        )}
        <PickerSelect label="Reason for Reopening" value={reason} options={REOPEN_REASONS} onSelect={setReason} placeholder="Select reason" />
        <InputField label="Additional Explanation" placeholder="Describe why you are reopening..." value={explanation} onChangeText={setExplanation} multiline numberOfLines={4} style={{ minHeight: 100, textAlignVertical: 'top' }} />
        <PickerSelect label="Severity of Remaining Issue" value={severity} options={SEVERITY} onSelect={setSeverity} placeholder="Select severity" />
        <Pressable className="flex-row items-center justify-center gap-2 border border-dashed border-slate-200 rounded-lg py-5 mt-1" onPress={() => showAlert('Evidence upload will be available with backend integration.')}>
          <Camera size={20} color="#2563EB" />
          <Text className="text-[13px] text-blue-600 font-medium">Add New Evidence</Text>
        </Pressable>
        <PrimaryButton title="Submit Reopen Request" onPress={handleSubmit} loading={loading} style={{ marginTop: 20 }} />
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
