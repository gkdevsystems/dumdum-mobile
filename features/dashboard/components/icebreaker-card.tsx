import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import type { Icebreaker } from '@/shared/dashboard/types';

type IcebreakerCardProps = {
  data: Icebreaker;
};

export function IcebreakerCard({ data }: IcebreakerCardProps) {
  return (
    <Card className="mb-6 rounded-3xl border border-dashed border-app-border bg-app-card p-4">
      <View className="mb-2 flex-row items-center gap-2">
        <View className="size-8 items-center justify-center rounded-lg bg-app-primary">
          <FontAwesome name="comment-o" size={14} color="#ffffff" />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-extrabold text-app-foreground">Icebreaker Question</Text>
          <Text className="text-xs text-app-muted">Answer to stand out</Text>
        </View>
      </View>
      <View className="rounded-xl bg-app-border/30 px-3 py-3">
        <Text className="text-sm italic text-app-foreground">"{data.question}"</Text>
      </View>
      <View className="mt-3 flex-row items-center justify-between">
        <Text className="text-xs text-app-muted">{data.answeredCount} matches answered this</Text>
        <Text className="text-xs font-semibold text-app-primary">New Question</Text>
      </View>
      <Pressable className="mt-3 h-11 items-center justify-center rounded-2xl bg-app-primary">
        <Text className="text-sm font-bold text-white">{data.ctaLabel}</Text>
      </Pressable>
    </Card>
  );
}

