import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Animated, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { APP_ROUTES } from '@/constants/routes';
import { useAppTheme } from '@/components/theme/useAppTheme';
import {
  FLOATING_HEARTS,
  HERO_IMAGES,
  LANDING_COPY,
  LANDING_FEATURES,
  LANDING_ICON_COLORS,
  LANDING_STATS,
} from '@/features/landing/constants';
import { useLandingAnimations } from '@/features/landing/hooks/useLandingAnimations';

export default function LandingScreen() {
  const { theme } = useAppTheme();
  const animations = useLandingAnimations();

  return (
    <SafeAreaView className="flex-1 bg-app-background">
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <View className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-rose-500/20" />
      <View className="absolute -left-20 top-80 h-80 w-80 rounded-full bg-orange-500/15" />
      <Animated.View
        className="absolute right-8 top-24 h-24 w-24 rounded-full bg-app-primary/30"
        style={{ opacity: animations.glowAnim }}
      />
      <Animated.View
        className="absolute left-10 top-32 h-10 w-10 rounded-full bg-amber-400/35"
        style={{ opacity: animations.glowAnim }}
      />

      <Animated.ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-10 pt-4"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={animations.onScroll}>
        <Animated.View
          style={{ opacity: animations.contentAnim, transform: [{ translateY: animations.contentTranslate }] }}>
          <View className="mt-3 self-start rounded-full border border-app-border bg-app-card/90 px-4 py-2">
            <Text className="text-xs font-semibold tracking-[2px] text-app-muted">{LANDING_COPY.EYEBROW}</Text>
          </View>

          <View className="mt-6 h-80">
            <View className="absolute inset-x-5 top-3 h-72 rounded-[30px] bg-rose-400/20" />
            <View className="absolute inset-x-2 top-1 h-72 rounded-[30px] bg-amber-300/20" />

            <Animated.View
              className="h-72 overflow-hidden rounded-[30px] border border-white/20 bg-app-card"
              style={{ transform: [{ translateY: animations.heroDrift }, { rotateZ: animations.heroTilt }] }}>
              <Animated.View
                className="absolute inset-0 bg-orange-500/20"
                style={{ transform: [{ translateY: animations.heroBackgroundTranslateY }, { scale: 1.1 }] }}
              />
              <Animated.Image
                source={{ uri: HERO_IMAGES[animations.previousImageIndex] }}
                className="absolute inset-0 h-full w-full"
                resizeMode="cover"
                style={{ transform: [{ translateY: animations.heroForegroundTranslateY }, { scale: animations.heroScale }] }}
              />
              <Animated.Image
                source={{ uri: HERO_IMAGES[animations.activeImageIndex] }}
                className="absolute inset-0 h-full w-full"
                resizeMode="cover"
                style={{
                  opacity: animations.transitionOpacity,
                  transform: [{ translateY: animations.heroBackgroundTranslateY }, { scale: animations.transitionScale }],
                }}
              />

              <View className="absolute inset-0 bg-black/12" />
              <View className="absolute inset-0 bg-orange-900/5" />
              <Animated.View
                className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/25"
                style={{ transform: [{ rotate: animations.ringRotate }] }}
              />
              <Animated.View
                className="absolute -left-8 bottom-10 h-20 w-20 rounded-full bg-white/10"
                style={{ transform: [{ translateY: animations.chipDrift }] }}
              />

              {/* Decorative hearts are data-driven for easier visual tweaks without touching layout logic. */}
              {FLOATING_HEARTS.map((heart) => (
                <Animated.View
                  key={`${heart.className}-${heart.size}`}
                  className={`absolute ${heart.className}`}
                  style={{
                    opacity: animations.heartOpacity,
                    transform: [{ translateY: heart.motion === 'heart' ? animations.heartTranslateY : animations.chipDrift }],
                  }}>
                  <FontAwesome name="heart" size={heart.size} color={heart.color} />
                </Animated.View>
              ))}

              <Animated.View
                className="absolute bottom-4 right-5 rounded-full bg-white/20 px-3 py-1.5"
                style={{ opacity: animations.transitionOpacity }}>
                <Text className="text-[10px] font-semibold uppercase tracking-[2px] text-white">
                  {LANDING_COPY.HERO_CHIP_VERIFIED}
                </Text>
              </Animated.View>

              <Animated.View
                className="absolute left-4 top-4 rounded-full bg-white/22 px-3 py-1.5"
                style={{ transform: [{ translateY: animations.chipDrift }] }}>
                <Text className="text-[10px] font-semibold uppercase tracking-[2px] text-white">
                  {LANDING_COPY.HERO_CHIP_FAMILY_VERIFIED}
                </Text>
              </Animated.View>

              <View className="absolute bottom-20 left-5 right-5">
                <Animated.View
                  className="relative self-start items-start"
                  style={{ transform: [{ scale: animations.titleScale }, { translateY: animations.titleTranslateY }] }}>
                  <Text className="text-[36px] font-black leading-[40px] tracking-[0.2px] text-orange-100">
                    {LANDING_COPY.HERO_TITLE}
                  </Text>
                  <Animated.View
                    className="absolute -right-5 -top-1"
                    style={{ opacity: animations.heartOpacity, transform: [{ translateY: animations.heartTranslateY }] }}>
                    <FontAwesome name="heart" size={13} color={LANDING_ICON_COLORS.TITLE_HEART_RIGHT} />
                  </Animated.View>
                  <Animated.View
                    className="absolute -left-3 top-7"
                    style={{ opacity: animations.heartOpacity, transform: [{ translateY: animations.chipDrift }] }}>
                    <FontAwesome name="heart" size={10} color={LANDING_ICON_COLORS.TITLE_HEART_LEFT} />
                  </Animated.View>
                </Animated.View>
                <Text className="mt-1 text-sm font-medium text-white/90">
                  {LANDING_COPY.HERO_SUBTITLE}
                </Text>
              </View>
            </Animated.View>
          </View>

          <View className="mt-4">
            <Text className="text-[48px] font-black leading-[52px] text-app-foreground">
              {LANDING_COPY.HEADING_LINE_1}
            </Text>
            <Text className="text-[48px] font-black leading-[52px] text-app-foreground/80">
              {LANDING_COPY.HEADING_LINE_2}
            </Text>
            <Text className="mt-4 text-base leading-7 text-app-muted">
              {LANDING_COPY.DESCRIPTION}
            </Text>
          </View>

          <View className="mt-7 flex-row gap-3">
            {LANDING_STATS.map((stat) => (
              <View key={stat.label} className="flex-1 rounded-2xl border border-app-border bg-app-card px-3 py-3">
                <Text className="text-xl font-black text-app-foreground">{stat.value}</Text>
                <Text className="text-xs text-app-muted">{stat.label}</Text>
              </View>
            ))}
          </View>

          <View className="mt-8 gap-3">
            {LANDING_FEATURES.map((feature) => (
              <View
                key={feature.label}
                className="flex-row items-center rounded-2xl border border-app-border bg-app-card px-4 py-4">
                <FontAwesome
                  name={feature.icon}
                  size={18}
                  color={theme === 'dark' ? feature.darkColor : feature.lightColor}
                />
                <Text className="ml-3 text-sm font-medium text-app-foreground">{feature.label}</Text>
              </View>
            ))}
          </View>

          <View className="mt-8">
            <Pressable
              className="flex-row items-center justify-center rounded-3xl border border-rose-300 bg-rose-400 px-6 py-4 shadow-lg shadow-rose-200/60 active:opacity-90"
              onPress={() => router.push(APP_ROUTES.REGISTER_FLOW_MOBILE as never)}>
              <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <FontAwesome name="heart" size={12} color={LANDING_ICON_COLORS.WHITE} />
              </View>
              <Text className="text-base font-bold tracking-[0.3px] text-white">{LANDING_COPY.CTA_PRIMARY}</Text>
              <FontAwesome name="arrow-right" size={14} color={LANDING_ICON_COLORS.WHITE} style={{ marginLeft: 10 }} />
            </Pressable>

            <Pressable
              className="mt-3 flex-row items-center justify-center rounded-3xl border border-app-border bg-app-card px-6 py-4 active:opacity-80"
              onPress={() => router.push(APP_ROUTES.REGISTER as never)}>
              <FontAwesome
                name="clone"
                size={13}
                color={theme === 'dark' ? LANDING_ICON_COLORS.LEGACY_DARK : LANDING_ICON_COLORS.LEGACY_LIGHT}
                style={{ marginRight: 8 }}
              />
              <Text className="text-sm font-semibold tracking-[0.2px] text-app-foreground">
                {LANDING_COPY.CTA_SECONDARY}
              </Text>
            </Pressable>

            <Pressable
              className="mt-3 flex-row items-center justify-center rounded-3xl border border-app-border bg-app-card px-6 py-4 active:opacity-80"
              onPress={() => router.replace(APP_ROUTES.TABS)}>
              <FontAwesome
                name="users"
                size={13}
                color={theme === 'dark' ? LANDING_ICON_COLORS.LEGACY_DARK : LANDING_ICON_COLORS.LEGACY_LIGHT}
                style={{ marginRight: 8 }}
              />
              <Text className="text-sm font-semibold tracking-[0.2px] text-app-foreground">
                {LANDING_COPY.CTA_TERTIARY}
              </Text>
            </Pressable>

            <Text className="mt-4 text-center text-xs text-app-muted">
              {LANDING_COPY.FOOTER_NOTE}
            </Text>
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
