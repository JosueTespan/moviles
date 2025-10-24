import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { actualizarEvento } from "../services/firestore";
const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
const toYMD = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const toHM = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

export default function EventDetailScreen({ route, navigation }) {
  const { item, nameSlug } = route.params || {};
  const [titulo, setTitulo] = useState(item?.titulo || "");
  const [descripcion, setDescripcion] = useState(item?.descripcion || "");
  const [prioridad, setPrioridad] = useState(item?.prioridad || "Alta");
  const [fecha, setFecha] = useState(item?.fecha || toYMD(new Date()));
  const [hora, setHora] = useState(item?.hora || toHM(new Date()));
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  useEffect(() => {
    if (item) {
      setTitulo(item.titulo || "");
      setDescripcion(item.descripcion || "");
      setPrioridad(item.prioridad || "Alta");
      setFecha(item.fecha || toYMD(new Date()));
      setHora(item.hora || toHM(new Date()));
    }
  }, [item]);

  const onChangeDate = (_e, selected) => {
    if (Platform.OS === "android") setShowDate(false);
    if (selected) setFecha(toYMD(selected));
  };
  const onChangeTime = (_e, selected) => {
    if (Platform.OS === "android") setShowTime(false);
    if (selected) setHora(toHM(selected));
  };

  const cyclePrioridad = () => {
    const next = prioridad === "Alta" ? "Media" : prioridad === "Media" ? "Baja" : "Alta";
    setPrioridad(next);
  };

  const guardarCambios = async () => {
    if (!titulo || !fecha || !hora) return;
    const today = new Date();
    const onlyDate = new Date(fecha + "T00:00:00");
    const e_futuro = onlyDate > new Date(today.getFullYear(), today.getMonth(), today.getDate());

    await actualizarEvento(nameSlug, item.id, {
      titulo,
      descripcion,
      prioridad,
      fecha,
      hora,
      e_futuro,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Editar evento</Text>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Título del evento"
      />
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, { minHeight: 80 }]}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Descripción..."
        multiline
      />
      <Text style={styles.label}>Prioridad (Alta/Media/Baja)</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={prioridad}
          onChangeText={setPrioridad}
          placeholder="Alta | Media | Baja"
        />
        <Pressable style={styles.miniBtn} onPress={cyclePrioridad}>
          <Ionicons name="swap-vertical" size={20} />
          <Text style={{ fontWeight: "600" }}>Ciclar</Text>
        </Pressable>
      </View>
      <Text style={styles.label}>Fecha (YYYY-MM-DD)</Text>
      <View style={styles.row}>
        <Text style={styles.valueBox}>{fecha}</Text>
        <Pressable style={styles.iconBtn} onPress={() => setShowDate(true)}>
          <Ionicons name="calendar" size={22} />
        </Pressable>
      </View>
      {showDate && (
        <DateTimePicker
          value={new Date(fecha + "T00:00:00")}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangeDate}
        />
      )}
      <Text style={styles.label}>Hora (HH:mm)</Text>
      <View style={styles.row}>
        <Text style={styles.valueBox}>{hora}</Text>
        <Pressable style={styles.iconBtn} onPress={() => setShowTime(true)}>
          <Ionicons name="time" size={22} />
        </Pressable>
      </View>
      {showTime && (
        <DateTimePicker
          value={new Date(`1970-01-01T${hora}:00`)}
          mode="time"
          is24Hour
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangeTime}
        />
      )}
      <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
        <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} />
          <Text>Cancelar</Text>
        </Pressable>
        <Pressable style={styles.btnPrimary} onPress={guardarCambios}>
          <Ionicons name="save" size={20} />
          <Text style={{ fontWeight: "700" }}>Guardar cambios</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  h1: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  label: { fontSize: 12, opacity: 0.7, marginBottom: 4, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  miniBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E6F4FE",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  valueBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontWeight: "600",
    backgroundColor: "#fff",
  },
  iconBtn: { padding: 10, backgroundColor: "#F5F5F5", borderRadius: 10 },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F1F1F1",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E6F4FE",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
});
