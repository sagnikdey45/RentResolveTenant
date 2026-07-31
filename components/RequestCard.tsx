import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Clock, AlertTriangle, ChevronRight } from 'lucide-react-native';
import { StatusBadge } from './StatusBadge';
import { useTheme } from '@/context/ThemeContext';
import { SHADOWS } from '@/constants/theme';
import type { MaintenanceRequest } from '@/data/mockData';

interface RequestCardProps {
  request: MaintenanceRequest;
  onPress: () => void;
}

export function RequestCard({ request, onPress }: RequestCardProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.surface, opacity: pressed ? 0.95 : 1 },
        SHADOWS.card,
        request.isEmergency && { borderLeftWidth: 3, borderLeftColor: colors.danger },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.idRow}>
          <Text style={[styles.id, { color: colors.textMuted, fontFamily: 'Inter-Medium' }]}>{request.id}</Text>
          {request.isEmergency && (
            <View style={[styles.emergencyBadge, { backgroundColor: colors.dangerLight }]}>
              <AlertTriangle size={10} color={colors.danger} />
              <Text style={[styles.emergencyText, { color: colors.danger, fontFamily: 'Inter-Bold' }]}>URGENT</Text>
            </View>
          )}
        </View>
        <StatusBadge label={request.status} small />
      </View>
      <Text style={[styles.title, { color: colors.textPrimary, fontFamily: 'Inter-SemiBold' }]} numberOfLines={1}>
        {request.title}
      </Text>
      <View style={styles.metaRow}>
        <View style={[styles.categoryBadge, { backgroundColor: colors.surfaceSecondary }]}>
          <Text style={[styles.categoryText, { color: colors.textSecondary, fontFamily: 'Inter-Medium' }]}>{request.category}</Text>
        </View>
        <StatusBadge label={request.priority} type="priority" small />
      </View>
      <View style={styles.footer}>
        <View style={styles.dateRow}>
          <Clock size={12} color={colors.textMuted} />
          <Text style={[styles.dateText, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>{request.submittedDate}</Text>
        </View>
        <ChevronRight size={16} color={colors.textMuted} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  id: {
    fontSize: 11,
  },
  emergencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  emergencyText: {
    fontSize: 9,
  },
  title: {
    fontSize: 15,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 11,
  },
});
