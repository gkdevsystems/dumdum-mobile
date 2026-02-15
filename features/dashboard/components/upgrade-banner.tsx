import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import type { UpgradeBanner as UpgradeBannerType } from '@/shared/dashboard/types';

type UpgradeBannerProps = {
  banner: UpgradeBannerType;
};

export function UpgradeBanner({ banner }: UpgradeBannerProps) {
  return (
    <Card className="mb-6 rounded-3xl border-0 bg-orange-500 p-4">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-3xl font-black text-white">{banner.title}</Text>
          <Text className="mt-1 text-sm text-white/90">{banner.subtitle}</Text>
          <Pressable className="mt-4 self-start rounded-full bg-white px-4 py-2">
            <Text className="text-sm font-bold text-orange-500">{banner.ctaLabel}</Text>
          </Pressable>
        </View>
        <View className="size-12 items-center justify-center rounded-full bg-white/20">
          <FontAwesome name="line-chart" size={16} color="#ffffff" />
        </View>
      </View>
    </Card>
  );
}

