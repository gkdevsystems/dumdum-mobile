import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

type StepFooterProps = {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  disabled?: boolean;
};

export function StepFooter({ onBack, onNext, nextLabel = 'Next', disabled = false }: StepFooterProps) {
  return (
    <View className="flex-row gap-3">
      {onBack ? (
        <Button className="h-12 flex-1 rounded-2xl border-app-border bg-app-card" variant="outline" onPress={onBack}>
          <Text className="text-center text-sm font-semibold text-app-foreground">Back</Text>
        </Button>
      ) : null}

      <Button
        className={`h-12 rounded-2xl ${onBack ? 'flex-1' : 'w-full'} ${disabled ? 'bg-app-primary/40' : 'bg-app-primary'}`}
        onPress={onNext}
        disabled={disabled}
      >
        <Text className="text-center text-sm font-bold text-white">{nextLabel}</Text>
      </Button>
    </View>
  );
}
