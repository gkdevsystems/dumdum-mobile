import { useLocalSearchParams } from 'expo-router';

import { ProfileDetailsScreen } from '@/features/profile-details/screens/profile-details-screen';

export default function ProfileDetailsRoute() {
  const params = useLocalSearchParams<{ profileId?: string | string[] }>();
  const rawProfileId = params.profileId;
  const profileId = Array.isArray(rawProfileId) ? rawProfileId[0] : rawProfileId;

  return <ProfileDetailsScreen profileId={profileId ?? ''} />;
}
