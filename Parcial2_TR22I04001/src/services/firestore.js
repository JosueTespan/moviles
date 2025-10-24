import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, orderBy, query, setDoc, updateDoc, where, } from "firebase/firestore";
import { app } from "../../firebase/config";

export const db = getFirestore(app);

export function colNames(nameSlug) {
  return {
    users: `usuarios_${nameSlug}`,
    events: `eventos_${nameSlug}`,
    resumen: `resumen_${nameSlug}`,
  };
}

export async function guardarUsuario({ name, email, password }) {
  const nameSlug = (name || "").trim()
    ? name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    : "usuario";
  const { users } = colNames(nameSlug);
  const ref = await addDoc(collection(db, users), {
    name,
    email,
    password,
    createdAt: Date.now(),
  });
  return { docId: ref.id, nameSlug };
}

export async function getUsuarioById(nameSlug, docId) {
  const { users } = colNames(nameSlug);
  const snap = await getDoc(doc(db, users, docId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function crearEvento(nameSlug, data) {
  const { events } = colNames(nameSlug);
  return addDoc(collection(db, events), data);
}

export async function actualizarEvento(nameSlug, id, data) {
  const { events } = colNames(nameSlug);
  return updateDoc(doc(db, events, id), data);
}

export async function eliminarEvento(nameSlug, id) {
  const { events } = colNames(nameSlug);
  return deleteDoc(doc(db, events, id));
}

export function escucharEventos(nameSlug, filtros = {}) {
  const { events } = colNames(nameSlug);
  const colRef = collection(db, events);
  const clauses = [];

  if (filtros?.prioridad) clauses.push(where("prioridad", "==", filtros.prioridad));
  if (filtros?.hora) clauses.push(where("hora", "==", filtros.hora));
  const qy = clauses.length
    ? query(colRef, ...clauses)
    : query(colRef, orderBy("fecha", "desc"));

  return (cb) =>
    onSnapshot(qy, (snap) => {
      const items = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() }));

      const sorted = clauses.length
        ? items.sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)))
        : items;

      cb(sorted);
    });
}


export async function finalizarEvento(nameSlug, id, data) {
  const { resumen, events } = colNames(nameSlug);
  await setDoc(doc(db, resumen, id), { ...data, finishedAt: Date.now() });
  await deleteDoc(doc(db, events, id));
}

export function escucharResumen(nameSlug) {
  const { resumen } = colNames(nameSlug);
  const qy = query(collection(db, resumen), orderBy("finishedAt", "desc"));
  return (cb) =>
    onSnapshot(qy, (snap) => {
      const items = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
      cb(items);
    });
}

export function eliminarDeResumen(nameSlug, id) {
  const { resumen } = colNames(nameSlug);
  return deleteDoc(doc(db, resumen, id));
}
