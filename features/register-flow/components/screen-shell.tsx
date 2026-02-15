import { type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StepProgress } from '@/features/register-flow/components/step-progress';

type ScreenShellProps = {
  title: string;
  subtitle?: string;
  step: number;
  totalSteps: number;
  children: ReactNode;
  footer?: ReactNode;
};

export function ScreenShell({ title, subtitle, step, totalSteps, children, footer }: ScreenShellProps) {
  return (
    <SafeAreaView className="flex-1 bg-app-background">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="px-5 pt-2">
          <StepProgress step={step} totalSteps={totalSteps} />
          <Text className="mt-5 text-3xl font-black text-app-foreground">{title}</Text>
          {subtitle ? <Text className="mt-2 text-sm leading-6 text-app-muted">{subtitle}</Text> : null}
        </View>

        <ScrollView contentContainerClassName="px-5 pb-40 pt-5" keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      </KeyboardAvoidingView>

      {footer ? <View className="absolute inset-x-0 bottom-0 border-t border-app-border bg-app-background px-5 py-4">{footer}</View> : null}
    </SafeAreaView>
  );
}

