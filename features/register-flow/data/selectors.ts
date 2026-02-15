import { incomeOptionsByCurrency } from '@/features/register-flow/data/master-data';
import type { IncomeCurrency, Option } from '@/features/register-flow/types';

export const isChristian = (religion: string) => religion === 'CHRISTIAN';

export const shouldAskChildren = (maritalStatus: string) => maritalStatus !== 'NEVER_MARRIED' && maritalStatus.length > 0;

export const shouldAskDoshamType = (sudhaJathagam: string) => sudhaJathagam === 'NO';

export const getIncomeOptions = (currency: IncomeCurrency): Option[] => incomeOptionsByCurrency[currency];

