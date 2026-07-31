import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Plus, RefreshCw, MessageSquare, UserCheck, Calendar,
  Wallet, CheckCircle, RotateCcw, AlertTriangle, FileText, Clock,
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_ACTIVITY } from '@/data/mockData';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SHADOWS } from '@/constants/theme';

const TYPE_CONFIG: Record<string, { icon: any; color: string }> = {
  request_created: { icon: Plus, color: '#1E6B5A' },
  status_changed: { icon: RefreshCw, color: '#0284C7' },
  comment_added: { icon: MessageSquare, color: '#059669' },
  technician_assigned: { icon: UserCheck, color: '#0D9488' },
  visit_scheduled: { icon: Calendar, color: '#D97706' },
  rent_paid: { icon: Wallet, color: '#059669' },
  request_resolved: { icon: CheckCircle, color: '#16A34A' },
  request_reopened: { icon: RotateCcw, color: '#DC2626' },
  dispute_escalated: { icon: AlertTriangle, color: '#DC2626' },
  document_uploaded: { icon: FileText, color: '#0284C7' },
  feedback_submitted: { icon: CheckCircle, color: '#F59E0B' },
};

export default function ActivityHistoryScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Activity History" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {MOCK_ACTIVITY.map((item, i) => {
          const config = TYPE_CONFIG[item.type] || { icon: Clock, color: colors.textMuted };
          const Icon = config.icon;
          return (
            <View key={item.id} style={styles.timelineRow}>
              <View style={styles.timelineSide}>
                <View style={[styles.timelineDot, { backgroundColor: config.color + '18' }]}>
                  <Icon size={14} color={config.color} />
                </View>
                {i < MOCK_ACTIVITY.length - 1 && <View style={[styles.timelineLine, { backgroundColor: colors.borderLight }]} />}
              </View>
              <Pressable
                style={[styles.timelineCard, { backgroundColor: colors.surface }, SHADOWS.soft]}
                onPress={() => item.linkedRequestId && router.push({ pathname: '/request-detail', params: { id: item.linkedRequestId } })}
              >
                <Text style={[styles.timelineTitle, { color: colors.textPrimary, fontFamily: 'Inter-SemiBold' }]}>{item.title}</Text>
                <Text style={[styles.timelineDesc, { color: colors.textSecondary, fontFamily: 'Inter-Regular' }]}>{item.description}</Text>
                <Text style={[styles.timelineTime, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>{item.timestamp}</Text>
              </Pressable>
            </View>
          );
        })}
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  timelineRow: { flexDirection: 'row' },
  timelineSide: { width: 40, alignItems: 'center' },
  timelineDot: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  timelineLine: { width: 2, flex: 1, marginVertical: 2 },
  timelineCard: { flex: 1, borderRadius: 14, padding: 14, marginLeft: 12, marginBottom: 10 },
  timelineTitle: { fontSize: 14 },
  timelineDesc: { fontSize: 12, marginTop: 4, lineHeight: 18 },
  timelineTime: { fontSize: 11, marginTop: 6 },
});
