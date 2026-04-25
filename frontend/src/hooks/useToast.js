import { useCallback, useEffect, useRef, useState } from "react";

export const useToast = (options = {}) => {
  const { durationMs = 2200 } = options;

  const [toast, setToast] = useState({ open: false, message: "" });
  const timerRef = useRef(null);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  const showToast = useCallback(
    (message) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      setToast({ open: true, message });

      timerRef.current = setTimeout(() => {
        setToast((prev) => ({ ...prev, open: false }));
        timerRef.current = null;
      }, durationMs);
    },
    [durationMs],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { toast, showToast, hideToast };
};

