import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, ScrollView, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { PROFILE_DETAILS_COPY } from '@/features/profile-details/constants';
import { ProfileFeedIntro } from '@/features/profile-details/components/profile-feed-intro';
import { ProfilePostCard } from '@/features/profile-details/components/profile-post-card';
import type { ProfileDetails } from '@/features/profile-details/types';

type ProfileFeedTabProps = {
  profile: ProfileDetails;
};

export function ProfileFeedTab({ profile }: ProfileFeedTabProps) {
  const posts = profile.posts;

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
      <View className="mb-4">
        <View className="mb-2.5 flex-row items-center justify-between">
          <Text className="text-sm font-semibold text-app-foreground">{PROFILE_DETAILS_COPY.FEED_MOMENTS_TITLE}</Text>
          <Text className="text-xs text-app-muted">{PROFILE_DETAILS_COPY.FEED_JOURNAL_TITLE}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 pr-4">
          {posts.map((post) => (
            <View key={`${post.id}-moment`} className="w-36 overflow-hidden rounded-2xl border border-app-border bg-app-card">
              {post.mediaUri ? (
                <Image source={{ uri: post.mediaUri }} className="h-24 w-full" resizeMode="cover" />
              ) : (
                <View className="h-24 items-center justify-center bg-app-primary/10 px-2">
                  <FontAwesome name="quote-left" size={13} color="rgb(var(--app-primary))" />
                  <Text className="mt-2 text-center text-[11px] text-app-muted">{post.caption}</Text>
                </View>
              )}
              <View className="px-2.5 py-2">
                <Text className="text-[11px] font-semibold text-app-foreground">{post.vibeLabel ?? 'Moment'}</Text>
                <Text className="mt-0.5 text-[10px] text-app-muted">{post.createdAtLabel}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {posts.map((post) => (
        <ProfilePostCard key={post.id} post={post} authorName={profile.name} />
      ))}
    </View>
  );
}
