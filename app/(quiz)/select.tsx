import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { games } from '../../constants/games';
import { colors } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;

export default function SelectScreen() {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState(games[0].id);
  const [difficulty, setDifficulty] = useState<'hollowed' | 'undead' | 'true-lord'>('undead');

  const onStart = () => {
    router.push({
      pathname: '/(quiz)/question',
      params: { gameId: selectedGame, difficulty }
    });
  };

  return (
    <View className="flex-1 bg-background pt-16 px-4">
      <Text className="text-textSecondary font-cinzel text-xs tracking-[4px] uppercase text-center mb-8">
        Choose your path
      </Text>

      <View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 16}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {games.map((game) => (
            <TouchableOpacity
              key={game.id}
              onPress={() => setSelectedGame(game.id)}
              activeOpacity={0.8}
              style={{ width: CARD_WIDTH }}
              className={`mr-4 p-6 rounded-lg border-2 bg-surface ${selectedGame === game.id ? 'border-accent shadow-lg shadow-accent/50' : 'border-border'}`}
            >
              <Text className="text-accent font-cinzel text-sm mb-2 uppercase tracking-widest">
                {game.name}
              </Text>
              <Text className="text-textSecondary font-cinzel text-[10px] uppercase italic">
                {game.tagline}
              </Text>
              
              <View 
                className="absolute bottom-0 left-0 right-0 h-1 bg-accent" 
                style={{ backgroundColor: game.color, opacity: selectedGame === game.id ? 1 : 0.3 }} 
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View className="mt-12 px-4">
        <Text className="text-textPrimary font-cinzel text-center mb-6 uppercase tracking-widest text-sm">
          Select Difficulty
        </Text>
        
        <View className="flex-row justify-between gap-2">
          {[
            { id: 'hollowed', label: 'Hollowed', color: 'border-hollowed' },
            { id: 'undead', label: 'Undead', color: 'border-undead' },
            { id: 'true-lord', label: 'True Lord', color: 'border-trueLord' }
          ].map((d) => (
            <TouchableOpacity
              key={d.id}
              onPress={() => setDifficulty(d.id as any)}
              className={`flex-1 p-4 border-2 items-center bg-surface ${difficulty === d.id ? d.color : 'border-border'}`}
            >
              <Text className={`font-cinzel text-[10px] uppercase ${difficulty === d.id ? 'text-textPrimary' : 'text-textSecondary'}`}>
                {d.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="flex-1 justify-end pb-12 px-4">
        <Button 
          title="Venture Forth" 
          onPress={onStart}
        />
      </View>
    </View>
  );
}
