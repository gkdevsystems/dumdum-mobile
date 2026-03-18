import { type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
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
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-app-background">
      <View className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-app-primary/10" />
      <View className="pointer-events-none absolute -left-16 top-24 h-52 w-52 rounded-full bg-app-primary/8" />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="px-5 pt-2">
          <StepProgress step={step} totalSteps={totalSteps} />
          <View className="mt-4 rounded-3xl border border-app-border bg-app-card/85 px-4 py-4">
            <Text className="text-3xl font-black leading-[38px] text-app-foreground">{title}</Text>
            {subtitle ? <Text className="mt-2 text-sm leading-6 text-app-muted">{subtitle}</Text> : null}
          </View>
        </View>

        <ScrollView
          contentContainerClassName="px-5 pb-44 pt-5"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View className="rounded-3xl border border-app-border bg-app-card/55 px-4 py-4">{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>

      {footer ? (
        <View
          className="absolute inset-x-0 border-t border-app-border bg-app-background/95 px-5 pt-4"
          style={{ bottom: Math.max(insets.bottom, 8), paddingBottom: 10 }}>
          <Separator className="mb-4 bg-app-border/70" />
          {footer}
        </View>
      ) : null}
    </SafeAreaView>
  );
}
