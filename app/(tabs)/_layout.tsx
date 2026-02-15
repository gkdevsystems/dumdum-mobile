import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import { useAuth } from '@/providers/AuthProvider';
import { useAppTheme } from '@/components/theme/useAppTheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import tokens from '@/theme/tokens';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { theme, palette } = useAppTheme();
  const activeTokens = tokens.resolveTokens(theme, palette);
  const { token, isLoading } = useAuth();

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
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={activeTokens.text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
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
