export type ProfileCreatedFor =
  | 'SELF'
  | 'SON'
  | 'DAUGHTER'
  | 'BROTHER'
  | 'SISTER'
  | 'RELATIVE';

export type Gender = 'MALE' | 'FEMALE';

const AUTO_GENDER_MAP: Partial<Record<ProfileCreatedFor, Gender>> = {
  SON: 'MALE',
  BROTHER: 'MALE',
  DAUGHTER: 'FEMALE',
  SISTER: 'FEMALE',
};

export function getAutoGenderForProfile(profileCreatedFor: string): Gender | null {
  return AUTO_GENDER_MAP[profileCreatedFor as ProfileCreatedFor] ?? null;
}

