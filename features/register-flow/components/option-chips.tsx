import { Pressable, Text, View } from 'react-native';

import type { Option } from '@/features/register-flow/types';

type OptionChipsProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export function OptionChips({ label, value, options, onChange }: OptionChipsProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-app-foreground">{label}</Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <Pressable
              key={option.value}
              className={`rounded-full border px-3 py-2 ${selected ? 'border-rose-500 bg-rose-500' : 'border-app-border bg-app-card'}`}
              onPress={() => onChange(option.value)}>
              <Text className={`text-xs font-semibold ${selected ? 'text-white' : 'text-app-foreground'}`}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

