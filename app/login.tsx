import { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SHADOWS } from '@/constants/theme';

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
      style={[styles.container, { backgroundColor: colors.gradientStart }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Shield size={36} color="#FFFFFF" />
          </View>
          <Text style={[styles.logoTitle, { fontFamily: 'Inter-ExtraBold' }]}>Rent Resolve</Text>
          <Text style={[styles.logoSubtitle, { fontFamily: 'Inter-Regular' }]}>Tenant Portal</Text>
        </View>

        <View style={[styles.formCard, { backgroundColor: colors.surface }, SHADOWS.prominent]}>
          <Text style={[styles.formTitle, { color: colors.textPrimary, fontFamily: 'Inter-Bold' }]}>Welcome back</Text>
          <Text style={[styles.formSubtitle, { color: colors.textMuted, fontFamily: 'Inter-Regular' }]}>Sign in to your account</Text>

          {error ? (
            <View style={[styles.errorBanner, { backgroundColor: colors.dangerLight }]}>
              <Text style={[styles.errorText, { color: colors.danger, fontFamily: 'Inter-Medium' }]}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary, fontFamily: 'Inter-SemiBold' }]}>Email</Text>
            <View style={[styles.inputRow, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder }]}>
              <Mail size={18} color={colors.textMuted} />
              <TextInput
                style={[styles.input, { color: colors.textPrimary, fontFamily: 'Inter-Regular' }]}
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

          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary, fontFamily: 'Inter-SemiBold' }]}>Password</Text>
            <View style={[styles.inputRow, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder }]}>
              <Lock size={18} color={colors.textMuted} />
              <TextInput
                style={[styles.input, { color: colors.textPrimary, fontFamily: 'Inter-Regular' }]}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor={colors.textMuted}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
                {showPassword ? <EyeOff size={18} color={colors.textMuted} /> : <Eye size={18} color={colors.textMuted} />}
              </Pressable>
            </View>
          </View>

          <PrimaryButton title="Sign In" onPress={handleLogin} loading={loading} style={{ marginTop: 8 }} />

          <Pressable onPress={fillDemo} style={styles.demoLink}>
            <Text style={[styles.demoText, { color: colors.primary, fontFamily: 'Inter-SemiBold' }]}>Use demo credentials</Text>
          </Pressable>
        </View>

        <Text style={[styles.hintText, { fontFamily: 'Inter-Regular' }]}>
          Demo: tenant@example.com / password123
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  logoTitle: {
    fontSize: 28,
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  logoSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  formCard: {
    borderRadius: 24,
    padding: 24,
  },
  formTitle: {
    fontSize: 22,
  },
  formSubtitle: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 24,
  },
  errorBanner: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  demoLink: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 8,
  },
  demoText: {
    fontSize: 14,
  },
  hintText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    marginTop: 20,
  },
});
