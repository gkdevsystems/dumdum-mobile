import { Pressable, Text, View } from 'react-native';

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
        <Pressable
          className="flex-1 rounded-2xl border border-app-border bg-app-card px-4 py-4"
          onPress={onBack}>
          <Text className="text-center text-sm font-semibold text-app-foreground">Back</Text>
        </Pressable>
      ) : null}

      <Pressable
        className={`rounded-2xl px-4 py-4 ${onBack ? 'flex-1' : 'w-full'} ${disabled ? 'bg-rose-300' : 'bg-rose-500'}`}
        onPress={onNext}
        disabled={disabled}>
        <Text className="text-center text-sm font-bold text-white">{nextLabel}</Text>
      </Pressable>
    </View>
  );
}

