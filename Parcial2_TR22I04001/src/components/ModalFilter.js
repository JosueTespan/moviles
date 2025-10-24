import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";

const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
const toHM = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

export default function ModalFilter({ visible, onClose, onApply }) {
  const [prioridad, setPrioridad] = useState(""); 
  const [hora, setHora] = useState("");          
  const [showTime, setShowTime] = useState(false);

  const apply = () => {
    const filters = {};
    if (prioridad) filters.prioridad = prioridad;
    if (hora) filters.hora = hora; 
    onApply(filters);
  };

  const clear = () => {
    setPrioridad("");
    setHora("");
  };

  const onChangeTime = (_e, selected) => {
    if (Platform.OS === "android") setShowTime(false);
    if (selected) setHora(toHM(selected));
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.h1}>Filtro</Text>
          <Text style={styles.label}>Prioridad</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={prioridad}
              onValueChange={(v) => setPrioridad(v)}
              dropdownIconColor="#333"
            >
              <Picker.Item label="(Todas)" value="" />
              <Picker.Item label="Alta" value="Alta" />
              <Picker.Item label="Media" value="Media" />
              <Picker.Item label="Baja" value="Baja" />
            </Picker>
          </View>
          <Text style={styles.label}>Hora (HH:mm)</Text>
          <View style={styles.row}>
            <Text style={styles.valueBox}>{hora || "Seleccione"}</Text>
            <Pressable style={styles.iconBtn} onPress={() => setShowTime(true)}>
              <Ionicons name="time" size={22} />
            </Pressable>
            {hora ? (
              <Pressable style={styles.iconBtn} onPress={() => setHora("")}>
                <Ionicons name="close-circle" size={22} />
              </Pressable>
            ) : null}
          </View>
          {showTime && (
            <DateTimePicker
              value={hora ? new Date(`1970-01-01T${hora}:00`) : new Date()}
              mode="time"
              is24Hour
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeTime}
            />
          )}
          <View style={styles.rowBtns}>
            <Pressable style={styles.btn} onPress={onClose}>
              <Ionicons name="close" size={20} />
              <Text>Cancelar</Text>
            </Pressable>
            <Pressable style={styles.btn} onPress={clear}>
              <Ionicons name="trash-outline" size={20} />
              <Text>Limpiar</Text>
            </Pressable>
            <Pressable style={styles.btnPrimary} onPress={apply}>
              <Ionicons name="funnel" size={20} />
              <Text style={{ fontWeight: "700" }}>Aplicar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", padding: 16 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, gap: 10 },
  h1: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  label: { fontSize: 12, opacity: 0.7 },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 4,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  valueBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontWeight: "600",
  },
  iconBtn: { padding: 10, backgroundColor: "#F5F5F5", borderRadius: 10 },
  rowBtns: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
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
