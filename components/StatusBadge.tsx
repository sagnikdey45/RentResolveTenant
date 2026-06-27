import { View, Text } from 'react-native';
import { STATUS_COLORS, PRIORITY_COLORS } from '@/constants/theme';

interface StatusBadgeProps {
  label: string;
  type?: 'status' | 'priority';
  small?: boolean;
}

export function StatusBadge({ label, type = 'status', small }: StatusBadgeProps) {
  const colorMap = type === 'priority' ? PRIORITY_COLORS : STATUS_COLORS;
  const colors = colorMap[label] || { bg: '#F1F5F9', text: '#475569' };

  return (
    <View
      className={`self-start rounded-full ${small ? 'px-2 py-0.5' : 'px-2.5 py-1'}`}
      style={{ backgroundColor: colors.bg }}
    >
      <Text
        className={`font-semibold ${small ? 'text-[10px]' : 'text-[11px]'}`}
        style={{ color: colors.text }}
      >
        {label}
      </Text>
    </View>
  );
}
