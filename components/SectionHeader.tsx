import { View, Text, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <View className="flex-row justify-between items-center mb-3 mt-5">
      <Text className="text-[17px] font-bold text-slate-900">{title}</Text>
      {actionLabel && onAction && (
        <Pressable onPress={onAction} className="flex-row items-center gap-0.5">
          <Text className="text-[13px] text-blue-600 font-medium">{actionLabel}</Text>
          <ChevronRight size={14} color="#2563EB" />
        </Pressable>
      )}
    </View>
  );
}
