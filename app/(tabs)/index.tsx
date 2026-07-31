import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Plus, ClipboardList, Wallet, AlertTriangle, Bell,
  Clock, CheckCircle, AlertCircle, BarChart3, Megaphone,
  ChevronRight, ArrowRight,
} from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_REQUESTS, MOCK_ANNOUNCEMENTS, MOCK_ACTIVITY, MOCK_PROPERTY, MOCK_RENT_PAYMENTS } from '@/data/mockData';
import { StatCard } from '@/components/StatCard';
import { SectionHeader } from '@/components/SectionHeader';
import { SHADOWS } from '@/constants/theme';

export default function DashboardScreen() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const total = MOCK_REQUESTS.length;
  const open = MOCK_REQUESTS.filter(r => ['Submitted', 'Under Review'].includes(r.status)).length;
  const inProgress = MOCK_REQUESTS.filter(r => ['Approved', 'Assigned', 'In Progress'].includes(r.status)).length;
  const resolved = MOCK_REQUESTS.filter(r => ['Resolved', 'Closed'].includes(r.status)).length;
  const nextRent = MOCK_RENT_PAYMENTS.find(r => r.status === 'Pending');
  const emergencyRequests = MOCK_REQUESTS.filter(r => r.isEmergency && !['Resolved', 'Closed'].includes(r.status));
  const recentActivity = MOCK_ACTIVITY.slice(0, 3);
  const latestAnnouncements = MOCK_ANNOUNCEMENTS.slice(0, 2);

  const greetingTime = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <View style={[styles.heroSection, { backgroundColor: colors.gradientStart }]}>
        <View style={{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 24 }}>
          <View style={styles.heroTopRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.greeting, { fontFamily: 'Inter-Regular' }]}>{greetingTime()},</Text>
              <Text style={[styles.userName, { fontFamily: 'Inter-Bold' }]}>{user?.name || 'Tenant'}</Text>
              <View style={styles.propertyPill}>
                <Text style={[styles.propertyText, { fontFamily: 'Inter-Medium' }]}>
                  {MOCK_PROPERTY.name} - {MOCK_PROPERTY.unit}
                </Text>
              </View>
            </View>
            <Pressable
              style={styles.bellButton}
              onPress={() => router.push('/notifications')}
            >
              <Bell size={22} color="#FFFFFF" />
              <View style={styles.bellDot} />
            </Pressable>
          </View>
        </View>

        {nextRent && (
          <View style={[styles.rentCard, SHADOWS.elevated]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rentLabel, { color: colors.textMuted, fontFamily: 'Inter-Medium' }]}>Upcoming Rent</Text>
              <Text style={[styles.rentAmount, { color: colors.textPrimary, fontFamily: 'Inter-ExtraBold' }]}>
                Rs. {nextRent.amount.toLocaleString()}
              </Text>
              <Text style={[styles.rentDue, { color: colors.warning, fontFamily: 'Inter-Medium' }]}>Due by {nextRent.dueDate}</Text>
            </View>
            <Pressable
              style={[styles.rentButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/(tabs)/rent')}
            >
              <Text style={[styles.rentButtonText, { fontFamily: 'Inter-SemiBold' }]}>View</Text>
              <ArrowRight size={14} color="#FFFFFF" />
            </Pressable>
          </View>
        )}
      </View>

      <View style={styles.content}>
        {emergencyRequests.length > 0 && (
          <Pressable
            style={[styles.emergencyBanner, { backgroundColor: colors.dangerLight, borderColor: colors.danger + '30' }]}
            onPress={() => router.push({ pathname: '/request-detail', params: { id: emergencyRequests[0].id } })}
          >
            <View style={[styles.emergencyIcon, { backgroundColor: colors.danger }]}>
              <AlertTriangle size={16} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.emergencyTitle, { color: colors.danger, fontFamily: 'Inter-Bold' }]}>
                {emergencyRequests.length} Emergency {emergencyRequests.length === 1 ? 'Issue' : 'Issues'}
              </Text>
              <Text style={[styles.emergencyDesc, { color: colors.danger, fontFamily: 'Inter-Regular' }]}>{emergencyRequests[0].title}</Text>
            </View>
            <ChevronRight size={18} color={colors.danger} />
          </Pressable>
        )}

        <View style={styles.statsRow}>
          <StatCard label="Total" value={total} color="#2563EB" icon={<BarChart3 size={18} color="#2563EB" />} />
          <StatCard label="Open" value={open} color="#0284C7" icon={<AlertCircle size={18} color="#0284C7" />} />
          <StatCard label="In Progress" value={inProgress} color="#D97706" icon={<Clock size={18} color="#D97706" />} />
          <StatCard label="Resolved" value={resolved} color="#059669" icon={<CheckCircle size={18} color="#059669" />} />
        </View>

        <SectionHeader title="Quick Actions" />
        <View style={styles.actionsGrid}>
          <QuickAction colors={colors} icon={<Plus size={20} color={colors.primary} />} label="Raise Request" onPress={() => router.push('/create-request')} />
          <QuickAction colors={colors} icon={<ClipboardList size={20} color={colors.accent} />} label="View Requests" onPress={() => router.push('/(tabs)/requests')} />
          <QuickAction colors={colors} icon={<Wallet size={20} color={colors.warning} />} label="Rent Overview" onPress={() => router.push('/(tabs)/rent')} />
          <QuickAction colors={colors} icon={<AlertTriangle size={20} color={colors.danger} />} label="Raise Dispute" onPress={() => router.push('/dispute')} />
        </View>

        <SectionHeader title="Recent Activity" actionLabel="View All" onAction={() => router.push('/activity-history')} />
        {recentActivity.map((item, i) => (
          <Pressable
            key={item.id}
            style={[styles.activityItem, { backgroundColor: colors.surface }, SHADOWS.soft]}
            onPress={() => item.linkedRequestId && router.push({ pathname: '/request-detail', params: { id: item.linkedRequestId } })}
          >
            <View style={[styles.activityDot, { backgroundColor: i === 0 ? colors.primary : colors.textMuted }]} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.activityTitle, { color: colors.textPrimary, fontFamily: 'Inter-SemiBold' }]}>{item.title}</Text>
              <Text style={[styles.activityDesc, { color: colors.textSecondary, fontFamily: 'Inter-Regular' }]}>{item.description}</Text>
              <Text style={[styles.activityTime, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>{item.timestamp}</Text>
            </View>
          </Pressable>
        ))}

        <SectionHeader title="Announcements" actionLabel="View All" onAction={() => router.push('/announcements')} />
        {latestAnnouncements.map(ann => (
          <View key={ann.id} style={[styles.announcementCard, { backgroundColor: colors.surface }, SHADOWS.soft]}>
            <View style={styles.announcementHeader}>
              <View style={[styles.announcementIcon, { backgroundColor: (ann.priority === 'High' ? colors.danger : colors.warning) + '14' }]}>
                <Megaphone size={14} color={ann.priority === 'High' ? colors.danger : colors.warning} />
              </View>
              <Text style={[styles.announcementTitle, { color: colors.textPrimary, fontFamily: 'Inter-SemiBold' }]} numberOfLines={1}>{ann.title}</Text>
            </View>
            <Text style={[styles.announcementBody, { color: colors.textSecondary, fontFamily: 'Inter-Regular' }]} numberOfLines={2}>{ann.message}</Text>
            <Text style={[styles.announcementMeta, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>{ann.date} - {ann.postedBy}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function QuickAction({ colors, icon, label, onPress }: { colors: any; icon: React.ReactNode; label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.quickAction,
        { backgroundColor: colors.surface, opacity: pressed ? 0.9 : 1 },
        SHADOWS.card,
      ]}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: colors.surfaceSecondary }]}>{icon}</View>
      <Text style={[styles.quickActionLabel, { color: colors.textPrimary, fontFamily: 'Inter-SemiBold' }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingBottom: 48,
    position: 'relative',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
  },
  userName: {
    fontSize: 26,
    color: '#FFFFFF',
    marginTop: 2,
  },
  propertyPill: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
  },
  propertyText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 11,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  rentCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -4,
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: -30,
    left: 0,
    right: 0,
  },
  rentLabel: {
    fontSize: 12,
  },
  rentAmount: {
    fontSize: 24,
    marginTop: 4,
  },
  rentDue: {
    fontSize: 12,
    marginTop: 4,
  },
  rentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  rentButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  emergencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
  },
  emergencyIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyTitle: {
    fontSize: 13,
  },
  emergencyDesc: {
    fontSize: 11,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAction: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    flexGrow: 1,
    flexBasis: '46%',
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickActionLabel: {
    fontSize: 13,
  },
  activityItem: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    marginBottom: 8,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 5,
  },
  activityTitle: {
    fontSize: 13,
  },
  activityDesc: {
    fontSize: 11,
    marginTop: 3,
    lineHeight: 16,
  },
  activityTime: {
    fontSize: 11,
    marginTop: 4,
  },
  announcementCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  announcementIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  announcementTitle: {
    fontSize: 14,
    flex: 1,
  },
  announcementBody: {
    fontSize: 12,
    lineHeight: 18,
  },
  announcementMeta: {
    fontSize: 11,
    marginTop: 8,
  },
});
