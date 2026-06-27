import { View, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface StatCardProps {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

export function StatCard({ label, value, color, icon }: StatCardProps) {
  const { colors } = useTheme();
  return (
    <View
      style={{ borderLeftWidth: 3, borderLeftColor: color, backgroundColor: colors.surface }}
      className="rounded-xl p-4 w-[48%] mb-3"
    >
      <View
        className="w-9 h-9 rounded-lg items-center justify-center mb-2"
        style={{ backgroundColor: color + '18' }}
      >
        {icon}
      </View>
      <Text style={{ color: colors.textPrimary }} className="text-2xl font-bold">{value}</Text>
      <Text style={{ color: colors.textMuted }} className="text-[11px] mt-0.5">{label}</Text>
    </View>
  );
}
