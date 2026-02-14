import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/components/theme/useAppTheme';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80',
];

export default function LandingScreen() {
  const { theme } = useAppTheme();
  const glowAnim = useRef(new Animated.Value(0.55)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  const driftAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const imageTransition = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const currentImageRef = useRef(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(driftAnim, {
          toValue: 1,
          duration: 2800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(driftAnim, {
          toValue: 0,
          duration: 2800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.95,
          duration: 1700,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.55,
          duration: 1700,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.timing(contentAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    const timer = setInterval(() => {
      const nextImage = (currentImageRef.current + 1) % HERO_IMAGES.length;
      setPreviousImageIndex(currentImageRef.current);
      setActiveImageIndex(nextImage);
      currentImageRef.current = nextImage;

      imageTransition.setValue(0);
      Animated.timing(imageTransition, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, 4200);

    return () => clearInterval(timer);
  }, [contentAnim, driftAnim, glowAnim, imageTransition, spinAnim]);

  const contentTranslate = contentAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [28, 0],
  });
  const heroForegroundTranslateY = scrollY.interpolate({
    inputRange: [-220, 0, 220],
    outputRange: [-90, 0, 65],
    extrapolate: 'clamp',
  });
  const heroBackgroundTranslateY = scrollY.interpolate({
    inputRange: [-220, 0, 220],
    outputRange: [-35, 0, 25],
    extrapolate: 'clamp',
  });
  const heroScale = scrollY.interpolate({
    inputRange: [-220, 0],
    outputRange: [1.28, 1],
    extrapolateRight: 'clamp',
  });
  const heroTilt = scrollY.interpolate({
    inputRange: [-160, 0, 160],
    outputRange: ['2deg', '0deg', '-1.5deg'],
    extrapolate: 'clamp',
  });
  const heroDrift = driftAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-8, 8],
  });
  const chipDrift = driftAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [6, -6],
  });
  const ringRotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const transitionOpacity = imageTransition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const transitionTranslateX = imageTransition.interpolate({
    inputRange: [0, 1],
    outputRange: [42, 0],
  });

  return (
    <SafeAreaView className="flex-1 bg-app-background">
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <View className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-rose-500/20" />
      <View className="absolute -left-20 top-80 h-80 w-80 rounded-full bg-orange-500/15" />
      <Animated.View className="absolute right-8 top-24 h-24 w-24 rounded-full bg-app-primary/30" style={{ opacity: glowAnim }} />
      <Animated.View className="absolute left-10 top-32 h-10 w-10 rounded-full bg-amber-400/35" style={{ opacity: glowAnim }} />

      <Animated.ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-10 pt-4"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}>
        <Animated.View style={{ opacity: contentAnim, transform: [{ translateY: contentTranslate }] }}>
          <View className="mt-3 self-start rounded-full border border-app-border bg-app-card/90 px-4 py-2">
            <Text className="text-xs font-semibold tracking-[2px] text-app-muted">INDIA'S MODERN MATRIMONY</Text>
          </View>

          <View className="mt-6 h-80">
            <View className="absolute inset-x-5 top-3 h-72 rounded-[30px] bg-rose-400/20" />
            <View className="absolute inset-x-2 top-1 h-72 rounded-[30px] bg-amber-300/20" />

            <Animated.View
              className="h-72 overflow-hidden rounded-[30px] border border-white/20 bg-app-card"
              style={{ transform: [{ translateY: heroDrift }, { rotateZ: heroTilt }] }}>
              <Animated.View
                className="absolute inset-0 bg-orange-500/20"
                style={{ transform: [{ translateY: heroBackgroundTranslateY }, { scale: 1.1 }] }}
              />
              <Animated.Image
                source={{ uri: HERO_IMAGES[previousImageIndex] }}
                className="absolute inset-0 h-full w-full"
                resizeMode="cover"
                style={{ transform: [{ translateY: heroForegroundTranslateY }, { scale: heroScale }] }}
              />
              <Animated.Image
                source={{ uri: HERO_IMAGES[activeImageIndex] }}
                className="absolute inset-0 h-full w-full"
                resizeMode="cover"
                style={{
                  opacity: transitionOpacity,
                  transform: [{ translateY: heroBackgroundTranslateY }, { translateX: transitionTranslateX }, { scale: heroScale }],
                }}
              />
              <View className="absolute inset-0 bg-black/38" />
              <View className="absolute inset-0 bg-orange-900/20" />
              <Animated.View
                className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/25"
                style={{ transform: [{ rotate: ringRotate }] }}
              />
              <Animated.View
                className="absolute -left-8 bottom-10 h-20 w-20 rounded-full bg-white/10"
                style={{ transform: [{ translateY: chipDrift }] }}
              />
              <Animated.View
                className="absolute bottom-4 right-5 rounded-full bg-white/20 px-3 py-1.5"
                style={{ opacity: transitionOpacity }}>
                <Text className="text-[10px] font-semibold uppercase tracking-[2px] text-white">
                  Real Ceremonies
                </Text>
              </Animated.View>

              <Animated.View
                className="absolute left-4 top-4 rounded-full bg-white/22 px-3 py-1.5"
                style={{ transform: [{ translateY: chipDrift }] }}>
                <Text className="text-[10px] font-semibold uppercase tracking-[2px] text-white">Family Verified</Text>
              </Animated.View>

              <Animated.View
                className="absolute right-4 top-4 rounded-full bg-white/22 px-3 py-1.5"
                style={{ transform: [{ translateY: heroDrift }] }}>
                <Text className="text-[10px] font-semibold uppercase tracking-[2px] text-white">Kundli Ready</Text>
              </Animated.View>

              <View className="absolute bottom-5 left-5 right-5">
                <Text className="text-3xl font-black leading-9 text-white">Tradition Meets Chemistry</Text>
                <Text className="mt-1 text-sm font-medium text-white/90">
                  For Indian families seeking serious, value-aligned matches.
                </Text>
              </View>
            </Animated.View>
          </View>

          <View className="mt-4">
            <Text className="text-[48px] font-black leading-[52px] text-app-foreground">
              Find your forever.
            </Text>
            <Text className="text-[48px] font-black leading-[52px] text-app-foreground/80">
              Not your next swipe.
            </Text>
            <Text className="mt-4 text-base leading-7 text-app-muted">
              Suyamvaram combines community preferences, horoscope compatibility, and verified profiles to help
              families and individuals choose with clarity.
            </Text>
          </View>

          <View className="mt-7 flex-row gap-3">
            <View className="flex-1 rounded-2xl border border-app-border bg-app-card px-3 py-3">
              <Text className="text-xl font-black text-app-foreground">50K+</Text>
              <Text className="text-xs text-app-muted">Verified profiles</Text>
            </View>
            <View className="flex-1 rounded-2xl border border-app-border bg-app-card px-3 py-3">
              <Text className="text-xl font-black text-app-foreground">28+</Text>
              <Text className="text-xs text-app-muted">Communities</Text>
            </View>
            <View className="flex-1 rounded-2xl border border-app-border bg-app-card px-3 py-3">
              <Text className="text-xl font-black text-app-foreground">4.9</Text>
              <Text className="text-xs text-app-muted">Family rating</Text>
            </View>
          </View>

          <View className="mt-8 gap-3">
            <View className="flex-row items-center rounded-2xl border border-app-border bg-app-card px-4 py-4">
              <FontAwesome name="shield" size={18} color={theme === 'dark' ? '#fda4af' : '#e11d48'} />
              <Text className="ml-3 text-sm font-medium text-app-foreground">ID, family and profile verification</Text>
            </View>

            <View className="flex-row items-center rounded-2xl border border-app-border bg-app-card px-4 py-4">
              <FontAwesome name="users" size={18} color={theme === 'dark' ? '#fdba74' : '#ea580c'} />
              <Text className="ml-3 text-sm font-medium text-app-foreground">Parents can co-manage preferences</Text>
            </View>

            <View className="flex-row items-center rounded-2xl border border-app-border bg-app-card px-4 py-4">
              <FontAwesome name="heart" size={18} color={theme === 'dark' ? '#fda4af' : '#e11d48'} />
              <Text className="ml-3 text-sm font-medium text-app-foreground">Kundli-ready, intent-first matching</Text>
            </View>
          </View>

          <View className="mt-8">
            <Pressable
              className="flex-row items-center justify-center rounded-2xl bg-app-primary px-6 py-4 active:opacity-90"
              onPress={() => router.replace('/(tabs)')}>
              <Text className="text-base font-bold text-white">Get Started</Text>
              <FontAwesome name="arrow-right" size={14} color="#ffffff" style={{ marginLeft: 8 }} />
            </Pressable>

            <Pressable
              className="mt-3 items-center rounded-2xl border border-app-border bg-app-card px-6 py-4 active:opacity-80"
              onPress={() => router.replace('/(tabs)')}>
              <Text className="text-sm font-semibold text-app-foreground">Explore Community Matches</Text>
            </Pressable>

            <Text className="mt-4 text-center text-xs text-app-muted">
              By continuing, you agree to respectful community standards and privacy policy.
            </Text>
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
