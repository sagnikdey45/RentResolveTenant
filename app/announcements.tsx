import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Megaphone } from 'lucide-react-native';
import { MOCK_ANNOUNCEMENTS } from '@/data/mockData';

const PRIORITY_COLORS = {
  High: { text: '#DC2626', border: '#DC2626' },
  Medium: { text: '#D97706', border: '#D97706' },
  Low: { text: '#0284C7', border: '#0284C7' },
};

export default function AnnouncementsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-slate-50">
      <View className="flex-row items-center justify-between px-5 pb-4 bg-white border-b border-slate-100" style={{ paddingTop: insets.top }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center"><ArrowLeft size={22} color="#0F172A" /></Pressable>
        <Text className="text-[17px] font-bold text-slate-900">Announcements</Text>
        <View className="w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        {MOCK_ANNOUNCEMENTS.map(ann => {
          const colors = PRIORITY_COLORS[ann.priority];
          return (
            <View key={ann.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm" style={{ borderLeftWidth: 3, borderLeftColor: colors.border }}>
              <View className="flex-row items-center gap-2 mb-3">
                <Megaphone size={16} color={colors.text} />
                <Text className="flex-1 text-[15px] font-semibold text-slate-900">{ann.title}</Text>
                <View className="px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.text + '18' }}>
                  <Text className="text-[10px] font-semibold" style={{ color: colors.text }}>{ann.priority}</Text>
                </View>
              </View>
              <Text className="text-[13px] text-slate-600 leading-[22px]">{ann.message}</Text>
              <View className="flex-row justify-between mt-3">
                <Text className="text-[11px] text-slate-400">{ann.date}</Text>
                <Text className="text-[11px] text-slate-400">Posted by {ann.postedBy}</Text>
              </View>
            </View>
          );
        })}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
