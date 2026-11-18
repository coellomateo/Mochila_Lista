// src/components/HeaderCard.tsx
import { Text, View } from 'react-native';

interface HeaderCardProps {
  title: string;
  subtitle?: string;
}

export function HeaderCard({ title, subtitle }: HeaderCardProps) {
  return (
    <View className="bg-[#0f172a] p-4 rounded-2xl border border-[#334155] mb-4 shadow-lg">
      <Text className="text-white font-bold text-lg mb-1">{title}</Text>
      {subtitle && <Text className="text-slate-400 text-sm">{subtitle}</Text>}
    </View>
  );
}