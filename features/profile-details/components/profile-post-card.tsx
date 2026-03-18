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
    <Card className="mb-5 overflow-hidden rounded-[30px] border-app-border bg-app-card p-0">
      {post.mediaUri ? (
        <View className="relative h-[320px]">
          <Image source={{ uri: post.mediaUri }} className="h-full w-full" resizeMode="cover" />
          <View className="absolute inset-0 bg-black/25" />
          <View className="absolute inset-x-0 bottom-0 h-28 bg-black/30" />
          {isVideo ? (
            <View className="absolute right-3 top-3 rounded-full border border-yellow-100/35 bg-black/55 px-2.5 py-1">
              <Text className="text-[11px] font-semibold text-yellow-100">Video Story</Text>
            </View>
          ) : null}
          <View className="absolute bottom-4 left-4 right-4">
            <Text className="text-lg font-semibold text-white">{post.caption}</Text>
          </View>
        </View>
      ) : isQuote ? (
        <View className="bg-app-primary/10 px-5 py-10">
          <View className="mb-4 flex-row items-center gap-2">
            <FontAwesome name="quote-left" size={14} color={PROFILE_DETAILS_ACCENT.QUOTE} />
            <Text className="text-xs font-semibold uppercase tracking-[1.5px] text-app-primary">Quote</Text>
          </View>
          <Text className="text-xl font-semibold leading-9 text-app-foreground">"{post.caption}"</Text>
        </View>
      ) : null}

      {isQuote ? <Text className="px-4 pt-4 text-sm text-app-muted">{post.caption}</Text> : null}

      <View className="flex-row items-center justify-between px-4 pb-4 pt-3">
        <View className="rounded-full bg-app-primary/10 px-2.5 py-1">
          <Text className="text-xs font-medium text-app-primary">{post.createdAtLabel}</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-1.5">
            <FontAwesome name="heart" size={13} color="rgb(var(--app-primary))" />
            <Text className="text-xs font-semibold text-app-foreground">{post.likeCount}</Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <FontAwesome name="comment-o" size={13} color="rgb(var(--app-muted))" />
            <Text className="text-xs font-semibold text-app-foreground">{post.commentCount}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}
