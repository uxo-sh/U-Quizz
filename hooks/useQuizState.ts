import { useState, useCallback, useEffect } from 'react';
import { Question, mockQuestions } from '../constants/mockData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type QuizSession = {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  lives: number;
  isGameOver: boolean;
  isFinished: boolean;
  gameTitle: string;
  difficulty: string;
};

const INITIAL_LIVES = 3;

export const useQuizState = (gameId?: string, difficultyId?: string) => {
  const [session, setSession] = useState<QuizSession | null>(null);

  const startQuiz = useCallback((gId: string, dId: string) => {
    // Filter questions based on game and difficulty
    // If 'all-games' is selected, we just take a random sample
    let filtered = mockQuestions.filter(q => q.game === gId && q.difficulty === dId);
    
    // If not enough questions for specific combo, fallback to just game or just difficulty
    if (filtered.length < 5) {
      filtered = mockQuestions.filter(q => q.game === gId).slice(0, 10);
    }
    
    // Shuffle and pick 10
    const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 10);

    setSession({
      questions: shuffled,
      currentQuestionIndex: 0,
      score: 0,
      lives: INITIAL_LIVES,
      isGameOver: false,
      isFinished: false,
      gameTitle: gId,
      difficulty: dId,
    });
  }, []);

  const answerQuestion = useCallback((index: number) => {
    if (!session || session.isGameOver || session.isFinished) return false;

    const currentQuestion = session.questions[session.currentQuestionIndex];
    const isCorrect = index === currentQuestion.correctIndex;

    setSession(prev => {
      if (!prev) return null;

      const newScore = isCorrect ? prev.score + 1000 : prev.score;
      const newLives = isCorrect ? prev.lives : prev.lives - 1;
      const isGameOver = newLives <= 0;
      const isLastQuestion = prev.currentQuestionIndex === prev.questions.length - 1;

      return {
        ...prev,
        score: newScore,
        lives: newLives,
        isGameOver,
        isFinished: !isGameOver && isLastQuestion,
        currentQuestionIndex: isLastQuestion || isGameOver ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1,
      };
    });

    return isCorrect;
  }, [session]);

  const loseLife = useCallback(() => {
    setSession(prev => {
      if (!prev || prev.isGameOver || prev.isFinished) return prev;
      const newLives = prev.lives - 1;
      const isGameOver = newLives <= 0;
      
      return {
        ...prev,
        lives: newLives,
        isGameOver,
        currentQuestionIndex: isGameOver ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1,
      };
    });
  }, []);

  return {
    session,
    startQuiz,
    answerQuestion,
    loseLife,
  };
};
