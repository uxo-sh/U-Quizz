import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../constants/theme';

interface BadgeProps {
  label: string;
  type?: 'hollowed' | 'undead' | 'true-lord' | 'default';
}

export const Badge: React.FC<BadgeProps> = ({ label, type = 'default' }) => {
  const getColors = () => {
    switch (type) {
      case 'hollowed': return { bg: 'bg-[#4A7C7C22]', border: 'border-hollowed', text: 'text-hollowed' };
      case 'undead': return { bg: 'bg-[#7A4F1022]', border: 'border-undead', text: 'text-undead' };
      case 'true-lord': return { bg: 'bg-[#6B1A1A22]', border: 'border-trueLord', text: 'text-trueLord' };
      default: return { bg: 'bg-surface', border: 'border-border', text: 'text-textSecondary' };
    }
  };

  const c = getColors();

  return (
    <View className={`px-3 py-1 border rounded-full ${c.bg} ${c.border}`}>
      <Text className={`font-cinzel text-[10px] uppercase tracking-tighter ${c.text}`}>
        {label}
      </Text>
    </View>
  );
};
