import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.txt}>Pantalla de Configuración ⚙️</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  txt: { fontSize: 18, fontWeight: 'bold' },
});
