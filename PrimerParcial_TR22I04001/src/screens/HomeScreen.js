import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { collections } from '../utils/data';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Mini Biblioteca Digital 📚</Text>
      <FlatList
        data={collections}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CollectionTabs', { collectionId: item.id, title: item.title })}
          >
            <Image source={{ uri: item.cover }} style={styles.img} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  h1: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  card: { flex: 1, backgroundColor: '#f5f5f5', borderRadius: 10, overflow: 'hidden' },
  img: { height: 120 },
  title: { padding: 8, fontWeight: '600' },
});
