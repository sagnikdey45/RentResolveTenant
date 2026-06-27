import { View, Text, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  const { colors } = useTheme();
  return (
    <View className="flex-row justify-between items-center mb-3 mt-5">
      <Text style={{ color: colors.textPrimary }} className="text-[17px] font-bold">{title}</Text>
      {actionLabel && onAction && (
        <Pressable onPress={onAction} className="flex-row items-center gap-0.5">
          <Text style={{ color: colors.primary }} className="text-[13px] font-medium">{actionLabel}</Text>
          <ChevronRight size={14} color={colors.primary} />
        </Pressable>
      )}
    </View>
  );
}
