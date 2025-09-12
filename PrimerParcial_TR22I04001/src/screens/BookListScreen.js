import { Ionicons } from '@expo/vector-icons';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getCollectionById } from '../utils/data';

export default function BooksListScreen({ route, navigation }) {
  const { collectionId } = route.params;
  const collection = getCollectionById(collectionId);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={collection.books}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('BookDetail', { collectionId, book: item })}
          >
            <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  item: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  thumb: { width: 50, height: 50, borderRadius: 6, marginRight: 10 },
  title: { fontWeight: '600' },
  author: { color: '#666' },
});
