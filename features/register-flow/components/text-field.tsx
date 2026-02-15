import { Text, TextInput, View } from 'react-native';

type TextFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'number-pad' | 'phone-pad';
  multiline?: boolean;
  optional?: boolean;
  maxLength?: number;
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
}: TextFieldProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-app-foreground">
        {label}
        {optional ? <Text className="font-normal text-app-muted"> (optional)</Text> : null}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor="rgb(var(--app-muted))"
        multiline={multiline}
        maxLength={maxLength}
        className={`rounded-2xl border border-app-border bg-app-card px-4 py-3 text-app-foreground ${multiline ? 'min-h-[110px]' : ''}`}
        textAlignVertical={multiline ? 'top' : 'auto'}
      />
    </View>
  );
}

