import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Wallet, CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_RENT_PAYMENTS, MOCK_PROPERTY } from '@/data/mockData';
import { SHADOWS } from '@/constants/theme';

export default function RentScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const pending = MOCK_RENT_PAYMENTS.find(r => r.status === 'Pending');
  const paidTotal = MOCK_RENT_PAYMENTS.filter(r => r.status === 'Paid').reduce((sum, r) => sum + r.amount, 0);
  const paidCount = MOCK_RENT_PAYMENTS.filter(r => r.status === 'Paid').length;

  const statusIcon = (status: string) => {
    if (status === 'Paid') return { icon: <CheckCircle size={16} color={colors.success} />, color: colors.success };
    if (status === 'Pending') return { icon: <Clock size={16} color={colors.warning} />, color: colors.warning };
    return { icon: <AlertTriangle size={16} color={colors.danger} />, color: colors.danger };
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <View style={[styles.heroSection, { backgroundColor: colors.gradientStart }]}>
        <View style={{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 20 }}>
          <Text style={[styles.heroTitle, { fontFamily: 'Inter-Bold' }]}>Rent Overview</Text>
          <View style={styles.heroStats}>
            <View style={styles.heroStatItem}>
              <Text style={[styles.heroStatLabel, { fontFamily: 'Inter-Regular' }]}>Monthly</Text>
              <Text style={[styles.heroStatValue, { fontFamily: 'Inter-ExtraBold' }]}>Rs. {MOCK_PROPERTY.monthlyRent.toLocaleString()}</Text>
            </View>
            <View style={[styles.heroDivider]} />
            <View style={styles.heroStatItem}>
              <Text style={[styles.heroStatLabel, { fontFamily: 'Inter-Regular' }]}>Deposit</Text>
              <Text style={[styles.heroStatValue, { fontFamily: 'Inter-ExtraBold' }]}>Rs. {MOCK_PROPERTY.securityDeposit.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {pending && (
          <View style={[styles.pendingCard, { backgroundColor: colors.surface }, SHADOWS.elevated]}>
            <View style={[styles.pendingIcon, { backgroundColor: colors.warningLight }]}>
              <Wallet size={20} color={colors.warning} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.pendingLabel, { color: colors.warning, fontFamily: 'Inter-Bold' }]}>Payment Due</Text>
              <Text style={[styles.pendingMonth, { color: colors.textPrimary, fontFamily: 'Inter-SemiBold' }]}>{pending.month}</Text>
              <Text style={[styles.pendingDate, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>Due by {pending.dueDate}</Text>
            </View>
            <Text style={[styles.pendingAmount, { color: colors.warning, fontFamily: 'Inter-ExtraBold' }]}>
              Rs. {pending.amount.toLocaleString()}
            </Text>
          </View>
        )}

        <View style={[styles.summaryCard, { backgroundColor: colors.successLight }, SHADOWS.soft]}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryLeft}>
              <TrendingUp size={18} color={colors.success} />
              <Text style={[styles.summaryLabel, { color: colors.success, fontFamily: 'Inter-SemiBold' }]}>Total Paid in 2026</Text>
            </View>
            <Text style={[styles.summaryValue, { color: colors.success, fontFamily: 'Inter-Bold' }]}>Rs. {paidTotal.toLocaleString()}</Text>
          </View>
          <View style={[styles.summaryBar, { backgroundColor: colors.success + '20' }]}>
            <View style={[styles.summaryBarFill, { backgroundColor: colors.success, width: `${(paidCount / 12) * 100}%` }]} />
          </View>
          <Text style={[styles.summaryNote, { color: colors.success, fontFamily: 'Inter-Regular' }]}>{paidCount}/12 months paid</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>Payment History</Text>

        {MOCK_RENT_PAYMENTS.map(payment => {
          const si = statusIcon(payment.status);
          return (
            <View key={payment.id} style={[styles.paymentCard, { backgroundColor: colors.surface }, SHADOWS.soft]}>
              <View style={[styles.paymentDot, { backgroundColor: si.color }]} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.paymentMonth, { color: colors.textPrimary, fontFamily: 'Inter-SemiBold' }]}>{payment.month}</Text>
                <Text style={[styles.paymentDate, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>
                  {payment.paidDate ? `Paid on ${payment.paidDate}` : `Due ${payment.dueDate}`}
                </Text>
              </View>
              <View style={styles.paymentRight}>
                <Text style={[styles.paymentAmount, { color: si.color, fontFamily: 'Inter-Bold' }]}>
                  Rs. {payment.amount.toLocaleString()}
                </Text>
                <View style={styles.paymentStatus}>
                  {si.icon}
                  <Text style={[styles.paymentStatusText, { color: si.color, fontFamily: 'Inter-SemiBold' }]}>{payment.status}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroTitle: { fontSize: 26, color: '#FFFFFF' },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    padding: 16,
  },
  heroStatItem: { flex: 1, alignItems: 'center' },
  heroStatLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  heroStatValue: { fontSize: 18, color: '#FFFFFF', marginTop: 4 },
  heroDivider: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.2)' },
  content: { paddingHorizontal: 20, paddingTop: 20 },
  pendingCard: {
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  pendingIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingLabel: { fontSize: 12 },
  pendingMonth: { fontSize: 15, marginTop: 2 },
  pendingDate: { fontSize: 11, marginTop: 2 },
  pendingAmount: { fontSize: 20 },
  summaryCard: { borderRadius: 16, padding: 16, marginBottom: 24 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  summaryLabel: { fontSize: 13 },
  summaryValue: { fontSize: 17 },
  summaryBar: { height: 6, borderRadius: 3, marginTop: 12 },
  summaryBarFill: { height: 6, borderRadius: 3 },
  summaryNote: { fontSize: 11, marginTop: 6 },
  sectionTitle: { fontSize: 18, marginBottom: 14 },
  paymentCard: {
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  paymentDot: { width: 8, height: 8, borderRadius: 4 },
  paymentMonth: { fontSize: 15 },
  paymentDate: { fontSize: 11, marginTop: 2 },
  paymentRight: { alignItems: 'flex-end' },
  paymentAmount: { fontSize: 15 },
  paymentStatus: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  paymentStatusText: { fontSize: 11 },
});
