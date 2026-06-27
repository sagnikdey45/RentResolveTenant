import { View, Text } from 'react-native';

interface StatCardProps {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

export function StatCard({ label, value, color, icon }: StatCardProps) {
  return (
    <View
      className="bg-white rounded-xl p-4 w-[48%] mb-3 shadow-sm"
      style={{ borderLeftWidth: 3, borderLeftColor: color }}
    >
      <View
        className="w-9 h-9 rounded-lg items-center justify-center mb-2"
        style={{ backgroundColor: color + '18' }}
      >
        {icon}
      </View>
      <Text className="text-2xl font-bold text-slate-900">{value}</Text>
      <Text className="text-[11px] text-slate-400 mt-0.5">{label}</Text>
    </View>
  );
}
