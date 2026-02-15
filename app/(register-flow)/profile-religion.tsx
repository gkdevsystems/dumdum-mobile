import { router } from 'expo-router';

import { CheckboxField } from '@/features/register-flow/components/checkbox-field';
import { OptionChips } from '@/features/register-flow/components/option-chips';
import { OptionPickerField } from '@/features/register-flow/components/option-picker-field';
import { ScreenShell } from '@/features/register-flow/components/screen-shell';
import { StepFooter } from '@/features/register-flow/components/step-footer';
import { TextField } from '@/features/register-flow/components/text-field';
import {
  casteOptions,
  christianDivisionOptions,
  doshamTypeOptions,
  religionOptions,
  sudhaJathagamOptions,
} from '@/features/register-flow/data/master-data';
import { isChristian, shouldAskDoshamType } from '@/features/register-flow/data/selectors';
import { useRegisterFlowStore } from '@/features/register-flow/store';

export default function ProfileReligionScreen() {
  const draft = useRegisterFlowStore((state) => state.draft);
  const updateField = useRegisterFlowStore((state) => state.updateField);
  const setActiveStep = useRegisterFlowStore((state) => state.setActiveStep);

  const showChristianDivision = isChristian(draft.religion);
  const showDoshamType = shouldAskDoshamType(draft.sudhaJathagam);

  const canContinue =
    draft.religion.length > 0 &&
    (!showChristianDivision || draft.religionDivision.length > 0) &&
    draft.caste.length > 0 &&
    draft.sudhaJathagam.length > 0 &&
    (!showDoshamType || draft.doshamType.length > 0);

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
            if (!canContinue) return;
            setActiveStep('profile-career');
            router.push('/(register-flow)/profile-career');
          }}
          disabled={!canContinue}
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
      />

      {showChristianDivision ? (
        <OptionPickerField
          label="Division (for Christian profiles)"
          value={draft.religionDivision}
          onChange={(value) => updateField('religionDivision', value)}
          options={christianDivisionOptions}
        />
      ) : null}

      <OptionPickerField label="Caste" value={draft.caste} onChange={(value) => updateField('caste', value)} options={casteOptions} />

      <TextField
        label="Sub caste"
        optional
        value={draft.subCaste}
        onChangeText={(value) => updateField('subCaste', value)}
        placeholder="Enter sub caste if applicable"
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
      />

      {showDoshamType ? (
        <OptionPickerField
          label="Dosham type"
          value={draft.doshamType}
          onChange={(value) => updateField('doshamType', value)}
          options={doshamTypeOptions}
        />
      ) : null}
    </ScreenShell>
  );
}

