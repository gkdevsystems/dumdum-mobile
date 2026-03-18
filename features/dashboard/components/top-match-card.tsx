import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, Pressable, View } from 'react-native';

import { useAppTheme } from '@/components/theme/useAppTheme';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import type { TopMatch } from '@/shared/dashboard/types';

type TopMatchCardProps = {
  data: TopMatch;
  onOpenProfile?: (profileId: string) => void;
};

export function TopMatchCard({ data, onOpenProfile }: TopMatchCardProps) {
  const profile = data.profile;
  const { theme } = useAppTheme();
  const isFrost = theme === 'frost';

  return (
    <Card
      className={`mb-5 rounded-3xl p-0 ${isFrost ? 'border-white/50 bg-app-card/70' : 'border-0 bg-app-primary'}`}>
      <View className="overflow-hidden rounded-3xl px-4 pb-4 pt-4">
        <View className="mb-3 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View
              className={`size-7 items-center justify-center rounded-full ${isFrost ? 'bg-app-primary/20' : 'bg-white/20'}`}>
              <FontAwesome
                name="bolt"
                size={12}
                color={isFrost ? 'rgb(var(--app-primary))' : '#ffffff'}
              />
            </View>
            <View>
              <Text className={`text-base font-bold ${isFrost ? 'text-app-foreground' : 'text-white'}`}>
                {data.title}
              </Text>
              <Text className={`text-xs ${isFrost ? 'text-app-muted' : 'text-white/85'}`}>
                Hand-picked just for you
              </Text>
            </View>
          </View>
          <View
            className={`rounded-full px-2.5 py-1 ${isFrost ? 'bg-app-primary/15' : 'bg-white/20'}`}>
            <Text
              className={`text-[11px] font-semibold ${isFrost ? 'text-app-primary' : 'text-white'}`}>
              {data.countdownLabel}
            </Text>
          </View>
        </View>

        <Pressable
          className={`rounded-2xl p-2 ${isFrost ? 'bg-white/35' : 'bg-white/10'}`}
          onPress={() => onOpenProfile?.(profile.id)}>
          <View className="flex-row gap-3">
            <Image source={{ uri: profile.imageUri }} className="h-20 w-20 rounded-xl" />
            <View className="flex-1">
              <Text
                className={`text-2xl font-extrabold ${isFrost ? 'text-app-foreground' : 'text-white'}`}>
                {profile.name}, {profile.age}
              </Text>
              <Text className={`mt-0.5 text-xs ${isFrost ? 'text-app-muted' : 'text-white/85'}`}>
                {profile.occupation}
              </Text>
              <Text className={`text-xs ${isFrost ? 'text-app-muted' : 'text-white/80'}`}>
                {profile.location}
              </Text>
              <View className="mt-2 flex-row flex-wrap gap-1.5">
                {data.tags.map((tag) => (
                  <View
                    key={tag}
                    className={`rounded-full px-2 py-0.5 ${isFrost ? 'bg-app-primary/15' : 'bg-white/20'}`}>
                    <Text
                      className={`text-[10px] font-semibold ${isFrost ? 'text-app-primary' : 'text-white'}`}>
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Pressable>

        <View className="mt-3 flex-row items-center gap-2">
          <Pressable
            className={`h-12 flex-1 items-center justify-center rounded-2xl ${isFrost ? 'bg-app-primary' : 'bg-white'}`}
            onPress={() => onOpenProfile?.(profile.id)}>
            <Text className={`font-bold ${isFrost ? 'text-white' : 'text-app-primary'}`}>
              {data.ctaLabel}
            </Text>
          </Pressable>
          <Pressable
            className={`size-12 items-center justify-center rounded-2xl ${isFrost ? 'bg-app-primary/15' : 'bg-white/20'}`}>
            <FontAwesome
              name="comment-o"
              size={16}
              color={isFrost ? 'rgb(var(--app-primary))' : '#ffffff'}
            />
          </Pressable>
        </View>
      </View>
    </Card>
  );
}
