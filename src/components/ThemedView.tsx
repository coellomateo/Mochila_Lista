// src/components/ThemedView.tsx
import React from 'react';
import { View, ViewProps } from 'react-native';

export function ThemedView({ style, className = '', ...props }: ViewProps & { className?: string }) {
  return (
    <View 
      className={`flex-1 bg-[#0b0f19] ${className}`} 
      style={style} 
      {...props} 
    />
  );
}