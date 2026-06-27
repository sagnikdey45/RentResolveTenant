import { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { colors } = useTheme();
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
      className="flex-1"
      style={{ backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className="px-6 py-16"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-2xl items-center justify-center mb-4 shadow-lg shadow-blue-600/25" style={{ backgroundColor: colors.primary }}>
            <Shield size={32} color="#FFFFFF" />
          </View>
          <Text className="text-2xl font-extrabold" style={{ color: colors.textPrimary }}>Rent Resolve</Text>
          <Text className="text-[15px] mt-1" style={{ color: colors.textMuted }}>Tenant Portal</Text>
        </View>

        <View className="rounded-2xl p-6 shadow-sm" style={{ backgroundColor: colors.surface }}>
          <Text className="text-xl font-bold" style={{ color: colors.textPrimary }}>Welcome back</Text>
          <Text className="text-[13px] mt-1 mb-5" style={{ color: colors.textMuted }}>Sign in to your account</Text>

          {error ? (
            <View className="rounded-lg p-3 mb-4" style={{ backgroundColor: colors.dangerLight }}>
              <Text className="text-[13px] font-medium" style={{ color: colors.danger }}>{error}</Text>
            </View>
          ) : null}

          <View className="mb-4">
            <Text className="text-[13px] font-semibold mb-2" style={{ color: colors.textSecondary }}>Email</Text>
            <View className="flex-row items-center border rounded-lg px-4 py-3 gap-2" style={{ backgroundColor: colors.inputBg, borderColor: colors.inputBorder }}>
              <Mail size={18} color={colors.textMuted} />
              <TextInput
                className="flex-1 text-[15px]"
                style={{ color: colors.textPrimary }}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-[13px] font-semibold mb-2" style={{ color: colors.textSecondary }}>Password</Text>
            <View className="flex-row items-center border rounded-lg px-4 py-3 gap-2" style={{ backgroundColor: colors.inputBg, borderColor: colors.inputBorder }}>
              <Lock size={18} color={colors.textMuted} />
              <TextInput
                className="flex-1 text-[15px]"
                style={{ color: colors.textPrimary }}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor={colors.textMuted}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} color={colors.textMuted} /> : <Eye size={18} color={colors.textMuted} />}
              </Pressable>
            </View>
          </View>

          <PrimaryButton title="Sign In" onPress={handleLogin} loading={loading} />

          <Pressable onPress={fillDemo} className="items-center mt-4">
            <Text className="text-[13px] font-medium" style={{ color: colors.primary }}>Use demo credentials</Text>
          </Pressable>
        </View>

        <Text className="text-[11px] text-center mt-5" style={{ color: colors.textMuted }}>
          Demo: tenant@example.com / password123
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
