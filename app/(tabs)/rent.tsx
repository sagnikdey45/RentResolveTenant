import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Wallet, CheckCircle, Clock, AlertTriangle } from 'lucide-react-native';
import { MOCK_RENT_PAYMENTS, MOCK_PROPERTY } from '@/data/mockData';

const STATUS_ICON: Record<string, { icon: React.ReactNode; color: string }> = {
  Paid: { icon: <CheckCircle size={16} color="#059669" />, color: '#059669' },
  Pending: { icon: <Clock size={16} color="#D97706" />, color: '#D97706' },
  Late: { icon: <AlertTriangle size={16} color="#DC2626" />, color: '#DC2626' },
  Overdue: { icon: <AlertTriangle size={16} color="#DC2626" />, color: '#DC2626' },
};

export default function RentScreen() {
  const insets = useSafeAreaInsets();
  const pending = MOCK_RENT_PAYMENTS.find(r => r.status === 'Pending');
  const paidTotal = MOCK_RENT_PAYMENTS.filter(r => r.status === 'Paid').reduce((sum, r) => sum + r.amount, 0);

  return (
    <ScrollView
      className="flex-1 bg-slate-50 px-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 120 }}
    >
      <View className="mb-5">
        <Text className="text-2xl font-extrabold text-slate-900">Rent Overview</Text>
      </View>

      <View className="bg-white rounded-xl p-5 mb-4 shadow-sm">
        <View className="flex-row items-center">
          <View className="flex-1 items-center">
            <Text className="text-[11px] text-slate-400 mb-1">Monthly Rent</Text>
            <Text className="text-[17px] font-bold text-slate-900">
              Rs. {MOCK_PROPERTY.monthlyRent.toLocaleString()}
            </Text>
          </View>
          <View className="w-px h-10 bg-slate-200" />
          <View className="flex-1 items-center">
            <Text className="text-[11px] text-slate-400 mb-1">Security Deposit</Text>
            <Text className="text-[17px] font-bold text-slate-900">
              Rs. {MOCK_PROPERTY.securityDeposit.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {pending && (
        <View className="bg-amber-50 rounded-xl p-4 mb-4 border border-amber-200">
          <View className="flex-row items-center gap-2 mb-3">
            <Wallet size={20} color="#D97706" />
            <Text className="text-[13px] font-bold text-amber-600">Payment Due</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-[15px] font-semibold text-slate-900">{pending.month}</Text>
              <Text className="text-[11px] text-slate-600 mt-0.5">Due by {pending.dueDate}</Text>
            </View>
            <Text className="text-xl font-extrabold text-amber-600">
              Rs. {pending.amount.toLocaleString()}
            </Text>
          </View>
        </View>
      )}

      <View className="bg-emerald-50 rounded-xl p-4 flex-row justify-between items-center mb-6">
        <Text className="text-[13px] font-semibold text-emerald-700">Total Paid in 2026</Text>
        <Text className="text-[17px] font-bold text-emerald-700">Rs. {paidTotal.toLocaleString()}</Text>
      </View>

      <Text className="text-[17px] font-bold text-slate-900 mb-4">Payment History</Text>
      {MOCK_RENT_PAYMENTS.map(payment => {
        const statusInfo = STATUS_ICON[payment.status] || STATUS_ICON.Pending;
        return (
          <View key={payment.id} className="bg-white rounded-xl p-4 flex-row justify-between items-center mb-3 shadow-sm">
            <View>
              <Text className="text-[15px] font-semibold text-slate-900">{payment.month}</Text>
              <Text className="text-[11px] text-slate-400 mt-0.5">
                {payment.paidDate ? `Paid on ${payment.paidDate}` : `Due ${payment.dueDate}`}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-[15px] font-bold" style={{ color: statusInfo.color }}>
                Rs. {payment.amount.toLocaleString()}
              </Text>
              <View className="flex-row items-center gap-1 mt-1">
                {statusInfo.icon}
                <Text className="text-[11px] font-semibold" style={{ color: statusInfo.color }}>
                  {payment.status}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
