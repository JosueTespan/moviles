import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { groqSuggest } from "../hooks/useGroq";

export default function ModalIA({ visible, onClose }) {
  const [texto, setTexto] = useState("");
  const [resp, setResp] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    try {
      setLoading(true);
      const out = await groqSuggest(texto);
      setResp(out);
    } catch (e) {
      setResp("[Error IA] Revisa tu API_URL/API_KEY/Modelo en useGroq.js");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.h1}>IA – Recomendaciones Groq</Text>
          <TextInput
            placeholder="Describe tu evento o duda"
            style={styles.input}
            value={texto}
            onChangeText={setTexto}
          />
          <View style={styles.row}>
            <Pressable style={styles.btn} onPress={onClose}>
              <Ionicons name="close" size={20} />
              <Text>Cerrar</Text>
            </Pressable>
            <Pressable style={styles.btnPrimary} onPress={run} disabled={loading}>
              <Ionicons name="sparkles" size={20} />
              <Text style={{ fontWeight: "700" }}>{loading ? "Generando…" : "Generar"}</Text>
            </Pressable>
          </View>
          <ScrollView style={{ maxHeight: 160, marginTop: 8 }}>
            <Text>{resp}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 16 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, gap: 8 },
  h1: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  btn: { flexDirection: "row", alignItems: "center", gap: 6, padding: 10 },
  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 10,
    backgroundColor: "#E6F4FE",
    borderRadius: 8,
  },
});
