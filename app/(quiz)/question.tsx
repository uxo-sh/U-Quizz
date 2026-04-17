import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { EstusBar } from '../../components/ui/EstusBar';
import { TimerRing } from '../../components/ui/TimerRing';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { YouDiedOverlay } from '../../components/ui/YouDiedOverlay';
import { colors } from '../../constants/theme';
import { Badge } from '../../components/ui/Badge';
import { useQuizState } from '../../hooks/useQuizState';
import { useTimer } from '../../hooks/useTimer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QuestionScreen() {
  const router = useRouter();
  const { gameId, difficulty } = useLocalSearchParams();
  const { session, startQuiz, answerQuestion, loseLife } = useQuizState();
  
  const [showYouDied, setShowYouDied] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [flashColor, setFlashColor] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  // Initialize quiz on mount
  useEffect(() => {
    if (gameId && difficulty) {
      startQuiz(gameId as string, difficulty as string);
    }
  }, [gameId, difficulty, startQuiz]);

  const onTimeUp = useCallback(() => {
    if (isAnswering || showYouDied) return;
    
    setIsAnswering(true);
    triggerYouDied();
  }, [isAnswering, showYouDied]);

  const { progress: timerProgress, resetTimer } = useTimer(onTimeUp, !!session && !showYouDied && !isAnswering);

  const triggerYouDied = () => {
    setShowYouDied(true);
    loseLife();
    
    setTimeout(() => {
      setShowYouDied(false);
      setIsAnswering(false);
      setSelectedOption(null);
      setFlashColor(null);
      
      // Check if session still exists and if game was over
      // Note: we check logic after state updates usually
    }, 4000);
  };

  // Listen for session changes to navigate
  useEffect(() => {
    if (session?.isGameOver && !showYouDied) {
      router.push({
        pathname: '/(quiz)/result',
        params: { 
          score: session.score, 
          questionsCount: session.questions.length,
          status: 'death'
        }
      });
    } else if (session?.isFinished) {
      // Save high score
      AsyncStorage.getItem('highScore').then(val => {
        const currentHigh = val ? parseInt(val) : 0;
        if (session.score > currentHigh) {
          AsyncStorage.setItem('highScore', session.score.toString());
        }
      });

      // Handle daily challenge logic
      const { isDaily } = useLocalSearchParams() as { isDaily?: string };
      if (isDaily === 'true') {
        const today = new Date().toDateString();
        AsyncStorage.setItem('lastCompletionDate', today);
        
        AsyncStorage.getItem('dailyStreak').then(val => {
          const streak = val ? parseInt(val) : 0;
          AsyncStorage.setItem('dailyStreak', (streak + 1).toString());
        });
      }
      
      router.push({
        pathname: '/(quiz)/result',
        params: { 
          score: session.score, 
          questionsCount: session.questions.length,
          status: 'victory'
        }
      });
    }
  }, [session?.isGameOver, session?.isFinished, showYouDied, session?.score, session?.questions.length, router]);

  const handleAnswer = (index: number) => {
    if (selectedOption !== null || isAnswering || showYouDied) return;
    
    setIsAnswering(true);
    setSelectedOption(index);
    
    const isCorrect = answerQuestion(index);
    setFlashColor(isCorrect ? colors.success : colors.danger);

    setTimeout(() => {
      if (!isCorrect) {
        triggerYouDied();
      } else {
        setIsAnswering(false);
        setSelectedOption(null);
        setFlashColor(null);
        resetTimer();
      }
    }, 1000);
  };

  if (!session) return <View className="flex-1 bg-background" />;

  const question = session.questions[session.currentQuestionIndex];

  return (
    <View className="flex-1 bg-background pt-12">
      <YouDiedOverlay visible={showYouDied} />
      
      {/* Top Bar */}
      <View className="flex-row justify-between items-center px-6 mb-4">
        <EstusBar lives={session.lives} />
        <View className="items-center">
          <Text className="text-textSecondary font-cinzel text-[10px] uppercase">Trial</Text>
          <Text className="text-textPrimary font-cinzel text-lg">
            {session.currentQuestionIndex + 1} / {session.questions.length}
          </Text>
        </View>
        <TimerRing progress={timerProgress} key={session.currentQuestionIndex} />
      </View>

      <ProgressBar progress={(session.currentQuestionIndex + 1) / session.questions.length} />

      <ScrollView contentContainerStyle={{ padding: 24, flexGrow: 1, justifyContent: 'center' }}>
        <View className="items-center mb-8">
          <Badge label={question.difficulty} type={question.difficulty as any} />
        </View>

        <Text className="text-textPrimary font-cinzel text-xl text-center leading-relaxed mb-12">
          {question.question}
        </Text>

        <View className="gap-4">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const letter = String.fromCharCode(65 + index);
            
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => handleAnswer(index)}
                disabled={isAnswering}
                className={`p-5 border-2 rounded-sm flex-row items-center bg-surface ${
                  isSelected ? (flashColor === colors.success ? 'border-success' : 'border-danger') : 'border-border'
                }`}
                style={isSelected ? { backgroundColor: flashColor + '22' } : {}}
              >
                <Text className="text-accent font-cinzel mr-4 w-6">{letter}.</Text>
                <Text className="text-textPrimary font-cinzel text-sm flex-1">{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
