import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft, Building2, MapPin, User, Phone, Mail, Calendar,
  Wallet, Shield, Zap, Droplets, Flame, Wifi, Wrench,
} from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_PROPERTY } from '@/data/mockData';

export default function PropertyInfoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const p = MOCK_PROPERTY;

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-row items-center justify-between px-5 pb-4 border-b" style={{ backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder, paddingTop: insets.top }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center"><ArrowLeft size={22} color={colors.textPrimary} /></Pressable>
        <Text className="text-[17px] font-bold" style={{ color: colors.textPrimary }}>Property Info</Text>
        <View className="w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        <View className="rounded-2xl p-6 items-center mb-6 shadow-sm" style={{ backgroundColor: colors.surface }}>
          <Building2 size={32} color={colors.primary} />
          <Text className="text-xl font-bold mt-3" style={{ color: colors.textPrimary }}>{p.name}</Text>
          <Text className="text-[15px] font-semibold mt-1" style={{ color: colors.primary }}>{p.unit}</Text>
          <View className="flex-row items-center gap-1 mt-2">
            <MapPin size={14} color={colors.textMuted} />
            <Text className="text-[13px] text-center" style={{ color: colors.textSecondary }}>{p.fullAddress}</Text>
          </View>
        </View>

        <Text className="text-[15px] font-bold mb-3" style={{ color: colors.textPrimary }}>Contacts</Text>
        <View className="rounded-xl p-4 gap-3 mb-6 shadow-sm" style={{ backgroundColor: colors.surface }}>
          <InfoRow icon={<User size={16} color={colors.primary} />} label="Landlord" value={p.landlordName} colors={colors} />
          <InfoRow icon={<Phone size={16} color={colors.primary} />} label="Landlord Phone" value={p.landlordPhone} colors={colors} />
          <InfoRow icon={<User size={16} color="#059669" />} label="Property Manager" value={p.propertyManagerName} colors={colors} />
          <InfoRow icon={<Phone size={16} color="#059669" />} label="Manager Phone" value={p.propertyManagerPhone} colors={colors} />
          <InfoRow icon={<Mail size={16} color="#059669" />} label="Manager Email" value={p.propertyManagerEmail} colors={colors} />
          <InfoRow icon={<Phone size={16} color="#DC2626" />} label="Emergency" value={p.emergencyContact} colors={colors} />
        </View>

        <Text className="text-[15px] font-bold mb-3" style={{ color: colors.textPrimary }}>Lease Details</Text>
        <View className="rounded-xl p-4 gap-3 mb-6 shadow-sm" style={{ backgroundColor: colors.surface }}>
          <InfoRow icon={<Calendar size={16} color={colors.textMuted} />} label="Lease Start" value={p.leaseStart} colors={colors} />
          <InfoRow icon={<Calendar size={16} color={colors.textMuted} />} label="Lease End" value={p.leaseEnd} colors={colors} />
          <InfoRow icon={<Wallet size={16} color={colors.textMuted} />} label="Monthly Rent" value={`Rs. ${p.monthlyRent.toLocaleString()}`} colors={colors} />
          <InfoRow icon={<Shield size={16} color={colors.textMuted} />} label="Security Deposit" value={`Rs. ${p.securityDeposit.toLocaleString()}`} colors={colors} />
        </View>

        <Text className="text-[15px] font-bold mb-3" style={{ color: colors.textPrimary }}>Utility Responsibility</Text>
        <View className="rounded-xl p-4 gap-3 mb-6 shadow-sm" style={{ backgroundColor: colors.surface }}>
          <UtilityRow icon={<Zap size={16} color="#F59E0B" />} label="Electricity" value={p.utilityResponsibility.electricity} colors={colors} />
          <UtilityRow icon={<Droplets size={16} color="#3B82F6" />} label="Water" value={p.utilityResponsibility.water} colors={colors} />
          <UtilityRow icon={<Flame size={16} color="#EF4444" />} label="Gas" value={p.utilityResponsibility.gas} colors={colors} />
          <UtilityRow icon={<Wifi size={16} color="#8B5CF6" />} label="Internet" value={p.utilityResponsibility.internet} colors={colors} />
          <UtilityRow icon={<Wrench size={16} color="#6B7280" />} label="Maintenance" value={p.utilityResponsibility.maintenance} colors={colors} />
        </View>
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}

function InfoRow({ icon, label, value, colors }: { icon: React.ReactNode; label: string; value: string; colors: any }) {
  return (
    <View className="flex-row items-center gap-3">
      {icon}
      <View className="flex-1">
        <Text className="text-[11px]" style={{ color: colors.textMuted }}>{label}</Text>
        <Text className="text-[13px] font-medium mt-0.5" style={{ color: colors.textPrimary }}>{value}</Text>
      </View>
    </View>
  );
}

function UtilityRow({ icon, label, value, colors }: { icon: React.ReactNode; label: string; value: string; colors: any }) {
  const isTenant = value === 'Tenant';
  return (
    <View className="flex-row items-center gap-3">
      {icon}
      <Text className="flex-1 text-[13px] font-medium" style={{ color: colors.textPrimary }}>{label}</Text>
      <View className="px-3 py-0.5 rounded-full" style={{ backgroundColor: isTenant ? '#FEF08A' : '#DCFCE7' }}>
        <Text className="text-[11px] font-semibold" style={{ color: isTenant ? '#B45309' : '#047857' }}>{value}</Text>
      </View>
    </View>
  );
}
