import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/ui/Button';
import { colors } from '../constants/theme';
import { Lock, Unlock, Flame, CheckCircle2 } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const currentDayIndex = new Date().getDay(); // 0 is Sunday

export default function DailyScreen() {
  const router = useRouter();
  const [streak, setStreak] = useState(0);
  const [isCompletedToday, setIsCompletedToday] = useState(false);
  
  // Adjust currentDayIndex because days array starts with Monday
  const adjustedCurrentDay = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

  useEffect(() => {
    const loadDailyData = async () => {
      try {
        const streakVal = await AsyncStorage.getItem('dailyStreak');
        const lastDate = await AsyncStorage.getItem('lastCompletionDate');
        
        if (streakVal) setStreak(parseInt(streakVal));
        
        if (lastDate) {
          const today = new Date().toDateString();
          if (lastDate === today) {
            setIsCompletedToday(true);
          } else {
            // Check if one day has passed to maintain streak
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (lastDate !== yesterday.toDateString()) {
              // Streak broken if not yesterday or today
              // setStreak(0); 
              // AsyncStorage.setItem('dailyStreak', '0');
            }
          }
        }
      } catch (e) {
        console.error("Failed to load daily data", e);
      }
    };
    loadDailyData();
  }, []);

  const startDailyTrial = () => {
    if (isCompletedToday) return;
    
    // For daily trials, we force a specific difficulty/game combo or just random
    router.push({
      pathname: '/(quiz)/question',
      params: { 
        gameId: 'all', 
        difficulty: 'undead',
        isDaily: 'true' 
      }
    });
  };

  return (
    <View className="flex-1 bg-background pt-20 px-6">
      <View className="items-center mb-10">
        <View className="flex-row items-center bg-surface px-4 py-2 border border-accentSoft rounded-sm">
          <Flame size={20} color={colors.accent} fill={colors.accent} />
          <Text className="text-accent font-cinzel text-sm ml-2 uppercase tracking-widest">{streak} Day Streak</Text>
        </View>
        <Text className="text-textPrimary font-cinzel text-3xl uppercase tracking-[6px] mt-6">Sunlight Trial</Text>
        <Text className="text-textSecondary font-cinzel text-[10px] uppercase tracking-[2px] mt-2">Praise the sun every day</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="gap-3">
          {days.map((day, index) => {
            const isToday = index === adjustedCurrentDay;
            const isPast = index < adjustedCurrentDay;
            const isFuture = index > adjustedCurrentDay;
            
            return (
              <TouchableOpacity
                key={day}
                disabled={isFuture || (isToday && isCompletedToday)}
                onPress={() => isToday && startDailyTrial()}
                activeOpacity={0.7}
                className={`p-5 border-2 rounded-sm flex-row items-center justify-between ${
                  isToday ? (isCompletedToday ? 'border-success/30 bg-surface' : 'border-accent bg-surface') : (isPast ? 'border-border/50 bg-surface/20' : 'border-border/20 bg-transparent')
                }`}
              >
                <View>
                  <Text className={`font-cinzel text-sm ${isToday ? (isCompletedToday ? 'text-success' : 'text-accent') : (isPast ? 'text-textSecondary' : 'text-textSecondary/30')}`}>
                    {day}
                  </Text>
                  <Text className="text-[8px] font-cinzel uppercase text-textSecondary/50">
                    {isToday ? (isCompletedToday ? "Blessing Received" : "Today's Ritual") : (isPast ? "Trial Concluded" : "Sealed")}
                  </Text>
                </View>
                
                {isToday && isCompletedToday ? (
                  <CheckCircle2 size={20} color={colors.success} />
                ) : isPast ? (
                  <Unlock size={20} color={colors.success} opacity={0.5} />
                ) : isToday ? (
                  <Unlock size={20} color={colors.accent} />
                ) : (
                  <Lock size={20} color={colors.border} opacity={0.3} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        
        {isToday && isCompletedToday && (
          <View className="mt-8 p-4 bg-surface/40 border border-success/20 rounded items-center">
            <Text className="text-success font-cinzel text-[10px] uppercase">Trial Concluded for today</Text>
            <Text className="text-textSecondary font-cinzel text-[8px] uppercase mt-1">Return tomorrow, Ashen One</Text>
          </View>
        )}
      </ScrollView>

      <View className="pb-12 mt-4">
        <Button title="Return to Fire" variant="secondary" onPress={() => router.back()} />
      </View>
    </View>
  );
}
