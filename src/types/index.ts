// src/types/index.ts (o tu archivo de tipos correspondiente)
export interface Task {
  id: string;
  title: string;
  category?: string; // <--- Añade esta línea si faltaba
  dueDate: string;
  completed: boolean;
}

export interface CampusReservation {
  id: string;
  type: 'Cancha' | 'Bar';
  title: string;
  timeSlot: string;
  date: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  category: 'Tutoría' | 'Producto' | 'Servicio';
  price: string;
  author: string;
  contact: string;
}