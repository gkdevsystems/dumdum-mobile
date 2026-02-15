import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, View } from 'react-native';

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
  const tone = toneStyles[item.tone];

  return (
    <Card className={`min-h-40 flex-1 rounded-3xl border-0 p-4 ${tone.card}`}>
      <View className="mb-2">
        <View className="size-8 items-center justify-center rounded-full bg-white/20">
          <FontAwesome name={tone.icon as any} size={12} color={tone.accent} />
        </View>
      </View>
      <Text className="text-sm font-bold text-white">{item.title}</Text>
      <Text className="mt-1 text-[11px] text-white/85">{item.subtitle}</Text>
      <Text className="mt-2 text-5xl font-black text-white">{item.value}</Text>
      {item.accentLabel ? <Text className="mt-1 text-xs font-semibold text-white/90">{item.accentLabel}</Text> : null}
      {item.ctaLabel ? (
        <Pressable className="mt-2 self-start rounded-full bg-white/25 px-2.5 py-1">
          <Text className="text-[10px] font-semibold text-white">{item.ctaLabel}</Text>
        </Pressable>
      ) : null}
    </Card>
  );
}

export function QuickStatsGrid({ cards }: QuickStatsGridProps) {
  const firstRow = cards.slice(0, 2);
  const secondRow = cards.slice(2, 4);

  return (
    <View className="mb-5 gap-3">
      <View className="flex-row gap-3">
        {firstRow.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </View>
      <View className="flex-row gap-3">
        {secondRow.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}
