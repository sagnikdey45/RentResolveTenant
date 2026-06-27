import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinkIcon } from 'lucide-react-native';
import { MOCK_CONVERSATIONS } from '@/data/mockData';

export default function MessagesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-slate-50 px-5" style={{ paddingTop: insets.top + 16 }}>
      <View className="mb-5">
        <Text className="text-2xl font-extrabold text-slate-900">Messages</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {MOCK_CONVERSATIONS.map(conv => (
          <Pressable
            key={conv.id}
            className="bg-white rounded-xl p-4 flex-row items-center gap-3 mb-3 shadow-sm active:opacity-95"
            onPress={() => router.push({ pathname: '/conversation', params: { id: conv.id } })}
          >
            <View className="w-12 h-12 rounded-full bg-blue-50 items-center justify-center">
              <Text className="text-[15px] font-bold text-blue-600">
                {conv.participantName.split(' ').map((n: string) => n[0]).join('')}
              </Text>
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-center">
                <Text className="text-[15px] font-semibold text-slate-900 flex-1" numberOfLines={1}>
                  {conv.participantName}
                </Text>
                <Text className="text-[11px] text-slate-400">{conv.lastMessageTime.split(' ')[1]}</Text>
              </View>
              <Text className="text-[11px] text-slate-400 mt-0.5">{conv.participantRole}</Text>
              {conv.linkedRequestTitle && (
                <View className="flex-row items-center gap-1 mt-1">
                  <LinkIcon size={10} color="#2563EB" />
                  <Text className="text-[11px] text-blue-600 font-medium flex-1" numberOfLines={1}>
                    {conv.linkedRequestTitle}
                  </Text>
                </View>
              )}
              <Text className="text-[13px] text-slate-600 mt-1" numberOfLines={1}>{conv.lastMessage}</Text>
            </View>
            {conv.unreadCount > 0 && (
              <View className="w-[22px] h-[22px] rounded-full bg-red-500 items-center justify-center">
                <Text className="text-[10px] font-bold text-white">{conv.unreadCount}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
