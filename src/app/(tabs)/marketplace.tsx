// src/app/(tabs)/marketplace.tsx
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useMarketplace } from '../../hooks/useMarketplace';

export default function MarketplaceScreen() {
  const { items, addItem, deleteItem } = useMarketplace();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Tutoría' | 'Producto' | 'Servicio'>('Tutoría');
  const [price, setPrice] = useState('');
  const [author, setAuthor] = useState('');
  const [contact, setContact] = useState('');

  const handlePublish = () => {
    if (!title.trim() || !price.trim()) return;
    addItem(title, category, price, author, contact);
    setTitle('');
    setPrice('');
    setAuthor('');
    setContact('');
  };

  return (
    <ThemedView className="p-4 pt-12">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <ThemedText variant="title">🛒 Mercado Estudiantil</ThemedText>
          <Text className="text-slate-400 text-sm">Tutorías, productos y servicios entre compañeros</Text>
        </View>

        {/* Formulario de Publicación */}
        <View className="bg-[#0f172a] p-4 rounded-2xl border border-[#334155] mb-6 shadow-lg">
          <Text className="text-white font-bold text-base mb-3">Publicar Oferta o Tutoría</Text>
          
          <TextInput
            placeholder="Título (ej. Tutoría de Matemáticas)"
            placeholderTextColor="#64748b"
            value={title}
            onChangeText={setTitle}
            className="bg-[#0b0f19] border border-[#334155] text-white p-3 rounded-xl mb-3"
          />
          <TextInput
            placeholder="Precio / Intercambio (ej. $5 o Gratis)"
            placeholderTextColor="#64748b"
            value={price}
            onChangeText={setPrice}
            className="bg-[#0b0f19] border border-[#334155] text-white p-3 rounded-xl mb-3"
          />
          <TextInput
            placeholder="Tu Nombre"
            placeholderTextColor="#64748b"
            value={author}
            onChangeText={setAuthor}
            className="bg-[#0b0f19] border border-[#334155] text-white p-3 rounded-xl mb-3"
          />
          <TextInput
            placeholder="Contacto (WhatsApp / Usuario)"
            placeholderTextColor="#64748b"
            value={contact}
            onChangeText={setContact}
            className="bg-[#0b0f19] border border-[#334155] text-white p-3 rounded-xl mb-4"
          />

          <TouchableOpacity 
            onPress={handlePublish}
            style={{ backgroundColor: '#10b981', paddingVertical: 12, borderRadius: 12, alignItems: 'center' }}
          >
            <Text className="text-white font-bold text-base">Publicar en el Mercado</Text>
          </TouchableOpacity>
        </View>

        {/* Directorio */}
        <ThemedText variant="subtitle" className="mb-3">Ofertas Disponibles</ThemedText>

        {items.length === 0 ? (
          <Text className="text-slate-500 text-center py-6">No hay publicaciones activas.</Text>
        ) : (
          items.map((item) => (
            <View key={item.id} className="p-4 rounded-2xl border border-[#334155] mb-3 bg-[#0f172a]">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-emerald-400 font-bold text-xs uppercase">{item.category}</Text>
                <Text className="text-amber-400 font-bold text-sm">{item.price}</Text>
              </View>

              <Text className="text-base font-bold text-white mb-2">{item.title}</Text>
              
              <View className="flex-row justify-between items-center pt-2 border-t border-slate-800">
                <Text className="text-xs text-slate-400">👤 {item.author} | 📱 {item.contact}</Text>
                <TouchableOpacity onPress={() => deleteItem(item.id)} style={{ padding: 4 }}>
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