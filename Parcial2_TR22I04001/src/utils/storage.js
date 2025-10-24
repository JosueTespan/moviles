import AsyncStorage from "@react-native-async-storage/async-storage";

const UID_KEY = "userDocId";
const NAMEKEY = "name_slug";
const EMAILKEY = "email_user";

export async function saveUserIds(docId, nameSlug, email) {
  await AsyncStorage.multiSet([
    [UID_KEY, docId],
    [NAMEKEY, nameSlug],
    [EMAILKEY, email],
  ]);
}
export const getUserDocId = () => AsyncStorage.getItem(UID_KEY);
export const getNameSlug = () => AsyncStorage.getItem(NAMEKEY);
export const getEmailUser = () => AsyncStorage.getItem(EMAILKEY);
export const clearUser = async () =>
  AsyncStorage.multiRemove([UID_KEY, NAMEKEY, EMAILKEY]);

export function slugFromName(fullName = "") {
  return fullName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
