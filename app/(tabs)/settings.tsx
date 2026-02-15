import { router } from 'expo-router';
import { Pressable, Switch, Text, View } from 'react-native';

import { useAuth } from '@/providers/AuthProvider';
import { useAppTheme } from '@/components/theme/useAppTheme';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useAppTheme();
  const { signOut } = useAuth();
  const isDark = theme === 'dark';

  const handleLogout = async () => {
    await signOut();
    router.replace('/landing');
  };

  return (
    <View className="flex-1 bg-app-background px-5 pt-8">
      <Text className="mb-6 text-2xl font-semibold text-app-foreground">Settings</Text>
      <View className="flex-row items-center justify-between py-3">
        <Text className="text-lg text-app-foreground">Dark Mode</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
      <Text className="mt-3 text-sm text-app-muted">Current theme: {isDark ? 'Dark' : 'Light'}</Text>
      <Pressable
        className="mt-8 rounded-2xl border border-app-border bg-app-card px-5 py-4 active:opacity-80"
        onPress={handleLogout}>
        <Text className="text-center text-sm font-semibold text-app-foreground">Logout</Text>
      </Pressable>
    </View>
  );
}
