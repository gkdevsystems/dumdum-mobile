import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMemo, useState } from 'react';
import { Animated, Platform, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { PROFILE_DETAILS_COPY } from '@/features/profile-details/constants';
import { getProfileDetailsById } from '@/features/profile-details/data/mock-profile-details';
import { ProfileFeedTab } from '@/features/profile-details/components/profile-feed-tab';
import { ProfileHeroCard } from '@/features/profile-details/components/profile-hero-card';
import { ProfileInformationTab } from '@/features/profile-details/components/profile-information-tab';
import { ProfileTabSwitcher } from '@/features/profile-details/components/profile-tab-switcher';
import type { ProfileDetailTab } from '@/features/profile-details/types';

type ProfileDetailsScreenProps = {
  profileId: string;
};

export function ProfileDetailsScreen({ profileId }: ProfileDetailsScreenProps) {
  const profile = useMemo(() => getProfileDetailsById(profileId), [profileId]);
  const [activeTab, setActiveTab] = useState<ProfileDetailTab>('feed');
  const insets = useSafeAreaInsets();
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const shouldUseNativeDriver = Platform.OS !== 'web';

  if (!profile) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-app-background px-6">
        <Text className="text-lg font-semibold text-app-foreground">{PROFILE_DETAILS_COPY.NOT_FOUND_TITLE}</Text>
        <Text className="mt-2 text-center text-sm text-app-muted">
          {PROFILE_DETAILS_COPY.NOT_FOUND_SUBTITLE}
        </Text>
      </SafeAreaView>
    );
  }

  const headerOpacity = scrollY.interpolate({
    inputRange: [140, 240],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [170, 260],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView className="flex-1 bg-app-background">
      <View className="pointer-events-none absolute -right-20 -top-12 h-80 w-80 rounded-full bg-app-primary/18" />
      <View className="pointer-events-none absolute -left-24 top-[36%] h-64 w-64 rounded-full bg-app-primary/10" />
      <View className="pointer-events-none absolute -right-28 bottom-20 h-72 w-72 rounded-full bg-app-primary/14" />

      <Animated.View
        pointerEvents="none"
        style={{ opacity: headerOpacity, paddingTop: insets.top + 6 }}
        className="absolute inset-x-0 top-0 z-30 border-b border-app-border bg-app-background/95 px-4 pb-2">
        <Animated.View style={{ opacity: headerTitleOpacity }} className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View className="size-7 items-center justify-center rounded-full bg-app-primary/12">
              <FontAwesome name="heart" size={11} color="rgb(var(--app-primary))" />
            </View>
            <Text className="text-sm font-semibold text-app-foreground">{profile.name}</Text>
          </View>
          <Text className="text-xs text-app-muted">{profile.matchPercent}% {PROFILE_DETAILS_COPY.MATCH}</Text>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-20 pt-0"
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: shouldUseNativeDriver,
        })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <ProfileHeroCard profile={profile} scrollY={scrollY} />
        <View className="px-1">
          <ProfileTabSwitcher value={activeTab} onChange={setActiveTab} />

          {activeTab === 'feed' ? (
            <ProfileFeedTab posts={profile.posts} />
          ) : (
            <ProfileInformationTab profile={profile} />
          )}

          <Text className="mt-3 text-center text-xs text-app-muted">
            {PROFILE_DETAILS_COPY.HEADER_TITLE}
          </Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
