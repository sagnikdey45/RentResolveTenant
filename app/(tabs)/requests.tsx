import { useState, useMemo } from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, Plus } from 'lucide-react-native';
import { MOCK_REQUESTS } from '@/data/mockData';
import { RequestCard } from '@/components/RequestCard';
import { EmptyState } from '@/components/EmptyState';

const FILTER_OPTIONS = ['All', 'Open', 'In Progress', 'Resolved', 'Emergency'] as const;

export default function RequestsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
    <View className="flex-1 bg-slate-50 px-5" style={{ paddingTop: insets.top + 16 }}>
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-2xl font-extrabold text-slate-900">My Requests</Text>
        <Pressable
          className="w-10 h-10 rounded-xl bg-blue-600 items-center justify-center"
          onPress={() => router.push('/create-request')}
        >
          <Plus size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      <View className="flex-row items-center bg-white rounded-lg px-4 py-3 gap-2 mb-3 border border-slate-200">
        <Search size={18} color="#94A3B8" />
        <TextInput
          className="flex-1 text-[15px] text-slate-900"
          placeholder="Search requests..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4 max-h-10" contentContainerStyle={{ gap: 8 }}>
        {FILTER_OPTIONS.map(f => (
          <Pressable
            key={f}
            className={`px-4 py-2 rounded-full border ${
              activeFilter === f
                ? 'bg-blue-600 border-blue-600'
                : 'bg-white border-slate-200'
            }`}
            onPress={() => setActiveFilter(f)}
          >
            <Text className={`text-[13px] font-medium ${
              activeFilter === f ? 'text-white' : 'text-slate-600'
            }`}>{f}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
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
