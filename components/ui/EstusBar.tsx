import React from 'react';
import { View } from 'react-native';
import { Wine } from 'lucide-react-native';
import { colors } from '../../constants/theme';

interface EstusBarProps {
  lives: number;
}

export const EstusBar: React.FC<EstusBarProps> = ({ lives }) => {
  return (
    <View className="flex-row items-center gap-2">
      {[1, 2, 3].map((i) => (
        <Wine 
          key={i} 
          size={24} 
          color={i <= lives ? colors.undead : colors.surface} 
          fill={i <= lives ? colors.undead : 'transparent'}
          opacity={i <= lives ? 1 : 0.3}
        />
      ))}
    </View>
  );
};
