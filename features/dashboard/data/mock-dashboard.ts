import type { DashboardData } from '@/shared/dashboard/types';

const profileNames = [
  'Priya Sharma',
  'Ananya Iyer',
  'Neha Verma',
  'Kavya Menon',
  'Aditi Rao',
  'Meera Nair',
  'Ishita Gupta',
  'Riya Kapoor',
  'Sneha Pillai',
  'Diya Subramaniam',
];

const cities = [
  'Mumbai, Maharashtra',
  'Bangalore, Karnataka',
  'Chennai, Tamil Nadu',
  'Hyderabad, Telangana',
  'Pune, Maharashtra',
  'Kochi, Kerala',
  'Ahmedabad, Gujarat',
  'Jaipur, Rajasthan',
];

const roles = [
  'Software Engineer',
  'Product Designer',
  'Marketing Specialist',
  'Data Analyst',
  'HR Consultant',
  'Architect',
  'Content Strategist',
  'Financial Analyst',
];

const education = [
  'B.Tech from IIT Delhi',
  'MBA from IIM Bangalore',
  'B.Des from NID Ahmedabad',
  'M.Sc from Anna University',
  'B.Com from Christ University',
  'M.Tech from NIT Trichy',
];

const profileImages = [
  'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/3404200/pexels-photo-3404200.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200',
];

const recommendedProfiles = Array.from({ length: 20 }, (_, index) => ({
  id: `r${index + 1}`,
  name: profileNames[index % profileNames.length],
  age: 23 + (index % 7),
  location: cities[index % cities.length],
  occupation: `${roles[index % roles.length]} at ${['Google', 'Amazon', 'Infosys', 'TCS', 'Adobe'][index % 5]}`,
  education: education[index % education.length],
  height: `5'${3 + (index % 5)}"`,
  imageUri: profileImages[index % profileImages.length],
  matchPercent: 82 + (index % 16),
  verified: index % 2 === 0,
}));

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
  recommended: recommendedProfiles,
  icebreaker: {
    question: 'What is your idea of a perfect weekend?',
    answeredCount: 127,
    ctaLabel: 'Answer & Connect',
  },
};
