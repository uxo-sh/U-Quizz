import React from 'react';
import { View } from 'react-native';
import { colors } from '../../constants/theme';

interface ProgressBarProps {
  progress: number; // 0 to 1
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <View className="w-full h-1 bg-surface overflow-hidden">
      <View 
        className="h-full bg-accent" 
        style={{ width: `${progress * 100}%` }}
      />
    </View>
  );
};
