import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinkIcon } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_CONVERSATIONS } from '@/data/mockData';

export default function MessagesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background, paddingTop: insets.top + 16 }} className="flex-1 px-5">
      <View className="mb-5">
        <Text style={{ color: colors.textPrimary }} className="text-2xl font-extrabold">Messages</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {MOCK_CONVERSATIONS.map(conv => (
          <Pressable
            key={conv.id}
            style={{ backgroundColor: colors.surface }}
            className="rounded-xl p-4 flex-row items-center gap-3 mb-3 active:opacity-95"
            onPress={() => router.push({ pathname: '/conversation', params: { id: conv.id } })}
          >
            <View style={{ backgroundColor: colors.primaryLight }} className="w-12 h-12 rounded-full items-center justify-center">
              <Text style={{ color: colors.primary }} className="text-[15px] font-bold">
                {conv.participantName.split(' ').map((n: string) => n[0]).join('')}
              </Text>
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-center">
                <Text style={{ color: colors.textPrimary }} className="text-[15px] font-semibold flex-1" numberOfLines={1}>
                  {conv.participantName}
                </Text>
                <Text style={{ color: colors.textMuted }} className="text-[11px]">{conv.lastMessageTime.split(' ')[1]}</Text>
              </View>
              <Text style={{ color: colors.textMuted }} className="text-[11px] mt-0.5">{conv.participantRole}</Text>
              {conv.linkedRequestTitle && (
                <View className="flex-row items-center gap-1 mt-1">
                  <LinkIcon size={10} color={colors.primary} />
                  <Text style={{ color: colors.primary }} className="text-[11px] font-medium flex-1" numberOfLines={1}>
                    {conv.linkedRequestTitle}
                  </Text>
                </View>
              )}
              <Text style={{ color: colors.textSecondary }} className="text-[13px] mt-1" numberOfLines={1}>{conv.lastMessage}</Text>
            </View>
            {conv.unreadCount > 0 && (
              <View style={{ backgroundColor: colors.danger }} className="w-[22px] h-[22px] rounded-full items-center justify-center">
                <Text className="text-[10px] font-bold text-white">{conv.unreadCount}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
