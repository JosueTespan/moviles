import { createContext, useContext, useState } from 'react';

const LibraryContext = createContext();

export function LibraryProvider({ children }) {
  const [favorites, setFavorites] = useState({});
  const [pendings, setPendings] = useState({});

  const addFavorite = (book) => {
    setFavorites((prev) => {
      if (prev[book.id]) return prev; 
      return { ...prev, [book.id]: book };
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const addPending = (book) => {
    setPendings((prev) => {
      if (prev[book.id]) return prev; 
      return { ...prev, [book.id]: { book, status: 'Pendiente' } };
    });
  };

  const togglePendingStatus = (id) => {
    setPendings((prev) => {
      if (!prev[id]) return prev;
      const updated = { ...prev };
      updated[id].status =
        updated[id].status === 'Pendiente' ? 'Leído' : 'Pendiente';
      return updated;
    });
  };

  return (
    <LibraryContext.Provider
      value={{
        favorites,
        pendings,
        addFavorite,
        removeFavorite,
        addPending,
        togglePendingStatus,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  return useContext(LibraryContext);
}
