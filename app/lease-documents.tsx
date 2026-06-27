import { View, Text, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, FileText, Download, Eye } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_DOCUMENTS } from '@/data/mockData';

const TYPE_COLORS: Record<string, string> = {
  Agreement: '#2563EB', Inspection: '#059669', Rules: '#D97706', Receipt: '#16A34A',
  Maintenance: '#0284C7', Identity: '#7C3AED', Notice: '#DC2626',
};

export default function LeaseDocumentsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const handleView = (name: string) => {
    const msg = `Document viewer for "${name}" will be available with backend integration.`;
    Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Preview', msg);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-row items-center justify-between px-5 pb-4 border-b" style={{ backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder, paddingTop: insets.top }}>
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center"><ArrowLeft size={22} color={colors.textPrimary} /></Pressable>
        <Text className="text-[17px] font-bold" style={{ color: colors.textPrimary }}>Lease Documents</Text>
        <View className="w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        {MOCK_DOCUMENTS.map(doc => {
          const iconColor = TYPE_COLORS[doc.type] || colors.textMuted;
          return (
            <View key={doc.id} className="rounded-xl p-4 flex-row items-center gap-3 mb-3 shadow-sm" style={{ backgroundColor: colors.surface }}>
              <View className="w-12 h-12 rounded-xl items-center justify-center" style={{ backgroundColor: iconColor + '18' }}>
                <FileText size={22} color={iconColor} />
              </View>
              <View className="flex-1">
                <Text className="text-[13px] font-semibold" style={{ color: colors.textPrimary }}>{doc.name}</Text>
                <View className="flex-row items-center gap-1 mt-1">
                  <Text className="text-[11px]" style={{ color: colors.textMuted }}>{doc.type}</Text>
                  <Text style={{ color: colors.textMuted }}>-</Text>
                  <Text className="text-[11px]" style={{ color: colors.textMuted }}>{doc.uploadedDate}</Text>
                </View>
                <View
                  className="self-start px-1.5 py-0.5 rounded-full mt-1.5"
                  style={{
                    backgroundColor: doc.status === 'Available' ? '#DCFCE7' : doc.status === 'Pending' ? '#FEF3C7' : '#FEE2E2',
                  }}
                >
                  <Text
                    className="text-[10px] font-semibold"
                    style={{
                      color: doc.status === 'Available' ? '#059669' : doc.status === 'Pending' ? '#D97706' : '#DC2626',
                    }}
                  >{doc.status}</Text>
                </View>
              </View>
              <View className="gap-2">
                <Pressable className="w-8 h-8 rounded-lg items-center justify-center" style={{ backgroundColor: colors.background }} onPress={() => handleView(doc.name)}>
                  <Eye size={16} color={colors.primary} />
                </Pressable>
                <Pressable className="w-8 h-8 rounded-lg items-center justify-center" style={{ backgroundColor: colors.background }} onPress={() => handleView(doc.name)}>
                  <Download size={16} color={colors.textMuted} />
                </Pressable>
              </View>
            </View>
          );
        })}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
