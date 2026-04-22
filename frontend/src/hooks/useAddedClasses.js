import { useCallback, useState } from "react";

const STORAGE_KEY = "addedClass";

function readStored() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Exam rows the user added; persisted to sessionStorage for export and refresh.
 */
export function useAddedClasses() {
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

  return [addedClass, setAddedClass];
}
