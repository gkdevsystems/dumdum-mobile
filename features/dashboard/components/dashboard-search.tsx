import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, View } from 'react-native';

import { Input } from '@/components/ui/input';

type DashboardSearchProps = {
  placeholder: string;
};

export function DashboardSearch({ placeholder }: DashboardSearchProps) {
  return (
    <View className="mb-6 flex-row items-center gap-3">
      <View className="relative flex-1">
        <View className="pointer-events-none absolute left-3 top-3 z-10">
          <FontAwesome name="search" size={13} color="rgb(var(--app-muted))" />
        </View>
        <Input
          placeholder={placeholder}
          className="h-12 rounded-2xl border-app-border bg-app-card pl-9 text-app-foreground"
        />
      </View>
      <Pressable className="size-12 items-center justify-center rounded-2xl bg-app-primary">
        <FontAwesome name="sliders" size={14} color="#ffffff" />
      </Pressable>
    </View>
  );
}

