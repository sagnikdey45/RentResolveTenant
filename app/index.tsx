import { View, Text, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Shield } from 'lucide-react-native';

export default function SplashScreen() {
  const { isAuthenticated, isLoading } = useAuth();
  const { colors } = useTheme();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
        <View className="items-center">
          <View className="w-20 h-20 rounded-2xl items-center justify-center mb-5 shadow-lg shadow-blue-600/30" style={{ backgroundColor: colors.primary }}>
            <Shield size={40} color="#FFFFFF" />
          </View>
          <Text className="text-3xl font-extrabold tracking-tight" style={{ color: colors.textPrimary }}>Rent Resolve</Text>
          <Text className="text-[15px] mt-2" style={{ color: colors.textMuted }}>Smart rental issue management</Text>
        </View>
        <ActivityIndicator size="large" color={colors.primary} className="mt-16" />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/login" />;
}
