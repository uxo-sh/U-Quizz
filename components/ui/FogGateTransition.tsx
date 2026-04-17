import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  runOnJS 
} from 'react-native-reanimated';
import { colors } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

export const FogGateTransition: React.FC<{ visible: boolean; onComplete?: () => void }> = ({ visible, onComplete }) => {
  const opacity = useSharedValue(0);
  const [isRendered, setIsRendered] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsRendered(true);
      opacity.value = withTiming(1, { duration: 600 });
    } else {
      opacity.value = withTiming(0, { duration: 600 }, (finished) => {
        if (finished) {
          runOnJS(setIsRendered)(false);
          if (onComplete) runOnJS(onComplete)();
        }
      });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!isRendered) return null;

  return (
    <Animated.View 
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: colors.background, zIndex: 100 },
        animatedStyle
      ]} 
    />
  );
};
