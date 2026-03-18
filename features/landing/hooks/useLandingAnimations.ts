import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Platform } from 'react-native';

import { HERO_IMAGES } from '@/features/landing/constants';

/**
 * Centralizes landing page animation state and timers so the screen component can stay focused on layout.
 */
export function useLandingAnimations() {
  const shouldUseNativeDriver = Platform.OS !== 'web';

  const glowAnim = useRef(new Animated.Value(0.55)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  const driftAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const imageTransition = useRef(new Animated.Value(0)).current;
  const heartAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const currentImageRef = useRef(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(0);

  useEffect(() => {
    const driftLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(driftAnim, {
          toValue: 1,
          duration: 2800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: shouldUseNativeDriver,
        }),
        Animated.timing(driftAnim, {
          toValue: 0,
          duration: 2800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: shouldUseNativeDriver,
        }),
      ])
    );

    const spinLoop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: shouldUseNativeDriver,
      })
    );

    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.95,
          duration: 1700,
          useNativeDriver: shouldUseNativeDriver,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.55,
          duration: 1700,
          useNativeDriver: shouldUseNativeDriver,
        }),
      ])
    );

    const heartLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(heartAnim, {
          toValue: 1,
          duration: 3600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: shouldUseNativeDriver,
        }),
        Animated.timing(heartAnim, {
          toValue: 0,
          duration: 3600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: shouldUseNativeDriver,
        }),
      ])
    );

    const contentEnter = Animated.timing(contentAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: shouldUseNativeDriver,
    });

    driftLoop.start();
    spinLoop.start();
    glowLoop.start();
    heartLoop.start();
    contentEnter.start();

    const imageTimer = setInterval(() => {
      const nextImage = (currentImageRef.current + 1) % HERO_IMAGES.length;
      setPreviousImageIndex(currentImageRef.current);
      setActiveImageIndex(nextImage);
      currentImageRef.current = nextImage;

      imageTransition.setValue(0);
      Animated.timing(imageTransition, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: shouldUseNativeDriver,
      }).start();
    }, 4200);

    return () => {
      clearInterval(imageTimer);
      driftLoop.stop();
      spinLoop.stop();
      glowLoop.stop();
      heartLoop.stop();
      contentEnter.stop();
    };
  }, [contentAnim, driftAnim, glowAnim, heartAnim, imageTransition, shouldUseNativeDriver, spinAnim]);

  const onScroll = useMemo(
    () =>
      Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: shouldUseNativeDriver,
      }),
    [scrollY, shouldUseNativeDriver]
  );

  return {
    shouldUseNativeDriver,
    activeImageIndex,
    previousImageIndex,
    onScroll,
    contentAnim,
    contentTranslate: contentAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [28, 0],
    }),
    glowAnim,
    heroForegroundTranslateY: scrollY.interpolate({
      inputRange: [-220, 0, 220],
      outputRange: [-90, 0, 65],
      extrapolate: 'clamp',
    }),
    heroBackgroundTranslateY: scrollY.interpolate({
      inputRange: [-220, 0, 220],
      outputRange: [-35, 0, 25],
      extrapolate: 'clamp',
    }),
    heroScale: scrollY.interpolate({
      inputRange: [-220, 0],
      outputRange: [1.28, 1],
      extrapolateRight: 'clamp',
    }),
    heroTilt: scrollY.interpolate({
      inputRange: [-160, 0, 160],
      outputRange: ['2deg', '0deg', '-1.5deg'],
      extrapolate: 'clamp',
    }),
    heroDrift: driftAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-8, 8],
    }),
    chipDrift: driftAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [6, -6],
    }),
    ringRotate: spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    }),
    transitionOpacity: imageTransition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transitionScale: imageTransition.interpolate({
      inputRange: [0, 1],
      outputRange: [1.08, 1],
    }),
    heartTranslateY: heartAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [8, -12],
    }),
    heartOpacity: heartAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.4, 0.9],
    }),
    titleScale: heartAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.06],
    }),
    titleTranslateY: heartAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -2],
    }),
  };
}
