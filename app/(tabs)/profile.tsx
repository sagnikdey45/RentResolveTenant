import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Mail, Phone, Home, ShieldCheck, LogOut,
  FileText, Building2, Bell, Megaphone, History, HelpCircle, ChevronRight,
  Sun, Moon,
} from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_PROPERTY } from '@/data/mockData';
import { SHADOWS } from '@/constants/theme';

const MENU_ITEMS = [
  { icon: Building2, label: 'Property Info', route: '/property-info' },
  { icon: FileText, label: 'Lease Documents', route: '/lease-documents' },
  { icon: Bell, label: 'Notifications', route: '/notifications' },
  { icon: Megaphone, label: 'Announcements', route: '/announcements' },
  { icon: History, label: 'Activity History', route: '/activity-history' },
  { icon: HelpCircle, label: 'Help & Support', route: '/help-support' },
] as const;

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { colors, isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <View style={[styles.heroSection, { backgroundColor: colors.gradientStart }]}>
        <View style={{ paddingTop: insets.top + 20, paddingHorizontal: 20, paddingBottom: 56, alignItems: 'center' }}>
          <View style={styles.avatarCircle}>
            <Text style={[styles.avatarText, { fontFamily: 'Inter-Bold' }]}>
              {user?.name?.split(' ').map(n => n[0]).join('') || 'T'}
            </Text>
          </View>
          <Text style={[styles.heroName, { fontFamily: 'Inter-Bold' }]}>{user?.name}</Text>
          <Text style={[styles.heroEmail, { fontFamily: 'Inter-Regular' }]}>{user?.email}</Text>
          <View style={styles.verifiedPill}>
            <ShieldCheck size={12} color="#FFFFFF" />
            <Text style={[styles.verifiedText, { fontFamily: 'Inter-SemiBold' }]}>Verified Tenant</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={[styles.infoCard, { backgroundColor: colors.surface }, SHADOWS.card]}>
          <InfoRow colors={colors} icon={<Mail size={18} color={colors.primary} />} label="Email" value={user?.email || ''} />
          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
          <InfoRow colors={colors} icon={<Phone size={18} color={colors.primary} />} label="Phone" value={user?.phone || ''} />
          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
          <InfoRow colors={colors} icon={<Home size={18} color={colors.primary} />} label="Property" value={`${MOCK_PROPERTY.name} - ${MOCK_PROPERTY.unit}`} />
        </View>

        <Pressable
          style={[styles.themeToggle, { backgroundColor: colors.surface }, SHADOWS.soft]}
          onPress={toggleTheme}
        >
          <View style={styles.themeLeft}>
            {isDark ? <Moon size={20} color={colors.primary} /> : <Sun size={20} color={colors.warning} />}
            <Text style={[styles.themeLabel, { color: colors.textPrimary, fontFamily: 'Inter-Medium' }]}>
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </Text>
          </View>
          <View style={[styles.toggle, { backgroundColor: isDark ? colors.primary : colors.surfaceSecondary }]}>
            <View style={[styles.toggleKnob, { alignSelf: isDark ? 'flex-end' : 'flex-start' }]} />
          </View>
        </Pressable>

        <View style={[styles.menuCard, { backgroundColor: colors.surface }, SHADOWS.card]}>
          {MENU_ITEMS.map((item, i) => (
            <Pressable
              key={item.label}
              style={[
                styles.menuItem,
                i < MENU_ITEMS.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
              ]}
              onPress={() => router.push(item.route as any)}
            >
              <View style={[styles.menuIcon, { backgroundColor: colors.surfaceSecondary }]}>
                <item.icon size={18} color={colors.textSecondary} />
              </View>
              <Text style={[styles.menuLabel, { color: colors.textPrimary, fontFamily: 'Inter-Medium' }]}>{item.label}</Text>
              <ChevronRight size={16} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>

        <Pressable
          style={[styles.logoutButton, { backgroundColor: colors.dangerLight }]}
          onPress={handleLogout}
        >
          <LogOut size={18} color={colors.danger} />
          <Text style={[styles.logoutText, { color: colors.danger, fontFamily: 'Inter-SemiBold' }]}>Sign Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function InfoRow({ colors, icon, label, value }: { colors: any; icon: React.ReactNode; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      {icon}
      <View style={{ flex: 1 }}>
        <Text style={[styles.infoLabel, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>{label}</Text>
        <Text style={[styles.infoValue, { color: colors.textPrimary, fontFamily: 'Inter-Medium' }]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: { fontSize: 28, color: '#FFFFFF' },
  heroName: { fontSize: 22, color: '#FFFFFF' },
  heroEmail: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 12,
  },
  verifiedText: { fontSize: 11, color: '#FFFFFF' },
  content: { paddingHorizontal: 20, marginTop: -32 },
  infoCard: { borderRadius: 18, padding: 20, marginBottom: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 4 },
  infoLabel: { fontSize: 11 },
  infoValue: { fontSize: 14, marginTop: 2 },
  divider: { height: 1, marginVertical: 12 },
  themeToggle: {
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
  },
  themeLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  themeLabel: { fontSize: 15 },
  toggle: { width: 48, height: 28, borderRadius: 14, justifyContent: 'center', paddingHorizontal: 2 },
  toggleKnob: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFFFFF' },
  menuCard: { borderRadius: 18, overflow: 'hidden', marginBottom: 16 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: { flex: 1, fontSize: 15 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 16,
  },
  logoutText: { fontSize: 15 },
});
