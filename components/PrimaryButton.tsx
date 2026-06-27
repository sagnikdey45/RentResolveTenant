import { Pressable, Text, ActivityIndicator, ViewStyle } from 'react-native';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'outline' | 'danger';
  icon?: React.ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
}

export function PrimaryButton({ title, onPress, loading, variant = 'primary', icon, style, disabled }: PrimaryButtonProps) {
  const bgClass = variant === 'primary'
    ? 'bg-blue-600'
    : variant === 'danger'
      ? 'bg-red-600'
      : 'bg-transparent border-blue-600';

  const textColorClass = variant === 'outline' ? 'text-blue-600' : 'text-white';

  return (
    <Pressable
      onPress={onPress}
      disabled={loading || disabled}
      className={`flex-row items-center justify-center gap-2 py-4 px-6 rounded-xl border-[1.5px] border-transparent active:opacity-90 ${bgClass} ${
        variant === 'outline' ? 'border-blue-600' : ''
      } ${loading || disabled ? 'opacity-60' : ''}`}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#2563EB' : '#FFFFFF'} size="small" />
      ) : (
        <>
          {icon}
          <Text className={`text-[15px] font-semibold ${textColorClass}`}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}
