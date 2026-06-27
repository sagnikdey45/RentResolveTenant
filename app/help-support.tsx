import { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronDown, ChevronUp, Phone, Mail, MessageSquare, HelpCircle } from 'lucide-react-native';
import { FAQ_ITEMS } from '@/data/mockData';
import { PrimaryButton } from '@/components/PrimaryButton';

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Pressable className="bg-white rounded-lg p-4 mb-2 border border-slate-100" onPress={() => setOpen(!open)}>
      <View className="flex-row justify-between items-center">
        <Text className="text-[13px] font-semibold text-slate-900 flex-1 mr-2">{question}</Text>
        {open ? <ChevronUp size={18} color="#94A3B8" /> : <ChevronDown size={18} color="#94A3B8" />}
      </View>
      {open && (
        <Text className="text-[13px] text-slate-600 leading-[22px] mt-3 pt-3 border-t border-slate-100">{answer}</Text>
      )}
    </Pressable>
  );
}

export default function HelpSupportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleContact = () => {
    const msg = 'Contact support feature will be available with backend integration.';
    Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Support', msg);
  };

  return (
    <View className="flex-1 bg-slate-50">
      <View className="flex-row items-center justify-between px-5 pb-4 bg-white border-b border-slate-100" style={{ paddingTop: insets.top }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center"><ArrowLeft size={22} color="#0F172A" /></Pressable>
        <Text className="text-[17px] font-bold text-slate-900">Help & Support</Text>
        <View className="w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        <View className="bg-white rounded-2xl p-6 items-center mb-6 shadow-sm">
          <HelpCircle size={36} color="#2563EB" />
          <Text className="text-xl font-bold text-slate-900 mt-3">How can we help?</Text>
          <Text className="text-[13px] text-slate-400 text-center mt-2 leading-5">
            Find answers to common questions or contact our support team
          </Text>
        </View>

        <Text className="text-[15px] font-bold text-slate-900 mb-3 mt-4">Frequently Asked Questions</Text>
        {FAQ_ITEMS.map((item, i) => (
          <AccordionItem key={i} question={item.question} answer={item.answer} />
        ))}

        <Text className="text-[15px] font-bold text-slate-900 mb-3 mt-4">Contact Support</Text>
        <View className="bg-white rounded-xl p-4 gap-4">
          <ContactRow icon={<Phone size={18} color="#2563EB" />} label="Emergency Helpline" value="+91 112" />
          <ContactRow icon={<Phone size={18} color="#059669" />} label="Property Manager" value="+91 97654 32100" />
          <ContactRow icon={<Mail size={18} color="#0284C7" />} label="Email Support" value="support@rentresolve.in" />
        </View>

        <PrimaryButton
          title="Contact Support Team"
          icon={<MessageSquare size={18} color="#FFFFFF" />}
          onPress={handleContact}
          style={{ marginTop: 16 }}
        />

        <View className="bg-blue-50 rounded-xl p-5 mt-6">
          <Text className="text-[15px] font-bold text-blue-600 mb-2">Platform Usage Guide</Text>
          <Text className="text-[13px] text-slate-600 leading-[22px]">
            Rent Resolve helps you manage all your rental needs in one place. Use the Dashboard to get an overview,
            Requests to manage maintenance issues, Messages to communicate with your landlord, and Rent to track payments.
            Access your lease documents and property information from the Profile tab.
          </Text>
        </View>
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}

function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <View className="flex-row items-center gap-3">
      {icon}
      <View className="flex-1">
        <Text className="text-[11px] text-slate-400">{label}</Text>
        <Text className="text-[13px] font-semibold text-slate-900 mt-0.5">{value}</Text>
      </View>
    </View>
  );
}
