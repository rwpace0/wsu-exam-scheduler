import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Toast = ({ open, message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      return;
    }

    const t = setTimeout(() => setIsVisible(false), 180);
    return () => clearTimeout(t);
  }, [open]);

  if (!isVisible) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div
        role="status"
        aria-live="polite"
        className={[
          "pointer-events-auto w-fit max-w-[calc(100vw-2rem)] rounded-xl border border-wsu-crimson-hover bg-wsu-crimson px-4 py-3 text-sm text-white shadow-lg",
          "transition-all duration-200",
          open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        ].join(" ")}
      >
        <p className="whitespace-normal break-words">{message}</p>
      </div>
    </div>,
    document.body,
  );
};

export default Toast;

