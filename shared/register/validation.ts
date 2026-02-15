import { z } from 'zod';

const requiredText = (field: string) => `${field} helps us build better matches.`;

const mobileSchema = z
  .string()
  .trim()
  .regex(/^\d{10}$/, 'Please enter a valid 10-digit mobile number.');

const otpSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, 'OTP should be a 6-digit code.');

const dobSchema = z
  .object({
    day: z.string().trim().regex(/^\d{2}$/, 'Day should be 2 digits (DD).'),
    month: z.string().trim().regex(/^\d{2}$/, 'Month should be 2 digits (MM).'),
    year: z.string().trim().regex(/^\d{4}$/, 'Year should be 4 digits (YYYY).'),
  })
  .superRefine((dob, ctx) => {
    const day = Number(dob.day);
    const month = Number(dob.month);
    const year = Number(dob.year);

    const date = new Date(year, month - 1, day);
    const validDate =
      date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

    if (!validDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please enter a valid date of birth.',
      });
      return;
    }

    const today = new Date();
    const isBirthdayPassed =
      today.getMonth() > month - 1 ||
      (today.getMonth() === month - 1 && today.getDate() >= day);
    const age = today.getFullYear() - year - (isBirthdayPassed ? 0 : 1);

    if (age < 18) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'You should be at least 18 years old to register.',
      });
    }
  });

export type RegisterValidationErrors = Record<string, string>;

function firstError(error: z.ZodError) {
  return error.issues[0]?.message ?? 'Please check this field.';
}

function withError(
  errors: RegisterValidationErrors,
  field: string,
  condition: boolean,
  message: string
) {
  if (condition) {
    errors[field] = message;
  }
}

export function hasErrors(errors: RegisterValidationErrors) {
  return Object.keys(errors).length > 0;
}

export function validateMobileStep(mobileNumber: string): RegisterValidationErrors {
  const errors: RegisterValidationErrors = {};
  const parsed = mobileSchema.safeParse(mobileNumber);
  if (!parsed.success) {
    errors.mobileNumber = firstError(parsed.error);
  }
  return errors;
}

export function validateOtpStep(otp: string): RegisterValidationErrors {
  const errors: RegisterValidationErrors = {};
  const parsed = otpSchema.safeParse(otp);
  if (!parsed.success) {
    errors.otp = firstError(parsed.error);
  }
  return errors;
}

type BasicDraft = {
  profileCreatedFor: string;
  gender: string;
  name: string;
  dob: { day: string; month: string; year: string };
  height: string;
  physicalStatus: string;
  maritalStatus: string;
  numberOfChildren: string;
};

export function validateBasicStep(
  draft: BasicDraft,
  shouldAskChildren: boolean
): RegisterValidationErrors {
  const errors: RegisterValidationErrors = {};

  withError(errors, 'profileCreatedFor', !draft.profileCreatedFor, requiredText('Profile type'));
  withError(errors, 'gender', !draft.gender, requiredText('Gender'));

  const nameResult = z
    .string()
    .trim()
    .min(2, 'Please enter a name with at least 2 characters.')
    .safeParse(draft.name);
  if (!nameResult.success) {
    errors.name = firstError(nameResult.error);
  }

  const dobResult = dobSchema.safeParse(draft.dob);
  if (!dobResult.success) {
    errors.dob = firstError(dobResult.error);
  }

  withError(errors, 'height', !draft.height, requiredText('Height'));
  withError(errors, 'physicalStatus', !draft.physicalStatus, requiredText('Physical status'));
  withError(errors, 'maritalStatus', !draft.maritalStatus, requiredText('Marital status'));
  withError(
    errors,
    'numberOfChildren',
    shouldAskChildren && !draft.numberOfChildren,
    'Please share number of children for better profile relevance.'
  );

  return errors;
}

type ReligionDraft = {
  religion: string;
  religionDivision: string;
  motherTongue: string;
  caste: string;
  sudhaJathagam: string;
  doshamType: string;
};

export function validateReligionStep(
  draft: ReligionDraft,
  showChristianDivision: boolean,
  showDoshamType: boolean
): RegisterValidationErrors {
  const errors: RegisterValidationErrors = {};

  withError(errors, 'religion', !draft.religion, requiredText('Religion'));
  withError(
    errors,
    'religionDivision',
    showChristianDivision && !draft.religionDivision,
    requiredText('Christian division')
  );
  withError(errors, 'motherTongue', !draft.motherTongue, requiredText('Language'));
  withError(errors, 'caste', !draft.caste, requiredText('Caste'));
  withError(errors, 'sudhaJathagam', !draft.sudhaJathagam, requiredText('Sudha Jathagam'));
  withError(
    errors,
    'doshamType',
    showDoshamType && !draft.doshamType,
    requiredText('Dosham type')
  );

  return errors;
}

type CareerDraft = {
  residentialCountry: string;
  residentialState: string;
  citizenship: string;
  residentialStatus: string;
  educationCategory: string;
  educationDetail: string;
  employmentType: string;
  occupation: string;
  annualIncome: string;
  familyStatus: string;
  about: string;
};

export function validateCareerStep(draft: CareerDraft): RegisterValidationErrors {
  const errors: RegisterValidationErrors = {};

  withError(errors, 'residentialCountry', !draft.residentialCountry, requiredText('Country'));
  withError(errors, 'residentialState', !draft.residentialState, requiredText('State'));
  withError(errors, 'citizenship', !draft.citizenship, requiredText('Citizenship'));
  withError(
    errors,
    'residentialStatus',
    !draft.residentialStatus,
    requiredText('Residential status')
  );
  withError(
    errors,
    'educationCategory',
    !draft.educationCategory,
    requiredText('Education category')
  );
  withError(
    errors,
    'educationDetail',
    draft.educationDetail.trim().length < 3,
    'Please add a little more about your education.'
  );
  withError(errors, 'employmentType', !draft.employmentType, requiredText('Employment type'));
  withError(errors, 'occupation', !draft.occupation, requiredText('Occupation'));
  withError(errors, 'annualIncome', !draft.annualIncome, requiredText('Annual income'));
  withError(errors, 'familyStatus', !draft.familyStatus, requiredText('Family status'));
  withError(
    errors,
    'about',
    draft.about.trim().length < 20,
    'A few warm lines (20+ chars) help your profile stand out.'
  );

  return errors;
}
