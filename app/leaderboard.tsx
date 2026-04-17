import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/ui/Button';
import { Trophy, Shield } from 'lucide-react-native';
import { colors } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mockLeaderboard = [
  { name: 'Let Me Solo Her', game: 'Elden Ring', score: 999999 },
  { name: 'Solaire of Astora', game: 'Dark Souls I', score: 850000 },
  { name: 'Lady Maria', game: 'Bloodborne', score: 720000 },
  { name: 'Siegmeyer', game: 'Dark Souls I', score: 610000 },
  { name: 'The Hunter', game: 'Bloodborne', score: 550000 },
  { name: 'Wolf', game: 'Sekiro', score: 480000 },
  { name: 'Lucatiel', game: 'Dark Souls II', score: 420000 },
  { name: 'Patches', game: 'All Games', score: 380000 },
  { name: 'Oscar', game: 'Dark Souls I', score: 310000 },
  { name: 'Ashen One', game: 'Dark Souls III', score: 250000 },
];

export default function LeaderboardScreen() {
  const router = useRouter();
  const [personalHigh, setPersonalHigh] = useState<number | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('highScore').then(val => {
      if (val) setPersonalHigh(parseInt(val));
    });
  }, []);

  return (
    <View className="flex-1 bg-background pt-20 px-6">
      <View className="items-center mb-10">
        <Trophy size={48} color={colors.accent} strokeWidth={1} />
        <Text className="text-textPrimary font-cinzel text-3xl uppercase tracking-[8px] mt-4">Hall of Lords</Text>
        <Text className="text-textSecondary font-cinzel text-[10px] uppercase tracking-[2px] mt-2">The highest souls collected</Text>
      </View>

      {personalHigh !== null && (
        <View className="bg-accent/10 border border-accent/30 p-4 mb-6 rounded-sm flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Shield size={20} color={colors.accent} />
            <View className="ml-3">
              <Text className="text-accent font-cinzel text-[10px] uppercase">Your Personal Record</Text>
              <Text className="text-textPrimary font-cinzel text-sm uppercase">U-Quizz Master</Text>
            </View>
          </View>
          <Text className="text-accent font-cinzel text-lg">{personalHigh.toLocaleString()}</Text>
        </View>
      )}

      <ScrollView className="flex-1 mb-6" showsVerticalScrollIndicator={false}>
        {mockLeaderboard.map((player, index) => {
          const isTop3 = index < 3;
          const rankColor = isTop3 ? colors.accent : colors.textSecondary;
          
          return (
            <View 
              key={index} 
              className={`flex-row items-center py-4 border-b border-border/30 ${isTop3 ? 'bg-surface/30' : ''}`}
            >
              <Text style={{ color: rankColor }} className="font-cinzel text-lg w-10 text-center">
                {index + 1}
              </Text>
              <View className="flex-1 px-4">
                <Text className="text-textPrimary font-cinzel text-sm uppercase">{player.name}</Text>
                <Text className="text-textSecondary font-cinzel text-[8px] uppercase tracking-tighter">{player.game}</Text>
              </View>
              <Text className="text-accent font-cinzel text-sm">
                {player.score.toLocaleString()}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <View className="pb-12">
        <Button title="Back Home" variant="secondary" onPress={() => router.back()} />
      </View>
    </View>
  );
}
