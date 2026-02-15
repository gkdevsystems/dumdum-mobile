import { router } from 'expo-router';
import { useMemo, useState } from 'react';

import { ScreenShell } from '@/features/register-flow/components/screen-shell';
import { StepFooter } from '@/features/register-flow/components/step-footer';
import { TextField } from '@/features/register-flow/components/text-field';
import { useRegisterFlowStore } from '@/features/register-flow/store';
import { hasErrors, validateMobileStep } from '@/shared/register/validation';

export default function MobileScreen() {
  const mobileNumber = useRegisterFlowStore((state) => state.draft.mobileNumber);
  const updateField = useRegisterFlowStore((state) => state.updateField);
  const setActiveStep = useRegisterFlowStore((state) => state.setActiveStep);
  const [showErrors, setShowErrors] = useState(false);

  const onChangeMobile = (value: string) => {
    updateField('mobileNumber', value.replace(/[^\d]/g, '').slice(0, 10));
  };

  const errors = useMemo(() => validateMobileStep(mobileNumber), [mobileNumber]);
  const canContinue = !hasErrors(errors);

  return (
    <ScreenShell
      title="Let us start with your number"
      subtitle="We will verify your mobile number before moving to profile details."
      step={1}
      totalSteps={6}
      footer={
        <StepFooter
          onNext={() => {
            setShowErrors(true);
            if (!canContinue) return;
            setActiveStep('otp');
            router.push('/(register-flow)/otp');
          }}
          nextLabel="Send OTP"
        />
      }>
      <TextField
        label="Mobile number"
        value={mobileNumber}
        onChangeText={onChangeMobile}
        placeholder="10-digit mobile number"
        keyboardType="phone-pad"
        icon="phone"
        error={showErrors ? errors.mobileNumber : undefined}
        hint="Use a number you can access right now for OTP verification."
      />
    </ScreenShell>
  );
}
