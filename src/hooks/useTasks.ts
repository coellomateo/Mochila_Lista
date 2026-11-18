// src/hooks/useTasks.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Task } from '../types';

const STORAGE_KEY = '@mochila_list_tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTasks(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error al cargar tareas', error);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    try {
      setTasks(newTasks);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error al guardar tareas', error);
    }
  };

  const addTask = (title: string, category: string, dueDate: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      category,
      dueDate,
      completed: false,
    };
    saveTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    saveTasks(updated);
  };

  return { tasks, addTask, toggleTask, deleteTask };
}