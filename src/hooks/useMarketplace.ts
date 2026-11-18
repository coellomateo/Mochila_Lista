// src/hooks/useMarketplace.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MarketplaceItem } from '../types';

const STORAGE_KEY = '@mochila_list_marketplace';

export function useMarketplace() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        const initialItems: MarketplaceItem[] = [
          { id: '1', title: 'Tutoría de Programación Móvil (React Native)', category: 'Tutoría', price: '$5 / hora', author: 'Mateo Coello', contact: '@coellomateo' },
          { id: '2', title: 'Calculadora Científica Casio fx-95ES', category: 'Producto', price: '$15', author: 'Juan Pérez', contact: '0991234567' },
        ];
        setItems(initialItems);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialItems));
      }
    } catch (error) {
      console.error('Error cargando mercado:', error);
    }
  };

  const addItem = async (title: string, category: 'Tutoría' | 'Producto' | 'Servicio', price: string, author: string, contact: string) => {
    if (!title.trim() || !price.trim() || !author.trim() || !contact.trim()) return;

    const newItem: MarketplaceItem = {
      id: Date.now().toString(),
      title,
      category,
      price,
      author,
      contact,
    };

    const updated = [newItem, ...items];
    setItems(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteItem = async (id: string) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return {
    items,
    addItem,
    deleteItem,
  };
}