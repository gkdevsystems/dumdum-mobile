import { View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { PROFILE_DETAILS_COPY } from '@/features/profile-details/constants';
import type { ProfileDetails } from '@/features/profile-details/types';

type ProfileInformationTabProps = {
  profile: ProfileDetails;
};

function TagList({ items }: { items: string[] }) {
  return (
    <View className="mt-2 flex-row flex-wrap gap-2">
      {items.map((item) => (
        <View key={item} className="rounded-full border border-app-border bg-app-card/90 px-3 py-1.5">
          <Text className="text-xs font-medium text-app-foreground">{item}</Text>
        </View>
      ))}
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="mb-4 rounded-2xl border border-app-border bg-app-card/80 px-3 py-3">
      <Text className="text-[11px] uppercase tracking-[1.4px] text-app-muted">{label}</Text>
      <Text className="mt-1 text-sm font-semibold text-app-foreground">{value}</Text>
    </View>
  );
}

export function ProfileInformationTab({ profile }: ProfileInformationTabProps) {
  return (
    <View>
      <Card className="mb-4 rounded-3xl border-app-border bg-app-card px-4 py-4">
        <Text className="text-[11px] uppercase tracking-[1.5px] text-app-muted">
          {PROFILE_DETAILS_COPY.STORY_BLOCK_TITLE}
        </Text>
        <Text className="mt-1 text-base font-bold text-app-foreground">{PROFILE_DETAILS_COPY.ABOUT_TITLE}</Text>
        <Text className="mt-2 text-sm leading-7 text-app-muted">{profile.about}</Text>
      </Card>

      <Card className="mb-4 rounded-3xl border-app-border bg-app-card px-4 py-4">
        <Text className="mb-3 text-base font-bold text-app-foreground">{PROFILE_DETAILS_COPY.HIGHLIGHTS_TITLE}</Text>
        <InfoRow label={PROFILE_DETAILS_COPY.LOOKING_FOR} value={profile.highlights.lookingFor} />

        <View className="mb-3">
          <Text className="text-xs uppercase tracking-[1.4px] text-app-muted">{PROFILE_DETAILS_COPY.VALUES}</Text>
          <TagList items={profile.highlights.values} />
        </View>

        <View className="mb-3">
          <Text className="text-xs uppercase tracking-[1.4px] text-app-muted">{PROFILE_DETAILS_COPY.INTERESTS}</Text>
          <TagList items={profile.highlights.interests} />
        </View>

        <View>
          <Text className="text-xs uppercase tracking-[1.4px] text-app-muted">{PROFILE_DETAILS_COPY.LANGUAGES}</Text>
          <TagList items={profile.highlights.languages} />
        </View>
      </Card>

      <Card className="rounded-3xl border-app-border bg-app-card px-4 py-4">
        <Text className="text-base font-bold text-app-foreground">{PROFILE_DETAILS_COPY.COMPATIBILITY_TITLE}</Text>
        <View className="mt-3 flex-row gap-2">
          <View className="flex-1 rounded-2xl bg-app-primary/12 px-3 py-3">
            <Text className="text-[11px] uppercase tracking-[1.2px] text-app-muted">Family</Text>
            <Text className="mt-1 text-lg font-extrabold text-app-foreground">92%</Text>
          </View>
          <View className="flex-1 rounded-2xl bg-app-primary/12 px-3 py-3">
            <Text className="text-[11px] uppercase tracking-[1.2px] text-app-muted">Lifestyle</Text>
            <Text className="mt-1 text-lg font-extrabold text-app-foreground">88%</Text>
          </View>
          <View className="flex-1 rounded-2xl bg-app-primary/12 px-3 py-3">
            <Text className="text-[11px] uppercase tracking-[1.2px] text-app-muted">Values</Text>
            <Text className="mt-1 text-lg font-extrabold text-app-foreground">95%</Text>
          </View>
        </View>
      </Card>
    </View>
  );
}
