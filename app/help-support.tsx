import { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Platform, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronDown, ChevronUp, Phone, Mail, MessageSquare, HelpCircle } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { FAQ_ITEMS } from '@/data/mockData';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SHADOWS } from '@/constants/theme';

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const { colors } = useTheme();

  return (
    <Pressable style={[styles.faqItem, { backgroundColor: colors.surface, borderColor: colors.border }, SHADOWS.soft]} onPress={() => setOpen(!open)}>
      <View style={styles.faqHeader}>
        <Text style={[styles.faqQuestion, { color: colors.textPrimary, fontFamily: 'Inter-SemiBold' }]}>{question}</Text>
        {open ? <ChevronUp size={18} color={colors.textMuted} /> : <ChevronDown size={18} color={colors.textMuted} />}
      </View>
      {open && (
        <Text style={[styles.faqAnswer, { color: colors.textSecondary, borderTopColor: colors.borderLight, fontFamily: 'Inter-Regular' }]}>{answer}</Text>
      )}
    </Pressable>
  );
}

export default function HelpSupportScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const handleContact = () => {
    const msg = 'Contact support feature will be available with backend integration.';
    Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Support', msg);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Help & Support" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.heroCard, { backgroundColor: colors.surface }, SHADOWS.elevated]}>
          <View style={[styles.heroIcon, { backgroundColor: colors.primaryLight }]}>
            <HelpCircle size={28} color={colors.primary} />
          </View>
          <Text style={[styles.heroTitle, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>How can we help?</Text>
          <Text style={[styles.heroSubtitle, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>Find answers or contact our support team</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>FAQ</Text>
        {FAQ_ITEMS.map((item, i) => (
          <AccordionItem key={i} question={item.question} answer={item.answer} />
        ))}

        <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>Contact Support</Text>
        <View style={[styles.contactCard, { backgroundColor: colors.surface }, SHADOWS.card]}>
          <ContactRow icon={<Phone size={18} color={colors.danger} />} label="Emergency Helpline" value="+91 112" colors={colors} />
          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
          <ContactRow icon={<Phone size={18} color={colors.success} />} label="Property Manager" value="+91 97654 32100" colors={colors} />
          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
          <ContactRow icon={<Mail size={18} color={colors.accent} />} label="Email Support" value="support@rentresolve.in" colors={colors} />
        </View>

        <PrimaryButton title="Contact Support Team" icon={<MessageSquare size={18} color="#FFFFFF" />} onPress={handleContact} style={{ marginTop: 16 }} />

        <View style={[styles.guideCard, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.guideTitle, { color: colors.primary, fontFamily: 'Inter-Bold' }]}>Platform Usage Guide</Text>
          <Text style={[styles.guideText, { color: colors.textSecondary, fontFamily: 'Inter-Regular' }]}>
            Rent Resolve helps you manage all your rental needs in one place. Use the Dashboard to get an overview,
            Requests to manage maintenance issues, Messages to communicate with your landlord, and Rent to track payments.
            Access your lease documents and property information from the Profile tab.
          </Text>
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

function ContactRow({ icon, label, value, colors }: { icon: React.ReactNode; label: string; value: string; colors: any }) {
  return (
    <View style={styles.contactRow}>
      {icon}
      <View style={{ flex: 1 }}>
        <Text style={[styles.contactLabel, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>{label}</Text>
        <Text style={[styles.contactValue, { color: colors.textPrimary, fontFamily: 'Inter-SemiBold' }]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  heroCard: { borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 4 },
  heroIcon: { width: 56, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  heroTitle: { fontSize: 20 },
  heroSubtitle: { fontSize: 13, textAlign: 'center', marginTop: 6, lineHeight: 20 },
  sectionTitle: { fontSize: 16, marginTop: 24, marginBottom: 12 },
  faqItem: { borderRadius: 14, padding: 16, marginBottom: 8, borderWidth: 1 },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQuestion: { fontSize: 14, flex: 1, marginRight: 8 },
  faqAnswer: { fontSize: 13, lineHeight: 21, marginTop: 12, paddingTop: 12, borderTopWidth: 1 },
  contactCard: { borderRadius: 16, padding: 16 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 4 },
  contactLabel: { fontSize: 11 },
  contactValue: { fontSize: 14, marginTop: 2 },
  divider: { height: 1, marginVertical: 10 },
  guideCard: { borderRadius: 16, padding: 20, marginTop: 24 },
  guideTitle: { fontSize: 15, marginBottom: 8 },
  guideText: { fontSize: 13, lineHeight: 21 },
});
