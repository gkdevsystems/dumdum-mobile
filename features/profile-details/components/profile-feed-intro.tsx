import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ScrollView, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { PROFILE_DETAILS_COPY } from '@/features/profile-details/constants';

const FEED_FILTERS = [
  PROFILE_DETAILS_COPY.FEED_FILTER_LIFESTYLE,
  PROFILE_DETAILS_COPY.FEED_FILTER_VALUES,
  PROFILE_DETAILS_COPY.FEED_FILTER_FAMILY,
  PROFILE_DETAILS_COPY.FEED_FILTER_TRAVEL,
  PROFILE_DETAILS_COPY.FEED_FILTER_BELIEFS,
] as const;

export function ProfileFeedIntro() {
  return (
    <View className="mb-4">
      <Card className="mb-3 rounded-3xl border-app-border bg-app-card px-4 py-4">
        <Text className="text-base font-bold text-app-foreground">{PROFILE_DETAILS_COPY.FEED_INTRO_TITLE}</Text>
        <Text className="mt-1 text-sm text-app-muted">{PROFILE_DETAILS_COPY.FEED_INTRO_SUBTITLE}</Text>
        <View className="mt-3 flex-row items-center rounded-2xl border border-app-border bg-app-background/60 px-3 py-3">
          <FontAwesome name="camera" size={13} color="rgb(var(--app-primary))" />
          <Text className="ml-2 flex-1 text-sm text-app-muted">{PROFILE_DETAILS_COPY.FEED_COMPOSER_PLACEHOLDER}</Text>
          <View className="rounded-full bg-app-primary px-2.5 py-1">
            <Text className="text-[10px] font-semibold text-white">NEW</Text>
          </View>
        </View>
      </Card>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pr-4">
        {FEED_FILTERS.map((filter, index) => (
          <View
            key={filter}
            className={`rounded-full border px-3 py-1.5 ${index === 0 ? 'border-app-primary bg-app-primary/15' : 'border-app-border bg-app-card'}`}>
            <Text className={`text-xs font-semibold ${index === 0 ? 'text-app-primary' : 'text-app-muted'}`}>
              {filter}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
