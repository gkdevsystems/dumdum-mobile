import { Switch, Text, View } from 'react-native';

import { useAppTheme } from '@/components/theme/useAppTheme';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useAppTheme();
  const isDark = theme === 'dark';

  return (
    <View className="flex-1 bg-background px-5 pt-8">
      <Text className="mb-6 text-2xl font-semibold text-app-foreground">Settings</Text>
      <View className="flex-row items-center justify-between py-3">
        <Text className="text-lg text-app-foreground">Dark Mode</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
      <Text className="mt-3 text-sm text-app-muted">Current theme: {isDark ? 'Dark' : 'Light'}</Text>
    </View>
  );
}
