import { View, Text, Pressable, Modal, FlatList } from 'react-native';
import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react-native';

interface PickerSelectProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

export function PickerSelect({ label, value, options, onSelect, placeholder }: PickerSelectProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View className="mb-4">
      <Text className="text-[13px] font-semibold text-slate-600 mb-2">{label}</Text>
      <Pressable
        className="flex-row items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-3"
        onPress={() => setVisible(true)}
      >
        <Text className={`text-[15px] flex-1 ${value ? 'text-slate-900' : 'text-slate-400'}`}>
          {value || placeholder || 'Select...'}
        </Text>
        <ChevronDown size={18} color="#94A3B8" />
      </Pressable>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable className="flex-1 bg-black/40 justify-center px-6" onPress={() => setVisible(false)}>
          <View className="bg-white rounded-2xl max-h-[60%] py-5">
            <Text className="text-[17px] font-bold text-slate-900 px-5 mb-4">{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  className={`flex-row items-center justify-between px-5 py-3 ${
                    item === value ? 'bg-blue-50' : ''
                  }`}
                  onPress={() => { onSelect(item); setVisible(false); }}
                >
                  <Text className={`text-[15px] ${
                    item === value ? 'text-blue-600 font-semibold' : 'text-slate-900'
                  }`}>
                    {item}
                  </Text>
                  {item === value && <Check size={16} color="#2563EB" />}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
