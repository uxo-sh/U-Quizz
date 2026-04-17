import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  Easing
} from 'react-native-reanimated';
import { Button } from '../../components/ui/Button';
import { colors } from '../../constants/theme';
import { Flame } from 'lucide-react-native';

const Bonfire = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.8);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000, easing: Easing.inOut(Easing.quad) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.quad) })
      ),
      -1
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.6, { duration: 800 })
      ),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View className="items-center justify-center h-48">
      <Animated.View style={animatedStyle}>
        <Flame size={80} color={colors.accent} fill={colors.accent} />
      </Animated.View>
      <View className="w-24 h-2 bg-textSecondary/20 rounded-full mt-4 blur-sm" />
      <Text className="text-accent font-cinzel text-[10px] uppercase tracking-[4px] mt-4">Bonfire Lit</Text>
    </View>
  );
};

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const score = params.score ? parseInt(params.score as string) : 0;
  const total = params.questionsCount ? parseInt(params.questionsCount as string) : 10;
  const status = params.status as string; // 'victory' or 'death'
  
  const souls = score * 125; // Adjusted souls per correct answer
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

  const getRankMessage = () => {
    if (status === 'death') return { title: "You Died", color: colors.danger, sub: "Better luck in the next life" };
    if (score <= 3) return { title: "Hollowed", color: colors.hollowed, sub: "Scarcely a memory remains" };
    if (score <= 7) return { title: "Ashen One", color: colors.undead, sub: "Unkindled, but persistent" };
    return { title: "Lord of Cinder", color: colors.accent, sub: "The fire is sustained" };
  };

  const rank = getRankMessage();

  return (
    <View className="flex-1 bg-background px-8 pt-20 justify-between pb-12">
      <View className="items-center">
        <Text className="text-textSecondary font-cinzel text-xs uppercase tracking-[4px] mb-2">Rest at the flame</Text>
        <Text style={{ color: rank.color }} className="font-cinzel text-3xl uppercase tracking-widest text-center">
          {rank.title}
        </Text>
        <Text className="text-textSecondary font-cinzel text-[10px] uppercase text-center mt-2 opacity-60">
          {rank.sub}
        </Text>
      </View>

      <Bonfire />

      <View className="bg-surface p-8 border border-border rounded-sm">
        <View className="flex-row justify-between mb-4">
          <Text className="text-textSecondary font-cinzel text-xs uppercase">Score</Text>
          <Text className="text-textPrimary font-cinzel text-lg">{score} / {total}</Text>
        </View>
        <View className="flex-row justify-between mb-4">
          <Text className="text-textSecondary font-cinzel text-xs uppercase">Souls Gained</Text>
          <Text className="text-accent font-cinzel text-lg">{souls.toLocaleString()}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-textSecondary font-cinzel text-xs uppercase">Accuracy Ratio</Text>
          <Text className="text-textPrimary font-cinzel text-lg">{accuracy}%</Text>
        </View>
      </View>

      <View className="gap-2">
        <Button title="Journey Anew" onPress={() => router.push('/(quiz)/select')} />
        <Button title="Return Home" variant="secondary" onPress={() => router.replace('/')} />
      </View>
    </View>
  );
}
