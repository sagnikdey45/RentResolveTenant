import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_NOTIFICATIONS } from '@/data/mockData';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SHADOWS } from '@/constants/theme';

const TYPE_CONFIG: Record<string, { icon: any; color: string; bg: string }> = {
  info: { icon: Info, color: '#0284C7', bg: '#E0F2FE' },
  success: { icon: CheckCircle, color: '#059669', bg: '#D1FAE5' },
  warning: { icon: AlertTriangle, color: '#D97706', bg: '#FEF3C7' },
  error: { icon: AlertCircle, color: '#DC2626', bg: '#FEE2E2' },
};

export default function NotificationsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Notifications" />
      {unreadCount > 0 && (
        <View style={[styles.unreadBar, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.unreadText, { color: colors.primary, fontFamily: 'Inter-SemiBold' }]}>{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</Text>
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {MOCK_NOTIFICATIONS.map(notif => {
          const config = TYPE_CONFIG[notif.type];
          const Icon = config.icon;
          return (
            <Pressable
              key={notif.id}
              style={[
                styles.notifCard,
                { backgroundColor: colors.surface, borderLeftWidth: !notif.isRead ? 3 : 0, borderLeftColor: !notif.isRead ? colors.primary : 'transparent' },
                SHADOWS.card,
              ]}
              onPress={() => notif.linkedRequestId && router.push({ pathname: '/request-detail', params: { id: notif.linkedRequestId } })}
            >
              <View style={[styles.notifIcon, { backgroundColor: config.bg }]}>
                <Icon size={18} color={config.color} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.notifTitleRow}>
                  <Text style={[styles.notifTitle, { color: colors.textPrimary, fontFamily: 'Inter-SemiBold' }]} numberOfLines={1}>{notif.title}</Text>
                  {!notif.isRead && <View style={[styles.notifDot, { backgroundColor: colors.primary }]} />}
                </View>
                <Text style={[styles.notifMessage, { color: colors.textSecondary, fontFamily: 'Inter-Regular' }]} numberOfLines={2}>{notif.message}</Text>
                <Text style={[styles.notifTime, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>{notif.timestamp}</Text>
              </View>
            </Pressable>
          );
        })}
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  unreadBar: { paddingVertical: 8, paddingHorizontal: 20 },
  unreadText: { fontSize: 12 },
  scrollContent: { padding: 20 },
  notifCard: { borderRadius: 16, padding: 16, flexDirection: 'row', gap: 14, marginBottom: 10 },
  notifIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  notifTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  notifTitle: { fontSize: 14, flex: 1 },
  notifDot: { width: 8, height: 8, borderRadius: 4 },
  notifMessage: { fontSize: 12, lineHeight: 18, marginTop: 4 },
  notifTime: { fontSize: 11, marginTop: 6 },
});
