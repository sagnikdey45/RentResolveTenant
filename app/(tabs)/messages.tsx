import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinkIcon, MessageCircle } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_CONVERSATIONS } from '@/data/mockData';
import { SHADOWS } from '@/constants/theme';

export default function MessagesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const unreadTotal = MOCK_CONVERSATIONS.reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>Messages</Text>
          {unreadTotal > 0 && (
            <View style={styles.unreadRow}>
              <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.subtitle, { color: colors.primary, fontFamily: 'Inter-SemiBold' }]}>{unreadTotal} unread messages</Text>
            </View>
          )}
        </View>
        <View style={[styles.headerIcon, { backgroundColor: colors.primaryGlow }]}>
          <MessageCircle size={20} color={colors.primary} />
        </View>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {MOCK_CONVERSATIONS.map((conv, i) => (
          <Animated.View key={conv.id} entering={FadeInUp.delay(i * 80).duration(400)}>
            <Pressable
              style={({ pressed }) => [
                styles.convCard,
                {
                  backgroundColor: colors.surface,
                  transform: [{ scale: pressed ? 0.985 : 1 }],
                  borderLeftWidth: conv.unreadCount > 0 ? 3 : 0,
                  borderLeftColor: conv.unreadCount > 0 ? colors.primary : 'transparent',
                },
                SHADOWS.card,
              ]}
              onPress={() => router.push({ pathname: '/conversation', params: { id: conv.id } })}
            >
              <View style={[styles.avatar, { backgroundColor: colors.primaryGlow }]}>
                <Text style={[styles.avatarText, { color: colors.primary, fontFamily: 'Inter-Bold' }]}>
                  {conv.participantName.split(' ').map((n: string) => n[0]).join('')}
                </Text>
                {conv.unreadCount > 0 && <View style={styles.onlineDot} />}
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameRow}>
                  <Text style={[styles.name, { color: colors.textPrimary, fontFamily: 'Inter-SemiBold' }]} numberOfLines={1}>{conv.participantName}</Text>
                  <Text style={[styles.time, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>{conv.lastMessageTime.split(' ')[1]}</Text>
                </View>
                <Text style={[styles.role, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>{conv.participantRole}</Text>
                {conv.linkedRequestTitle && (
                  <View style={[styles.linkRow, { backgroundColor: colors.primaryGlow }]}>
                    <LinkIcon size={9} color={colors.primary} />
                    <Text style={[styles.linkText, { color: colors.primary, fontFamily: 'Inter-Medium' }]} numberOfLines={1}>{conv.linkedRequestTitle}</Text>
                  </View>
                )}
                <Text
                  style={[
                    styles.preview,
                    {
                      color: conv.unreadCount > 0 ? colors.textPrimary : colors.textSecondary,
                      fontFamily: conv.unreadCount > 0 ? 'Inter-SemiBold' : 'Inter-Regular',
                    },
                  ]}
                  numberOfLines={1}
                >
                  {conv.lastMessage}
                </Text>
              </View>
              {conv.unreadCount > 0 && (
                <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.badgeText, { fontFamily: 'Inter-Bold' }]}>{conv.unreadCount}</Text>
                </View>
              )}
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: 28, letterSpacing: -0.5 },
  unreadRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  unreadDot: { width: 6, height: 6, borderRadius: 3 },
  subtitle: { fontSize: 13 },
  headerIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  listContent: { paddingHorizontal: 20, paddingBottom: 24 },
  convCard: { borderRadius: 20, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 10 },
  avatar: { width: 52, height: 52, borderRadius: 18, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  avatarText: { fontSize: 16 },
  onlineDot: { position: 'absolute', bottom: -1, right: -1, width: 12, height: 12, borderRadius: 6, backgroundColor: '#34D399', borderWidth: 2, borderColor: '#FFFFFF' },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 15, flex: 1, letterSpacing: -0.1 },
  time: { fontSize: 11 },
  role: { fontSize: 11, marginTop: 1 },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  linkText: { fontSize: 10, maxWidth: 180 },
  preview: { fontSize: 13, marginTop: 6, lineHeight: 18 },
  badge: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 10, color: '#FFFFFF' },
});
