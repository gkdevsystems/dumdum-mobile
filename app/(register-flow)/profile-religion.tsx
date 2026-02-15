import { router } from 'expo-router';
import { useMemo, useState } from 'react';

import { CheckboxField } from '@/features/register-flow/components/checkbox-field';
import { FieldMessage } from '@/features/register-flow/components/field-message';
import { OptionChips } from '@/features/register-flow/components/option-chips';
import { OptionPickerField } from '@/features/register-flow/components/option-picker-field';
import { ScreenShell } from '@/features/register-flow/components/screen-shell';
import { StepFooter } from '@/features/register-flow/components/step-footer';
import { TextField } from '@/features/register-flow/components/text-field';
import {
  casteOptions,
  christianDivisionOptions,
  doshamTypeOptions,
  motherTongueOptions,
  religionOptions,
  sudhaJathagamOptions,
} from '@/features/register-flow/data/master-data';
import { isChristian, shouldAskDoshamType } from '@/features/register-flow/data/selectors';
import { useRegisterFlowStore } from '@/features/register-flow/store';
import { hasErrors, validateReligionStep } from '@/shared/register/validation';

export default function ProfileReligionScreen() {
  const draft = useRegisterFlowStore((state) => state.draft);
  const updateField = useRegisterFlowStore((state) => state.updateField);
  const setActiveStep = useRegisterFlowStore((state) => state.setActiveStep);
  const [showErrors, setShowErrors] = useState(false);

  const showChristianDivision = isChristian(draft.religion);
  const showDoshamType = shouldAskDoshamType(draft.sudhaJathagam);
  const errors = useMemo(
    () => validateReligionStep(draft, showChristianDivision, showDoshamType),
    [draft, showChristianDivision, showDoshamType]
  );
  const canContinue = !hasErrors(errors);

  return (
    <ScreenShell
      title="Religion & Preferences"
      subtitle="Capture religion, caste and horoscope details."
      step={4}
      totalSteps={6}
      footer={
        <StepFooter
          onBack={() => {
            setActiveStep('profile-basic');
            router.back();
          }}
          onNext={() => {
            setShowErrors(true);
            if (!canContinue) return;
            setActiveStep('profile-career');
            router.push('/(register-flow)/profile-career');
          }}
        />
      }>
      <OptionPickerField
        label="Religion"
        value={draft.religion}
        onChange={(value) => {
          updateField('religion', value);
          if (value !== 'CHRISTIAN') {
            updateField('religionDivision', '');
          }
        }}
        options={religionOptions}
        icon="institution"
        error={showErrors ? errors.religion : undefined}
        hint={
          draft.religion
            ? 'This choice cannot be edited later once registration is submitted.'
            : undefined
        }
      />

      {showChristianDivision ? (
        <OptionPickerField
          label="Division (for Christian profiles)"
          value={draft.religionDivision}
          onChange={(value) => updateField('religionDivision', value)}
          options={christianDivisionOptions}
          icon="sitemap"
          error={showErrors ? errors.religionDivision : undefined}
        />
      ) : null}

      <OptionPickerField
        label="Language"
        value={draft.motherTongue}
        onChange={(value) => updateField('motherTongue', value)}
        options={motherTongueOptions}
        icon="language"
        error={showErrors ? errors.motherTongue : undefined}
        hint={
          draft.motherTongue
            ? 'This choice cannot be edited later once registration is submitted.'
            : undefined
        }
      />

      <OptionPickerField
        label="Caste"
        value={draft.caste}
        onChange={(value) => updateField('caste', value)}
        options={casteOptions}
        icon="users"
        error={showErrors ? errors.caste : undefined}
        hint={
          draft.caste
            ? 'This choice cannot be edited later once registration is submitted.'
            : undefined
        }
      />

      <TextField
        label="Sub caste"
        optional
        value={draft.subCaste}
        onChangeText={(value) => updateField('subCaste', value)}
        placeholder="Enter sub caste if applicable"
        icon="tag"
      />

      <CheckboxField
        label="Willing to marry any caste"
        checked={draft.willingToMarryAnyCaste}
        onChange={(checked) => updateField('willingToMarryAnyCaste', checked)}
      />

      <OptionChips
        label="Sudha Jathagam"
        value={draft.sudhaJathagam}
        options={sudhaJathagamOptions}
        onChange={(value) => {
          updateField('sudhaJathagam', value);
          if (value !== 'NO') {
            updateField('doshamType', '');
          }
        }}
        error={showErrors ? errors.sudhaJathagam : undefined}
      />

      {showDoshamType ? (
        <OptionPickerField
          label="Dosham type"
          value={draft.doshamType}
          onChange={(value) => updateField('doshamType', value)}
          options={doshamTypeOptions}
          icon="star"
          error={showErrors ? errors.doshamType : undefined}
        />
      ) : null}
      <FieldMessage
        type="warning"
        message="Please review religion, caste, and language carefully. These cannot be reversed later."
      />
    </ScreenShell>
  );
}
