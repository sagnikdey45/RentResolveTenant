import { View, Text, TextInput, TextInputProps } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export function InputField({ label, error, style, ...props }: InputFieldProps) {
  const { colors } = useTheme();
  return (
    <View className="mb-4">
      <Text style={{ color: colors.textSecondary }} className="text-[13px] font-semibold mb-2">{label}</Text>
      <TextInput
        className="rounded-lg px-4 py-3 text-[15px]"
        style={[
          {
            backgroundColor: colors.inputBg,
            borderWidth: 1,
            borderColor: error ? colors.danger : colors.inputBorder,
            color: colors.textPrimary,
          },
          style,
        ]}
        placeholderTextColor={colors.textMuted}
        {...props}
      />
      {error && <Text style={{ color: colors.danger }} className="text-[11px] mt-1">{error}</Text>}
    </View>
  );
}
