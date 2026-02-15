import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, Pressable, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import type { TopMatch } from '@/shared/dashboard/types';

type TopMatchCardProps = {
  data: TopMatch;
};

export function TopMatchCard({ data }: TopMatchCardProps) {
  const profile = data.profile;

  return (
    <Card className="mb-5 rounded-3xl border-0 bg-app-primary p-0">
      <View className="overflow-hidden rounded-3xl px-4 pb-4 pt-4">
        <View className="mb-3 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View className="size-7 items-center justify-center rounded-full bg-white/20">
              <FontAwesome name="bolt" size={12} color="#ffffff" />
            </View>
            <View>
              <Text className="text-base font-bold text-white">{data.title}</Text>
              <Text className="text-xs text-white/85">Hand-picked just for you</Text>
            </View>
          </View>
          <View className="rounded-full bg-white/20 px-2.5 py-1">
            <Text className="text-[11px] font-semibold text-white">{data.countdownLabel}</Text>
          </View>
        </View>

        <View className="rounded-2xl bg-white/10 p-2">
          <View className="flex-row gap-3">
            <Image source={{ uri: profile.imageUri }} className="h-20 w-20 rounded-xl" />
            <View className="flex-1">
              <Text className="text-2xl font-extrabold text-white">
                {profile.name}, {profile.age}
              </Text>
              <Text className="mt-0.5 text-xs text-white/85">{profile.occupation}</Text>
              <Text className="text-xs text-white/80">{profile.location}</Text>
              <View className="mt-2 flex-row flex-wrap gap-1.5">
                {data.tags.map((tag) => (
                  <View key={tag} className="rounded-full bg-white/20 px-2 py-0.5">
                    <Text className="text-[10px] font-semibold text-white">{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View className="mt-3 flex-row items-center gap-2">
          <Pressable className="h-12 flex-1 items-center justify-center rounded-2xl bg-white">
            <Text className="font-bold text-app-primary">{data.ctaLabel}</Text>
          </Pressable>
          <Pressable className="size-12 items-center justify-center rounded-2xl bg-white/20">
            <FontAwesome name="comment-o" size={16} color="#ffffff" />
          </Pressable>
        </View>
      </View>
    </Card>
  );
}

