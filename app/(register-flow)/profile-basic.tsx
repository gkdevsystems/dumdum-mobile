import { router } from 'expo-router';
import { useMemo, useState } from 'react';

import { DateInput } from '@/features/register-flow/components/date-input';
import { GenderSelector } from '@/features/register-flow/components/gender-selector';
import { OptionChips } from '@/features/register-flow/components/option-chips';
import { OptionPickerField } from '@/features/register-flow/components/option-picker-field';
import { ScreenShell } from '@/features/register-flow/components/screen-shell';
import { StepFooter } from '@/features/register-flow/components/step-footer';
import { TextField } from '@/features/register-flow/components/text-field';
import {
  genderOptions,
  heightOptions,
  maritalStatusOptions,
  noOfChildrenOptions,
  physicalStatusOptions,
  profileCreatedForOptions,
} from '@/features/register-flow/data/master-data';
import { shouldAskChildren } from '@/features/register-flow/data/selectors';
import { useRegisterFlowStore } from '@/features/register-flow/store';
import { getAutoGenderForProfile } from '@/shared/register/profile';
import { hasErrors, validateBasicStep } from '@/shared/register/validation';

export default function ProfileBasicScreen() {
  const draft = useRegisterFlowStore((state) => state.draft);
  const updateField = useRegisterFlowStore((state) => state.updateField);
  const updateDob = useRegisterFlowStore((state) => state.updateDob);
  const setActiveStep = useRegisterFlowStore((state) => state.setActiveStep);
  const [showErrors, setShowErrors] = useState(false);

  const askChildren = shouldAskChildren(draft.maritalStatus);
  const errors = useMemo(() => validateBasicStep(draft, askChildren), [draft, askChildren]);
  const canContinue = !hasErrors(errors);
  const autoGender = getAutoGenderForProfile(draft.profileCreatedFor);
  const showRestFields = Boolean(draft.profileCreatedFor);

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
            setShowErrors(true);
            if (!canContinue) return;
            setActiveStep('profile-religion');
            router.push('/(register-flow)/profile-religion');
          }}
        />
      }>
      <OptionChips
        label="Profile created for"
        value={draft.profileCreatedFor}
        options={profileCreatedForOptions}
        onChange={(value) => {
          updateField('profileCreatedFor', value);
          const inferredGender = getAutoGenderForProfile(value);
          if (inferredGender) {
            updateField('gender', inferredGender);
          } else {
            updateField('gender', '');
          }
        }}
        error={showErrors ? errors.profileCreatedFor : undefined}
        hint="Choose who this profile is for. We will personalize the next questions."
      />

      {showRestFields ? (
        <>
          <GenderSelector
            value={draft.gender}
            options={genderOptions}
            onChange={(value) => updateField('gender', value)}
            error={showErrors ? errors.gender : undefined}
            hint={
              autoGender
                ? `We pre-selected ${autoGender === 'MALE' ? 'Male' : 'Female'} based on profile type.`
                : 'Select the gender for this profile.'
            }
          />

          <TextField
            label="Name"
            value={draft.name}
            onChangeText={(value) => updateField('name', value)}
            placeholder="Enter full name"
            icon="user"
            error={showErrors ? errors.name : undefined}
          />

          <DateInput
            day={draft.dob.day}
            month={draft.dob.month}
            year={draft.dob.year}
            onChangeDay={(value) => updateDob('day', value)}
            onChangeMonth={(value) => updateDob('month', value)}
            onChangeYear={(value) => updateDob('year', value)}
            error={showErrors ? errors.dob : undefined}
          />

          <OptionPickerField
            label="Height"
            value={draft.height}
            options={heightOptions}
            onChange={(value) => updateField('height', value)}
            icon="arrows-v"
            error={showErrors ? errors.height : undefined}
          />

          <OptionChips
            label="Physical status"
            value={draft.physicalStatus}
            options={physicalStatusOptions}
            onChange={(value) => updateField('physicalStatus', value)}
            error={showErrors ? errors.physicalStatus : undefined}
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
            error={showErrors ? errors.maritalStatus : undefined}
          />

          {askChildren ? (
            <OptionChips
              label="Number of children"
              value={draft.numberOfChildren}
              options={noOfChildrenOptions}
              onChange={(value) => updateField('numberOfChildren', value)}
              error={showErrors ? errors.numberOfChildren : undefined}
            />
          ) : null}
        </>
      ) : null}
    </ScreenShell>
  );
}
