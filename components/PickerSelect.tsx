import { View, Text, Pressable, Modal, FlatList } from 'react-native';
import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

interface PickerSelectProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

export function PickerSelect({ label, value, options, onSelect, placeholder }: PickerSelectProps) {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();

  return (
    <View className="mb-4">
      <Text style={{ color: colors.textSecondary }} className="text-[13px] font-semibold mb-2">{label}</Text>
      <Pressable
        className="flex-row items-center justify-between rounded-lg px-4 py-3"
        style={{ backgroundColor: colors.inputBg, borderWidth: 1, borderColor: colors.inputBorder }}
        onPress={() => setVisible(true)}
      >
        <Text style={{ color: value ? colors.textPrimary : colors.textMuted }} className="text-[15px] flex-1">
          {value || placeholder || 'Select...'}
        </Text>
        <ChevronDown size={18} color={colors.textMuted} />
      </Pressable>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable className="flex-1 justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onPress={() => setVisible(false)}>
          <View style={{ backgroundColor: colors.surface }} className="rounded-2xl max-h-[60%] py-5">
            <Text style={{ color: colors.textPrimary }} className="text-[17px] font-bold px-5 mb-4">{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  className="flex-row items-center justify-between px-5 py-3"
                  style={item === value ? { backgroundColor: colors.primaryLight } : undefined}
                  onPress={() => { onSelect(item); setVisible(false); }}
                >
                  <Text
                    style={{ color: item === value ? colors.primary : colors.textPrimary }}
                    className={`text-[15px] ${item === value ? 'font-semibold' : ''}`}
                  >
                    {item}
                  </Text>
                  {item === value && <Check size={16} color={colors.primary} />}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
