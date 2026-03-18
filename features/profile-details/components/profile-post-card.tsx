import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { PROFILE_DETAILS_ACCENT } from '@/features/profile-details/constants';
import type { ProfilePost } from '@/features/profile-details/types';

type ProfilePostCardProps = {
  post: ProfilePost;
};

export function ProfilePostCard({ post }: ProfilePostCardProps) {
  const isQuote = post.type === 'quote';
  const isVideo = post.type === 'video';

  return (
    <Card className="mb-4 overflow-hidden rounded-3xl border-app-border bg-app-card p-0">
      {post.mediaUri ? (
        <View className="relative h-64">
          <Image source={{ uri: post.mediaUri }} className="h-full w-full" resizeMode="cover" />
          <View className="absolute inset-0 bg-black/20" />
          {isVideo ? (
            <View className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1">
              <Text className="text-[11px] font-semibold text-white">Video</Text>
            </View>
          ) : null}
        </View>
      ) : isQuote ? (
        <View className="bg-app-primary/10 px-5 py-8">
          <View className="mb-3 flex-row items-center gap-2">
            <FontAwesome name="quote-left" size={14} color={PROFILE_DETAILS_ACCENT.QUOTE} />
            <Text className="text-xs font-semibold uppercase tracking-[1.5px] text-app-primary">Quote</Text>
          </View>
          <Text className="text-lg font-semibold leading-8 text-app-foreground">"{post.caption}"</Text>
        </View>
      ) : null}

      {!isQuote ? <Text className="px-4 pt-4 text-base font-medium text-app-foreground">{post.caption}</Text> : null}

      <View className="flex-row items-center justify-between px-4 pb-4 pt-3">
        <Text className="text-xs text-app-muted">{post.createdAtLabel}</Text>
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-1.5">
            <FontAwesome name="heart" size={12} color="rgb(var(--app-primary))" />
            <Text className="text-xs text-app-muted">{post.likeCount}</Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <FontAwesome name="comment-o" size={12} color="rgb(var(--app-muted))" />
            <Text className="text-xs text-app-muted">{post.commentCount}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}
