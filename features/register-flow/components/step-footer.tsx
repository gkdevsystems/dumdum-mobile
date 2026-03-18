import { View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
        <Button
          className="h-12 flex-1 rounded-2xl border-app-border bg-app-card/95"
          variant="outline"
          onPress={onBack}>
          <FontAwesome name="chevron-left" size={12} color="rgb(var(--app-foreground))" />
          <Text className="text-center text-sm font-semibold text-app-foreground">Back</Text>
        </Button>
      ) : null}

      <Button
        className={`h-12 rounded-2xl ${onBack ? 'flex-1' : 'w-full'} ${disabled ? 'bg-app-primary/45' : 'bg-app-primary'}`}
        onPress={onNext}
        disabled={disabled}>
        <Text className="text-center text-sm font-bold text-white">{nextLabel}</Text>
        <FontAwesome name="arrow-right" size={12} color="#ffffff" />
      </Button>
    </View>
  );
}
