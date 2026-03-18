import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, View } from 'react-native';

import { useAppTheme } from '@/components/theme/useAppTheme';
import { Input } from '@/components/ui/input';

type DashboardSearchProps = {
  placeholder: string;
};

export function DashboardSearch({ placeholder }: DashboardSearchProps) {
  const { theme } = useAppTheme();
  const isFrost = theme === 'frost';

  return (
    <View className="mb-6 flex-row items-center gap-3">
      <View className="relative flex-1">
        <View className="pointer-events-none absolute left-3 top-3 z-10">
          <FontAwesome name="search" size={13} color="rgb(var(--app-muted))" />
        </View>
        <Input
          placeholder={placeholder}
          className={`h-12 rounded-2xl border-app-border pl-9 text-app-foreground ${isFrost ? 'bg-app-card/60' : 'bg-app-card'}`}
        />
      </View>
      <Pressable
        className={`size-12 items-center justify-center rounded-2xl border ${isFrost ? 'border-white/50 bg-app-card/60' : 'border-transparent bg-app-primary'}`}>
        <FontAwesome
          name="sliders"
          size={14}
          color={isFrost ? 'rgb(var(--app-primary))' : '#ffffff'}
        />
      </Pressable>
    </View>
  );
}
