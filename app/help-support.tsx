import { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronDown, ChevronUp, Phone, Mail, MessageSquare, HelpCircle } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { FAQ_ITEMS } from '@/data/mockData';
import { PrimaryButton } from '@/components/PrimaryButton';

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const { colors } = useTheme();

  return (
    <Pressable
      className="rounded-lg p-4 mb-2 border"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
      onPress={() => setOpen(!open)}
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-[13px] font-semibold flex-1 mr-2" style={{ color: colors.textPrimary }}>{question}</Text>
        {open ? <ChevronUp size={18} color={colors.textMuted} /> : <ChevronDown size={18} color={colors.textMuted} />}
      </View>
      {open && (
        <Text
          className="text-[13px] leading-[22px] mt-3 pt-3 border-t"
          style={{
            color: colors.textSecondary,
            borderTopColor: colors.border,
          }}
        >{answer}</Text>
      )}
    </Pressable>
  );
}

export default function HelpSupportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const handleContact = () => {
    const msg = 'Contact support feature will be available with backend integration.';
    Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Support', msg);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View
        className="flex-row items-center justify-between px-5 pb-4 border-b"
        style={{
          paddingTop: insets.top,
          backgroundColor: colors.headerBg,
          borderBottomColor: colors.headerBorder,
        }}
      >
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <ArrowLeft size={22} color={colors.textPrimary} />
        </Pressable>
        <Text className="text-[17px] font-bold" style={{ color: colors.textPrimary }}>Help & Support</Text>
        <View className="w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        <View
          className="rounded-2xl p-6 items-center mb-6 shadow-sm"
          style={{ backgroundColor: colors.surface }}
        >
          <HelpCircle size={36} color={colors.primary} />
          <Text className="text-xl font-bold mt-3" style={{ color: colors.textPrimary }}>How can we help?</Text>
          <Text className="text-[13px] text-center mt-2 leading-5" style={{ color: colors.textMuted }}>
            Find answers to common questions or contact our support team
          </Text>
        </View>

        <Text className="text-[15px] font-bold mb-3 mt-4" style={{ color: colors.textPrimary }}>Frequently Asked Questions</Text>
        {FAQ_ITEMS.map((item, i) => (
          <AccordionItem key={i} question={item.question} answer={item.answer} />
        ))}

        <Text className="text-[15px] font-bold mb-3 mt-4" style={{ color: colors.textPrimary }}>Contact Support</Text>
        <View className="rounded-xl p-4 gap-4" style={{ backgroundColor: colors.surface }}>
          <ContactRow icon={<Phone size={18} color={colors.primary} />} label="Emergency Helpline" value="+91 112" />
          <ContactRow icon={<Phone size={18} color={colors.accent} />} label="Property Manager" value="+91 97654 32100" />
          <ContactRow icon={<Mail size={18} color={colors.info} />} label="Email Support" value="support@rentresolve.in" />
        </View>

        <PrimaryButton
          title="Contact Support Team"
          icon={<MessageSquare size={18} color="#FFFFFF" />}
          onPress={handleContact}
          style={{ marginTop: 16 }}
        />

        <View
          className="rounded-xl p-5 mt-6"
          style={{ backgroundColor: colors.primaryLight }}
        >
          <Text className="text-[15px] font-bold mb-2" style={{ color: colors.primary }}>Platform Usage Guide</Text>
          <Text className="text-[13px] leading-[22px]" style={{ color: colors.textSecondary }}>
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
  const { colors } = useTheme();

  return (
    <View className="flex-row items-center gap-3">
      {icon}
      <View className="flex-1">
        <Text className="text-[11px]" style={{ color: colors.textMuted }}>{label}</Text>
        <Text className="text-[13px] font-semibold mt-0.5" style={{ color: colors.textPrimary }}>{value}</Text>
      </View>
    </View>
  );
}
