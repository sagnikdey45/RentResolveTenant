import { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Send, LinkIcon } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_CONVERSATIONS, type Message } from '@/data/mockData';

export default function ConversationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const conv = MOCK_CONVERSATIONS.find(c => c.id === id);
  const scrollRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>(conv?.messages || []);
  const [text, setText] = useState('');

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: false }), 100);
  }, []);

  const handleSend = () => {
    if (!text.trim()) return;
    const newMsg: Message = {
      id: `m_${Date.now()}`,
      senderId: 'tenant_001',
      senderName: 'You',
      text: text.trim(),
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      isRead: true,
    };
    setMessages(prev => [...prev, newMsg]);
    setText('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  if (!conv) {
    return (
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        <View className="flex-row items-center justify-between px-5 pb-3 border-b" style={{ paddingTop: insets.top, backgroundColor: colors.headerBg, borderColor: colors.headerBorder }}>
          <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
            <ArrowLeft size={22} color={colors.textPrimary} />
          </Pressable>
          <Text className="text-[15px] font-bold" style={{ color: colors.textPrimary }}>Conversation Not Found</Text>
          <View className="w-10" />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView className="flex-1" style={{ backgroundColor: colors.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View className="flex-row items-center justify-between px-5 pb-3 border-b" style={{ paddingTop: insets.top, backgroundColor: colors.headerBg, borderColor: colors.headerBorder }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <ArrowLeft size={22} color={colors.textPrimary} />
        </Pressable>
        <View className="flex-1 items-center">
          <Text className="text-[15px] font-bold" style={{ color: colors.textPrimary }}>{conv.participantName}</Text>
          <Text className="text-[11px]" style={{ color: colors.textMuted }}>{conv.participantRole}</Text>
        </View>
        <View className="w-10" />
      </View>

      {conv.linkedRequestTitle && (
        <View className="flex-row items-center gap-2 px-5 py-2" style={{ backgroundColor: colors.primaryLight }}>
          <LinkIcon size={12} color={colors.primary} />
          <Text className="text-[11px] font-medium flex-1" numberOfLines={1} style={{ color: colors.primary }}>
            {conv.linkedRequestId}: {conv.linkedRequestTitle}
          </Text>
        </View>
      )}

      <ScrollView ref={scrollRef} className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
        {messages.map(msg => {
          const isMe = msg.senderId === 'tenant_001';
          return (
            <View key={msg.id} className={`mb-3 ${isMe ? 'items-end' : 'items-start'}`}>
              <View className="max-w-[80%] rounded-xl p-3" style={{
                backgroundColor: isMe ? colors.primary : colors.surface,
                borderWidth: isMe ? 0 : 1,
                borderColor: isMe ? 'transparent' : colors.border,
                borderBottomLeftRadius: isMe ? 16 : 4,
                borderBottomRightRadius: isMe ? 4 : 16,
              }}>
                {!isMe && <Text className="text-[11px] font-semibold mb-1" style={{ color: colors.primary }}>{msg.senderName}</Text>}
                <Text className="text-[13px] leading-5" style={{ color: isMe ? '#FFFFFF' : colors.textPrimary }}>{msg.text}</Text>
                <Text className="text-[10px] mt-1 self-end" style={{ color: isMe ? 'rgba(255,255,255,0.7)' : colors.textMuted }}>
                  {msg.timestamp.split(' ')[1]}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View className="flex-row items-center gap-2 px-5 py-3 border-t" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
        <TextInput
          className="flex-1 rounded-full px-4 py-3 text-[13px] border"
          style={{ backgroundColor: colors.inputBg, color: colors.textPrimary, borderColor: colors.inputBorder }}
          placeholder="Type a message..."
          placeholderTextColor={colors.textMuted}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSend}
        />
        <Pressable
          className={`w-10 h-10 rounded-full items-center justify-center ${!text.trim() ? 'opacity-40' : ''}`}
          style={{ backgroundColor: colors.primary }}
          onPress={handleSend}
          disabled={!text.trim()}
        >
          <Send size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
