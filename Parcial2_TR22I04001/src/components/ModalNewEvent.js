import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
const toYMD = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const toHM = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

export default function ModalNewEvent({ visible, onClose, onSave }) {
  const now = new Date();

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    prioridad: "",
    fecha: toYMD(now),   
    hora: toHM(now),    
    e_futuro: false,
  });

  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const setField = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const onChangeDate = (_e, selected) => {
    if (Platform.OS === "android") setShowDate(false);
    if (selected) {
      const ymd = toYMD(selected);
      setField("fecha", ymd);
      const today = new Date();
      const onlyDate = new Date(ymd + "T00:00:00");
      setField("e_futuro", onlyDate > new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    }
  };

  const onChangeTime = (_e, selected) => {
    if (Platform.OS === "android") setShowTime(false);
    if (selected) {
      setField("hora", toHM(selected));
    }
  };

  const handleSave = () => {
    if (!form.titulo || !form.fecha || !form.hora) return;
    onSave(form);
    const resetNow = new Date();
    setForm({
      titulo: "",
      descripcion: "",
      prioridad: "",
      fecha: toYMD(resetNow),
      hora: toHM(resetNow),
      e_futuro: false,
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.h1}>Nuevo Evento</Text>

          <TextInput
            placeholder="Título"
            style={styles.input}
            value={form.titulo}
            onChangeText={(t) => setField("titulo", t)}
          />

          <TextInput
            placeholder="Descripción"
            style={styles.input}
            value={form.descripcion}
            onChangeText={(t) => setField("descripcion", t)}
          />

          <TextInput
            placeholder="Prioridad (Alta/Media/Baja)"
            style={styles.input}
            value={form.prioridad}
            onChangeText={(t) => setField("prioridad", t)}
          />

          <View style={styles.rowField}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Fecha (YYYY-MM-DD)</Text>
              <Text style={styles.valueBox}>{form.fecha}</Text>
            </View>
            <Pressable style={styles.iconBtn} onPress={() => setShowDate(true)}>
              <Ionicons name="calendar" size={22} />
            </Pressable>
          </View>

          <View style={styles.rowField}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Hora (HH:mm)</Text>
              <Text style={styles.valueBox}>{form.hora}</Text>
            </View>
            <Pressable style={styles.iconBtn} onPress={() => setShowTime(true)}>
              <Ionicons name="time" size={22} />
            </Pressable>
          </View>

          {showDate && (
            <DateTimePicker
              value={
                new Date(form.fecha + "T00:00:00")
              }
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeDate}
            />
          )}

          {showTime && (
            <DateTimePicker
              value={new Date(`1970-01-01T${form.hora}:00`)}
              mode="time"
              is24Hour
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeTime}
            />
          )}

          <View style={styles.rowActions}>
            <Pressable style={styles.btn} onPress={onClose}>
              <Ionicons name="close-circle" size={22} />
              <Text>Cancelar</Text>
            </Pressable>
            <Pressable style={styles.btnPrimary} onPress={handleSave}>
              <Ionicons name="save" size={22} />
              <Text style={{ fontWeight: "700" }}>Guardar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 16 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, gap: 10 },
  h1: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10 },
  label: { fontSize: 12, opacity: 0.7, marginBottom: 4 },
  valueBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontWeight: "600",
  },
  rowField: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconBtn: { padding: 10, backgroundColor: "#F5F5F5", borderRadius: 10 },
  rowActions: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
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
