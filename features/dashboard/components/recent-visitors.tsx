import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, Pressable, ScrollView, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import type { VisitorProfile } from '@/shared/dashboard/types';
import { SectionHeader } from './section-header';

type RecentVisitorsProps = {
  visitors: VisitorProfile[];
};

export function RecentVisitors({ visitors }: RecentVisitorsProps) {
  return (
    <View className="mb-6">
      <SectionHeader title="Recent Visitors" subtitle={`${visitors.length} profiles viewed you today`} actionLabel="View All" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 pr-3">
        {visitors.map((visitor) => (
          <Card key={visitor.id} className="w-44 overflow-hidden rounded-3xl border-app-border bg-app-card p-0">
            <Image source={{ uri: visitor.imageUri }} className="h-44 w-full" />
            <View className="absolute left-2 top-2 size-6 items-center justify-center rounded-full bg-white/90">
              <FontAwesome name="check-circle" size={12} color="#2563eb" />
            </View>
            <View className="px-3 py-3">
              <Text className="text-lg font-extrabold text-app-foreground">
                {visitor.name}, {visitor.age}
              </Text>
              <Text className="mt-0.5 text-xs text-app-muted">{visitor.location}</Text>
              <Text className="text-xs text-app-muted">{visitor.occupation}</Text>
              <View className="mt-3 flex-row gap-2">
                <Pressable className="h-9 flex-1 items-center justify-center rounded-xl bg-app-primary">
                  <Text className="text-xs font-bold text-white">Like</Text>
                </Pressable>
                <Pressable className="size-9 items-center justify-center rounded-xl bg-app-border/50">
                  <FontAwesome name="close" size={12} color="rgb(var(--app-muted))" />
                </Pressable>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

