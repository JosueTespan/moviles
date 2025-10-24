// src/screens/ProfileScreen.js
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { clearUser, getEmailUser, getNameSlug } from "../utils/storage";
export default function ProfileScreen() {
  const [data, setData] = useState({ slug: "", email: "" });
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const slug = (await getNameSlug()) || "";
      const email = (await getEmailUser()) || "";
      setData({ slug, email });
    })();
  }, []);
  const avatarUri = useMemo(() => {
    const baseName = data.slug || data.email || "User";
    const display = baseName.replace(/_/g, " ");
    return `https://i.redd.it/5mrymgxjqiif1.jpeg`;
  }, [data.slug, data.email]);

  const handleLogout = async () => {
    await clearUser();
    const tabs = navigation.getParent(); 
    const root = tabs?.getParent();       
    if (root) root.navigate("Register");
    else navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: avatarUri }} style={styles.avatar} />

      <Text style={styles.h1}>Perfil</Text>
      <Text>Nombre: {data.slug}</Text>
      <Text>Correo: {data.email}</Text>

      <Pressable style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const AVATAR_SIZE = 120;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10, padding: 16 },
  h1: { fontSize: 22, fontWeight: "800", marginBottom: 4 },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: "#D6EAFD",
    backgroundColor: "#E6F4FE",
  },
  logoutBtn: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#FFE8E8",
    borderRadius: 12,
  },
  logoutText: { fontWeight: "700" },
});
