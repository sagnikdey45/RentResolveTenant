import { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Send, LinkIcon } from 'lucide-react-native';
import { MOCK_CONVERSATIONS, type Message } from '@/data/mockData';

export default function ConversationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
      <View className="flex-1 bg-slate-50">
        <View className="flex-row items-center justify-between px-5 pb-3 bg-white border-b border-slate-100" style={{ paddingTop: insets.top }}>
          <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
            <ArrowLeft size={22} color="#0F172A" />
          </Pressable>
          <Text className="text-[15px] font-bold text-slate-900">Conversation Not Found</Text>
          <View className="w-10" />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView className="flex-1 bg-slate-50" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View className="flex-row items-center justify-between px-5 pb-3 bg-white border-b border-slate-100" style={{ paddingTop: insets.top }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <ArrowLeft size={22} color="#0F172A" />
        </Pressable>
        <View className="flex-1 items-center">
          <Text className="text-[15px] font-bold text-slate-900">{conv.participantName}</Text>
          <Text className="text-[11px] text-slate-400">{conv.participantRole}</Text>
        </View>
        <View className="w-10" />
      </View>

      {conv.linkedRequestTitle && (
        <View className="flex-row items-center gap-2 bg-blue-50 px-5 py-2">
          <LinkIcon size={12} color="#2563EB" />
          <Text className="text-[11px] text-blue-600 font-medium flex-1" numberOfLines={1}>
            {conv.linkedRequestId}: {conv.linkedRequestTitle}
          </Text>
        </View>
      )}

      <ScrollView ref={scrollRef} className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
        {messages.map(msg => {
          const isMe = msg.senderId === 'tenant_001';
          return (
            <View key={msg.id} className={`mb-3 ${isMe ? 'items-end' : 'items-start'}`}>
              <View className={`max-w-[80%] rounded-xl p-3 ${
                isMe ? 'bg-blue-600 rounded-br-sm' : 'bg-white rounded-bl-sm border border-slate-200'
              }`}>
                {!isMe && <Text className="text-[11px] font-semibold text-blue-600 mb-1">{msg.senderName}</Text>}
                <Text className={`text-[13px] leading-5 ${isMe ? 'text-white' : 'text-slate-900'}`}>{msg.text}</Text>
                <Text className={`text-[10px] mt-1 self-end ${isMe ? 'text-white/70' : 'text-slate-400'}`}>
                  {msg.timestamp.split(' ')[1]}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View className="flex-row items-center gap-2 px-5 py-3 bg-white border-t border-slate-100">
        <TextInput
          className="flex-1 bg-slate-50 rounded-full px-4 py-3 text-[13px] text-slate-900 border border-slate-200"
          placeholder="Type a message..."
          placeholderTextColor="#94A3B8"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSend}
        />
        <Pressable
          className={`w-10 h-10 rounded-full bg-blue-600 items-center justify-center ${!text.trim() ? 'opacity-40' : ''}`}
          onPress={handleSend}
          disabled={!text.trim()}
        >
          <Send size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
