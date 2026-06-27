import { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Camera, AlertTriangle } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { InputField } from '@/components/InputField';
import { PickerSelect } from '@/components/PickerSelect';
import { PrimaryButton } from '@/components/PrimaryButton';
import { DISPUTE_CATEGORIES, MOCK_DISPUTES, MOCK_REQUESTS } from '@/data/mockData';

const DISPUTE_STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  Submitted: { bg: '#DBEAFE', text: '#1E40AF' },
  'Under Review': { bg: '#FEF3C7', text: '#92400E' },
  'Landlord Responded': { bg: '#EDE9FE', text: '#5B21B6' },
  'Awaiting Tenant Response': { bg: '#FFEDD5', text: '#9A3412' },
  Resolved: { bg: '#DCFCE7', text: '#166534' },
  Closed: { bg: '#F1F5F9', text: '#475569' },
};

export default function DisputeScreen() {
  const { requestId } = useLocalSearchParams<{ requestId?: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const linkedRequest = requestId ? MOCK_REQUESTS.find(r => r.id === requestId) : null;
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [expected, setExpected] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'new' | 'existing'>('new');

  const showAlert = (msg: string) => Platform.OS === 'web' ? window.alert(msg) : Alert.alert('', msg);

  const handleSubmit = () => {
    if (!title.trim() || !category || !description.trim()) { showAlert('Please fill in title, category, and description.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); showAlert('Your dispute has been submitted for review.'); router.back(); }, 800);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-row items-center justify-between px-5 pb-4 border-b" style={{ backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder, paddingTop: insets.top }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center"><ArrowLeft size={22} color={colors.textPrimary} /></Pressable>
        <Text className="text-[17px] font-bold" style={{ color: colors.textPrimary }}>Disputes</Text>
        <View className="w-10" />
      </View>

      <View className="flex-row px-5 gap-3 pb-3" style={{ backgroundColor: colors.surface }}>
        <Pressable className="flex-1 py-3 rounded-lg items-center" style={{ backgroundColor: tab === 'new' ? colors.primary : colors.background }} onPress={() => setTab('new')}>
          <Text className="text-[13px] font-semibold" style={{ color: tab === 'new' ? '#FFFFFF' : colors.textSecondary }}>New Dispute</Text>
        </Pressable>
        <Pressable className="flex-1 py-3 rounded-lg items-center" style={{ backgroundColor: tab === 'existing' ? colors.primary : colors.background }} onPress={() => setTab('existing')}>
          <Text className="text-[13px] font-semibold" style={{ color: tab === 'existing' ? '#FFFFFF' : colors.textSecondary }}>My Disputes</Text>
        </Pressable>
      </View>

      {tab === 'new' ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
          {linkedRequest && (
            <View className="rounded-lg p-4 mb-5 border" style={{ backgroundColor: '#FEF08A', borderColor: '#FCD34D' }}>
              <Text className="text-[11px] font-semibold" style={{ color: '#B45309' }}>Linked Request</Text>
              <Text className="text-[13px] font-semibold mt-1" style={{ color: colors.textPrimary }}>{linkedRequest.id}: {linkedRequest.title}</Text>
            </View>
          )}
          <InputField label="Dispute Title" placeholder="Brief title for your dispute" value={title} onChangeText={setTitle} />
          <PickerSelect label="Dispute Category" value={category} options={DISPUTE_CATEGORIES} onSelect={setCategory} placeholder="Select category" />
          <InputField label="Description" placeholder="Describe the issue in detail..." value={description} onChangeText={setDescription} multiline numberOfLines={4} style={{ minHeight: 100, textAlignVertical: 'top' }} />
          <InputField label="Expected Resolution" placeholder="What outcome do you expect?" value={expected} onChangeText={setExpected} multiline numberOfLines={2} style={{ minHeight: 60, textAlignVertical: 'top' }} />
          <Pressable className="flex-row items-center justify-center gap-2 border border-dashed rounded-lg py-5" style={{ borderColor: colors.border }} onPress={() => showAlert('Evidence upload will be available with backend integration.')}>
            <Camera size={20} color={colors.primary} />
            <Text className="text-[13px] font-medium" style={{ color: colors.primary }}>Add Evidence</Text>
          </Pressable>
          <PrimaryButton title="Submit Dispute" variant="danger" icon={<AlertTriangle size={18} color="#FFFFFF" />} onPress={handleSubmit} loading={loading} style={{ marginTop: 20 }} />
          <View className="h-10" />
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
          {MOCK_DISPUTES.map(d => {
            const disputeColors = DISPUTE_STATUS_COLORS[d.status] || DISPUTE_STATUS_COLORS.Submitted;
            return (
              <View key={d.id} className="rounded-xl p-4 mb-3 shadow-sm" style={{ backgroundColor: colors.surface }}>
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-[11px] font-medium" style={{ color: colors.textMuted }}>{d.id}</Text>
                  <View className="px-2 py-0.5 rounded-full" style={{ backgroundColor: disputeColors.bg }}>
                    <Text className="text-[10px] font-semibold" style={{ color: disputeColors.text }}>{d.status}</Text>
                  </View>
                </View>
                <Text className="text-[15px] font-semibold mb-1" style={{ color: colors.textPrimary }}>{d.title}</Text>
                <Text className="text-[11px] font-medium mb-2" style={{ color: colors.primary }}>{d.category}</Text>
                <Text className="text-[11px] leading-[18px]" numberOfLines={2} style={{ color: colors.textSecondary }}>{d.description}</Text>
                <Text className="text-[11px] mt-2" style={{ color: colors.textMuted }}>Submitted: {d.submittedDate}</Text>
              </View>
            );
          })}
          <View className="h-10" />
        </ScrollView>
      )}
    </View>
  );
}
