import { Image, SafeAreaView, StyleSheet, Text } from 'react-native';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaGqU4pExqxEv78fuPmKtwJ2wJ-gRh7-FS1w&s' }}
        style={styles.img}
      />
      <Text style={styles.title}>Josue Tespan</Text>
      <Text>Email: TR22I04001@usonsonate.edu.sv</Text>
      <Text>Ingenieria en sistemas</Text>
      <Text>Versión: 1.0.0</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  img: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold' },
});
