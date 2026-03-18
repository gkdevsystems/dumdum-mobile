import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import '../global.css';
import { vars } from 'nativewind';

import { FrostBackdrop } from '@/components/theme/FrostBackdrop';
import { useAppTheme } from '@/components/theme/useAppTheme';
import { APP_ROUTES } from '@/constants/routes';
import { AuthProvider } from '@/providers/AuthProvider';
import { createNavigationTheme } from '@/theme/createNavigationTheme';
import tokens from '@/theme/tokens';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Launch into landing, then navigate to tabs from there.
  initialRouteName: APP_ROUTES.LANDING,
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Keep native splash visible until app fonts are ready to prevent a style flash.
  if (!loaded && !error) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { theme, palette } = useAppTheme();
  const activeTokens = tokens.resolveTokens(theme, palette);
  const isFrost = theme === 'frost';
  const themeVars = vars(tokens.toCssVars(activeTokens));
  const navigationTheme = createNavigationTheme(theme, activeTokens);

  return (
    <View style={themeVars} className="flex-1">
      {isFrost ? <FrostBackdrop /> : null}
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
            <Stack.Screen name="profile/[profileId]" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
      </AuthProvider>
    </View>
  );
}
