import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

interface ScreenHeaderProps {
  title: string;
  rightElement?: React.ReactNode;
}

export function ScreenHeader({ title, rightElement }: ScreenHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 8, backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder }]}>
      <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={8}>
        <ArrowLeft size={22} color={colors.textPrimary} />
      </Pressable>
      <Text style={[styles.title, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>{title}</Text>
      <View style={styles.rightSlot}>{rightElement}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    flex: 1,
    textAlign: 'center',
  },
  rightSlot: {
    width: 40,
    alignItems: 'flex-end',
  },
});
