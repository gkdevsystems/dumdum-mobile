import { mockDashboard } from '@/features/dashboard/data/mock-dashboard';
import type { DashboardProfile } from '@/shared/dashboard/types';

import type { ProfileDetails, ProfilePost } from '@/features/profile-details/types';

const QUOTES = [
  'Partnership means choosing each other in the ordinary moments.',
  'Kindness is my non-negotiable in any relationship.',
  'I value a home filled with laughter, books, and shared rituals.',
];

function buildPosts(profileId: string): ProfilePost[] {
  return [
    {
      id: `${profileId}-p1`,
      type: 'image',
      caption: 'Sunday morning filter coffee and a long read.',
      mediaUri:
        'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1600',
      createdAtLabel: '2 days ago',
      likeCount: 84,
      commentCount: 12,
    },
    {
      id: `${profileId}-p2`,
      type: 'video',
      caption: 'Tiny glimpse from a recent trek near Coorg.',
      mediaUri:
        'https://images.pexels.com/photos/372098/pexels-photo-372098.jpeg?auto=compress&cs=tinysrgb&w=1600',
      createdAtLabel: '1 week ago',
      likeCount: 126,
      commentCount: 19,
    },
    {
      id: `${profileId}-p3`,
      type: 'quote',
      caption: QUOTES[profileId.length % QUOTES.length],
      createdAtLabel: '2 weeks ago',
      likeCount: 63,
      commentCount: 8,
    },
  ];
}

function toProfileDetails(profile: DashboardProfile): ProfileDetails {
  return {
    id: profile.id,
    name: profile.name,
    age: profile.age,
    imageUri: profile.imageUri,
    location: profile.location,
    occupation: profile.occupation,
    education: profile.education,
    height: profile.height,
    matchPercent: profile.matchPercent,
    about:
      'I am grounded, family-oriented, and curious about the world. I value open communication, emotional maturity, and shared growth.',
    verified: Boolean(profile.verified),
    posts: buildPosts(profile.id),
    highlights: {
      lookingFor: 'A long-term relationship leading to marriage',
      values: ['Family First', 'Mutual Respect', 'Spiritual Balance'],
      interests: ['Travel', 'Music', 'Cooking', 'Reading'],
      languages: ['Tamil', 'English', 'Hindi'],
    },
  };
}

const allProfiles = [mockDashboard.topMatch.profile, ...mockDashboard.recommended];
const detailsById = new Map(allProfiles.map((profile) => [profile.id, toProfileDetails(profile)]));

export function getProfileDetailsById(profileId: string): ProfileDetails | null {
  return detailsById.get(profileId) ?? null;
}
