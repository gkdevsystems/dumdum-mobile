import { router } from 'expo-router';

import { DateInput } from '@/features/register-flow/components/date-input';
import { OptionChips } from '@/features/register-flow/components/option-chips';
import { OptionPickerField } from '@/features/register-flow/components/option-picker-field';
import { ScreenShell } from '@/features/register-flow/components/screen-shell';
import { StepFooter } from '@/features/register-flow/components/step-footer';
import { TextField } from '@/features/register-flow/components/text-field';
import {
  heightOptions,
  maritalStatusOptions,
  noOfChildrenOptions,
  physicalStatusOptions,
  profileCreatedForOptions,
} from '@/features/register-flow/data/master-data';
import { shouldAskChildren } from '@/features/register-flow/data/selectors';
import { useRegisterFlowStore } from '@/features/register-flow/store';

export default function ProfileBasicScreen() {
  const draft = useRegisterFlowStore((state) => state.draft);
  const updateField = useRegisterFlowStore((state) => state.updateField);
  const updateDob = useRegisterFlowStore((state) => state.updateDob);
  const setActiveStep = useRegisterFlowStore((state) => state.setActiveStep);

  const askChildren = shouldAskChildren(draft.maritalStatus);
  const hasDob = draft.dob.day.length === 2 && draft.dob.month.length === 2 && draft.dob.year.length === 4;

  const canContinue =
    draft.profileCreatedFor.length > 0 &&
    draft.name.trim().length > 1 &&
    hasDob &&
    draft.height.length > 0 &&
    draft.physicalStatus.length > 0 &&
    draft.maritalStatus.length > 0 &&
    (!askChildren || draft.numberOfChildren.length > 0);

  return (
    <ScreenShell
      title="Basic Profile"
      subtitle="Set core details of the person this profile is created for."
      step={3}
      totalSteps={6}
      footer={
        <StepFooter
          onBack={() => {
            setActiveStep('otp');
            router.back();
          }}
          onNext={() => {
            if (!canContinue) return;
            setActiveStep('profile-religion');
            router.push('/(register-flow)/profile-religion');
          }}
          disabled={!canContinue}
        />
      }>
      <OptionChips
        label="Profile created for"
        value={draft.profileCreatedFor}
        options={profileCreatedForOptions}
        onChange={(value) => updateField('profileCreatedFor', value)}
      />

      <TextField label="Name" value={draft.name} onChangeText={(value) => updateField('name', value)} placeholder="Enter full name" />

      <DateInput
        day={draft.dob.day}
        month={draft.dob.month}
        year={draft.dob.year}
        onChangeDay={(value) => updateDob('day', value)}
        onChangeMonth={(value) => updateDob('month', value)}
        onChangeYear={(value) => updateDob('year', value)}
      />

      <OptionPickerField
        label="Height"
        value={draft.height}
        options={heightOptions}
        onChange={(value) => updateField('height', value)}
      />

      <OptionChips
        label="Physical status"
        value={draft.physicalStatus}
        options={physicalStatusOptions}
        onChange={(value) => updateField('physicalStatus', value)}
      />

      <OptionChips
        label="Marital status"
        value={draft.maritalStatus}
        options={maritalStatusOptions}
        onChange={(value) => {
          updateField('maritalStatus', value);
          if (value === 'NEVER_MARRIED') {
            updateField('numberOfChildren', '');
          }
        }}
      />

      {askChildren ? (
        <OptionChips
          label="Number of children"
          value={draft.numberOfChildren}
          options={noOfChildrenOptions}
          onChange={(value) => updateField('numberOfChildren', value)}
        />
      ) : null}
    </ScreenShell>
  );
}

