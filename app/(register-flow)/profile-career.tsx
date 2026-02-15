import { router } from 'expo-router';
import { useMemo, useState } from 'react';

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
import { hasErrors, validateCareerStep } from '@/shared/register/validation';

export default function ProfileCareerScreen() {
  const draft = useRegisterFlowStore((state) => state.draft);
  const updateField = useRegisterFlowStore((state) => state.updateField);
  const setActiveStep = useRegisterFlowStore((state) => state.setActiveStep);
  const [showErrors, setShowErrors] = useState(false);
  const incomeOptions = getIncomeOptions(draft.incomeCurrency);
  const errors = useMemo(() => validateCareerStep(draft), [draft]);
  const canContinue = !hasErrors(errors);

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
            setShowErrors(true);
            if (!canContinue) return;
            setActiveStep('review-submit');
            router.push('/(register-flow)/review-submit');
          }}
        />
      }>
      <OptionPickerField
        label="Residential country"
        value={draft.residentialCountry}
        onChange={(value) => updateField('residentialCountry', value)}
        options={countryOptions}
        icon="globe"
        error={showErrors ? errors.residentialCountry : undefined}
      />

      <OptionPickerField
        label="Residential state"
        value={draft.residentialState}
        onChange={(value) => updateField('residentialState', value)}
        options={stateOptions}
        icon="map-marker"
        error={showErrors ? errors.residentialState : undefined}
      />

      <OptionPickerField
        label="Citizenship"
        value={draft.citizenship}
        onChange={(value) => updateField('citizenship', value)}
        options={citizenshipOptions}
        icon="id-card"
        error={showErrors ? errors.citizenship : undefined}
      />

      <OptionPickerField
        label="Residential status"
        value={draft.residentialStatus}
        onChange={(value) => updateField('residentialStatus', value)}
        options={residentStatusOptions}
        icon="ticket"
        error={showErrors ? errors.residentialStatus : undefined}
      />

      <OptionPickerField
        label="Education category"
        value={draft.educationCategory}
        onChange={(value) => updateField('educationCategory', value)}
        options={educationCategoryOptions}
        icon="graduation-cap"
        error={showErrors ? errors.educationCategory : undefined}
      />

      <TextField
        label="Education details"
        value={draft.educationDetail}
        onChangeText={(value) => updateField('educationDetail', value)}
        placeholder="Example: BE - Computer Science, Anna University"
        icon="book"
        error={showErrors ? errors.educationDetail : undefined}
      />

      <OptionPickerField
        label="Employment type"
        value={draft.employmentType}
        onChange={(value) => updateField('employmentType', value)}
        options={employmentTypeOptions}
        icon="building"
        error={showErrors ? errors.employmentType : undefined}
      />

      <OptionPickerField
        label="Occupation"
        value={draft.occupation}
        onChange={(value) => updateField('occupation', value)}
        options={occupationOptions}
        icon="briefcase"
        error={showErrors ? errors.occupation : undefined}
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
        icon="money"
        error={showErrors ? errors.annualIncome : undefined}
      />

      <OptionChips
        label="Family status"
        value={draft.familyStatus}
        options={familyStatusOptions}
        onChange={(value) => updateField('familyStatus', value)}
        error={showErrors ? errors.familyStatus : undefined}
      />

      <TextField
        label="Few words about"
        value={draft.about}
        onChangeText={(value) => updateField('about', value)}
        placeholder="Write a short profile summary"
        multiline
        maxLength={400}
        icon="quote-left"
        error={showErrors ? errors.about : undefined}
        hint="A short, warm intro builds trust faster."
      />
    </ScreenShell>
  );
}
