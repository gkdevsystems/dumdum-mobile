import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/text';

type FeedTab = { id: string; label: string; badge?: number };

type FeedTabsProps = {
  value: string;
  tabs: FeedTab[];
  onChange: (id: string) => void;
};

export function FeedTabs({ value, tabs, onChange }: FeedTabsProps) {
  return (
    <View className="mb-6 flex-row gap-2">
      {tabs.map((tab) => {
        const active = tab.id === value;
        return (
          <Pressable
            key={tab.id}
            className={`h-11 flex-1 flex-row items-center justify-center gap-1 rounded-2xl border ${active ? 'border-app-primary bg-app-primary' : 'border-app-border bg-app-card'}`}
            onPress={() => onChange(tab.id)}>
            <Text className={`text-sm font-semibold ${active ? 'text-white' : 'text-app-foreground'}`}>{tab.label}</Text>
            {tab.badge ? (
              <View className={`rounded-full px-2 py-0.5 ${active ? 'bg-white/25' : 'bg-app-primary'}`}>
                <Text className={`text-[10px] font-bold ${active ? 'text-white' : 'text-white'}`}>{tab.badge}</Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

