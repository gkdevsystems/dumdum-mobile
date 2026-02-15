import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, Text } from 'react-native';

import { OtpField } from '@/features/register-flow/components/otp-field';
import { ScreenShell } from '@/features/register-flow/components/screen-shell';
import { StepFooter } from '@/features/register-flow/components/step-footer';
import { useRegisterFlowStore } from '@/features/register-flow/store';

export default function OtpScreen() {
  const mobileNumber = useRegisterFlowStore((state) => state.draft.mobileNumber);
  const otp = useRegisterFlowStore((state) => state.draft.otp);
  const updateField = useRegisterFlowStore((state) => state.updateField);
  const setActiveStep = useRegisterFlowStore((state) => state.setActiveStep);
  const [resendCount, setResendCount] = useState(0);

  const maskedNumber = useMemo(() => {
    if (!mobileNumber) return '';
    return `+91 ${mobileNumber.slice(0, 2)}******${mobileNumber.slice(-2)}`;
  }, [mobileNumber]);

  const canContinue = otp.length === 6;

  return (
    <ScreenShell
      title="Enter OTP"
      subtitle={`We sent a verification code to ${maskedNumber}.`}
      step={2}
      totalSteps={6}
      footer={
        <StepFooter
          onBack={() => {
            setActiveStep('mobile');
            router.back();
          }}
          onNext={() => {
            if (!canContinue) return;
            setActiveStep('profile-basic');
            router.push('/(register-flow)/profile-basic');
          }}
          nextLabel="Verify OTP"
          disabled={!canContinue}
        />
      }>
      <OtpField value={otp} onChange={(value) => updateField('otp', value)} />
      <Pressable
        className="self-start rounded-full border border-app-border bg-app-card px-4 py-2"
        onPress={() => setResendCount((count) => count + 1)}>
        <Text className="text-xs font-semibold text-app-foreground">Resend OTP</Text>
      </Pressable>
      <Text className="mt-2 text-xs text-app-muted">Resend attempts in this session: {resendCount}</Text>
    </ScreenShell>
  );
}

