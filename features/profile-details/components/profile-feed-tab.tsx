import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { PROFILE_DETAILS_COPY } from '@/features/profile-details/constants';
import { ProfileFeedIntro } from '@/features/profile-details/components/profile-feed-intro';
import { ProfilePostCard } from '@/features/profile-details/components/profile-post-card';
import type { ProfilePost } from '@/features/profile-details/types';

type ProfileFeedTabProps = {
  posts: ProfilePost[];
};

export function ProfileFeedTab({ posts }: ProfileFeedTabProps) {
  if (posts.length === 0) {
    return (
      <>
        <ProfileFeedIntro />
        <View className="rounded-2xl border border-app-border bg-app-card px-4 py-5">
          <Text className="text-center text-sm text-app-muted">{PROFILE_DETAILS_COPY.FEED_EMPTY}</Text>
        </View>
      </>
    );
  }

  return (
    <View>
      <ProfileFeedIntro />
      {posts.map((post) => (
        <ProfilePostCard key={post.id} post={post} />
      ))}
    </View>
  );
}
