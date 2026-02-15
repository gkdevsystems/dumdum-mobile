import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/components/theme/useAppTheme';
import { useAuth } from '@/providers/AuthProvider';

const paletteOptions = [
  { value: 'rose', label: 'Rose Glow', dotClass: 'bg-pink-400' },
  { value: 'ocean', label: 'Ocean Blue', dotClass: 'bg-blue-500' },
  { value: 'mint', label: 'Mint Calm', dotClass: 'bg-emerald-500' },
] as const;

export function ProfileScreen() {
  const { theme, setTheme, palette, setPalette } = useAppTheme();
  const { signOut } = useAuth();
  const isDark = theme === 'dark';

  const handleLogout = async () => {
    await signOut();
    router.replace('/landing');
  };

  return (
    <SafeAreaView className="flex-1 bg-app-background">
      <ScrollView contentContainerClassName="px-5 pb-24 pt-4">
        <Text className="mb-6 text-2xl font-black text-app-foreground">Profile & Settings</Text>

        <View className="mb-4 rounded-2xl border border-app-border bg-app-card p-4">
          <Text className="text-base font-semibold text-app-foreground">Theme</Text>
          <View className="mt-3 flex-row gap-2">
            <Pressable
              className={`flex-1 rounded-xl border px-4 py-3 ${!isDark ? 'border-app-primary bg-app-primary/10' : 'border-app-border bg-app-card'}`}
              onPress={() => setTheme('light')}>
              <Text className={`text-center font-medium ${!isDark ? 'text-app-primary' : 'text-app-foreground'}`}>
                Light
              </Text>
            </Pressable>
            <Pressable
              className={`flex-1 rounded-xl border px-4 py-3 ${isDark ? 'border-app-primary bg-app-primary/10' : 'border-app-border bg-app-card'}`}
              onPress={() => setTheme('dark')}>
              <Text className={`text-center font-medium ${isDark ? 'text-app-primary' : 'text-app-foreground'}`}>
                Dark
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="rounded-2xl border border-app-border bg-app-card p-4">
          <Text className="text-base font-semibold text-app-foreground">Color Aura</Text>
          <Text className="mt-1 text-xs text-app-muted">
            Pick a mood for buttons, highlights, and accents.
          </Text>
          <View className="mt-3 gap-2">
            {paletteOptions.map((option) => {
              const selected = option.value === palette;
              return (
                <Pressable
                  key={option.value}
                  className={`flex-row items-center justify-between rounded-xl border px-3 py-3 ${selected ? 'border-app-primary bg-app-primary/10' : 'border-app-border bg-app-card'}`}
                  onPress={() => setPalette(option.value)}>
                  <View className="flex-row items-center gap-3">
                    <View className={`size-3 rounded-full ${option.dotClass}`} />
                    <Text className={`${selected ? 'text-app-primary' : 'text-app-foreground'} font-medium`}>
                      {option.label}
                    </Text>
                  </View>
                  {selected ? <Text className="text-xs font-semibold text-app-primary">Selected</Text> : null}
                </Pressable>
              );
            })}
          </View>
        </View>

        <Text className="mt-3 text-sm text-app-muted">
          Current theme: {isDark ? 'Dark' : 'Light'} | Aura:{' '}
          {paletteOptions.find((item) => item.value === palette)?.label}
        </Text>

        <Pressable
          className="mt-8 rounded-2xl border border-app-border bg-app-card px-5 py-4 active:opacity-80"
          onPress={handleLogout}>
          <Text className="text-center text-sm font-semibold text-app-foreground">Logout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

