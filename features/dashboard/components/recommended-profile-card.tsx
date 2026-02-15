import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, Pressable, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import type { DashboardProfile } from '@/shared/dashboard/types';

type RecommendedProfileCardProps = {
  profile: DashboardProfile;
};

export function RecommendedProfileCard({ profile }: RecommendedProfileCardProps) {
  return (
    <Card className="mb-4 overflow-hidden rounded-3xl border-app-border bg-app-card p-0">
      <View className="relative h-72">
        <Image source={{ uri: profile.imageUri }} className="h-full w-full" resizeMode="cover" />
        <View className="absolute inset-0 bg-black/25" />
        <View className="absolute left-4 top-4 rounded-full bg-emerald-100 px-3 py-1">
          <Text className="text-[11px] font-semibold text-emerald-700">Verified</Text>
        </View>
        <View className="absolute right-4 top-4 rounded-full bg-app-primary px-3 py-1">
          <Text className="text-[11px] font-semibold text-white">{profile.matchPercent}% Match</Text>
        </View>
        <View className="absolute bottom-4 left-4 right-4">
          <Text className="text-4xl font-black text-white">
            {profile.name}, {profile.age}
          </Text>
          <Text className="text-sm text-white">{profile.location}</Text>
        </View>
      </View>
      <View className="gap-2 px-4 py-4">
        <Text className="text-sm font-semibold text-app-foreground">{profile.occupation}</Text>
        <Text className="text-sm text-app-muted">{profile.education}</Text>
        <Text className="text-sm text-app-muted">{profile.height}</Text>
        <View className="mt-2 flex-row gap-2">
          <Pressable className="h-11 flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-app-primary">
            <FontAwesome name="heart-o" size={14} color="#ffffff" />
            <Text className="text-sm font-bold text-white">Connect</Text>
          </Pressable>
          <Pressable className="size-11 items-center justify-center rounded-2xl bg-app-border/40">
            <FontAwesome name="comment-o" size={15} color="rgb(var(--app-muted))" />
          </Pressable>
          <Pressable className="size-11 items-center justify-center rounded-2xl bg-app-border/40">
            <FontAwesome name="bookmark-o" size={15} color="rgb(var(--app-muted))" />
          </Pressable>
        </View>
      </View>
    </Card>
  );
}

