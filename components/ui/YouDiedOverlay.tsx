import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withDelay,
  Easing
} from 'react-native-reanimated';
import { colors } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

export const YouDiedOverlay: React.FC<{ visible: boolean; onComplete?: () => void }> = ({ visible, onComplete }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1.2);
  const textSpacing = useSharedValue(10);

  useEffect(() => {
    if (visible) {
      opacity.value = withSequence(
        withTiming(1, { duration: 1000, easing: Easing.out(Easing.quad) }),
        withDelay(2000, withTiming(0, { duration: 1000 }))
      );
      scale.value = withTiming(1, { duration: 4000 });
      textSpacing.value = withTiming(20, { duration: 4000 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
    letterSpacing: textSpacing.value,
  }));

  const bgStyle = useAnimatedStyle(() => ({
    opacity: opacity.value * 0.8,
  }));

  if (!visible && opacity.value === 0) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none" className="z-50 items-center justify-center">
      <Animated.View 
        style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(50, 0, 0, 0.6)' }, bgStyle]} 
      />
      <Animated.Text 
        style={[{ color: colors.danger, fontSize: 60, fontFamily: 'Cinzel', textAlign: 'center' }, animatedStyle]}
      >
        YOU DIED
      </Animated.Text>
    </View>
  );
};
