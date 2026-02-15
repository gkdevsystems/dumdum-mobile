import { Text, View } from 'react-native';

type StepProgressProps = {
  step: number;
  totalSteps: number;
};

export function StepProgress({ step, totalSteps }: StepProgressProps) {
  const width = `${Math.min(100, Math.max(0, (step / totalSteps) * 100))}%` as `${number}%`;

  return (
    <View>
      <View className="h-2 overflow-hidden rounded-full bg-app-card">
        <View className="h-full rounded-full bg-rose-500" style={{ width }} />
      </View>
      <Text className="mt-2 text-xs font-semibold uppercase tracking-[2px] text-app-muted">
        Step {step} of {totalSteps}
      </Text>
    </View>
  );
}
