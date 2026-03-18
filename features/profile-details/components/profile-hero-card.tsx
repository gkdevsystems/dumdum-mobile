import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { PROFILE_DETAILS_COPY } from '@/features/profile-details/constants';
import type { ProfileDetails } from '@/features/profile-details/types';

type ProfileHeroCardProps = {
  profile: ProfileDetails;
};

export function ProfileHeroCard({ profile }: ProfileHeroCardProps) {
  return (
    <View className="mb-4 overflow-hidden rounded-3xl border border-app-border bg-app-card">
      <View className="relative h-72">
        <Image source={{ uri: profile.imageUri }} className="h-full w-full" resizeMode="cover" />
        <View className="absolute inset-0 bg-black/30" />
        <View className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1">
          <Text className="text-xs font-semibold text-white">{PROFILE_DETAILS_COPY.HEADER_TITLE}</Text>
        </View>
        <View className="absolute right-4 top-4 rounded-full bg-app-primary px-3 py-1">
          <Text className="text-xs font-semibold text-white">
            {profile.matchPercent}% {PROFILE_DETAILS_COPY.MATCH}
          </Text>
        </View>
        <View className="absolute bottom-4 left-4 right-4">
          <Text className="text-4xl font-black text-white">
            {profile.name}, {profile.age}
          </Text>
          <Text className="mt-1 text-sm text-white/90">{profile.location}</Text>
          <Text className="text-sm text-white/90">{profile.occupation}</Text>
          <View className="mt-2 flex-row items-center gap-2">
            {profile.verified ? (
              <View className="rounded-full bg-emerald-500/80 px-2.5 py-1">
                <Text className="text-[11px] font-semibold text-white">{PROFILE_DETAILS_COPY.VERIFIED}</Text>
              </View>
            ) : null}
            <View className="rounded-full bg-white/15 px-2.5 py-1">
              <Text className="text-[11px] font-semibold text-white">{profile.height}</Text>
            </View>
            <View className="rounded-full bg-white/15 px-2.5 py-1">
              <Text className="text-[11px] font-semibold text-white">{profile.education}</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex-row items-center justify-between px-4 py-3">
        <Text className="text-sm text-app-muted">Curated stories and milestones from their life.</Text>
        <FontAwesome name="star" size={16} color="rgb(var(--app-primary))" />
      </View>
    </View>
  );
}
