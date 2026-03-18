import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { DASHBOARD_HEADER_UI } from '@/features/dashboard/constants/ui';

type DashboardHeaderProps = {
  brandName: string;
};

export function DashboardHeader({ brandName }: DashboardHeaderProps) {
  return (
    <View className="mb-4 mt-2 flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        <View className="size-9 items-center justify-center rounded-full bg-app-primary">
          <FontAwesome name="heart" size={14} color={DASHBOARD_HEADER_UI.HEART_ICON_COLOR} />
        </View>
        <Text className="text-xl font-extrabold text-app-foreground">{brandName}</Text>
      </View>

      <Pressable className="size-9 items-center justify-center rounded-full border border-app-border bg-app-card">
        <FontAwesome name="bell-o" size={16} color={DASHBOARD_HEADER_UI.NOTIFICATION_ICON_COLOR} />
        <View className="absolute right-2 top-2 size-2 rounded-full bg-app-primary" />
      </Pressable>
    </View>
  );
}
