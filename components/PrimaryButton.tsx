import { Pressable, Text, ActivityIndicator, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SHADOWS } from '@/constants/theme';

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
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: bg,
          borderWidth: variant === 'outline' ? 1.5 : 0,
          borderColor,
          opacity: loading || disabled ? 0.6 : pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
        variant === 'primary' && SHADOWS.card,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : '#FFFFFF'} size="small" />
      ) : (
        <>
          {icon}
          <Text style={[styles.label, { color: textColor, fontFamily: 'Inter-SemiBold' }]}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  label: {
    fontSize: 15,
  },
});
