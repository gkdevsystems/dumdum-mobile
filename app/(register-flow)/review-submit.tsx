import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMemo, useState } from 'react';
import { Alert, Image, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { ScreenShell } from '@/features/register-flow/components/screen-shell';
import { submitRegistration } from '@/features/register-flow/services/register-api';
import { useRegisterFlowStore } from '@/features/register-flow/store';

function Row({ label, value }: { label: string; value: string | boolean }) {
  return (
    <Card className="mb-3 rounded-2xl border-app-border bg-app-card px-4 py-3">
      <Text className="text-xs uppercase tracking-[1.5px] text-app-muted">{label}</Text>
      <Text className="mt-1 text-sm font-semibold text-app-foreground">{String(value || '-')}</Text>
    </Card>
  );
}

function GenderPreview({ gender }: { gender: string }) {
  if (!gender) return null;
  const isMale = gender === 'MALE';
  const label = isMale ? 'Male' : 'Female';
  const illustrationUri = isMale
    ? 'https://img.icons8.com/color/144/businessman.png'
    : 'https://img.icons8.com/color/144/businesswoman.png';

  return (
    <Card className="mb-4 flex-row items-center rounded-2xl border-app-border bg-app-card px-4 py-3">
      <View className="size-14 items-center justify-center overflow-hidden rounded-full bg-app-primary/10">
        <Image source={{ uri: illustrationUri }} className="size-12" resizeMode="contain" />
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-xs uppercase tracking-[1.5px] text-app-muted">Profile gender</Text>
        <Text className="mt-1 text-sm font-semibold text-app-foreground">{label}</Text>
      </View>
      <FontAwesome name={isMale ? 'mars' : 'venus'} size={16} color="rgb(var(--app-primary))" />
    </Card>
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
    <ScreenShell
      title="Review & Submit"
      subtitle="Review your details. On submit, this payload is ready to be sent to API."
      step={6}
      totalSteps={6}
      footer={
        <View className="flex-row gap-3">
          <Button
            className="flex-1 rounded-2xl border-app-border bg-app-card"
            variant="outline"
            onPress={() => {
              setActiveStep('profile-career');
              router.back();
            }}>
            <Text className="text-center text-sm font-semibold text-app-foreground">Back</Text>
          </Button>
          <Button
            className={`flex-1 rounded-2xl ${submitting ? 'bg-app-primary/40' : 'bg-app-primary'}`}
            disabled={submitting}
            onPress={onSubmit}>
            <Text className="text-center text-sm font-bold text-white">{submitting ? 'Submitting...' : 'Submit'}</Text>
          </Button>
        </View>
      }>
      <View className="pb-24">
        <GenderPreview gender={payloadPreview.gender} />
        <Row label="Mobile number" value={payloadPreview.mobileNumber} />
        <Row label="Profile for" value={payloadPreview.profileCreatedFor} />
        <Row label="Gender" value={payloadPreview.gender} />
        <Row label="Name" value={payloadPreview.name} />
        <Row label="DOB" value={`${payloadPreview.dob.day}-${payloadPreview.dob.month}-${payloadPreview.dob.year}`} />
        <Row label="Height" value={payloadPreview.height} />
        <Row label="Physical status" value={payloadPreview.physicalStatus} />
        <Row label="Marital status" value={payloadPreview.maritalStatus} />
        <Row label="No. of children" value={payloadPreview.numberOfChildren} />
        <Row label="Religion" value={payloadPreview.religion} />
        <Row label="Division" value={payloadPreview.religionDivision} />
        <Row label="Language" value={payloadPreview.motherTongue} />
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
      </View>
    </ScreenShell>
  );
}
