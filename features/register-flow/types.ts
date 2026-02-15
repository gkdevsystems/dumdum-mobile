export type Option = {
  label: string;
  value: string;
};

export type Dob = {
  day: string;
  month: string;
  year: string;
};

export type IncomeCurrency = 'INR' | 'USD';

export type RegistrationDraft = {
  mobileNumber: string;
  otp: string;
  profileCreatedFor: string;
  gender: string;
  name: string;
  dob: Dob;
  height: string;
  physicalStatus: string;
  maritalStatus: string;
  numberOfChildren: string;
  religion: string;
  religionDivision: string;
  motherTongue: string;
  caste: string;
  subCaste: string;
  willingToMarryAnyCaste: boolean;
  sudhaJathagam: string;
  doshamType: string;
  residentialCountry: string;
  residentialState: string;
  citizenship: string;
  residentialStatus: string;
  educationCategory: string;
  educationDetail: string;
  employmentType: string;
  occupation: string;
  incomeCurrency: IncomeCurrency;
  annualIncome: string;
  familyStatus: string;
  about: string;
};

export const REGISTRATION_STEPS = [
  'mobile',
  'otp',
  'profile-basic',
  'profile-religion',
  'profile-career',
  'review-submit',
] as const;

export type RegistrationStep = (typeof REGISTRATION_STEPS)[number];
