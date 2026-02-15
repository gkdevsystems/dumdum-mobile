import { Stack } from 'expo-router';

export default function RegisterFlowLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="mobile" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="profile-basic" />
      <Stack.Screen name="profile-religion" />
      <Stack.Screen name="profile-career" />
      <Stack.Screen name="review-submit" />
    </Stack>
  );
}

