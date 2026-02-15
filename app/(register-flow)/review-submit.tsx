import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

import { StepProgress } from '@/features/register-flow/components/step-progress';
import { submitRegistration } from '@/features/register-flow/services/register-api';
import { useRegisterFlowStore } from '@/features/register-flow/store';

function Row({ label, value }: { label: string; value: string | boolean }) {
  return (
    <View className="mb-3 rounded-2xl border border-app-border bg-app-card px-4 py-3">
      <Text className="text-xs uppercase tracking-[1.5px] text-app-muted">{label}</Text>
      <Text className="mt-1 text-sm font-semibold text-app-foreground">{String(value || '-')}</Text>
    </View>
  );
}

export default function ReviewSubmitScreen() {
  const draft = useRegisterFlowStore((state) => state.draft);
  const reset = useRegisterFlowStore((state) => state.reset);
  const setActiveStep = useRegisterFlowStore((state) => state.setActiveStep);
  const [submitting, setSubmitting] = useState(false);

  const payloadPreview = useMemo(
    () => ({
      ...draft,
      mobileNumber: `+91${draft.mobileNumber}`,
      otp: '[redacted]',
    }),
    [draft]
  );

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      const result = await submitRegistration(draft);
      Alert.alert('Submitted', `Registration ID: ${result.registrationId}`);
      reset();
      router.replace('/(tabs)');
    } catch {
      Alert.alert('Submission failed', 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-app-background px-5 pt-2">
      <StepProgress step={6} totalSteps={6} />
      <Text className="mt-5 text-3xl font-black text-app-foreground">Review & Submit</Text>
      <Text className="mt-2 text-sm leading-6 text-app-muted">
        Review your details. On submit, this payload is ready to be sent to API.
      </Text>

      <ScrollView contentContainerClassName="pb-40 pt-5">
        <Row label="Mobile number" value={payloadPreview.mobileNumber} />
        <Row label="Profile for" value={payloadPreview.profileCreatedFor} />
        <Row label="Name" value={payloadPreview.name} />
        <Row label="DOB" value={`${payloadPreview.dob.day}-${payloadPreview.dob.month}-${payloadPreview.dob.year}`} />
        <Row label="Height" value={payloadPreview.height} />
        <Row label="Physical status" value={payloadPreview.physicalStatus} />
        <Row label="Marital status" value={payloadPreview.maritalStatus} />
        <Row label="No. of children" value={payloadPreview.numberOfChildren} />
        <Row label="Religion" value={payloadPreview.religion} />
        <Row label="Division" value={payloadPreview.religionDivision} />
        <Row label="Caste" value={payloadPreview.caste} />
        <Row label="Sub caste" value={payloadPreview.subCaste} />
        <Row label="Any caste accepted" value={payloadPreview.willingToMarryAnyCaste} />
        <Row label="Sudha Jathagam" value={payloadPreview.sudhaJathagam} />
        <Row label="Dosham type" value={payloadPreview.doshamType} />
        <Row label="Country" value={payloadPreview.residentialCountry} />
        <Row label="State" value={payloadPreview.residentialState} />
        <Row label="Citizenship" value={payloadPreview.citizenship} />
        <Row label="Resident status" value={payloadPreview.residentialStatus} />
        <Row label="Education category" value={payloadPreview.educationCategory} />
        <Row label="Education details" value={payloadPreview.educationDetail} />
        <Row label="Employment type" value={payloadPreview.employmentType} />
        <Row label="Occupation" value={payloadPreview.occupation} />
        <Row label="Income currency" value={payloadPreview.incomeCurrency} />
        <Row label="Annual income" value={payloadPreview.annualIncome} />
        <Row label="Family status" value={payloadPreview.familyStatus} />
        <Row label="About" value={payloadPreview.about} />
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 border-t border-app-border bg-app-background px-5 py-4">
        <View className="flex-row gap-3">
          <Pressable
            className="flex-1 rounded-2xl border border-app-border bg-app-card px-4 py-4"
            onPress={() => {
              setActiveStep('profile-career');
              router.back();
            }}>
            <Text className="text-center text-sm font-semibold text-app-foreground">Back</Text>
          </Pressable>
          <Pressable
            className={`flex-1 rounded-2xl px-4 py-4 ${submitting ? 'bg-rose-300' : 'bg-rose-500'}`}
            disabled={submitting}
            onPress={onSubmit}>
            <Text className="text-center text-sm font-bold text-white">{submitting ? 'Submitting...' : 'Submit'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

