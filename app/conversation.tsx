import { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Send, LinkIcon } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_CONVERSATIONS, type Message } from '@/data/mockData';
import { SHADOWS } from '@/constants/theme';

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
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { paddingTop: insets.top + 8, backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder }]}>
          <Pressable onPress={() => router.back()} style={styles.backButton}><ArrowLeft size={22} color={colors.textPrimary} /></Pressable>
          <Text style={[styles.headerTitle, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>Not Found</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: colors.background }]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.header, { paddingTop: insets.top + 8, backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}><ArrowLeft size={22} color={colors.textPrimary} /></Pressable>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[styles.headerTitle, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>{conv.participantName}</Text>
          <Text style={[styles.headerRole, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>{conv.participantRole}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {conv.linkedRequestTitle && (
        <View style={[styles.linkedBar, { backgroundColor: colors.primaryLight }]}>
          <LinkIcon size={12} color={colors.primary} />
          <Text style={[styles.linkedText, { color: colors.primary, fontFamily: 'Inter-Medium' }]} numberOfLines={1}>
            {conv.linkedRequestId}: {conv.linkedRequestTitle}
          </Text>
        </View>
      )}

      <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={styles.messagesContent} showsVerticalScrollIndicator={false}>
        {messages.map(msg => {
          const isMe = msg.senderId === 'tenant_001';
          return (
            <View key={msg.id} style={[styles.messageRow, { alignItems: isMe ? 'flex-end' : 'flex-start' }]}>
              <View style={[
                styles.bubble,
                {
                  backgroundColor: isMe ? colors.primary : colors.surface,
                  borderWidth: isMe ? 0 : 1,
                  borderColor: isMe ? 'transparent' : colors.border,
                  borderBottomLeftRadius: isMe ? 18 : 4,
                  borderBottomRightRadius: isMe ? 4 : 18,
                },
                !isMe && SHADOWS.soft,
              ]}>
                {!isMe && <Text style={[styles.senderName, { color: colors.primary, fontFamily: 'Inter-SemiBold' }]}>{msg.senderName}</Text>}
                <Text style={[styles.messageText, { color: isMe ? '#FFFFFF' : colors.textPrimary, fontFamily: 'Inter-Regular' }]}>{msg.text}</Text>
                <Text style={[styles.messageTime, { color: isMe ? 'rgba(255,255,255,0.6)' : colors.textMuted, fontFamily: 'Inter-Regular' }]}>
                  {msg.timestamp.split(' ')[1]}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={[styles.inputBar, { backgroundColor: colors.surface, borderTopColor: colors.borderLight }]}>
        <TextInput
          style={[styles.chatInput, { backgroundColor: colors.inputBg, color: colors.textPrimary, borderColor: colors.inputBorder, fontFamily: 'Inter-Regular' }]}
          placeholder="Type a message..."
          placeholderTextColor={colors.textMuted}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSend}
        />
        <Pressable
          style={[styles.sendButton, { backgroundColor: colors.primary, opacity: text.trim() ? 1 : 0.4 }]}
          onPress={handleSend}
          disabled={!text.trim()}
        >
          <Send size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 12, borderBottomWidth: 1 },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 16 },
  headerRole: { fontSize: 11, marginTop: 1 },
  linkedBar: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 20, paddingVertical: 8 },
  linkedText: { fontSize: 11, flex: 1 },
  messagesContent: { padding: 20, paddingBottom: 16 },
  messageRow: { marginBottom: 10 },
  bubble: { maxWidth: '80%', borderRadius: 18, padding: 14 },
  senderName: { fontSize: 11, marginBottom: 4 },
  messageText: { fontSize: 14, lineHeight: 20 },
  messageTime: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
  inputBar: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 20, paddingVertical: 12, borderTopWidth: 1 },
  chatInput: { flex: 1, borderRadius: 24, paddingHorizontal: 18, paddingVertical: 12, fontSize: 14, borderWidth: 1 },
  sendButton: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
});
