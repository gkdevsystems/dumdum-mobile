import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, Pressable, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { FieldMessage } from '@/features/register-flow/components/field-message';
import type { Option } from '@/features/register-flow/types';

type GenderSelectorProps = {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
};

function AvatarIllustration({ isMale, selected }: { isMale: boolean; selected: boolean }) {
  const illustrationUri = isMale
    ? 'https://img.icons8.com/color/144/businessman.png'
    : 'https://img.icons8.com/color/144/businesswoman.png';

  return (
    <View
      className={`h-36 items-center justify-center rounded-t-2xl ${selected ? 'bg-app-primary/10' : 'bg-app-card'}`}>
      <View
        className={`size-20 items-center justify-center overflow-hidden rounded-full ${selected ? 'bg-app-primary/20' : 'bg-app-border/70'}`}>
        <Image source={{ uri: illustrationUri }} className="size-16" resizeMode="contain" />
      </View>
      <View className={`mt-2 h-8 w-20 rounded-full ${selected ? 'bg-app-primary/25' : 'bg-app-border/80'}`} />
      <View className="absolute right-3 top-3 rounded-full bg-black/30 px-2 py-1">
        <FontAwesome name={isMale ? 'mars' : 'venus'} size={12} color="#ffffff" />
      </View>
    </View>
  );
}

export function GenderSelector({ value, options, onChange, error, hint }: GenderSelectorProps) {
  return (
    <View className="mb-4">
      <Label className="mb-2">Gender</Label>
      <View className="flex-row gap-3">
        {options.map((option) => {
          const isSelected = value === option.value;
          const isMale = option.value === 'MALE';
          return (
            <Pressable key={option.value} className="flex-1" onPress={() => onChange(option.value)}>
              <Card
                className={`overflow-hidden rounded-2xl border p-0 ${isSelected ? 'border-app-primary' : 'border-app-border'}`}>
                <AvatarIllustration isMale={isMale} selected={isSelected} />
                <View className="px-3 py-3">
                  <Text
                    className={`text-center text-sm font-semibold ${isSelected ? 'text-app-primary' : 'text-app-foreground'}`}>
                    {option.label}
                  </Text>
                </View>
              </Card>
            </Pressable>
          );
        })}
      </View>
      <FieldMessage type="info" message={!error ? hint : undefined} />
      <FieldMessage type="error" message={error} />
    </View>
  );
}
