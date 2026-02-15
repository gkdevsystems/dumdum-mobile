import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/providers/AuthProvider';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { signIn } = useAuth();

  const canContinue = fullName.trim().length > 1 && phoneNumber.trim().length > 5;

  const handleContinue = async () => {
    if (!canContinue) return;
    console.log('[ROUTE][Register] Continue pressed -> signIn -> /(tabs)', {
      fullNameLength: fullName.trim().length,
      phoneLength: phoneNumber.trim().length,
    });
    await signIn('demo-registration-token');
    router.replace('/(tabs)' as never);
  };

  const handleViewProfiles = () => {
    console.log('[ROUTE][Register] View Profiles pressed -> /(tabs)');
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-app-background px-6 pt-8">
      <Text className="text-3xl font-black text-app-foreground">Get Started</Text>
      <Text className="mt-2 text-base text-app-muted">
        Simple registration screen for now. We can expand fields and storage flow next.
      </Text>

      <View className="mt-8 gap-4">
        <View>
          <Text className="mb-2 text-sm font-semibold text-app-foreground">Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            placeholderTextColor="rgb(var(--app-muted))"
            className="rounded-2xl border border-app-border bg-app-card px-4 py-3 text-app-foreground"
          />
        </View>

        <View>
          <Text className="mb-2 text-sm font-semibold text-app-foreground">Phone Number</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            placeholder="Enter your phone number"
            placeholderTextColor="rgb(var(--app-muted))"
            className="rounded-2xl border border-app-border bg-app-card px-4 py-3 text-app-foreground"
          />
        </View>
      </View>

      <View className="mt-8 gap-3">
        <Pressable
          className={`rounded-2xl px-5 py-4 ${canContinue ? 'bg-rose-500' : 'bg-rose-300'}`}
          onPress={handleContinue}
          disabled={!canContinue}>
          <Text className="text-center text-base font-bold text-white">Continue Registration</Text>
        </Pressable>

        <Pressable
          className="rounded-2xl border border-app-border bg-app-card px-5 py-4 active:opacity-80"
          onPress={handleViewProfiles}>
          <Text className="text-center text-sm font-semibold text-app-foreground">View Profiles</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
