import { Pressable, Text, ActivityIndicator, ViewStyle } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

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
  const { colors } = useTheme();

  const bg = variant === 'primary'
    ? colors.primary
    : variant === 'danger'
      ? colors.danger
      : 'transparent';

  const borderColor = variant === 'outline' ? colors.primary : 'transparent';
  const textColor = variant === 'outline' ? colors.primary : '#FFFFFF';

  return (
    <Pressable
      onPress={onPress}
      disabled={loading || disabled}
      className="flex-row items-center justify-center gap-2 py-4 px-6 rounded-xl active:opacity-90"
      style={[
        {
          backgroundColor: bg,
          borderWidth: 1.5,
          borderColor,
          opacity: loading || disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : '#FFFFFF'} size="small" />
      ) : (
        <>
          {icon}
          <Text style={{ color: textColor }} className="text-[15px] font-semibold">{title}</Text>
        </>
      )}
    </Pressable>
  );
}
