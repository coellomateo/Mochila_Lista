// src/components/ThemedText.tsx
import React from 'react';
import { Text, TextProps } from 'react-native';

interface ThemedTextProps extends TextProps {
  variant?: 'title' | 'subtitle' | 'body';
  className?: string;
}

export function ThemedText({ style, variant = 'body', className = '', ...props }: ThemedTextProps) {
  const variantStyles = 
    variant === 'title' ? 'text-2xl font-bold text-white mb-1' :
    variant === 'subtitle' ? 'text-lg font-semibold text-slate-200 mb-1' : 'text-base text-slate-300';

  return (
    <Text 
      className={`${variantStyles} ${className}`} 
      style={style} 
      {...props} 
    />
  );
}