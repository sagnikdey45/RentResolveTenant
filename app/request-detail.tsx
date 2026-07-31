import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  User, Wrench, Calendar, Clock, MapPin,
  MessageSquare, RotateCcw, Star, AlertTriangle, Image as ImageIcon,
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_REQUESTS } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SHADOWS } from '@/constants/theme';

export default function RequestDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const request = MOCK_REQUESTS.find(r => r.id === id);

  if (!request) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScreenHeader title="Request Not Found" />
      </View>
    );
  }

  const isResolved = ['Resolved', 'Closed'].includes(request.status);
  const canEscalate = !isResolved && !['Escalated'].includes(request.status);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title={request.id} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>{request.title}</Text>
          <View style={styles.badgeRow}>
            <StatusBadge label={request.status} />
            <StatusBadge label={request.priority} type="priority" />
            {request.isEmergency && (
              <View style={[styles.urgentBadge, { backgroundColor: colors.dangerLight }]}>
                <AlertTriangle size={10} color={colors.danger} />
                <Text style={[styles.urgentText, { color: colors.danger, fontFamily: 'Inter-Bold' }]}>EMERGENCY</Text>
              </View>
            )}
          </View>
        </View>

        <View style={[styles.detailCard, { backgroundColor: colors.surface }, SHADOWS.card]}>
          <DetailRow icon={<Clock size={16} color={colors.textMuted} />} label="Submitted" value={request.submittedDate} colors={colors} />
          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
          <DetailRow icon={<Calendar size={16} color={colors.textMuted} />} label="Expected Resolution" value={request.expectedResolution} colors={colors} />
          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
          <DetailRow icon={<MapPin size={16} color={colors.textMuted} />} label="Property Area" value={request.propertyArea} colors={colors} />
          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
          <DetailRow icon={<Wrench size={16} color={colors.textMuted} />} label="Category" value={`${request.category} / ${request.subcategory}`} colors={colors} />
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>Description</Text>
        <Text style={[styles.description, { color: colors.textSecondary, fontFamily: 'Inter-Regular' }]}>{request.description}</Text>

        {(request.assignedTo || request.technicianName) && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>Assigned Team</Text>
            <View style={[styles.detailCard, { backgroundColor: colors.surface }, SHADOWS.card]}>
              {request.assignedTo && <DetailRow icon={<User size={16} color={colors.primary} />} label="Manager" value={request.assignedTo} colors={colors} />}
              {request.assignedTo && request.technicianName && <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />}
              {request.technicianName && <DetailRow icon={<Wrench size={16} color={colors.success} />} label="Technician" value={`${request.technicianName} (${request.technicianPhone})`} colors={colors} />}
            </View>
          </>
        )}

        {request.evidence.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>Evidence ({request.evidence.length})</Text>
            <View style={styles.evidenceGrid}>
              {request.evidence.map((file, i) => (
                <View key={i} style={[styles.evidenceItem, { backgroundColor: colors.surface, borderColor: colors.border }, SHADOWS.soft]}>
                  <ImageIcon size={22} color={colors.textMuted} />
                  <Text style={[styles.evidenceText, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]} numberOfLines={1}>{file}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {request.resolutionNotes && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>Resolution Notes</Text>
            <View style={[styles.resolutionCard, { backgroundColor: colors.successLight }]}>
              <Text style={[styles.resolutionText, { color: colors.success, fontFamily: 'Inter-Medium' }]}>{request.resolutionNotes}</Text>
            </View>
          </>
        )}

        <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>Status Timeline</Text>
        {request.timeline.map((event, i) => (
          <View key={event.id} style={styles.timelineItem}>
            <View style={styles.timelineLine}>
              <View style={[styles.timelineDot, { backgroundColor: i === 0 ? colors.primary : colors.border }]} />
              {i < request.timeline.length - 1 && <View style={[styles.timelineBar, { backgroundColor: colors.borderLight }]} />}
            </View>
            <View style={styles.timelineContent}>
              <Text style={[styles.timelineEvent, { color: colors.textPrimary, fontFamily: 'Inter-SemiBold' }]}>{event.event}</Text>
              <Text style={[styles.timelineDesc, { color: colors.textSecondary, fontFamily: 'Inter-Regular' }]}>{event.description}</Text>
              <Text style={[styles.timelineMeta, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>{event.date} - {event.actor}</Text>
            </View>
          </View>
        ))}

        <View style={styles.actions}>
          <PrimaryButton title="Message Landlord" variant="outline" icon={<MessageSquare size={18} color={colors.primary} />} onPress={() => router.push('/(tabs)/messages')} />
          {isResolved && (
            <>
              <PrimaryButton title="Reopen Request" variant="outline" icon={<RotateCcw size={18} color={colors.primary} />} onPress={() => router.push({ pathname: '/reopen-request', params: { id: request.id } })} />
              <PrimaryButton title="Submit Feedback" icon={<Star size={18} color="#FFFFFF" />} onPress={() => router.push({ pathname: '/feedback', params: { id: request.id } })} />
            </>
          )}
          {canEscalate && (
            <PrimaryButton title="Escalate Issue" variant="danger" icon={<AlertTriangle size={18} color="#FFFFFF" />} onPress={() => router.push({ pathname: '/dispute', params: { requestId: request.id } })} />
          )}
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

function DetailRow({ icon, label, value, colors }: { icon: React.ReactNode; label: string; value: string; colors: any }) {
  return (
    <View style={styles.detailRow}>
      {icon}
      <View style={{ flex: 1 }}>
        <Text style={[styles.detailLabel, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>{label}</Text>
        <Text style={[styles.detailValue, { color: colors.textPrimary, fontFamily: 'Inter-Medium' }]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  titleSection: { marginBottom: 20 },
  title: { fontSize: 20, marginBottom: 12 },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  urgentBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  urgentText: { fontSize: 10 },
  detailCard: { borderRadius: 16, padding: 16 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 4 },
  detailLabel: { fontSize: 11 },
  detailValue: { fontSize: 14, marginTop: 2 },
  divider: { height: 1, marginVertical: 10 },
  sectionTitle: { fontSize: 16, marginTop: 24, marginBottom: 12 },
  description: { fontSize: 14, lineHeight: 22 },
  evidenceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  evidenceItem: { borderRadius: 12, borderWidth: 1, padding: 16, alignItems: 'center', width: '30%', gap: 6 },
  evidenceText: { fontSize: 10, textAlign: 'center' },
  resolutionCard: { borderRadius: 14, padding: 16 },
  resolutionText: { fontSize: 13, lineHeight: 20 },
  timelineItem: { flexDirection: 'row', minHeight: 64 },
  timelineLine: { width: 24, alignItems: 'center' },
  timelineDot: { width: 10, height: 10, borderRadius: 5, marginTop: 3 },
  timelineBar: { width: 2, flex: 1, marginTop: 2 },
  timelineContent: { flex: 1, paddingLeft: 12, paddingBottom: 20 },
  timelineEvent: { fontSize: 13 },
  timelineDesc: { fontSize: 11, marginTop: 3, lineHeight: 16 },
  timelineMeta: { fontSize: 11, marginTop: 4 },
  actions: { gap: 10, marginTop: 24 },
});
