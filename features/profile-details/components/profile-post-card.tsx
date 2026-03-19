import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { PROFILE_DETAILS_ACCENT, PROFILE_DETAILS_COPY } from '@/features/profile-details/constants';
import type { ProfilePost } from '@/features/profile-details/types';

type ProfilePostCardProps = {
  post: ProfilePost;
  authorName: string;
};

export function ProfilePostCard({ post, authorName }: ProfilePostCardProps) {
  const isQuote = post.type === 'quote';
  const isVideo = post.type === 'video';

  return (
    <Card className="mb-5 overflow-hidden rounded-[30px] border-app-border bg-app-card p-0">
      <View className="flex-row items-center justify-between px-4 pb-3 pt-4">
        <View className="flex-row items-center gap-2">
          <View className="size-9 items-center justify-center rounded-full bg-app-primary/15">
            <FontAwesome name="heart" size={13} color="rgb(var(--app-primary))" />
          </View>
          <View>
            <Text className="text-sm font-semibold text-app-foreground">{authorName}</Text>
            <Text className="text-[11px] text-app-muted">{post.vibeLabel ?? PROFILE_DETAILS_COPY.HEADER_PORTFOLIO}</Text>
          </View>
          <View className="rounded-full bg-app-primary/10 px-2 py-1">
            <Text className="text-[10px] font-semibold text-app-primary">{post.type.toUpperCase()}</Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-[11px] text-app-muted">{post.locationLabel ?? PROFILE_DETAILS_COPY.CREATIVE_NOTE}</Text>
          <Text className="text-[10px] text-app-muted">{post.createdAtLabel}</Text>
        </View>
      </View>

      {post.mediaUri ? (
        <View className="relative h-[330px]">
          <Image source={{ uri: post.mediaUri }} className="h-full w-full" resizeMode="cover" />
          <View className="absolute inset-0 bg-black/22" />
          <View className="absolute inset-x-0 bottom-0 h-32 bg-black/35" />
          {isVideo ? (
            <View className="absolute right-3 top-3 rounded-full border border-yellow-100/40 bg-black/55 px-2.5 py-1">
              <Text className="text-[11px] font-semibold text-yellow-100">{PROFILE_DETAILS_COPY.POST_TYPE_VIDEO}</Text>
            </View>
          ) : null}
          <View className="absolute bottom-4 left-4 right-4">
            <Text className="text-xl font-semibold leading-7 text-white">{post.caption}</Text>
          </View>
        </View>
      ) : isQuote ? (
        <View className="bg-app-primary/10 px-5 py-10">
          <View className="mb-4 flex-row items-center gap-2">
            <FontAwesome name="quote-left" size={14} color={PROFILE_DETAILS_ACCENT.QUOTE} />
            <Text className="text-xs font-semibold uppercase tracking-[1.5px] text-app-primary">
              {PROFILE_DETAILS_COPY.POST_TYPE_QUOTE}
            </Text>
          </View>
          <Text className="text-xl font-semibold leading-9 text-app-foreground">"{post.caption}"</Text>
        </View>
      ) : null}

      <View className="flex-row flex-wrap gap-2 px-4 pt-3">
        {post.tags.map((tag) => (
          <View key={tag} className="rounded-full border border-app-border bg-app-primary/10 px-2.5 py-1">
            <Text className="text-[10px] font-semibold text-app-primary">{tag}</Text>
          </View>
        ))}
      </View>

      <View className="flex-row items-center justify-between border-t border-app-border px-4 pb-3 pt-3">
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center gap-1.5 rounded-full bg-app-primary/10 px-2.5 py-1">
            <FontAwesome name="heart" size={12} color="rgb(var(--app-primary))" />
            <Text className="text-[11px] font-semibold text-app-primary">{PROFILE_DETAILS_COPY.ACTION_LIKE}</Text>
          </View>
          <View className="flex-row items-center gap-1.5 rounded-full bg-app-card px-2.5 py-1">
            <FontAwesome name="bookmark-o" size={12} color="rgb(var(--app-muted))" />
            <Text className="text-[11px] font-semibold text-app-muted">{PROFILE_DETAILS_COPY.ACTION_SAVE}</Text>
          </View>
        </View>

        <View className="rounded-full bg-app-primary px-2.5 py-1">
          <Text className="text-[11px] font-semibold text-white">{PROFILE_DETAILS_COPY.ACTION_INTRODUCE}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between px-4 pb-4">
        <Text className="text-xs text-app-muted">{post.likeCount} likes</Text>
        <Text className="text-xs text-app-muted">{post.commentCount} comments</Text>
      </View>
    </Card>
  );
}
