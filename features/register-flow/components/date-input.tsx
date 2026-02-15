import { Text, TextInput, View } from 'react-native';

type DateInputProps = {
  day: string;
  month: string;
  year: string;
  onChangeDay: (value: string) => void;
  onChangeMonth: (value: string) => void;
  onChangeYear: (value: string) => void;
};

export function DateInput({ day, month, year, onChangeDay, onChangeMonth, onChangeYear }: DateInputProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-app-foreground">Date of Birth</Text>
      <View className="flex-row gap-2">
        <TextInput
          value={day}
          onChangeText={onChangeDay}
          keyboardType="number-pad"
          maxLength={2}
          placeholder="DD"
          placeholderTextColor="rgb(var(--app-muted))"
          className="flex-1 rounded-2xl border border-app-border bg-app-card px-4 py-3 text-center text-app-foreground"
        />
        <TextInput
          value={month}
          onChangeText={onChangeMonth}
          keyboardType="number-pad"
          maxLength={2}
          placeholder="MM"
          placeholderTextColor="rgb(var(--app-muted))"
          className="flex-1 rounded-2xl border border-app-border bg-app-card px-4 py-3 text-center text-app-foreground"
        />
        <TextInput
          value={year}
          onChangeText={onChangeYear}
          keyboardType="number-pad"
          maxLength={4}
          placeholder="YYYY"
          placeholderTextColor="rgb(var(--app-muted))"
          className="flex-1 rounded-2xl border border-app-border bg-app-card px-4 py-3 text-center text-app-foreground"
        />
      </View>
    </View>
  );
}

