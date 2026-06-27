import { useState } from 'react';
import { View, Text, ScrollView, Switch, Pressable, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Camera, Video, File, AlertTriangle } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { InputField } from '@/components/InputField';
import { PickerSelect } from '@/components/PickerSelect';
import { PrimaryButton } from '@/components/PrimaryButton';
import { CATEGORIES, SUBCATEGORIES, PRIORITY_LEVELS } from '@/data/mockData';

const ROOMS = ['Kitchen', 'Bedroom', 'Bathroom', 'Living Room', 'Balcony', 'Hall', 'Other'];
const TIME_SLOTS = ['9:00 AM - 11:00 AM', '11:00 AM - 1:00 PM', '2:00 PM - 4:00 PM', '4:00 PM - 6:00 PM', 'ASAP'];

export default function CreateRequestScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [room, setRoom] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [permissionToEnter, setPermissionToEnter] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);
  const [loading, setLoading] = useState(false);

  const subcats = category ? (SUBCATEGORIES[category] || []) : [];

  const showAlert = (msg: string) => {
    Platform.OS === 'web' ? window.alert(msg) : Alert.alert('', msg);
  };

  const handleSubmit = () => {
    if (!title.trim() || !category || !description.trim()) {
      showAlert('Please fill in title, category, and description.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showAlert('Request submitted successfully!');
      router.back();
    }, 1000);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-row items-center justify-between px-5 pb-4 border-b" style={{ paddingTop: insets.top, backgroundColor: colors.headerBg, borderColor: colors.headerBorder }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <ArrowLeft size={22} color={colors.textPrimary} />
        </Pressable>
        <Text className="text-[17px] font-bold" style={{ color: colors.textPrimary }}>New Request</Text>
        <View className="w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        {isEmergency && (
          <View className="rounded-lg p-3 flex-row items-center gap-2 mb-4" style={{ backgroundColor: colors.dangerLight }}>
            <AlertTriangle size={18} color={colors.danger} />
            <Text className="text-[13px] font-medium" style={{ color: colors.danger }}>This will be flagged as an emergency request</Text>
          </View>
        )}

        <InputField label="Issue Title" placeholder="Brief description of the issue" value={title} onChangeText={setTitle} />
        <PickerSelect label="Category" value={category} options={CATEGORIES} onSelect={(v) => { setCategory(v); setSubcategory(''); }} placeholder="Select category" />
        {subcats.length > 0 && (
          <PickerSelect label="Subcategory" value={subcategory} options={subcats} onSelect={setSubcategory} placeholder="Select subcategory" />
        )}
        <InputField label="Description" placeholder="Describe the issue in detail..." value={description} onChangeText={setDescription} multiline numberOfLines={4} style={{ minHeight: 100, textAlignVertical: 'top' }} />
        <PickerSelect label="Priority Level" value={priority} options={[...PRIORITY_LEVELS]} onSelect={setPriority} placeholder="Select priority" />
        <PickerSelect label="Property Area / Room" value={room} options={ROOMS} onSelect={setRoom} placeholder="Select area" />
        <InputField label="Preferred Visit Date" placeholder="YYYY-MM-DD" value={preferredDate} onChangeText={setPreferredDate} />
        <PickerSelect label="Preferred Time Slot" value={timeSlot} options={TIME_SLOTS} onSelect={setTimeSlot} placeholder="Select time" />

        <View className="flex-row items-center justify-between rounded-lg p-4 mb-4 border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
          <View className="flex-1 mr-3">
            <Text className="text-[13px] font-semibold" style={{ color: colors.textPrimary }}>Permission to enter when absent</Text>
            <Text className="text-[11px] mt-0.5" style={{ color: colors.textMuted }}>Allow access if you are not home</Text>
          </View>
          <Switch value={permissionToEnter} onValueChange={setPermissionToEnter} trackColor={{ true: colors.primary }} />
        </View>

        <View className="flex-row items-center justify-between rounded-lg p-4 mb-4 border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
          <View className="flex-1 mr-3">
            <Text className="text-[13px] font-semibold" style={{ color: colors.danger }}>Emergency Issue</Text>
            <Text className="text-[11px] mt-0.5" style={{ color: colors.textMuted }}>Mark for immediate attention</Text>
          </View>
          <Switch value={isEmergency} onValueChange={setIsEmergency} trackColor={{ true: colors.danger }} />
        </View>

        <Text className="text-[13px] font-semibold mb-2" style={{ color: colors.textSecondary }}>Evidence</Text>
        <View className="flex-row gap-3">
          <EvidenceBtn icon={<Camera size={20} color={colors.primary} />} label="Photo" onPress={() => showAlert('Photo upload will be available with backend integration.')} colors={colors} />
          <EvidenceBtn icon={<Video size={20} color={colors.primary} />} label="Video" onPress={() => showAlert('Video upload will be available with backend integration.')} colors={colors} />
          <EvidenceBtn icon={<File size={20} color={colors.primary} />} label="Document" onPress={() => showAlert('Document upload will be available with backend integration.')} colors={colors} />
        </View>

        <PrimaryButton title="Submit Request" onPress={handleSubmit} loading={loading} style={{ marginTop: 20 }} />
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}

function EvidenceBtn({ icon, label, onPress, colors }: { icon: React.ReactNode; label: string; onPress: () => void; colors: any }) {
  return (
    <Pressable className="flex-1 rounded-lg border border-dashed py-5 items-center gap-2" style={{ backgroundColor: colors.surface, borderColor: colors.border }} onPress={onPress}>
      {icon}
      <Text className="text-[11px] font-medium" style={{ color: colors.primary }}>{label}</Text>
    </Pressable>
  );
}
