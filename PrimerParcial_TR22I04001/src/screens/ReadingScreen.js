import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

export default function ReadingScreen({ route }) {
  const { book } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.text}>{book.content.repeat(3)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold' },
  author: { color: '#666', marginBottom: 10 },
  text: { lineHeight: 22, fontSize: 16 },
});
