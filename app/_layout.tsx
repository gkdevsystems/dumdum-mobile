import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import '../global.css';
import { vars } from 'nativewind';

import { AuthProvider } from '@/providers/AuthProvider';
import tokens from '@/theme/tokens';
import { useColorScheme } from '@/components/useColorScheme';

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
  const colorScheme = useColorScheme();
  const activeTokens = tokens[colorScheme === 'dark' ? 'dark' : 'light'];
  const themeVars = vars({
    'app-background': hexToRgb(activeTokens.background),
    'app-foreground': hexToRgb(activeTokens.foreground),
    'app-card': hexToRgb(activeTokens.card),
    'app-border': hexToRgb(activeTokens.border),
    'app-muted': hexToRgb(activeTokens.muted),
    'app-primary': hexToRgb(activeTokens.primary),
  });

  return (
    <View style={themeVars} className="flex-1">
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="landing" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
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
