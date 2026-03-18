export const HERO_IMAGES = [
  'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/24334706/pexels-photo-24334706.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/20015030/pexels-photo-20015030.jpeg?auto=compress&cs=tinysrgb&w=1600',
];

export const LANDING_COPY = {
  EYEBROW: "INDIA'S MODERN MATRIMONY",
  HERO_TITLE: 'Suyamvaram',
  HERO_SUBTITLE: 'For Indian families seeking serious, value-aligned matches.',
  HERO_CHIP_VERIFIED: 'Verified Profiles',
  HERO_CHIP_FAMILY_VERIFIED: 'Family Verified',
  HEADING_LINE_1: 'Find your forever.',
  HEADING_LINE_2: 'Not your next swipe.',
  DESCRIPTION:
    'Suyamvaram combines community preferences, horoscope compatibility, and verified profiles to help families and individuals choose with clarity.',
  CTA_PRIMARY: 'Start New Registration',
  CTA_SECONDARY: 'Open Existing Register (Compare)',
  CTA_TERTIARY: 'View Profiles',
  FOOTER_NOTE:
    'By continuing, you agree to respectful community standards and privacy policy.',
} as const;

export const LANDING_ICON_COLORS = {
  WHITE: '#ffffff',
  LEGACY_DARK: '#fdba74',
  LEGACY_LIGHT: '#ea580c',
  TITLE_HEART_RIGHT: '#fda4af',
  TITLE_HEART_LEFT: '#fecdd3',
} as const;

export const LANDING_STATS = [
  { value: '50K+', label: 'Verified profiles' },
  { value: '28+', label: 'Communities' },
  { value: '4.9', label: 'Family rating' },
] as const;

export const LANDING_FEATURES = [
  { icon: 'shield', label: 'ID, family and profile verification', darkColor: '#fda4af', lightColor: '#e11d48' },
  { icon: 'users', label: 'Parents can co-manage preferences', darkColor: '#fdba74', lightColor: '#ea580c' },
  { icon: 'heart', label: 'Kundli-ready, intent-first matching', darkColor: '#fda4af', lightColor: '#e11d48' },
] as const;

export const FLOATING_HEARTS = [
  { className: 'right-8 top-16', size: 16, color: '#fb7185', motion: 'heart' },
  { className: 'right-20 top-20', size: 9, color: '#fda4af', motion: 'heart' },
  { className: 'right-16 top-12', size: 11, color: '#fda4af', motion: 'chip' },
  { className: 'right-12 top-24', size: 10, color: '#fecdd3', motion: 'chip' },
  { className: 'left-10 top-20', size: 9, color: '#fda4af', motion: 'heart' },
  { className: 'left-16 top-30', size: 12, color: '#fb7185', motion: 'chip' },
  { className: 'left-24 top-14', size: 8, color: '#fecdd3', motion: 'heart' },
  { className: 'left-8 bottom-24', size: 10, color: '#fda4af', motion: 'chip' },
] as const;
