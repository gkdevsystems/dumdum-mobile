import { View } from 'react-native';

import { Text } from '@/components/ui/text';

type StepProgressProps = {
  step: number;
  totalSteps: number;
};

export function StepProgress({ step, totalSteps }: StepProgressProps) {
  const progressValue = Math.min(100, Math.max(0, (step / totalSteps) * 100));
  const safeStep = Math.max(1, Math.min(totalSteps, step));

  return (
    <View className="rounded-2xl border border-app-border bg-app-card/90 px-3.5 py-3">
      <View className="mb-2.5 flex-row items-center justify-between">
        <Text className="text-[11px] font-semibold uppercase tracking-[1.8px] text-app-muted">
          Step {safeStep} of {totalSteps}
        </Text>
        <Text className="text-xs font-semibold text-app-primary">{Math.round(progressValue)}%</Text>
      </View>
      <View className="flex-row gap-1.5">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const completed = index < safeStep;
          return (
            <View
              key={index}
              className={`h-2 flex-1 rounded-full ${completed ? 'bg-app-primary' : 'bg-app-border/70'}`}
            />
          );
        })}
      </View>
    </View>
  );
}
