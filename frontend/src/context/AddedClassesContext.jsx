import { createContext, useCallback, useState } from "react";

const STORAGE_KEY = "addedClass";

function readStored() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const AddedClassesContext = createContext(null);

export function AddedClassesProvider({ children }) {
  const [addedClass, setAddedClassState] = useState(readStored);

  const setAddedClass = useCallback((valueOrUpdater) => {
    setAddedClassState((prev) => {
      const next =
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(prev)
          : valueOrUpdater;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AddedClassesContext value={[addedClass, setAddedClass]}>
      {children}
    </AddedClassesContext>
  );
}
