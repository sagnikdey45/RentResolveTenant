import { useState } from 'react';
import { View, Text, ScrollView, Pressable, Switch, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Clock, CheckCircle } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { InputField } from '@/components/InputField';
import { PickerSelect } from '@/components/PickerSelect';
import { PrimaryButton } from '@/components/PrimaryButton';

const TIME_SLOTS = ['9:00 AM - 11:00 AM', '11:00 AM - 1:00 PM', '2:00 PM - 4:00 PM', '4:00 PM - 6:00 PM'];

export default function VisitSchedulingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [altTimeSlot, setAltTimeSlot] = useState('');
  const [permission, setPermission] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);

  const showAlert = (msg: string) => Platform.OS === 'web' ? window.alert(msg) : Alert.alert('', msg);

  const handleSubmit = () => {
    if (!date.trim() || !timeSlot) { showAlert('Please select a date and time slot.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); showAlert('Visit has been scheduled. You will receive a confirmation.'); router.back(); }, 800);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-row items-center justify-between px-5 pb-4 border-b" style={{ backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder, paddingTop: insets.top }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center"><ArrowLeft size={22} color={colors.textPrimary} /></Pressable>
        <Text className="text-[17px] font-bold" style={{ color: colors.textPrimary }}>Schedule Visit</Text>
        <View className="w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: '#DCFCE7', borderColor: '#A7F3D0' }}>
          <View className="flex-row items-center gap-2 mb-3">
            <CheckCircle size={18} color="#059669" />
            <Text className="text-[13px] font-bold" style={{ color: '#047857' }}>Current Scheduled Visit</Text>
          </View>
          <View className="gap-2 mb-2">
            <View className="flex-row items-center gap-2">
              <Calendar size={14} color={colors.textMuted} />
              <Text className="text-[13px] font-medium" style={{ color: colors.textPrimary }}>June 25, 2026</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Clock size={14} color={colors.textMuted} />
              <Text className="text-[13px] font-medium" style={{ color: colors.textPrimary }}>2:00 PM - 4:00 PM</Text>
            </View>
          </View>
          <Text className="text-[11px] mt-1" style={{ color: colors.textSecondary }}>Technician: Sunil Verma (AC Repair)</Text>
        </View>

        <Text className="text-[17px] font-bold mb-5" style={{ color: colors.textPrimary }}>Schedule New / Reschedule</Text>
        <InputField label="Preferred Date" placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} />
        <PickerSelect label="Preferred Time Slot" value={timeSlot} options={TIME_SLOTS} onSelect={setTimeSlot} placeholder="Select time" />
        <PickerSelect label="Alternative Time Slot" value={altTimeSlot} options={TIME_SLOTS} onSelect={setAltTimeSlot} placeholder="Select alternative" />

        <View className="flex-row items-center justify-between rounded-lg p-4 mb-4 border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
          <View className="flex-1">
            <Text className="text-[13px] font-semibold" style={{ color: colors.textPrimary }}>Permission to enter when absent</Text>
            <Text className="text-[11px] mt-0.5" style={{ color: colors.textMuted }}>Allow technician access if you are not home</Text>
          </View>
          <Switch value={permission} onValueChange={setPermission} trackColor={{ true: colors.primary }} />
        </View>

        <InputField label="Special Instructions" placeholder="Any specific instructions for the technician..." value={instructions} onChangeText={setInstructions} multiline numberOfLines={3} style={{ minHeight: 80, textAlignVertical: 'top' }} />
        <PrimaryButton title="Confirm Schedule" onPress={handleSubmit} loading={loading} style={{ marginTop: 12 }} />
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
