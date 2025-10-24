import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import ModalFilter from "../components/ModalFilter";
import ModalIA from "../components/ModalIA";
import ModalNewEvent from "../components/ModalNewEvent";
import { crearEvento, eliminarEvento, escucharEventos, finalizarEvento } from "../services/firestore";
import { getNameSlug } from "../utils/storage";

export default function EventsListScreen({ navigation }) {
  const unsubRef = useRef(null);
  const [nameSlug, setNameSlug] = useState("");
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showIA, setShowIA] = useState(false);

  useEffect(() => {
    (async () => {
      const slug = await getNameSlug();
      setNameSlug(slug || "");
      const stop = escucharEventos(slug || "", filter || {})((arr) => setItems(arr));
      unsubRef.current = stop;
    })();
    return () => unsubRef.current && unsubRef.current();
  }, [filter]);

  const add = async (data) => {
    await crearEvento(nameSlug, data);
    setShowNew(false);
  };

  const goDetail = (item) => navigation.navigate("EventDetail", { item, nameSlug });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text>{item.descripcion}</Text>
        <Text style={{ opacity: 0.7 }}>
          {item.prioridad} · {item.fecha} {item.hora}
        </Text>
      </View>
      <View style={{ gap: 8 }}>
        <Pressable style={styles.iconBtn} onPress={() => goDetail(item)}>
          <Ionicons name="eye" size={20} />
        </Pressable>
        <Pressable
          style={styles.iconBtn}
          onPress={() => finalizarEvento(nameSlug, item.id, item)}
        >
          <Ionicons name="checkmark-done" size={20} />
        </Pressable>
        <Pressable style={styles.iconBtn} onPress={() => eliminarEvento(nameSlug, item.id)}>
          <Ionicons name="trash" size={20} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBtns}>
        <Pressable style={styles.btn} onPress={() => setShowNew(true)}>
          <Ionicons name="add-circle" size={20} />
          <Text>Nuevo</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => setShowFilter(true)}>
          <Ionicons name="funnel" size={20} />
          <Text>Filtro</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => setShowIA(true)}>
          <Ionicons name="sparkles" size={20} />
          <Text>IA</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        contentContainerStyle={{ padding: 12, gap: 8 }}
        renderItem={renderItem}
      />
      <ModalNewEvent visible={showNew} onClose={() => setShowNew(false)} onSave={add} />
      <ModalFilter
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={(f) => {
          setFilter(f);
          setShowFilter(false);
        }}
      />
      <ModalIA visible={showIA} onClose={() => setShowIA(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  topBtns: { flexDirection: "row", justifyContent: "space-around", padding: 12 },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E6F4FE",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    elevation: 1,
    shadowOpacity: 0.05,
  },
  titulo: { fontSize: 16, fontWeight: "700" },
  iconBtn: { backgroundColor: "#F5F5F5", padding: 8, borderRadius: 10, alignItems: "center" },
});
