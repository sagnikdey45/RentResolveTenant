import { useState } from 'react';
import { View, Text, ScrollView, Pressable, Switch, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Clock, CheckCircle } from 'lucide-react-native';
import { InputField } from '@/components/InputField';
import { PickerSelect } from '@/components/PickerSelect';
import { PrimaryButton } from '@/components/PrimaryButton';

const TIME_SLOTS = ['9:00 AM - 11:00 AM', '11:00 AM - 1:00 PM', '2:00 PM - 4:00 PM', '4:00 PM - 6:00 PM'];

export default function VisitSchedulingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
    <View className="flex-1 bg-slate-50">
      <View className="flex-row items-center justify-between px-5 pb-4 bg-white border-b border-slate-100" style={{ paddingTop: insets.top }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center"><ArrowLeft size={22} color="#0F172A" /></Pressable>
        <Text className="text-[17px] font-bold text-slate-900">Schedule Visit</Text>
        <View className="w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        <View className="bg-emerald-50 rounded-xl p-4 mb-6 border border-emerald-200">
          <View className="flex-row items-center gap-2 mb-3">
            <CheckCircle size={18} color="#059669" />
            <Text className="text-[13px] font-bold text-emerald-700">Current Scheduled Visit</Text>
          </View>
          <View className="gap-2 mb-2">
            <View className="flex-row items-center gap-2">
              <Calendar size={14} color="#94A3B8" />
              <Text className="text-[13px] text-slate-900 font-medium">June 25, 2026</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Clock size={14} color="#94A3B8" />
              <Text className="text-[13px] text-slate-900 font-medium">2:00 PM - 4:00 PM</Text>
            </View>
          </View>
          <Text className="text-[11px] text-slate-600 mt-1">Technician: Sunil Verma (AC Repair)</Text>
        </View>

        <Text className="text-[17px] font-bold text-slate-900 mb-5">Schedule New / Reschedule</Text>
        <InputField label="Preferred Date" placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} />
        <PickerSelect label="Preferred Time Slot" value={timeSlot} options={TIME_SLOTS} onSelect={setTimeSlot} placeholder="Select time" />
        <PickerSelect label="Alternative Time Slot" value={altTimeSlot} options={TIME_SLOTS} onSelect={setAltTimeSlot} placeholder="Select alternative" />

        <View className="flex-row items-center justify-between bg-white rounded-lg p-4 mb-4 border border-slate-200">
          <View className="flex-1">
            <Text className="text-[13px] font-semibold text-slate-900">Permission to enter when absent</Text>
            <Text className="text-[11px] text-slate-400 mt-0.5">Allow technician access if you are not home</Text>
          </View>
          <Switch value={permission} onValueChange={setPermission} trackColor={{ true: '#2563EB' }} />
        </View>

        <InputField label="Special Instructions" placeholder="Any specific instructions for the technician..." value={instructions} onChangeText={setInstructions} multiline numberOfLines={3} style={{ minHeight: 80, textAlignVertical: 'top' }} />
        <PrimaryButton title="Confirm Schedule" onPress={handleSubmit} loading={loading} style={{ marginTop: 12 }} />
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
