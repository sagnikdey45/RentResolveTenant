import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Megaphone } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_ANNOUNCEMENTS } from '@/data/mockData';

const PRIORITY_COLORS = {
  High: { text: '#DC2626', border: '#DC2626' },
  Medium: { text: '#D97706', border: '#D97706' },
  Low: { text: '#0284C7', border: '#0284C7' },
};

export default function AnnouncementsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-row items-center justify-between px-5 pb-4 border-b" style={{ backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder, paddingTop: insets.top }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center"><ArrowLeft size={22} color={colors.textPrimary} /></Pressable>
        <Text className="text-[17px] font-bold" style={{ color: colors.textPrimary }}>Announcements</Text>
        <View className="w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        {MOCK_ANNOUNCEMENTS.map(ann => {
          const announcementColors = PRIORITY_COLORS[ann.priority];
          return (
            <View key={ann.id} className="rounded-xl p-4 mb-3 shadow-sm" style={{ backgroundColor: colors.surface, borderLeftWidth: 3, borderLeftColor: announcementColors.border }}>
              <View className="flex-row items-center gap-2 mb-3">
                <Megaphone size={16} color={announcementColors.text} />
                <Text className="flex-1 text-[15px] font-semibold" style={{ color: colors.textPrimary }}>{ann.title}</Text>
                <View className="px-2 py-0.5 rounded-full" style={{ backgroundColor: announcementColors.text + '18' }}>
                  <Text className="text-[10px] font-semibold" style={{ color: announcementColors.text }}>{ann.priority}</Text>
                </View>
              </View>
              <Text className="text-[13px] leading-[22px]" style={{ color: colors.textSecondary }}>{ann.message}</Text>
              <View className="flex-row justify-between mt-3">
                <Text className="text-[11px]" style={{ color: colors.textMuted }}>{ann.date}</Text>
                <Text className="text-[11px]" style={{ color: colors.textMuted }}>Posted by {ann.postedBy}</Text>
              </View>
            </View>
          );
        })}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
