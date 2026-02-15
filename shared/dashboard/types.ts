export type DashboardProfile = {
  id: string;
  name: string;
  age: number;
  location: string;
  occupation: string;
  education: string;
  height: string;
  imageUri: string;
  matchPercent: number;
  verified?: boolean;
  online?: boolean;
};

export type TopMatch = {
  title: string;
  countdownLabel: string;
  profile: DashboardProfile;
  tags: string[];
  ctaLabel: string;
};

export type QuickStatCard = {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  accentLabel?: string;
  ctaLabel?: string;
  tone: 'success' | 'primary' | 'pink' | 'cyan';
};

export type VisitorProfile = {
  id: string;
  name: string;
  age: number;
  location: string;
  occupation: string;
  imageUri: string;
};

export type UpgradeBanner = {
  title: string;
  subtitle: string;
  ctaLabel: string;
};

export type Icebreaker = {
  question: string;
  answeredCount: number;
  ctaLabel: string;
};

export type DashboardData = {
  brandName: string;
  searchPlaceholder: string;
  topMatch: TopMatch;
  quickStats: QuickStatCard[];
  visitors: VisitorProfile[];
  feedTabs: Array<{ id: string; label: string; badge?: number }>;
  upgradeBanner: UpgradeBanner;
  recommended: DashboardProfile[];
  icebreaker: Icebreaker;
};

