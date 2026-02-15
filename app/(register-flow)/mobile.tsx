import { router } from 'expo-router';

import { ScreenShell } from '@/features/register-flow/components/screen-shell';
import { StepFooter } from '@/features/register-flow/components/step-footer';
import { TextField } from '@/features/register-flow/components/text-field';
import { useRegisterFlowStore } from '@/features/register-flow/store';

export default function MobileScreen() {
  const mobileNumber = useRegisterFlowStore((state) => state.draft.mobileNumber);
  const updateField = useRegisterFlowStore((state) => state.updateField);
  const setActiveStep = useRegisterFlowStore((state) => state.setActiveStep);

  const onChangeMobile = (value: string) => {
    updateField('mobileNumber', value.replace(/[^\d]/g, '').slice(0, 10));
  };

  const canContinue = mobileNumber.length === 10;

  return (
    <ScreenShell
      title="Let us start with your number"
      subtitle="We will verify your mobile number before moving to profile details."
      step={1}
      totalSteps={6}
      footer={
        <StepFooter
          onNext={() => {
            if (!canContinue) return;
            setActiveStep('otp');
            router.push('/(register-flow)/otp');
          }}
          nextLabel="Send OTP"
          disabled={!canContinue}
        />
      }>
      <TextField
        label="Mobile number"
        value={mobileNumber}
        onChangeText={onChangeMobile}
        placeholder="10-digit mobile number"
        keyboardType="phone-pad"
      />
    </ScreenShell>
  );
}

