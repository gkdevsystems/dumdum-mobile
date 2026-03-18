import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  if (!profile) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-app-background px-6">
        <Text className="text-lg font-semibold text-app-foreground">Profile not found</Text>
        <Text className="mt-2 text-center text-sm text-app-muted">
          We could not find this profile. Please go back and choose another match.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-app-background">
      <View className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-app-primary/12" />
      <View className="pointer-events-none absolute -left-20 top-72 h-60 w-60 rounded-full bg-app-primary/10" />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-20 pt-3"
        showsVerticalScrollIndicator={false}>
        <ProfileHeroCard profile={profile} />
        <ProfileTabSwitcher value={activeTab} onChange={setActiveTab} />

        {activeTab === 'feed' ? (
          <ProfileFeedTab posts={profile.posts} />
        ) : (
          <ProfileInformationTab profile={profile} />
        )}

        <Text className="mt-2 text-center text-xs text-app-muted">
          {PROFILE_DETAILS_COPY.HEADER_TITLE}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
