import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Animated, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { PROFILE_DETAILS_COPY } from '@/features/profile-details/constants';
import type { ProfileDetails } from '@/features/profile-details/types';

type ProfileHeroCardProps = {
  profile: ProfileDetails;
  scrollY: Animated.Value;
};

export function ProfileHeroCard({ profile, scrollY }: ProfileHeroCardProps) {
  const heroTranslateY = scrollY.interpolate({
    inputRange: [-240, 0, 220],
    outputRange: [-65, 0, 35],
    extrapolate: 'clamp',
  });
  const heroScale = scrollY.interpolate({
    inputRange: [-240, 0],
    outputRange: [1.24, 1],
    extrapolateRight: 'clamp',
  });

  return (
    <View className="mb-5 overflow-hidden rounded-[34px] border border-app-border bg-app-card">
      <View className="relative h-[410px]">
        <Animated.Image
          source={{ uri: profile.imageUri }}
          className="h-full w-full"
          resizeMode="cover"
          style={{ transform: [{ translateY: heroTranslateY }, { scale: heroScale }] }}
        />
        <View className="absolute inset-0 bg-black/35" />
        <View className="absolute inset-x-0 bottom-0 h-56 bg-black/45" />

        <View className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/15 px-3 py-1.5">
          <Text className="text-[11px] font-semibold uppercase tracking-[1.2px] text-white">
            {PROFILE_DETAILS_COPY.HEADER_TITLE}
          </Text>
        </View>
        <View className="absolute right-4 top-4 rounded-full border border-white/20 bg-app-primary px-3 py-1.5">
          <Text className="text-[11px] font-semibold uppercase tracking-[1.1px] text-white">
            {profile.matchPercent}% {PROFILE_DETAILS_COPY.MATCH}
          </Text>
        </View>

        <View className="absolute bottom-5 left-4 right-4">
          <View className="mb-3 rounded-2xl border border-white/20 bg-black/35 px-3 py-2">
            <Text className="text-xs text-white/90">{PROFILE_DETAILS_COPY.HEADER_SUBTITLE}</Text>
          </View>
          <Text className="text-[38px] font-black leading-[43px] text-white">
            {profile.name}, {profile.age}
          </Text>
          <Text className="mt-1 text-sm text-white/90">{profile.occupation}</Text>
          <Text className="text-sm text-white/85">{profile.location}</Text>

          <View className="mt-3 flex-row items-center gap-2">
            {profile.verified ? (
              <View className="rounded-full border border-emerald-200/50 bg-emerald-500/75 px-2.5 py-1">
                <Text className="text-[11px] font-semibold text-white">{PROFILE_DETAILS_COPY.VERIFIED}</Text>
              </View>
            ) : null}
            <View className="rounded-full border border-white/20 bg-white/15 px-2.5 py-1">
              <Text className="text-[11px] font-semibold text-white">{profile.height}</Text>
            </View>
            <View className="rounded-full border border-white/20 bg-white/15 px-2.5 py-1">
              <Text className="text-[11px] font-semibold text-white">{profile.education}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-row items-center justify-between border-t border-app-border px-4 py-3">
        <View className="flex-row items-center gap-2">
          <View className="size-7 items-center justify-center rounded-full bg-app-primary/15">
            <FontAwesome name="star" size={12} color="rgb(var(--app-primary))" />
          </View>
          <Text className="text-sm text-app-muted">{PROFILE_DETAILS_COPY.CREATIVE_NOTE}</Text>
        </View>
        <FontAwesome name="angle-right" size={16} color="rgb(var(--app-muted))" />
      </View>
    </View>
  );
}
