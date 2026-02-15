import type { IncomeCurrency, Option } from '@/features/register-flow/types';

const toOptions = (record: Record<string, string>): Option[] =>
  Object.entries(record).map(([value, label]) => ({ value, label }));

export const profileCreatedForOptions: Option[] = [
  { value: 'SELF', label: 'Self' },
  { value: 'SON', label: 'Son' },
  { value: 'DAUGHTER', label: 'Daughter' },
  { value: 'BROTHER', label: 'Brother' },
  { value: 'SISTER', label: 'Sister' },
  { value: 'RELATIVE', label: 'Relative' },
];

export const genderOptions = toOptions({
  MALE: 'Male',
  FEMALE: 'Female',
});

export const maritalStatusOptions = toOptions({
  NEVER_MARRIED: 'Never married',
  SPOUSE_NOT_ALIVE: 'Widow / Widower',
  DIVORCED: 'Divorced',
  AWAITING_DIVORCE: 'Awaiting divorce',
});

export const noOfChildrenOptions = toOptions({
  NONE: 'None',
  ONE: '1',
  TWO: '2',
  THREE: '3',
  FOUR_OR_MORE: '4+',
});

export const physicalStatusOptions = toOptions({
  NORMAL: 'Normal',
  PHYSICALLY_CHALLENGED: 'Differently abled',
});

export const religionOptions = toOptions({
  HINDU: 'Hindu',
  CHRISTIAN: 'Christian',
  MUSLIM: 'Muslim',
  JAIN: 'Jain',
  SIKH: 'Sikh',
  BUDDHIST: 'Buddhist',
  OTHERS: 'Others',
});

export const christianDivisionOptions = toOptions({
  ROMAN_CATHOLIC: 'Roman Catholic',
  SYRO_MALABAR: 'Syro Malabar',
  CSI: 'Church of South India',
  PENTECOST: 'Pentecost',
  PROTESTANT: 'Protestant',
  CHRISTIAN_OTHERS: 'Christian - Others',
});

export const motherTongueOptions = toOptions({
  TAMIL: 'Tamil',
  TELUGU: 'Telugu',
  MALAYALAM: 'Malayalam',
  KANNADA: 'Kannada',
  HINDI: 'Hindi',
  ENGLISH: 'English',
});

export const casteOptions = toOptions({
  ANY: 'Any',
  BRAHMIN_IYER: 'Brahmin - Iyer',
  BRAHMIN_IYENGAR: 'Brahmin - Iyengar',
  GOUNDER: 'Gounder',
  NAIR: 'Nair',
  REDDY: 'Reddy',
  NADAR: 'Nadar',
  MUDALIYAR: 'Mudaliyar',
  VELLALAR: 'Vellalar',
  CHETTIAR: 'Chettiar',
  CASTE_NO_BAR: 'Caste no bar',
  DONT_WISH_TO_SPECIFY: "Don't wish to specify",
});

export const sudhaJathagamOptions = toOptions({
  YES: 'Yes',
  NO: 'No',
  DONT_KNOW: "Don't know",
});

export const doshamTypeOptions = toOptions({
  CHEVVAI_KUJA_MANGLIK: 'Chevvai Dosham',
  NAGA_SARPA: 'Naga Dosham',
  KALA_SARPA: 'Kala Sarpa Dosham',
  RAHU: 'Rahu Dosham',
  KETHU: 'Kethu Dosham',
  KALATHRA: 'Kalathra Dosham',
});

export const countryOptions = toOptions({
  INDIA: 'India',
  UNITED_STATES_OF_AMERICA: 'United States of America',
  UNITED_ARAB_EMIRATES: 'United Arab Emirates',
  UNITED_KINGDOM: 'United Kingdom',
  CANADA: 'Canada',
  AUSTRALIA: 'Australia',
  SINGAPORE: 'Singapore',
});

export const stateOptions = toOptions({
  TAMIL_NADU: 'Tamil Nadu',
  KERALA: 'Kerala',
  KARNATAKA: 'Karnataka',
  TELANGANA: 'Telangana',
  ANDHRA_PRADESH: 'Andhra Pradesh',
  MAHARASHTRA: 'Maharashtra',
  DELHI_NCR: 'Delhi / NCR',
  CALIFORNIA: 'California',
  NEW_JERSEY: 'New Jersey',
  NEW_YORK: 'New York',
});

export const citizenshipOptions = toOptions({
  INDIA: 'Indian Citizen',
  UNITED_STATES_OF_AMERICA: 'American Citizen',
  UNITED_ARAB_EMIRATES: 'Emirati Citizen',
  UNITED_KINGDOM: 'British Citizen',
  CANADA: 'Canadian Citizen',
  AUSTRALIA: 'Australian Citizen',
});

export const residentStatusOptions = toOptions({
  CITIZEN: 'Citizen',
  PERMANENT_RESIDENT: 'Permanent resident',
  WORK_PERMIT: 'Work permit',
  STUDENT_VISA: 'Student visa',
  TEMPORARY_VISA: 'Temporary visa',
});

export const educationCategoryOptions = toOptions({
  BACHELORS_ENGINEERING: "Bachelor's - Engineering / Computer Science",
  MASTERS_ENGINEERING: "Master's - Engineering / Computer Science",
  BACHELORS_ARTS_SCIENCE_COMMERCE: "Bachelor's - Arts / Science / Commerce",
  MASTERS_ARTS_SCIENCE_COMMERCE: "Master's - Arts / Science / Commerce",
  BACHELORS_MANAGEMENT: "Bachelor's - Management",
  MASTERS_MANAGEMENT: "Master's - Management",
  BACHELORS_MEDICINE_GENERAL: "Bachelor's - Medicine - General / Dental / Surgeon",
  MASTERS_MEDICINE_GENERAL: "Master's - Medicine - General / Dental / Surgeon",
  DOCTORATES: 'Doctorates',
  DIPLOMA: 'Diploma / Polytechnic',
  HIGHER_SECONDARY: 'Higher Secondary / Secondary',
});

export const employmentTypeOptions = toOptions({
  GOVERNMENT_PSU: 'Works in Government / PSU Sector',
  DEFENCE: 'Employed in Defence Sector',
  PRIVATE: 'Works in Private Sector',
  BUSINESS: 'Employed as a Business Owner',
  SELF_EMPLOYED: 'Self Employed',
  NOT_WORKING: 'Currently Not Working',
});

export const occupationOptions = toOptions({
  SOFTWARE_PROFESSIONAL: 'Software Professional',
  ENGINEER_NON_IT: 'Engineer - Non IT',
  DOCTOR: 'Doctor',
  LAWYER_LEGAL_PROFESSIONAL: 'Lawyer & Legal Professional',
  TEACHING_ACADEMICIAN: 'Teaching / Academician',
  BUSINESS_OWNER_ENTREPRENEUR: 'Business Owner / Entrepreneur',
  BANKING_PROFESSIONAL: 'Banking Professional',
  FINANCIAL_ANALYST_PLANNING: 'Financial Analyst / Planning',
  MANAGER: 'Manager',
  STUDENT: 'Student',
  NOT_WORKING: 'Not Working',
  OTHERS: 'Others',
});

export const familyStatusOptions = toOptions({
  MIDDLE_CLASS: 'Middle class',
  UPPER_MIDDLE_CLASS: 'Upper middle class',
  RICH: 'High class',
  AFFLUENT: 'Rich / Affluent',
});

export const incomeCurrencyOptions: Option[] = [
  { value: 'INR', label: 'INR' },
  { value: 'USD', label: 'USD ($)' },
];

const inrIncomeOptions = toOptions({
  RS_1_LAKH: 'INR 0 - 1 lakh per annum',
  RS_3_LAKH: 'INR 2 - 3 lakhs per annum',
  RS_5_LAKH: 'INR 4 - 5 lakhs per annum',
  RS_7_LAKH: 'INR 6 - 7 lakhs per annum',
  RS_10_LAKH: 'INR 9 - 10 lakhs per annum',
  RS_12_LAKH: 'INR 10 - 12 lakhs per annum',
  RS_20_LAKH: 'INR 18 - 20 lakhs per annum',
  RS_30_LAKH: 'INR 25 - 30 lakhs per annum',
  RS_50_LAKH: 'INR 45 - 50 lakhs per annum',
  RS_1_CRORE: 'INR 90 lakhs - 1 crore per annum',
  GREATER_THAN_RS_1_CRORE: 'INR 1 crore & above per annum',
});

const usdIncomeOptions = toOptions({
  LESSER_THAN_USD_25_K: 'Less than $25 K',
  USD_50_K: '$50 K',
  USD_80_K: '$80 K',
  USD_100_K: '$100 K',
  USD_140_K: '$140 K',
  USD_200_K: '$200 K',
  GREATER_THAN_USD_200_K: '$200 K and above',
});

export const incomeOptionsByCurrency: Record<IncomeCurrency, Option[]> = {
  INR: inrIncomeOptions,
  USD: usdIncomeOptions,
};

export const heightOptions: Option[] = [
  { value: 'FT4_121CM', label: "4'0\"" },
  { value: 'FT4_IN5_134CM', label: "4'5\"" },
  { value: 'FT5_152CM', label: "5'0\"" },
  { value: 'FT5_IN2_157CM', label: "5'2\"" },
  { value: 'FT5_IN4_162CM', label: "5'4\"" },
  { value: 'FT5_IN6_167CM', label: "5'6\"" },
  { value: 'FT5_IN8_172CM', label: "5'8\"" },
  { value: 'FT5_IN10_177CM', label: "5'10\"" },
  { value: 'FT6_182CM', label: "6'0\"" },
  { value: 'FT6_IN2_187CM', label: "6'2\"" },
  { value: 'FT6_IN4_193CM', label: "6'4\"" },
  { value: 'FT6_IN8_203CM', label: "6'8\"" },
  { value: 'FT7_213CM', label: "7'0\"" },
];
