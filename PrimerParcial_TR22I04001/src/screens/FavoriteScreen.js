import { Ionicons } from '@expo/vector-icons';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLibrary } from '../contexts/LibraryContext';

export default function FavoritesScreen() {
  const { favorites, removeFavorite } = useLibrary();
  const favList = Object.values(favorites);

  return (
    <SafeAreaView style={styles.container}>
      {favList.length === 0 ? (
        <Text style={styles.empty}>No hay favoritos</Text>
      ) : (
        <FlatList
          data={favList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.thumbnail }} style={styles.img} />
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>{item.author}</Text>
              </View>
              <TouchableOpacity style={styles.btn} onPress={() => removeFavorite(item.id)}>
                <Ionicons name="trash" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  empty: { textAlign: 'center', marginTop: 20, color: '#666' },
  item: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  img: { width: 50, height: 50, borderRadius: 6, marginRight: 10 },
  title: { fontWeight: '600' },
  author: { color: '#666' },
  btn: { backgroundColor: '#e74c3c', padding: 8, borderRadius: 6 },
});
