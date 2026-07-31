import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Shield } from 'lucide-react-native';

export default function SplashScreen() {
  const { isAuthenticated, isLoading } = useAuth();
  const { colors } = useTheme();

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.gradientStart }]}>
        <View style={styles.logoWrap}>
          <View style={styles.iconCircle}>
            <Shield size={36} color="#FFFFFF" />
          </View>
          <Text style={[styles.title, { fontFamily: 'Inter-ExtraBold' }]}>Rent Resolve</Text>
          <Text style={[styles.subtitle, { fontFamily: 'Inter-Regular' }]}>Smart rental issue management</Text>
        </View>
        <ActivityIndicator size="large" color="rgba(255,255,255,0.8)" style={styles.spinner} />
      </View>
    );
  }

  if (isAuthenticated) return <Redirect href="/(tabs)" />;
  return <Redirect href="/login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 6,
  },
  spinner: {
    marginTop: 64,
  },
});
