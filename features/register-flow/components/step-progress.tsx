import { View } from 'react-native';

import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';

type StepProgressProps = {
  step: number;
  totalSteps: number;
};

export function StepProgress({ step, totalSteps }: StepProgressProps) {
  const progressValue = Math.min(100, Math.max(0, (step / totalSteps) * 100));

  return (
    <View>
      <Progress value={progressValue} className="bg-app-card" indicatorClassName="bg-app-primary" />
      <Text className="mt-2 text-xs font-semibold uppercase tracking-[2px] text-app-muted">
        Step {step} of {totalSteps}
      </Text>
    </View>
  );
}
