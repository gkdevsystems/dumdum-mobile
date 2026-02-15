import { router } from 'expo-router';

import { OptionChips } from '@/features/register-flow/components/option-chips';
import { OptionPickerField } from '@/features/register-flow/components/option-picker-field';
import { ScreenShell } from '@/features/register-flow/components/screen-shell';
import { StepFooter } from '@/features/register-flow/components/step-footer';
import { TextField } from '@/features/register-flow/components/text-field';
import {
  citizenshipOptions,
  countryOptions,
  educationCategoryOptions,
  employmentTypeOptions,
  familyStatusOptions,
  incomeCurrencyOptions,
  occupationOptions,
  residentStatusOptions,
  stateOptions,
} from '@/features/register-flow/data/master-data';
import { getIncomeOptions } from '@/features/register-flow/data/selectors';
import { useRegisterFlowStore } from '@/features/register-flow/store';

export default function ProfileCareerScreen() {
  const draft = useRegisterFlowStore((state) => state.draft);
  const updateField = useRegisterFlowStore((state) => state.updateField);
  const setActiveStep = useRegisterFlowStore((state) => state.setActiveStep);
  const incomeOptions = getIncomeOptions(draft.incomeCurrency);

  const canContinue =
    draft.residentialCountry.length > 0 &&
    draft.residentialState.length > 0 &&
    draft.citizenship.length > 0 &&
    draft.residentialStatus.length > 0 &&
    draft.educationCategory.length > 0 &&
    draft.employmentType.length > 0 &&
    draft.occupation.length > 0 &&
    draft.annualIncome.length > 0 &&
    draft.familyStatus.length > 0 &&
    draft.about.trim().length >= 10;

  return (
    <ScreenShell
      title="Residence, Education & Career"
      subtitle="Add residency and career details used for final profile publishing."
      step={5}
      totalSteps={6}
      footer={
        <StepFooter
          onBack={() => {
            setActiveStep('profile-religion');
            router.back();
          }}
          onNext={() => {
            if (!canContinue) return;
            setActiveStep('review-submit');
            router.push('/(register-flow)/review-submit');
          }}
          disabled={!canContinue}
        />
      }>
      <OptionPickerField
        label="Residential country"
        value={draft.residentialCountry}
        onChange={(value) => updateField('residentialCountry', value)}
        options={countryOptions}
      />

      <OptionPickerField
        label="Residential state"
        value={draft.residentialState}
        onChange={(value) => updateField('residentialState', value)}
        options={stateOptions}
      />

      <OptionPickerField
        label="Citizenship"
        value={draft.citizenship}
        onChange={(value) => updateField('citizenship', value)}
        options={citizenshipOptions}
      />

      <OptionPickerField
        label="Residential status"
        value={draft.residentialStatus}
        onChange={(value) => updateField('residentialStatus', value)}
        options={residentStatusOptions}
      />

      <OptionPickerField
        label="Education category"
        value={draft.educationCategory}
        onChange={(value) => updateField('educationCategory', value)}
        options={educationCategoryOptions}
      />

      <TextField
        label="Education details"
        value={draft.educationDetail}
        onChangeText={(value) => updateField('educationDetail', value)}
        placeholder="Example: BE - Computer Science, Anna University"
      />

      <OptionPickerField
        label="Employment type"
        value={draft.employmentType}
        onChange={(value) => updateField('employmentType', value)}
        options={employmentTypeOptions}
      />

      <OptionPickerField
        label="Occupation"
        value={draft.occupation}
        onChange={(value) => updateField('occupation', value)}
        options={occupationOptions}
      />

      <OptionChips
        label="Income currency"
        value={draft.incomeCurrency}
        options={incomeCurrencyOptions}
        onChange={(value) => {
          const next = value === 'USD' ? 'USD' : 'INR';
          updateField('incomeCurrency', next);
          updateField('annualIncome', '');
        }}
      />

      <OptionPickerField
        label="Annual income"
        value={draft.annualIncome}
        onChange={(value) => updateField('annualIncome', value)}
        options={incomeOptions}
      />

      <OptionChips
        label="Family status"
        value={draft.familyStatus}
        options={familyStatusOptions}
        onChange={(value) => updateField('familyStatus', value)}
      />

      <TextField
        label="Few words about"
        value={draft.about}
        onChangeText={(value) => updateField('about', value)}
        placeholder="Write a short profile summary"
        multiline
        maxLength={400}
      />
    </ScreenShell>
  );
}

