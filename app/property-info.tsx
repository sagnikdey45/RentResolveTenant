import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft, Building2, MapPin, User, Phone, Mail, Calendar,
  Wallet, Shield, Zap, Droplets, Flame, Wifi, Wrench,
} from 'lucide-react-native';
import { MOCK_PROPERTY } from '@/data/mockData';

export default function PropertyInfoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const p = MOCK_PROPERTY;

  return (
    <View className="flex-1 bg-slate-50">
      <View className="flex-row items-center justify-between px-5 pb-4 bg-white border-b border-slate-100" style={{ paddingTop: insets.top }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center"><ArrowLeft size={22} color="#0F172A" /></Pressable>
        <Text className="text-[17px] font-bold text-slate-900">Property Info</Text>
        <View className="w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        <View className="bg-white rounded-2xl p-6 items-center mb-6 shadow-sm">
          <Building2 size={32} color="#2563EB" />
          <Text className="text-xl font-bold text-slate-900 mt-3">{p.name}</Text>
          <Text className="text-[15px] text-blue-600 font-semibold mt-1">{p.unit}</Text>
          <View className="flex-row items-center gap-1 mt-2">
            <MapPin size={14} color="#94A3B8" />
            <Text className="text-[13px] text-slate-600 text-center">{p.fullAddress}</Text>
          </View>
        </View>

        <Text className="text-[15px] font-bold text-slate-900 mb-3">Contacts</Text>
        <View className="bg-white rounded-xl p-4 gap-3 mb-6 shadow-sm">
          <InfoRow icon={<User size={16} color="#2563EB" />} label="Landlord" value={p.landlordName} />
          <InfoRow icon={<Phone size={16} color="#2563EB" />} label="Landlord Phone" value={p.landlordPhone} />
          <InfoRow icon={<User size={16} color="#059669" />} label="Property Manager" value={p.propertyManagerName} />
          <InfoRow icon={<Phone size={16} color="#059669" />} label="Manager Phone" value={p.propertyManagerPhone} />
          <InfoRow icon={<Mail size={16} color="#059669" />} label="Manager Email" value={p.propertyManagerEmail} />
          <InfoRow icon={<Phone size={16} color="#DC2626" />} label="Emergency" value={p.emergencyContact} />
        </View>

        <Text className="text-[15px] font-bold text-slate-900 mb-3">Lease Details</Text>
        <View className="bg-white rounded-xl p-4 gap-3 mb-6 shadow-sm">
          <InfoRow icon={<Calendar size={16} color="#94A3B8" />} label="Lease Start" value={p.leaseStart} />
          <InfoRow icon={<Calendar size={16} color="#94A3B8" />} label="Lease End" value={p.leaseEnd} />
          <InfoRow icon={<Wallet size={16} color="#94A3B8" />} label="Monthly Rent" value={`Rs. ${p.monthlyRent.toLocaleString()}`} />
          <InfoRow icon={<Shield size={16} color="#94A3B8" />} label="Security Deposit" value={`Rs. ${p.securityDeposit.toLocaleString()}`} />
        </View>

        <Text className="text-[15px] font-bold text-slate-900 mb-3">Utility Responsibility</Text>
        <View className="bg-white rounded-xl p-4 gap-3 mb-6 shadow-sm">
          <UtilityRow icon={<Zap size={16} color="#F59E0B" />} label="Electricity" value={p.utilityResponsibility.electricity} />
          <UtilityRow icon={<Droplets size={16} color="#3B82F6" />} label="Water" value={p.utilityResponsibility.water} />
          <UtilityRow icon={<Flame size={16} color="#EF4444" />} label="Gas" value={p.utilityResponsibility.gas} />
          <UtilityRow icon={<Wifi size={16} color="#8B5CF6" />} label="Internet" value={p.utilityResponsibility.internet} />
          <UtilityRow icon={<Wrench size={16} color="#6B7280" />} label="Maintenance" value={p.utilityResponsibility.maintenance} />
        </View>
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <View className="flex-row items-center gap-3">
      {icon}
      <View className="flex-1">
        <Text className="text-[11px] text-slate-400">{label}</Text>
        <Text className="text-[13px] font-medium text-slate-900 mt-0.5">{value}</Text>
      </View>
    </View>
  );
}

function UtilityRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  const isTenant = value === 'Tenant';
  return (
    <View className="flex-row items-center gap-3">
      {icon}
      <Text className="flex-1 text-[13px] text-slate-900 font-medium">{label}</Text>
      <View className={`px-3 py-0.5 rounded-full ${isTenant ? 'bg-amber-50' : 'bg-emerald-50'}`}>
        <Text className={`text-[11px] font-semibold ${isTenant ? 'text-amber-600' : 'text-emerald-700'}`}>{value}</Text>
      </View>
    </View>
  );
}
