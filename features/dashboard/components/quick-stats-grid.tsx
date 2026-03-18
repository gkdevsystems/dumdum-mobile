import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, View } from 'react-native';

import { useAppTheme } from '@/components/theme/useAppTheme';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import type { QuickStatCard } from '@/shared/dashboard/types';

const toneStyles: Record<QuickStatCard['tone'], { card: string; accent: string; icon: string }> = {
  success: { card: 'bg-emerald-500', accent: '#bbf7d0', icon: 'circle' },
  primary: { card: 'bg-violet-600', accent: '#ddd6fe', icon: 'brain' },
  pink: { card: 'bg-pink-500', accent: '#fecdd3', icon: 'heart' },
  cyan: { card: 'bg-cyan-500', accent: '#bae6fd', icon: 'eye' },
};

type QuickStatsGridProps = {
  cards: QuickStatCard[];
};

function StatCard({ item }: { item: QuickStatCard }) {
  const { theme } = useAppTheme();
  const isFrost = theme === 'frost';
  const tone = toneStyles[item.tone];

  return (
    <Card
      className={`min-h-24 flex-1 rounded-3xl p-2.5 ${isFrost ? 'border-white/50 bg-app-card/62' : `border-0 ${tone.card}`}`}>
      <View className="mb-1.5">
        <View
          className={`size-7 items-center justify-center rounded-full ${isFrost ? 'bg-app-primary/15' : 'bg-white/20'}`}>
          <FontAwesome
            name={tone.icon as any}
            size={11}
            color={isFrost ? 'rgb(var(--app-primary))' : tone.accent}
          />
        </View>
      </View>
      <Text numberOfLines={1} className={`text-[13px] font-bold ${isFrost ? 'text-app-foreground' : 'text-white'}`}>
        {item.title}
      </Text>
      <Text numberOfLines={1} className={`mt-0.5 text-[10px] ${isFrost ? 'text-app-muted' : 'text-white/85'}`}>
        {item.subtitle}
      </Text>
      <Text className={`mt-1 text-3xl font-black ${isFrost ? 'text-app-foreground' : 'text-white'}`}>
        {item.value}
      </Text>
      {item.accentLabel ? (
        <Text className={`mt-0.5 text-[10px] font-semibold ${isFrost ? 'text-app-primary' : 'text-white/90'}`}>
          {item.accentLabel}
        </Text>
      ) : null}
      {item.ctaLabel ? (
        <Pressable
          className={`mt-1 self-start rounded-full px-1.5 py-0.5 ${isFrost ? 'bg-app-primary/12' : 'bg-white/25'}`}>
          <Text className={`text-[9px] font-semibold ${isFrost ? 'text-app-primary' : 'text-white'}`}>
            {item.ctaLabel}
          </Text>
        </Pressable>
      ) : null}
    </Card>
  );
}

export function QuickStatsGrid({ cards }: QuickStatsGridProps) {
  const firstRow = cards.slice(0, 2);
  const secondRow = cards.slice(2, 4);

  return (
    <View className="mb-5 gap-2.5">
      <View className="flex-row gap-2.5">
        {firstRow.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </View>
      <View className="flex-row gap-2.5">
        {secondRow.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}
