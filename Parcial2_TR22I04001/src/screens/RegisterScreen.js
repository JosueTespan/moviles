import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { guardarUsuario } from "../services/firestore";
import { saveUserIds } from "../utils/storage";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      if (!name || !email || !password)
        return Alert.alert("Campos requeridos", "Completa nombre, email y contraseña");
      const { docId, nameSlug } = await guardarUsuario({ name, email, password });
      await saveUserIds(docId, nameSlug, email);
      navigation.replace("Main");
    } catch (e) {
      Alert.alert("Error", "No se pudo registrar. Revisa firebase/config.js");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        placeholder="Nombre completo"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Correo"
        style={styles.input}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.btn} onPress={submit}>
        <Ionicons name="log-in" size={20} />
        <Text style={{ fontWeight: "700" }}>Registrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 12, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 12 },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#E6F4FE",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
});
