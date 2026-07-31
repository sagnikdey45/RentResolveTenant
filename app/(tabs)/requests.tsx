import { useState, useMemo } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, Plus, SlidersHorizontal } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_REQUESTS } from '@/data/mockData';
import { RequestCard } from '@/components/RequestCard';
import { EmptyState } from '@/components/EmptyState';
import { SHADOWS } from '@/constants/theme';

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
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>My Requests</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>{MOCK_REQUESTS.length} total requests</Text>
        </View>
        <Pressable
          style={[styles.addButton, { backgroundColor: colors.primary }, SHADOWS.card]}
          onPress={() => router.push('/create-request')}
        >
          <Plus size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={[styles.searchBar, { backgroundColor: colors.surface }, SHADOWS.soft]}>
        <Search size={18} color={colors.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: colors.textPrimary, fontFamily: 'Inter-Regular' }]}
          placeholder="Search by title, ID, or category..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContent}>
        {FILTER_OPTIONS.map(f => {
          const active = activeFilter === f;
          return (
            <Pressable
              key={f}
              style={[
                styles.filterPill,
                {
                  backgroundColor: active ? colors.primary : colors.surface,
                  borderColor: active ? colors.primary : colors.border,
                },
                active && SHADOWS.soft,
              ]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, { color: active ? '#FFFFFF' : colors.textSecondary, fontFamily: active ? 'Inter-SemiBold' : 'Inter-Medium' }]}>{f}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 26,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  filterScroll: {
    maxHeight: 44,
    marginTop: 12,
  },
  filterContent: {
    gap: 8,
    paddingHorizontal: 20,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,
  },
});
