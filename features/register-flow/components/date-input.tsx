import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View } from 'react-native';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldMessage } from '@/features/register-flow/components/field-message';

type DateInputProps = {
  day: string;
  month: string;
  year: string;
  onChangeDay: (value: string) => void;
  onChangeMonth: (value: string) => void;
  onChangeYear: (value: string) => void;
  error?: string;
};

export function DateInput({
  day,
  month,
  year,
  onChangeDay,
  onChangeMonth,
  onChangeYear,
  error,
}: DateInputProps) {
  return (
    <View className="mb-4">
      <Label className="mb-2">Date of Birth</Label>
      <View className="mb-2 flex-row items-center">
        <FontAwesome name="calendar" size={13} color="rgb(var(--app-muted))" />
      </View>
      <View className="flex-row gap-2">
        <Input
          value={day}
          onChangeText={onChangeDay}
          keyboardType="number-pad"
          maxLength={2}
          placeholder="DD"
          className={`h-14 flex-1 rounded-2xl bg-app-card text-center text-app-foreground ${error ? 'border-red-500' : 'border-app-border'}`}
        />
        <Input
          value={month}
          onChangeText={onChangeMonth}
          keyboardType="number-pad"
          maxLength={2}
          placeholder="MM"
          className={`h-14 flex-1 rounded-2xl bg-app-card text-center text-app-foreground ${error ? 'border-red-500' : 'border-app-border'}`}
        />
        <Input
          value={year}
          onChangeText={onChangeYear}
          keyboardType="number-pad"
          maxLength={4}
          placeholder="YYYY"
          className={`h-14 flex-1 rounded-2xl bg-app-card text-center text-app-foreground ${error ? 'border-red-500' : 'border-app-border'}`}
        />
      </View>
      <FieldMessage type="error" message={error} />
    </View>
  );
}
