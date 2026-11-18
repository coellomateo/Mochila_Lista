// src/app/(tabs)/campus.tsx
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useCampus } from '../../hooks/useCampus';

export default function CampusScreen() {
  const { reservations, addReservation, deleteReservation } = useCampus();

  const [type, setType] = useState<'Cancha' | 'Bar'>('Cancha');
  const [title, setTitle] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  const handleReserve = () => {
    if (!title.trim() || !timeSlot.trim()) return;
    addReservation(type, title, timeSlot, 'Hoy');
    setTitle('');
    setTimeSlot('');
  };

  return (
    <ThemedView className="p-4 pt-12">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <ThemedText variant="title">🏫 Campus y Servicios</ThemedText>
          <Text className="text-slate-400 text-sm">Reserva de canchas y pedidos rápidos al bar</Text>
        </View>

        {/* Formulario de Reserva */}
        <View className="bg-[#0f172a] p-4 rounded-2xl border border-[#334155] mb-6 shadow-lg">
          <Text className="text-white font-bold text-base mb-3">Nueva Reserva o Pedido</Text>
          
          <View className="flex-row mb-3 space-x-2">
            <TouchableOpacity 
              onPress={() => setType('Cancha')}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 12,
                alignItems: 'center',
                backgroundColor: type === 'Cancha' ? '#0ea5e9' : '#0b0f19',
                borderWidth: 1,
                borderColor: type === 'Cancha' ? '#38bdf8' : '#334155',
                marginRight: 6
              }}
            >
              <Text className="text-white font-bold">Cancha 🏀</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setType('Bar')}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 12,
                alignItems: 'center',
                backgroundColor: type === 'Bar' ? '#f59e0b' : '#0b0f19',
                borderWidth: 1,
                borderColor: type === 'Bar' ? '#fbbf24' : '#334155',
                marginLeft: 6
              }}
            >
              <Text className="text-white font-bold">Bar 🍔</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder={type === 'Cancha' ? "Nombre de la cancha / torneo" : "Pedido (ej. Empanada + Cola)"}
            placeholderTextColor="#64748b"
            value={title}
            onChangeText={setTitle}
            className="bg-[#0b0f19] border border-[#334155] text-white p-3 rounded-xl mb-3"
          />
          <TextInput
            placeholder="Horario (ej. Recréo 10:00 - 10:30)"
            placeholderTextColor="#64748b"
            value={timeSlot}
            onChangeText={setTimeSlot}
            className="bg-[#0b0f19] border border-[#334155] text-white p-3 rounded-xl mb-4"
          />

          <TouchableOpacity 
            onPress={handleReserve}
            style={{ backgroundColor: '#0ea5e9', paddingVertical: 12, borderRadius: 12, alignItems: 'center' }}
          >
            <Text className="text-white font-bold text-base">Confirmar Reserva</Text>
          </TouchableOpacity>
        </View>

        {/* Listado de Reservas */}
        <ThemedText variant="subtitle" className="mb-3">Tus Reservas Activas</ThemedText>

        {reservations.length === 0 ? (
          <Text className="text-slate-500 text-center py-6">No hay reservas registradas.</Text>
        ) : (
          reservations.map((res) => (
            <View key={res.id} className="p-4 rounded-2xl border border-[#334155] mb-3 bg-[#0f172a]">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-sky-400 font-bold text-xs uppercase">{res.type}</Text>
                <Text className="text-slate-400 text-xs">📅 {res.date}</Text>
              </View>

              <Text className="text-base font-bold text-white mb-1">{res.title}</Text>
              <Text className="text-xs text-amber-300 mb-2">⏰ {res.timeSlot}</Text>
              
              <View className="flex-row justify-end pt-2 border-t border-slate-800">
                <TouchableOpacity onPress={() => deleteReservation(res.id)} style={{ padding: 4 }}>
                  <Ionicons name="trash-outline" size={20} color="#f87171" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </ThemedView>
  );
}