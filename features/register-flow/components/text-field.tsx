import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View } from 'react-native';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { FieldMessage } from '@/features/register-flow/components/field-message';

type TextFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'number-pad' | 'phone-pad';
  multiline?: boolean;
  optional?: boolean;
  maxLength?: number;
  icon?: string;
  error?: string;
  hint?: string;
};

export function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
  optional = false,
  maxLength,
  icon = 'pencil',
  error,
  hint,
}: TextFieldProps) {
  return (
    <View className="mb-4">
      <Label className="mb-2">
        {label}
        {optional ? <Text className="font-normal text-app-muted"> (optional)</Text> : null}
      </Label>
      <View className="relative">
        <View className="pointer-events-none absolute left-4 top-4 z-10">
          <FontAwesome name={icon as any} size={14} color="rgb(var(--app-muted))" />
        </View>
        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          multiline={multiline}
          maxLength={maxLength}
          className={`rounded-2xl border-app-border bg-app-card pl-11 text-app-foreground ${multiline ? 'min-h-[130px] py-3' : 'h-14'} ${error ? 'border-red-500' : ''}`}
          textAlignVertical={multiline ? 'top' : 'auto'}
        />
      </View>
      <FieldMessage type="info" message={!error ? hint : undefined} />
      <FieldMessage type="error" message={error} />
    </View>
  );
}
