import { View, Text, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Shield } from 'lucide-react-native';

export default function SplashScreen() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 bg-slate-50 items-center justify-center">
        <View className="items-center">
          <View className="w-20 h-20 rounded-2xl bg-blue-600 items-center justify-center mb-5 shadow-lg shadow-blue-600/30">
            <Shield size={40} color="#FFFFFF" />
          </View>
          <Text className="text-3xl font-extrabold text-slate-900 tracking-tight">Rent Resolve</Text>
          <Text className="text-[15px] text-slate-400 mt-2">Smart rental issue management</Text>
        </View>
        <ActivityIndicator size="large" color="#2563EB" className="mt-16" />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/login" />;
}
