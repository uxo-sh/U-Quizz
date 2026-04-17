import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence, 
  withDelay,
  Easing
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/ui/Button';
import { colors } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const Ember = ({ delay = 0 }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(0.6, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      ),
      -1
    ));
    
    translateY.value = withDelay(delay, withRepeat(
      withTiming(-height, { duration: 6000, easing: Easing.linear }),
      -1
    ));

    translateX.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(20, { duration: 3000 }),
        withTiming(-20, { duration: 3000 })
      ),
      -1
    ));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value }
    ],
  }));

  const startX = Math.random() * width;

  return (
    <Animated.View 
      style={[
        { 
          position: 'absolute', 
          left: startX, 
          bottom: -20, 
          width: 4, 
          height: 4, 
          borderRadius: 2, 
          backgroundColor: colors.accent 
        }, 
        animatedStyle
      ]} 
    />
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const subtitleOpacity = useSharedValue(0);

  useEffect(() => {
    subtitleOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(0.4, { duration: 1500 })
      ),
      -1,
      true
    );
  }, []);

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  return (
    <View className="flex-1 bg-background justify-center items-center px-8">
      {/* Background Embers */}
      {[...Array(20)].map((_, i) => (
        <Ember key={i} delay={i * 300} />
      ))}

      <View className="items-center mb-16">
        <Text className="text-textPrimary font-cinzel text-5xl tracking-[8px] text-center">
          ASHEN QUIZ
        </Text>
        <Animated.Text 
          style={subtitleStyle}
          className="text-accent text-sm font-cinzel mt-4 tracking-widest uppercase"
        >
          Seek wisdom, or be Hollowed
        </Animated.Text>
      </View>

      <View className="w-full max-w-xs">
        <Button 
          title="Start Quiz" 
          onPress={() => router.push('/(quiz)/select')} 
        />
        <Button 
          title="Daily Challenge" 
          variant="secondary"
          onPress={() => router.push('/daily')} 
        />
        <Button 
          title="Leaderboard" 
          variant="secondary"
          onPress={() => router.push('/leaderboard')} 
        />
      </View>

      <LinearGradient
        colors={['transparent', 'rgba(13, 11, 7, 0.8)']}
        className="absolute bottom-0 left-0 right-0 h-32"
      />
    </View>
  );
}
