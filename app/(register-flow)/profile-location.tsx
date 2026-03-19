import { router } from 'expo-router';
import { useMemo, useState } from 'react';

import { MapLocationPicker } from '@/features/register-flow/components/map-location-picker';
import { ScreenShell } from '@/features/register-flow/components/screen-shell';
import { StepFooter } from '@/features/register-flow/components/step-footer';
import { TextField } from '@/features/register-flow/components/text-field';
import { useRegisterFlowStore } from '@/features/register-flow/store';
import { hasErrors, validateLocationStep } from '@/shared/register/validation';

export default function ProfileLocationScreen() {
  const draft = useRegisterFlowStore((state) => state.draft);
  const updateField = useRegisterFlowStore((state) => state.updateField);
  const setActiveStep = useRegisterFlowStore((state) => state.setActiveStep);
  const [showErrors, setShowErrors] = useState(false);

  const errors = useMemo(
    () =>
      validateLocationStep({
        locationSummary: draft.locationSummary,
        mapLatitude: draft.mapLatitude,
        mapLongitude: draft.mapLongitude,
      }),
    [draft.locationSummary, draft.mapLatitude, draft.mapLongitude]
  );
  const canContinue = !hasErrors(errors);

  return (
    <ScreenShell
      title="Location & Nearby Discovery"
      subtitle="Share a high-level location. We use this for nearby search and map-based profile discovery."
      step={6}
      totalSteps={7}
      footer={
        <StepFooter
          onBack={() => {
            setActiveStep('profile-career');
            router.back();
          }}
          onNext={() => {
            setShowErrors(true);
            if (!canContinue) return;
            setActiveStep('review-submit');
            router.push('/(register-flow)/review-submit');
          }}
          nextLabel="Continue to Review"
        />
      }>
      <TextField
        label="Area / locality"
        value={draft.locationSummary}
        onChangeText={(value) => updateField('locationSummary', value)}
        placeholder="Example: Anna Nagar West, Chennai"
        icon="map-marker"
        error={showErrors ? errors.locationSummary : undefined}
        hint="No exact address needed, just neighborhood-level detail."
      />

      <MapLocationPicker
        latitude={draft.mapLatitude}
        longitude={draft.mapLongitude}
        onChange={(latitude, longitude) => {
          updateField('mapLatitude', latitude);
          updateField('mapLongitude', longitude);
        }}
        error={showErrors ? errors.mapLocation : undefined}
        hint="Optional but recommended. A map pin helps power nearby matching."
      />
    </ScreenShell>
  );
}
