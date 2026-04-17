import React from 'react';
import { Text, TouchableOpacity, View, TouchableOpacityProps } from 'react-native';
import { colors } from '../../constants/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ title, variant = 'primary', className, style, ...props }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-accent border-accentSoft';
      case 'secondary':
        return 'bg-surface border-border';
      case 'danger':
        return 'bg-danger border-[#5A1010]';
      case 'ghost':
        return 'bg-transparent border-transparent';
      default:
        return 'bg-surface border-border';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return 'text-background';
      case 'ghost':
        return 'text-accent';
      default:
        return 'text-textPrimary';
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`px-6 py-4 rounded-sm border-2 mb-4 items-center justify-center ${getVariantStyles()} ${className}`}
      {...props}
    >
      <Text className={`font-cinzel text-lg tracking-widest uppercase ${getTextColor()}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
