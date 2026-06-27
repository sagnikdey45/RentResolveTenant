import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Wallet, CheckCircle, Clock, AlertTriangle } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_RENT_PAYMENTS, MOCK_PROPERTY } from '@/data/mockData';

export default function RentScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const pending = MOCK_RENT_PAYMENTS.find(r => r.status === 'Pending');
  const paidTotal = MOCK_RENT_PAYMENTS.filter(r => r.status === 'Paid').reduce((sum, r) => sum + r.amount, 0);

  const statusIcon = (status: string) => {
    if (status === 'Paid') return { icon: <CheckCircle size={16} color={colors.accent} />, color: colors.accent };
    if (status === 'Pending') return { icon: <Clock size={16} color={colors.warning} />, color: colors.warning };
    return { icon: <AlertTriangle size={16} color={colors.danger} />, color: colors.danger };
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      className="flex-1 px-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 24 }}
    >
      <View className="mb-5">
        <Text style={{ color: colors.textPrimary }} className="text-2xl font-extrabold">Rent Overview</Text>
      </View>

      <View style={{ backgroundColor: colors.surface }} className="rounded-xl p-5 mb-4">
        <View className="flex-row items-center">
          <View className="flex-1 items-center">
            <Text style={{ color: colors.textMuted }} className="text-[11px] mb-1">Monthly Rent</Text>
            <Text style={{ color: colors.textPrimary }} className="text-[17px] font-bold">
              Rs. {MOCK_PROPERTY.monthlyRent.toLocaleString()}
            </Text>
          </View>
          <View style={{ backgroundColor: colors.border }} className="w-px h-10" />
          <View className="flex-1 items-center">
            <Text style={{ color: colors.textMuted }} className="text-[11px] mb-1">Security Deposit</Text>
            <Text style={{ color: colors.textPrimary }} className="text-[17px] font-bold">
              Rs. {MOCK_PROPERTY.securityDeposit.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {pending && (
        <View style={{ backgroundColor: colors.warningLight, borderColor: colors.warning + '40' }} className="rounded-xl p-4 mb-4 border">
          <View className="flex-row items-center gap-2 mb-3">
            <Wallet size={20} color={colors.warning} />
            <Text style={{ color: colors.warning }} className="text-[13px] font-bold">Payment Due</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <View>
              <Text style={{ color: colors.textPrimary }} className="text-[15px] font-semibold">{pending.month}</Text>
              <Text style={{ color: colors.textSecondary }} className="text-[11px] mt-0.5">Due by {pending.dueDate}</Text>
            </View>
            <Text style={{ color: colors.warning }} className="text-xl font-extrabold">
              Rs. {pending.amount.toLocaleString()}
            </Text>
          </View>
        </View>
      )}

      <View style={{ backgroundColor: colors.successLight }} className="rounded-xl p-4 flex-row justify-between items-center mb-6">
        <Text style={{ color: colors.success }} className="text-[13px] font-semibold">Total Paid in 2026</Text>
        <Text style={{ color: colors.success }} className="text-[17px] font-bold">Rs. {paidTotal.toLocaleString()}</Text>
      </View>

      <Text style={{ color: colors.textPrimary }} className="text-[17px] font-bold mb-4">Payment History</Text>
      {MOCK_RENT_PAYMENTS.map(payment => {
        const si = statusIcon(payment.status);
        return (
          <View key={payment.id} style={{ backgroundColor: colors.surface }} className="rounded-xl p-4 flex-row justify-between items-center mb-3">
            <View>
              <Text style={{ color: colors.textPrimary }} className="text-[15px] font-semibold">{payment.month}</Text>
              <Text style={{ color: colors.textMuted }} className="text-[11px] mt-0.5">
                {payment.paidDate ? `Paid on ${payment.paidDate}` : `Due ${payment.dueDate}`}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-[15px] font-bold" style={{ color: si.color }}>
                Rs. {payment.amount.toLocaleString()}
              </Text>
              <View className="flex-row items-center gap-1 mt-1">
                {si.icon}
                <Text className="text-[11px] font-semibold" style={{ color: si.color }}>{payment.status}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
