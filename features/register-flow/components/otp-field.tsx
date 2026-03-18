import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View } from 'react-native';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldMessage } from '@/features/register-flow/components/field-message';

type OtpFieldProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
};

export function OtpField({ value, onChange, error, hint }: OtpFieldProps) {
  return (
    <View className="mb-5">
      <Label className="mb-2 text-[13px] uppercase tracking-[1px] text-app-muted">OTP</Label>
      <View className="relative">
        <View className="pointer-events-none absolute left-4 top-4 z-10">
          <FontAwesome name="key" size={14} color="rgb(var(--app-muted))" />
        </View>
        <Input
          value={value}
          onChangeText={(text) => onChange(text.replace(/[^\d]/g, '').slice(0, 6))}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="Enter 6-digit OTP"
          className={`h-14 rounded-2xl bg-app-card/95 pl-11 text-center text-lg tracking-[8px] text-app-foreground shadow-sm shadow-black/5 ${error ? 'border-red-500' : 'border-app-border'}`}
        />
      </View>
      <FieldMessage type="info" message={!error ? hint : undefined} />
      <FieldMessage type="error" message={error} />
    </View>
  );
}
