import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { OtpField } from '@/features/register-flow/components/otp-field';
import { ScreenShell } from '@/features/register-flow/components/screen-shell';
import { StepFooter } from '@/features/register-flow/components/step-footer';
import { useRegisterFlowStore } from '@/features/register-flow/store';
import { hasErrors, validateOtpStep } from '@/shared/register/validation';

export default function OtpScreen() {
  const mobileNumber = useRegisterFlowStore((state) => state.draft.mobileNumber);
  const otp = useRegisterFlowStore((state) => state.draft.otp);
  const updateField = useRegisterFlowStore((state) => state.updateField);
  const setActiveStep = useRegisterFlowStore((state) => state.setActiveStep);
  const [resendCount, setResendCount] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(20);
  const [showErrors, setShowErrors] = useState(false);

  const maskedNumber = useMemo(() => {
    if (!mobileNumber) return '';
    return `+91 ${mobileNumber.slice(0, 2)}******${mobileNumber.slice(-2)}`;
  }, [mobileNumber]);

  const errors = useMemo(() => validateOtpStep(otp), [otp]);
  const canContinue = !hasErrors(errors);
  const canResend = resendCooldown === 0;

  useEffect(() => {
    if (resendCooldown === 0) return;
    const timer = setInterval(() => {
      setResendCooldown((current) => (current <= 1 ? 0 : current - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

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
            setShowErrors(true);
            if (!canContinue) return;
            setActiveStep('profile-basic');
            router.push('/(register-flow)/profile-basic');
          }}
          nextLabel="Verify OTP"
        />
      }>
      <View className="mb-4 rounded-2xl border border-app-border bg-app-card/85 px-4 py-3">
        <Text className="text-xs uppercase tracking-[1.5px] text-app-muted">Verifying mobile</Text>
        <Text className="mt-1 text-sm font-semibold text-app-foreground">{maskedNumber}</Text>
      </View>

      <OtpField
        value={otp}
        onChange={(value) => updateField('otp', value)}
        error={showErrors ? errors.otp : undefined}
        hint="Enter the code from SMS. It usually arrives in a few seconds."
      />
      <View className="items-start">
        <Button
          className="rounded-full border-app-border bg-app-card"
          variant="outline"
          size="sm"
          onPress={() => {
            if (!canResend) return;
            setResendCount((count) => count + 1);
            setResendCooldown(20);
          }}
          disabled={!canResend}>
          <Text className="text-xs font-semibold text-app-foreground">
            {canResend ? 'Resend OTP' : `Resend in ${resendCooldown}s`}
          </Text>
        </Button>
      </View>
      <Text className="mt-2 text-xs text-app-muted">Resend attempts in this session: {resendCount}</Text>
    </ScreenShell>
  );
}
