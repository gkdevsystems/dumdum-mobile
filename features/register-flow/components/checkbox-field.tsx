import { Pressable, View } from 'react-native';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';

type CheckboxFieldProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function CheckboxField({ label, checked, onChange }: CheckboxFieldProps) {
  return (
    <Pressable
      className="mb-4 flex-row items-center rounded-2xl border border-app-border bg-app-card px-4 py-3"
      onPress={() => onChange(!checked)}>
      <View className="mr-3">
        <Checkbox checked={checked} onCheckedChange={(state) => onChange(Boolean(state))} />
      </View>
      <Label className="flex-1">
        <Text className="text-sm text-app-foreground">{label}</Text>
      </Label>
    </Pressable>
  );
}
