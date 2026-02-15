import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { FieldMessage } from '@/features/register-flow/components/field-message';
import type { Option } from '@/features/register-flow/types';

type OptionChipsProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
};

export function OptionChips({ label, value, options, onChange, error, hint }: OptionChipsProps) {
  return (
    <View className="mb-4">
      <Label className="mb-2">{label}</Label>
      <View className="flex-row flex-wrap gap-2.5">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <Button
              key={option.value}
              variant={selected ? 'default' : 'outline'}
              className={`min-h-11 rounded-full px-4 ${selected ? 'border-app-primary bg-app-primary' : 'border-app-border bg-app-card'} ${error && !selected ? 'border-red-500/60' : ''}`}
              onPress={() => onChange(option.value)}
            >
              <Text className={`text-sm font-semibold ${selected ? 'text-white' : 'text-app-foreground'}`}>{option.label}</Text>
            </Button>
          );
        })}
      </View>
      <FieldMessage type="info" message={!error ? hint : undefined} />
      <FieldMessage type="error" message={error} />
    </View>
  );
}
