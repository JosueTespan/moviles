import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLibrary } from '../contexts/LibraryContext';

export default function BookDetailScreen({ route, navigation }) {
  const { book, collectionId } = route.params;
  const { favorites, pendings, addFavorite, addPending } = useLibrary();

  const isFav = !!favorites[book.id];
  const isPending = !!pendings[book.id];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Image source={{ uri: book.cover }} style={styles.img} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.desc}>{book.description}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.btn, isFav && { backgroundColor: '#1e90ff' }]}
          onPress={() => addFavorite(book)}
        >
          <Ionicons name="heart" size={18} color="#fff" />
          <Text style={styles.btnTxt}>{isFav ? 'En favoritos' : 'Favoritos'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, isPending && { backgroundColor: '#f39c12' }]}
          onPress={() => addPending(book)}
        >
          <Ionicons name="time" size={18} color="#fff" />
          <Text style={styles.btnTxt}>{isPending ? 'Pendiente' : 'Guardar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#27ae60' }]}
          onPress={() => navigation.navigate('Reading', { collectionId, book })}
        >
          <Ionicons name="book" size={18} color="#fff" />
          <Text style={styles.btnTxt}>Leer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  img: { width: '100%', height: 220, borderRadius: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  author: { color: '#666', marginBottom: 10 },
  desc: { lineHeight: 20, marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  btn: {
    flex: 1,
    margin: 4,
    backgroundColor: '#6c5ce7',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnTxt: { color: '#fff', fontWeight: '600' },
});
