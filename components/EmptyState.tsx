import { View, Text } from 'react-native';
import { Inbox } from 'lucide-react-native';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, message, icon }: EmptyStateProps) {
  return (
    <View className="items-center justify-center py-16 px-6">
      {icon || <Inbox size={48} color="#94A3B8" />}
      <Text className="text-[17px] font-semibold text-slate-900 mt-4 text-center">{title}</Text>
      <Text className="text-[13px] text-slate-400 mt-2 text-center leading-5">{message}</Text>
    </View>
  );
}
