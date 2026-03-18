import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider, type Theme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Image, View } from 'react-native';
import 'react-native-reanimated';
import '../global.css';
import { vars } from 'nativewind';

import { AuthProvider } from '@/providers/AuthProvider';
import tokens from '@/theme/tokens';
import { useAppTheme } from '@/components/theme/useAppTheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Launch into landing, then navigate to tabs from there.
  initialRouteName: 'landing',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    console.log('[ROUTE][RootLayout] font state changed', { loaded, hasError: Boolean(error) });
  }, [loaded, error]);

  useEffect(() => {
    if (loaded || error) {
      console.log('[ROUTE][RootLayout] hiding native splash');
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // if (!loaded && !error) {
  //   console.log('[ROUTE][RootLayout] waiting for fonts before rendering routes');
  //   return null;
  // }

  console.log('[ROUTE][RootLayout] rendering root navigator');
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { theme, palette } = useAppTheme();
  const activeTokens = tokens.resolveTokens(theme, palette);
  const isFrost = theme === 'frost';
  const isNavigationDark = theme === 'dark';
  const themeVars = vars({
    'app-background': hexToRgb(activeTokens.background),
    'app-foreground': hexToRgb(activeTokens.foreground),
    'app-card': hexToRgb(activeTokens.card),
    'app-border': hexToRgb(activeTokens.border),
    'app-muted': hexToRgb(activeTokens.muted),
    'app-primary': hexToRgb(activeTokens.primary),
  });
  const navigationTheme: Theme = {
    ...(isNavigationDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isNavigationDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: activeTokens.primary,
      background: activeTokens.background,
      card: activeTokens.card,
      text: activeTokens.text,
      border: activeTokens.border,
      notification: activeTokens.primary,
    },
  };
  //const frostBackgroundSource = require('../assets/images/bg_glass1.jpg');

  return (
    <View style={themeVars} className="flex-1">
      {isFrost ? (
        <>
          {/* <Image
            source={frostBackgroundSource}
            className="absolute inset-0 h-full w-full opacity-50"
            resizeMode="cover"
          /> */}
          <View className="absolute -left-16 -top-12 h-80 w-80 rounded-full bg-cyan-300/30" />
          <View className="absolute -right-20 top-36 h-96 w-96 rounded-full bg-violet-300/24" />
          <View className="absolute bottom-0 left-4 h-80 w-80 rounded-full bg-app-primary/24" />
          <View
            className="absolute left-[-30] top-[32%] h-52 w-[130%] bg-white/8"
            style={{ transform: [{ rotate: '-10deg' }] }}
          />
          <View
            pointerEvents="none"
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(5, 8, 18, 0.28)' }}
          />
        </>
      ) : null}
      <AuthProvider>
        <ThemeProvider value={navigationTheme}>
          <Stack
            screenOptions={{
              contentStyle: { backgroundColor: isFrost ? 'transparent' : activeTokens.background },
            }}>
            <Stack.Screen name="landing" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="(register-flow)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
      </AuthProvider>
    </View>
  );
}

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '');
  const value =
    normalized.length === 3
      ? normalized
        .split('')
        .map((char) => char + char)
        .join('')
      : normalized;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}
