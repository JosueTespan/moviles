import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { eliminarDeResumen, escucharResumen } from "../services/firestore";
import { getNameSlug } from "../utils/storage";

export default function ResumenScreen() {
  const unsubRef = useRef(null);
  const [items, setItems] = useState([]);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    (async () => {
      const s = (await getNameSlug()) || "";
      setSlug(s);
      const stop = escucharResumen(s)((arr) => setItems(arr));
      unsubRef.current = stop;
    })();
    return () => unsubRef.current && unsubRef.current();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text>{item.descripcion}</Text>
      </View>
      <Pressable style={styles.iconBtn} onPress={() => eliminarDeResumen(slug, item.id)}>
        <Ionicons name="trash" size={20} />
      </Pressable>
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={{ padding: 12, gap: 8 }}
      data={items}
      keyExtractor={(it) => it.id}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#fff", padding: 12, borderRadius: 12 },
  titulo: { fontSize: 16, fontWeight: "700" },
  iconBtn: { backgroundColor: "#F5F5F5", padding: 8, borderRadius: 10, alignItems: "center" },
});
