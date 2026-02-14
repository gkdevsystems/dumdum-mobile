import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/components/theme/useAppTheme';

export default function LandingScreen() {
  const { theme } = useAppTheme();
  const glowAnim = useRef(new Animated.Value(0.6)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const heroImage =
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=80';

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.6,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.timing(contentAnim, {
      toValue: 1,
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [contentAnim, glowAnim]);

  const contentTranslate = contentAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [22, 0],
  });
  const heroTranslateY = scrollY.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [-70, 0, 50],
    extrapolate: 'clamp',
  });
  const heroScale = scrollY.interpolate({
    inputRange: [-200, 0],
    outputRange: [1.25, 1],
    extrapolateRight: 'clamp',
  });

  return (
    <SafeAreaView className="flex-1 bg-app-background">
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <View className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-app-primary/20" />
      <View className="absolute -left-28 top-72 h-80 w-80 rounded-full bg-app-primary/10" />
      <Animated.View className="absolute right-10 top-24 h-16 w-16 rounded-full bg-app-primary/25" style={{ opacity: glowAnim }} />

      <Animated.ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}>
        <Animated.View style={{ opacity: contentAnim, transform: [{ translateY: contentTranslate }] }}>
          <View className="mt-3 self-start rounded-full border border-app-border bg-app-card px-4 py-2">
          <Text className="text-xs font-semibold tracking-wider text-app-muted">TRUSTED MATRIMONY</Text>
          </View>

          <View className="mt-6 h-72 overflow-hidden rounded-3xl border border-app-border bg-app-card">
            <Animated.Image
              source={{ uri: heroImage }}
              className="h-full w-full"
              resizeMode="cover"
              style={{ transform: [{ translateY: heroTranslateY }, { scale: heroScale }] }}
            />
            <View className="absolute inset-0 bg-black/35" />
            <View className="absolute inset-0 bg-orange-900/25" />
            <View className="absolute bottom-5 left-5 right-5">
              <Text className="text-2xl font-black text-white">Indian Matrimony, Reimagined</Text>
              <Text className="mt-1 text-sm font-medium text-white/90">
                Cultural values, family expectations, and modern compatibility in one journey.
              </Text>
            </View>

            <View className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1.5">
              <Text className="text-[11px] font-semibold uppercase tracking-widest text-white">
                Family Verified
              </Text>
            </View>

            <View className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1.5">
              <Text className="text-[11px] font-semibold uppercase tracking-widest text-white">Premium Matches</Text>
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-5xl font-black leading-tight text-app-foreground">Suyamvaram</Text>
            <Text className="mt-3 text-2xl font-semibold leading-9 text-app-foreground">
              From kundli to compatibility, begin your forever with confidence.
            </Text>
            <Text className="mt-4 text-base leading-7 text-app-muted">
              Discover serious profiles curated for Indian traditions, community preferences, and long-term
              commitment.
            </Text>
          </View>

          <View className="mt-8 gap-3">
            <View className="flex-row items-center rounded-2xl border border-app-border bg-app-card px-4 py-4">
              <FontAwesome name="shield" size={18} color={theme === 'dark' ? '#60a5fa' : '#2563eb'} />
              <Text className="ml-3 text-sm font-medium text-app-foreground">ID, family and profile verification</Text>
            </View>

            <View className="flex-row items-center rounded-2xl border border-app-border bg-app-card px-4 py-4">
              <FontAwesome name="users" size={18} color={theme === 'dark' ? '#60a5fa' : '#2563eb'} />
              <Text className="ml-3 text-sm font-medium text-app-foreground">Parents can co-manage preferences</Text>
            </View>

            <View className="flex-row items-center rounded-2xl border border-app-border bg-app-card px-4 py-4">
              <FontAwesome name="heart" size={18} color={theme === 'dark' ? '#60a5fa' : '#2563eb'} />
              <Text className="ml-3 text-sm font-medium text-app-foreground">Kundli-ready, intent-first matching</Text>
            </View>
          </View>

          <View className="mt-8">
            <Pressable
              className="items-center rounded-2xl bg-app-primary px-6 py-4 active:opacity-90"
              onPress={() => router.replace('/(tabs)')}>
              <Text className="text-base font-bold text-white">Get Started</Text>
            </Pressable>

            <Pressable
              className="mt-3 items-center rounded-2xl border border-app-border bg-app-card px-6 py-4 active:opacity-80"
              onPress={() => router.replace('/(tabs)')}>
              <Text className="text-sm font-semibold text-app-foreground">Browse Profiles</Text>
            </Pressable>

            <Text className="mt-4 text-center text-xs text-app-muted">
              By continuing, you agree to respectful community standards.
            </Text>
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
