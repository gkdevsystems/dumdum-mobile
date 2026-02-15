import type { DashboardData } from '@/shared/dashboard/types';

export const mockDashboard: DashboardData = {
  brandName: 'Suyamvaram',
  searchPlaceholder: 'Search profiles...',
  topMatch: {
    title: "Today's Top Match",
    countdownLabel: '18h left',
    profile: {
      id: 'top-1',
      name: 'Ananya Iyer',
      age: 24,
      location: 'Bangalore, Karnataka',
      occupation: 'Product Designer at Amazon',
      education: 'B.Des from NID Ahmedabad',
      height: `5'4"`,
      imageUri:
        'https://images.pexels.com/photos/3404200/pexels-photo-3404200.jpeg?auto=compress&cs=tinysrgb&w=1200',
      matchPercent: 94,
      verified: true,
    },
    tags: ['Travel', 'Photography', 'Yoga'],
    ctaLabel: 'Connect Now',
  },
  quickStats: [
    {
      id: 'online',
      title: 'Online Now',
      subtitle: '47 active profiles',
      value: '47',
      ctaLabel: 'Start connecting now',
      tone: 'success',
    },
    {
      id: 'chemistry',
      title: 'Chemistry Test',
      subtitle: 'Find your perfect match',
      value: '94%',
      accentLabel: '5 min test',
      ctaLabel: 'Start Now',
      tone: 'primary',
    },
    {
      id: 'interests',
      title: 'Interests',
      subtitle: 'Profiles showed interest in you',
      value: '24',
      tone: 'pink',
    },
    {
      id: 'views',
      title: 'Profile Views',
      subtitle: 'Total profile visits',
      value: '342',
      accentLabel: '75%',
      tone: 'cyan',
    },
  ],
  visitors: [
    {
      id: 'v1',
      name: 'Neha Singh',
      age: 27,
      location: 'Jaipur, Rajasthan',
      occupation: 'Teacher',
      imageUri:
        'https://images.pexels.com/photos/3404200/pexels-photo-3404200.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      id: 'v2',
      name: 'Aisha Khan',
      age: 25,
      location: 'Lucknow, UP',
      occupation: 'Content Writer',
      imageUri:
        'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      id: 'v3',
      name: 'Simran Kaur',
      age: 26,
      location: 'Chandigarh',
      occupation: 'Banker',
      imageUri:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
  ],
  feedTabs: [
    { id: 'recommended', label: 'Recommended' },
    { id: 'nearby', label: 'Near Me', badge: 156 },
    { id: 'premium', label: 'Premium' },
  ],
  upgradeBanner: {
    title: 'Upgrade to Premium',
    subtitle: 'Connect with unlimited profiles',
    ctaLabel: 'Unlock Now',
  },
  recommended: [
    {
      id: 'r1',
      name: 'Priya Sharma',
      age: 26,
      location: 'Mumbai, Maharashtra',
      occupation: 'Software Engineer at Google',
      education: 'B.Tech from IIT Delhi',
      height: `5'5"`,
      imageUri:
        'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1200',
      matchPercent: 94,
      verified: true,
    },
    {
      id: 'r2',
      name: 'Ananya Iyer',
      age: 24,
      location: 'Bangalore, Karnataka',
      occupation: 'Product Designer at Amazon',
      education: 'B.Des from NID Ahmedabad',
      height: `5'4"`,
      imageUri:
        'https://images.pexels.com/photos/3404200/pexels-photo-3404200.jpeg?auto=compress&cs=tinysrgb&w=1200',
      matchPercent: 92,
      verified: true,
    },
  ],
  icebreaker: {
    question: 'What is your idea of a perfect weekend?',
    answeredCount: 127,
    ctaLabel: 'Answer & Connect',
  },
};

