import { useState, useMemo } from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, Plus } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_REQUESTS } from '@/data/mockData';
import { RequestCard } from '@/components/RequestCard';
import { EmptyState } from '@/components/EmptyState';

const FILTER_OPTIONS = ['All', 'Open', 'In Progress', 'Resolved', 'Emergency'] as const;

export default function RequestsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filtered = useMemo(() => {
    let list = MOCK_REQUESTS;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
    }
    if (activeFilter === 'Open') list = list.filter(r => ['Submitted', 'Under Review'].includes(r.status));
    else if (activeFilter === 'In Progress') list = list.filter(r => ['Approved', 'Assigned', 'In Progress', 'Waiting for Tenant', 'Waiting for Landlord'].includes(r.status));
    else if (activeFilter === 'Resolved') list = list.filter(r => ['Resolved', 'Closed'].includes(r.status));
    else if (activeFilter === 'Emergency') list = list.filter(r => r.isEmergency);
    return list;
  }, [search, activeFilter]);

  return (
    <View style={{ backgroundColor: colors.background, paddingTop: insets.top + 16 }} className="flex-1 px-5">
      <View className="flex-row justify-between items-center mb-5">
        <Text style={{ color: colors.textPrimary }} className="text-2xl font-extrabold">My Requests</Text>
        <Pressable
          style={{ backgroundColor: colors.primary }}
          className="w-10 h-10 rounded-xl items-center justify-center"
          onPress={() => router.push('/create-request')}
        >
          <Plus size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      <View
        style={{ backgroundColor: colors.inputBg, borderColor: colors.inputBorder }}
        className="flex-row items-center rounded-lg px-4 py-3 gap-2 mb-3 border"
      >
        <Search size={18} color={colors.textMuted} />
        <TextInput
          className="flex-1 text-[15px]"
          style={{ color: colors.textPrimary }}
          placeholder="Search requests..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4 max-h-10" contentContainerStyle={{ gap: 8 }}>
        {FILTER_OPTIONS.map(f => {
          const active = activeFilter === f;
          return (
            <Pressable
              key={f}
              style={{
                backgroundColor: active ? colors.primary : colors.surface,
                borderColor: active ? colors.primary : colors.border,
              }}
              className="px-4 py-2 rounded-full border"
              onPress={() => setActiveFilter(f)}
            >
              <Text style={{ color: active ? '#FFFFFF' : colors.textSecondary }} className="text-[13px] font-medium">{f}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {filtered.length === 0 ? (
          <EmptyState title="No requests found" message="Try adjusting your search or filters" />
        ) : (
          filtered.map(req => (
            <RequestCard
              key={req.id}
              request={req}
              onPress={() => router.push({ pathname: '/request-detail', params: { id: req.id } })}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
