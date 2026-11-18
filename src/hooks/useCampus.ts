// src/hooks/useCampus.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CampusReservation } from '../types';

const STORAGE_KEY = '@mochila_list_campus';

export function useCampus() {
  const [reservations, setReservations] = useState<CampusReservation[]>([]);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setReservations(JSON.parse(stored));
      } else {
        const initial: CampusReservation[] = [
          { id: '1', type: 'Cancha', title: 'Cancha de Básquet U18', timeSlot: 'Recreo (10:00 - 10:30)', date: 'Hoy' },
          { id: '2', type: 'Bar', title: 'Salchipapa + Jugo', timeSlot: 'Pre-orden Almuerzo (12:30)', date: 'Hoy' },
        ];
        setReservations(initial);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      }
    } catch (error) {
      console.error('Error cargando reservas:', error);
    }
  };

  const addReservation = async (type: 'Cancha' | 'Bar', title: string, timeSlot: string, date: string) => {
    if (!title.trim() || !timeSlot.trim()) return;

    const newRes: CampusReservation = {
      id: Date.now().toString(),
      type,
      title,
      timeSlot,
      date,
    };

    const updated = [newRes, ...reservations];
    setReservations(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteReservation = async (id: string) => {
    const updated = reservations.filter(r => r.id !== id);
    setReservations(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return {
    reservations,
    addReservation,
    deleteReservation,
  };
}