import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { PROFILE_DETAILS_COPY } from '@/features/profile-details/constants';
import type { ProfileDetailTab } from '@/features/profile-details/types';

type ProfileTabSwitcherProps = {
  value: ProfileDetailTab;
  onChange: (value: ProfileDetailTab) => void;
};

export function ProfileTabSwitcher({ value, onChange }: ProfileTabSwitcherProps) {
  const options: Array<{ id: ProfileDetailTab; label: string; icon: 'film' | 'id-badge' }> = [
    { id: 'feed', label: PROFILE_DETAILS_COPY.FEED_TAB, icon: 'film' },
    { id: 'information', label: PROFILE_DETAILS_COPY.INFO_TAB, icon: 'id-badge' },
  ];

  return (
    <View className="mb-5 flex-row rounded-2xl border border-app-border bg-app-card/95 p-1.5">
      {options.map((option) => {
        const selected = value === option.id;
        return (
          <Pressable
            key={option.id}
            className={`flex-1 flex-row items-center justify-center gap-2 rounded-xl px-3 py-2.5 ${selected ? 'bg-app-primary' : 'bg-transparent'}`}
            onPress={() => onChange(option.id)}>
            <FontAwesome
              name={option.icon}
              size={12}
              color={selected ? '#ffffff' : 'rgb(var(--app-muted))'}
            />
            <Text className={`text-center text-sm font-semibold ${selected ? 'text-white' : 'text-app-foreground'}`}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
