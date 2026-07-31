import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import {
  Mail, Phone, Home, ShieldCheck, LogOut,
  FileText, Building2, Bell, Megaphone, History, HelpCircle, ChevronRight,
  Sun, Moon, Sparkles,
} from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_PROPERTY } from '@/data/mockData';
import { SHADOWS } from '@/constants/theme';

const MENU_ITEMS = [
  { icon: Building2, label: 'Property Info', route: '/property-info', color: '#0D9488' },
  { icon: FileText, label: 'Lease Documents', route: '/lease-documents', color: '#0284C7' },
  { icon: Bell, label: 'Notifications', route: '/notifications', color: '#D97706' },
  { icon: Megaphone, label: 'Announcements', route: '/announcements', color: '#DC2626' },
  { icon: History, label: 'Activity History', route: '/activity-history', color: '#059669' },
  { icon: HelpCircle, label: 'Help & Support', route: '/help-support', color: '#1E6B5A' },
] as const;

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { colors, isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleLogout = async () => { await logout(); router.replace('/login'); };

  return (
    <ScrollView style={{ backgroundColor: colors.background }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
      <LinearGradient
        colors={isDark ? ['#134E4A', '#0F766E', '#064E3B'] : ['#1E6B5A', '#0D9488', '#115E59']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroSection}
      >
        <View style={styles.heroBg1} />
        <View style={styles.heroBg2} />
        <View style={{ paddingTop: insets.top + 20, paddingHorizontal: 20, paddingBottom: 60, alignItems: 'center' }}>
          <Animated.View entering={FadeInDown.duration(600)} style={styles.avatarGlow}>
            <View style={styles.avatarCircle}>
              <Text style={[styles.avatarText, { fontFamily: 'Inter-Bold' }]}>
                {user?.name?.split(' ').map(n => n[0]).join('') || 'T'}
              </Text>
            </View>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(100).duration(500)} style={{ alignItems: 'center' }}>
            <Text style={[styles.heroName, { fontFamily: 'Inter-Bold' }]}>{user?.name}</Text>
            <Text style={[styles.heroEmail, { fontFamily: 'Inter-Regular' }]}>{user?.email}</Text>
            <View style={styles.verifiedPill}>
              <ShieldCheck size={12} color="#34D399" />
              <Text style={[styles.verifiedText, { fontFamily: 'Inter-SemiBold' }]}>Verified Tenant</Text>
            </View>
          </Animated.View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Animated.View entering={FadeInUp.delay(200).duration(500).springify()} style={[styles.infoCard, { backgroundColor: colors.surface }, SHADOWS.elevated]}>
          <InfoRow colors={colors} icon={<Mail size={18} color={colors.primary} />} label="Email" value={user?.email || ''} />
          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
          <InfoRow colors={colors} icon={<Phone size={18} color={colors.primary} />} label="Phone" value={user?.phone || ''} />
          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
          <InfoRow colors={colors} icon={<Home size={18} color={colors.primary} />} label="Property" value={`${MOCK_PROPERTY.name} - ${MOCK_PROPERTY.unit}`} />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300).duration(500)}>
          <Pressable style={[styles.themeToggle, { backgroundColor: colors.surface }, SHADOWS.soft]} onPress={toggleTheme}>
            <View style={styles.themeLeft}>
              <View style={[styles.themeIconWrap, { backgroundColor: isDark ? colors.primaryGlow : colors.warningLight }]}>
                {isDark ? <Moon size={18} color={colors.primary} /> : <Sun size={18} color={colors.warning} />}
              </View>
              <View>
                <Text style={[styles.themeLabel, { color: colors.textPrimary, fontFamily: 'Inter-Medium' }]}>
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </Text>
                <Text style={[styles.themeHint, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>
                  {isDark ? 'Switch to light' : 'Switch to dark'}
                </Text>
              </View>
            </View>
            <View style={[styles.toggle, { backgroundColor: isDark ? colors.primary : colors.surfaceSecondary }]}>
              <View style={[styles.toggleKnob, { alignSelf: isDark ? 'flex-end' : 'flex-start' }]} />
            </View>
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).duration(500)} style={[styles.menuCard, { backgroundColor: colors.surface }, SHADOWS.card]}>
          {MENU_ITEMS.map((item, i) => (
            <Pressable
              key={item.label}
              style={({ pressed }) => [
                styles.menuItem,
                i < MENU_ITEMS.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
                { opacity: pressed ? 0.8 : 1 },
              ]}
              onPress={() => router.push(item.route as any)}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color + '12' }]}>
                <item.icon size={18} color={item.color} />
              </View>
              <Text style={[styles.menuLabel, { color: colors.textPrimary, fontFamily: 'Inter-Medium' }]}>{item.label}</Text>
              <ChevronRight size={16} color={colors.textMuted} />
            </Pressable>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(500).duration(500)}>
          <Pressable style={({ pressed }) => [styles.logoutButton, { backgroundColor: colors.dangerLight, opacity: pressed ? 0.8 : 1 }]} onPress={handleLogout}>
            <LogOut size={18} color={colors.danger} />
            <Text style={[styles.logoutText, { color: colors.danger, fontFamily: 'Inter-SemiBold' }]}>Sign Out</Text>
          </Pressable>
        </Animated.View>

        <Text style={[styles.version, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>Rent Resolve v1.0</Text>
      </View>
    </ScrollView>
  );
}

function InfoRow({ colors, icon, label, value }: { colors: any; icon: React.ReactNode; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={[styles.infoIconWrap, { backgroundColor: colors.primaryGlow }]}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.infoLabel, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>{label}</Text>
        <Text style={[styles.infoValue, { color: colors.textPrimary, fontFamily: 'Inter-Medium' }]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: { borderBottomLeftRadius: 36, borderBottomRightRadius: 36, overflow: 'hidden' },
  heroBg1: { position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(255,255,255,0.04)' },
  heroBg2: { position: 'absolute', bottom: 10, left: -20, width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.03)' },
  avatarGlow: {
    width: 100, height: 100, borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  avatarCircle: {
    width: 84, height: 84, borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.25)',
  },
  avatarText: { fontSize: 30, color: '#FFFFFF' },
  heroName: { fontSize: 24, color: '#FFFFFF', letterSpacing: -0.3 },
  heroEmail: { fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  verifiedPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(52,211,153,0.15)',
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, marginTop: 12,
    borderWidth: 1, borderColor: 'rgba(52,211,153,0.2)',
  },
  verifiedText: { fontSize: 11, color: '#34D399' },
  content: { paddingHorizontal: 20, marginTop: -36 },
  infoCard: { borderRadius: 22, padding: 20, marginBottom: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 6 },
  infoIconWrap: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  infoLabel: { fontSize: 11 },
  infoValue: { fontSize: 14, marginTop: 2 },
  divider: { height: 1, marginVertical: 10 },
  themeToggle: { borderRadius: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, marginBottom: 12 },
  themeLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  themeIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  themeLabel: { fontSize: 15 },
  themeHint: { fontSize: 11, marginTop: 1 },
  toggle: { width: 52, height: 30, borderRadius: 15, justifyContent: 'center', paddingHorizontal: 3 },
  toggleKnob: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFFFFF' },
  menuCard: { borderRadius: 22, overflow: 'hidden', marginBottom: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 18, paddingVertical: 16 },
  menuIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: 15 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 18, paddingVertical: 16 },
  logoutText: { fontSize: 15 },
  version: { fontSize: 12, textAlign: 'center', marginTop: 16 },
});
