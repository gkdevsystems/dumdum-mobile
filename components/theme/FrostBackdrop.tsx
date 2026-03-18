import { View } from 'react-native';

/**
 * Decorative layer used only in frost mode.
 * Kept separate from the layout shell to keep routing concerns uncluttered.
 */
export function FrostBackdrop() {
  return (
    <>
      <View className="absolute -left-16 -top-12 h-80 w-80 rounded-full bg-cyan-300/30" />
      <View className="absolute -right-20 top-36 h-96 w-96 rounded-full bg-violet-300/24" />
      <View className="absolute bottom-0 left-4 h-80 w-80 rounded-full bg-app-primary/24" />
      <View
        className="absolute left-[-30] top-[32%] h-52 w-[130%] bg-white/8"
        style={{ transform: [{ rotate: '-10deg' }] }}
      />
      <View
        pointerEvents="none"
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(5, 8, 18, 0.28)' }}
      />
    </>
  );
}
