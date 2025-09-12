import { Ionicons } from '@expo/vector-icons';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLibrary } from '../contexts/LibraryContext';

export default function PendingsScreen() {
  const { pendings, togglePendingStatus } = useLibrary();
  const pList = Object.values(pendings);

  return (
    <SafeAreaView style={styles.container}>
      {pList.length === 0 ? (
        <Text style={styles.empty}>No hay libros pendientes</Text>
      ) : (
        <FlatList
          data={pList}
          keyExtractor={(item) => item.book.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.book.thumbnail }} style={styles.img} />
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.book.title}</Text>
                <Text style={styles.author}>{item.book.author}</Text>
                <Text
                  style={[
                    styles.badge,
                    item.status === 'Pendiente' ? styles.pending : styles.read,
                  ]}
                >
                  {item.status}
                </Text>
              </View>
              <TouchableOpacity style={styles.btn} onPress={() => togglePendingStatus(item.book.id)}>
                <Ionicons name="swap-horizontal" size={18} color="#fff" />
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
  badge: {
    marginTop: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    color: '#fff',
    fontWeight: '700',
  },
  pending: { backgroundColor: '#f39c12' },
  read: { backgroundColor: '#27ae60' },
  btn: { backgroundColor: '#6c5ce7', padding: 8, borderRadius: 6 },
});
