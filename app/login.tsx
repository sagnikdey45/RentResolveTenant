import { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }
    setLoading(true);
    const result = await login(email.trim(), password);
    setLoading(false);
    if (result.success) {
      router.replace('/(tabs)');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const fillDemo = () => {
    setEmail('tenant@example.com');
    setPassword('password123');
    setError('');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-50"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className="px-6 py-16"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-2xl bg-blue-600 items-center justify-center mb-4 shadow-lg shadow-blue-600/25">
            <Shield size={32} color="#FFFFFF" />
          </View>
          <Text className="text-2xl font-extrabold text-slate-900">Rent Resolve</Text>
          <Text className="text-[15px] text-slate-400 mt-1">Tenant Portal</Text>
        </View>

        <View className="bg-white rounded-2xl p-6 shadow-sm">
          <Text className="text-xl font-bold text-slate-900">Welcome back</Text>
          <Text className="text-[13px] text-slate-400 mt-1 mb-5">Sign in to your account</Text>

          {error ? (
            <View className="bg-red-50 rounded-lg p-3 mb-4">
              <Text className="text-[13px] text-red-600 font-medium">{error}</Text>
            </View>
          ) : null}

          <View className="mb-4">
            <Text className="text-[13px] font-semibold text-slate-600 mb-2">Email</Text>
            <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 gap-2">
              <Mail size={18} color="#94A3B8" />
              <TextInput
                className="flex-1 text-[15px] text-slate-900"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-[13px] font-semibold text-slate-600 mb-2">Password</Text>
            <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 gap-2">
              <Lock size={18} color="#94A3B8" />
              <TextInput
                className="flex-1 text-[15px] text-slate-900"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} color="#94A3B8" /> : <Eye size={18} color="#94A3B8" />}
              </Pressable>
            </View>
          </View>

          <PrimaryButton title="Sign In" onPress={handleLogin} loading={loading} />

          <Pressable onPress={fillDemo} className="items-center mt-4">
            <Text className="text-[13px] text-blue-600 font-medium">Use demo credentials</Text>
          </Pressable>
        </View>

        <Text className="text-[11px] text-slate-400 text-center mt-5">
          Demo: tenant@example.com / password123
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
