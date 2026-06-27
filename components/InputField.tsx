import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export function InputField({ label, error, style, ...props }: InputFieldProps) {
  return (
    <View className="mb-4">
      <Text className="text-[13px] font-semibold text-slate-600 mb-2">{label}</Text>
      <TextInput
        className={`bg-white border rounded-lg px-4 py-3 text-[15px] text-slate-900 ${
          error ? 'border-red-500' : 'border-slate-200'
        }`}
        placeholderTextColor="#94A3B8"
        style={style}
        {...props}
      />
      {error && <Text className="text-[11px] text-red-500 mt-1">{error}</Text>}
    </View>
  );
}
