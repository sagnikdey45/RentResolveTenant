import { useState } from 'react';
import { View, Text, ScrollView, Switch, Pressable, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Camera, Video, File, AlertTriangle } from 'lucide-react-native';
import { InputField } from '@/components/InputField';
import { PickerSelect } from '@/components/PickerSelect';
import { PrimaryButton } from '@/components/PrimaryButton';
import { CATEGORIES, SUBCATEGORIES, PRIORITY_LEVELS } from '@/data/mockData';

const ROOMS = ['Kitchen', 'Bedroom', 'Bathroom', 'Living Room', 'Balcony', 'Hall', 'Other'];
const TIME_SLOTS = ['9:00 AM - 11:00 AM', '11:00 AM - 1:00 PM', '2:00 PM - 4:00 PM', '4:00 PM - 6:00 PM', 'ASAP'];

export default function CreateRequestScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
    <View className="flex-1 bg-slate-50">
      <View className="flex-row items-center justify-between px-5 pb-4 bg-white border-b border-slate-100" style={{ paddingTop: insets.top }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <ArrowLeft size={22} color="#0F172A" />
        </Pressable>
        <Text className="text-[17px] font-bold text-slate-900">New Request</Text>
        <View className="w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        {isEmergency && (
          <View className="bg-red-50 rounded-lg p-3 flex-row items-center gap-2 mb-4">
            <AlertTriangle size={18} color="#DC2626" />
            <Text className="text-[13px] text-red-600 font-medium">This will be flagged as an emergency request</Text>
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

        <View className="flex-row items-center justify-between bg-white rounded-lg p-4 mb-4 border border-slate-200">
          <View className="flex-1 mr-3">
            <Text className="text-[13px] font-semibold text-slate-900">Permission to enter when absent</Text>
            <Text className="text-[11px] text-slate-400 mt-0.5">Allow access if you are not home</Text>
          </View>
          <Switch value={permissionToEnter} onValueChange={setPermissionToEnter} trackColor={{ true: '#2563EB' }} />
        </View>

        <View className="flex-row items-center justify-between bg-white rounded-lg p-4 mb-4 border border-slate-200">
          <View className="flex-1 mr-3">
            <Text className="text-[13px] font-semibold text-red-600">Emergency Issue</Text>
            <Text className="text-[11px] text-slate-400 mt-0.5">Mark for immediate attention</Text>
          </View>
          <Switch value={isEmergency} onValueChange={setIsEmergency} trackColor={{ true: '#DC2626' }} />
        </View>

        <Text className="text-[13px] font-semibold text-slate-600 mb-2">Evidence</Text>
        <View className="flex-row gap-3">
          <EvidenceBtn icon={<Camera size={20} color="#2563EB" />} label="Photo" onPress={() => showAlert('Photo upload will be available with backend integration.')} />
          <EvidenceBtn icon={<Video size={20} color="#2563EB" />} label="Video" onPress={() => showAlert('Video upload will be available with backend integration.')} />
          <EvidenceBtn icon={<File size={20} color="#2563EB" />} label="Document" onPress={() => showAlert('Document upload will be available with backend integration.')} />
        </View>

        <PrimaryButton title="Submit Request" onPress={handleSubmit} loading={loading} style={{ marginTop: 20 }} />
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}

function EvidenceBtn({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress: () => void }) {
  return (
    <Pressable className="flex-1 bg-white rounded-lg border border-dashed border-slate-200 py-5 items-center gap-2" onPress={onPress}>
      {icon}
      <Text className="text-[11px] text-blue-600 font-medium">{label}</Text>
    </Pressable>
  );
}
