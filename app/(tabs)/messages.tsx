import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
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
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>Messages</Text>
          {unreadTotal > 0 && (
            <Text style={[styles.subtitle, { color: colors.primary, fontFamily: 'Inter-Medium' }]}>{unreadTotal} unread</Text>
          )}
        </View>
        <View style={[styles.headerIcon, { backgroundColor: colors.primaryLight }]}>
          <MessageCircle size={20} color={colors.primary} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {MOCK_CONVERSATIONS.map(conv => (
          <Pressable
            key={conv.id}
            style={({ pressed }) => [
              styles.convCard,
              {
                backgroundColor: colors.surface,
                opacity: pressed ? 0.95 : 1,
                borderLeftWidth: conv.unreadCount > 0 ? 3 : 0,
                borderLeftColor: conv.unreadCount > 0 ? colors.primary : 'transparent',
              },
              SHADOWS.card,
            ]}
            onPress={() => router.push({ pathname: '/conversation', params: { id: conv.id } })}
          >
            <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
              <Text style={[styles.avatarText, { color: colors.primary, fontFamily: 'Inter-Bold' }]}>
                {conv.participantName.split(' ').map((n: string) => n[0]).join('')}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={[styles.name, { color: colors.textPrimary, fontFamily: 'Inter-SemiBold' }]} numberOfLines={1}>
                  {conv.participantName}
                </Text>
                <Text style={[styles.time, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>
                  {conv.lastMessageTime.split(' ')[1]}
                </Text>
              </View>
              <Text style={[styles.role, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>{conv.participantRole}</Text>
              {conv.linkedRequestTitle && (
                <View style={styles.linkRow}>
                  <LinkIcon size={10} color={colors.primary} />
                  <Text style={[styles.linkText, { color: colors.primary, fontFamily: 'Inter-Medium' }]} numberOfLines={1}>
                    {conv.linkedRequestTitle}
                  </Text>
                </View>
              )}
              <Text style={[styles.preview, { color: conv.unreadCount > 0 ? colors.textPrimary : colors.textSecondary, fontFamily: conv.unreadCount > 0 ? 'Inter-SemiBold' : 'Inter-Regular' }]} numberOfLines={1}>
                {conv.lastMessage}
              </Text>
            </View>
            {conv.unreadCount > 0 && (
              <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                <Text style={[styles.badgeText, { fontFamily: 'Inter-Bold' }]}>{conv.unreadCount}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: { fontSize: 26 },
  subtitle: { fontSize: 13, marginTop: 2 },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: { paddingHorizontal: 20, paddingBottom: 24 },
  convCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 15 },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 15, flex: 1 },
  time: { fontSize: 11 },
  role: { fontSize: 11, marginTop: 1 },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  linkText: { fontSize: 11, flex: 1 },
  preview: { fontSize: 13, marginTop: 4 },
  badge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 10, color: '#FFFFFF' },
});
