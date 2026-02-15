import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/text';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function SectionHeader({ title, subtitle, actionLabel, onActionPress }: SectionHeaderProps) {
  return (
    <View className="mb-3 flex-row items-end justify-between">
      <View className="flex-1 pr-3">
        <Text className="text-[25px] font-black text-app-foreground">{title}</Text>
        {subtitle ? <Text className="mt-0.5 text-xs text-app-muted">{subtitle}</Text> : null}
      </View>
      {actionLabel ? (
        <Pressable onPress={onActionPress}>
          <Text className="text-xs font-semibold text-app-primary">{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

