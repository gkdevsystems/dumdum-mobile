import { Text, TextInput, View } from 'react-native';

type OtpFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function OtpField({ value, onChange }: OtpFieldProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-app-foreground">OTP</Text>
      <TextInput
        value={value}
        onChangeText={(text) => onChange(text.replace(/[^\d]/g, '').slice(0, 6))}
        keyboardType="number-pad"
        maxLength={6}
        placeholder="Enter 6-digit OTP"
        placeholderTextColor="rgb(var(--app-muted))"
        className="rounded-2xl border border-app-border bg-app-card px-4 py-3 text-center text-lg tracking-[8px] text-app-foreground"
      />
    </View>
  );
}

