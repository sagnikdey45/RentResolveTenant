import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SHADOWS } from '@/constants/theme';

interface StatCardProps {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

export function StatCard({ label, value, color, icon }: StatCardProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface }, SHADOWS.card]}>
      <View style={[styles.iconWrap, { backgroundColor: color + '14' }]}>
        {icon}
      </View>
      <Text style={[styles.value, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>{value}</Text>
      <Text style={[styles.label, { color: colors.textMuted, fontFamily: 'Inter-Medium' }]}>{label}</Text>
      <View style={[styles.accentBar, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  value: {
    fontSize: 28,
    lineHeight: 34,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    letterSpacing: 0.2,
  },
  accentBar: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 3,
    borderRadius: 3,
  },
});
