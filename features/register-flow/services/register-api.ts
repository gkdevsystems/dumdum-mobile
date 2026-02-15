import type { RegistrationDraft } from '@/features/register-flow/types';

type SubmitRegistrationResult = {
  registrationId: string;
  submittedAt: string;
};

export async function submitRegistration(payload: RegistrationDraft): Promise<SubmitRegistrationResult> {
  // API-ready contract: replace this with real HTTP once backend is enabled.
  await new Promise((resolve) => setTimeout(resolve, 900));

  return {
    registrationId: `reg_${Date.now()}`,
    submittedAt: new Date().toISOString(),
  };
}

