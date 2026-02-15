import { create } from 'zustand';

import { REGISTRATION_STEPS, type RegistrationDraft, type RegistrationStep } from '@/features/register-flow/types';

type RegisterFlowState = {
  draft: RegistrationDraft;
  activeStep: RegistrationStep;
  setActiveStep: (step: RegistrationStep) => void;
  updateField: <K extends keyof RegistrationDraft>(key: K, value: RegistrationDraft[K]) => void;
  updateDob: (key: keyof RegistrationDraft['dob'], value: string) => void;
  reset: () => void;
};

const initialDraft: RegistrationDraft = {
  mobileNumber: '',
  otp: '',
  profileCreatedFor: '',
  name: '',
  dob: { day: '', month: '', year: '' },
  height: '',
  physicalStatus: '',
  maritalStatus: '',
  numberOfChildren: '',
  religion: '',
  religionDivision: '',
  caste: '',
  subCaste: '',
  willingToMarryAnyCaste: false,
  sudhaJathagam: '',
  doshamType: '',
  residentialCountry: '',
  residentialState: '',
  citizenship: '',
  residentialStatus: '',
  educationCategory: '',
  educationDetail: '',
  employmentType: '',
  occupation: '',
  incomeCurrency: 'INR',
  annualIncome: '',
  familyStatus: '',
  about: '',
};

const sanitize = (value: string) => value.replace(/\s+/g, ' ').trimStart();

export const useRegisterFlowStore = create<RegisterFlowState>((set) => ({
  draft: initialDraft,
  activeStep: REGISTRATION_STEPS[0],
  setActiveStep: (step) => set({ activeStep: step }),
  updateField: (key, value) =>
    set((state) => {
      if (typeof value === 'string') {
        return { draft: { ...state.draft, [key]: sanitize(value) } };
      }
      return { draft: { ...state.draft, [key]: value } };
    }),
  updateDob: (key, value) =>
    set((state) => ({
      draft: {
        ...state.draft,
        dob: {
          ...state.draft.dob,
          [key]: value.replace(/[^\d]/g, ''),
        },
      },
    })),
  reset: () => set({ draft: initialDraft, activeStep: REGISTRATION_STEPS[0] }),
}));

