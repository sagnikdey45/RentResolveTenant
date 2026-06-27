import { View, Text } from 'react-native';
import { Inbox } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, message, icon }: EmptyStateProps) {
  const { colors } = useTheme();
  return (
    <View className="items-center justify-center py-16 px-6">
      {icon || <Inbox size={48} color={colors.textMuted} />}
      <Text style={{ color: colors.textPrimary }} className="text-[17px] font-semibold mt-4 text-center">{title}</Text>
      <Text style={{ color: colors.textMuted }} className="text-[13px] mt-2 text-center leading-5">{message}</Text>
    </View>
  );
}
