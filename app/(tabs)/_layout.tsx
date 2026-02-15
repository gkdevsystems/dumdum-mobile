import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import { Image, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/providers/AuthProvider';
import { useAppTheme } from '@/components/theme/useAppTheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Text } from '@/components/ui/text';
import tokens from '@/theme/tokens';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={22} style={{ marginBottom: 0 }} {...props} />;
}

function BrandHeaderTitle() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 4 }}>
      <View className="size-10 items-center justify-center overflow-hidden rounded-xl border border-app-border bg-app-card">
        <Image
          source={require('../../assets/images/bg1.png')}
          style={{ width: 38, height: 38 }}
          resizeMode="cover"
        />
      </View>
      <View>
        <Text className="text-[11px] font-semibold uppercase tracking-[1.5px] text-app-muted">Match Hub</Text>
        <Text className="text-[20px] font-extrabold leading-6">
          <Text className="text-app-foreground">Suyam</Text>
          <Text className="text-app-primary">varam</Text>
        </Text>
      </View>
    </View>
  );
}

function HeaderNotificationButton() {
  return (
    <Pressable className="mr-2 size-9 items-center justify-center rounded-full border border-app-border bg-app-card">
      <FontAwesome name="bell-o" size={16} color="rgb(var(--app-foreground))" />
      <View className="absolute right-2 top-2 size-2 rounded-full bg-app-primary" />
    </Pressable>
  );
}

export default function TabLayout() {
  const { theme, palette } = useAppTheme();
  const activeTokens = tokens.resolveTokens(theme, palette);
  const { token, isLoading } = useAuth();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    console.log('[ROUTE][TabsGuard] evaluate', { isLoading, hasToken: Boolean(token) });
  }, [isLoading, token]);

  if (isLoading) {
    console.log('[ROUTE][TabsGuard] blocked: auth loading');
    return null;
  }

  // Todo Commenting for now

  // if (!token) {
  //   console.log('[ROUTE][TabsGuard] redirect -> /landing (missing token)');
  //   return <Redirect href="/landing" />;
  // }

  console.log('[ROUTE][TabsGuard] access granted to tabs');
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTokens.tint,
        tabBarInactiveTintColor: activeTokens.tabIconDefault,
        tabBarStyle: {
          backgroundColor: activeTokens.card,
          borderTopColor: activeTokens.border,
          borderTopWidth: 1,
          height: 62 + Math.max(insets.bottom, 8),
          paddingTop: 6,
          paddingBottom: Math.max(insets.bottom, 8),
        },
        tabBarItemStyle: { paddingVertical: 4 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        headerStyle: {
          backgroundColor: activeTokens.card,
        },
        headerShadowVisible: true,
        headerTitleStyle: { fontWeight: '700' },
        headerTitleAlign: 'left',
        headerTintColor: activeTokens.text,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTitle: () => <BrandHeaderTitle />,
          headerRight: () => <HeaderNotificationButton />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Matches',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
          headerTitle: 'Matches',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
