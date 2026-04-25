import { useCallback } from "react";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import { exportExamsToIcs } from "../../api/exportIcs";
import { useAddedClasses } from "../../hooks/useAddedClasses";
import wsulogo from "../../assets/wsulogo.png";

const Navbar = () => {
  const [addedClass] = useAddedClasses();

  const onExportSchedule = useCallback(async () => {
    if (!addedClass.length) return;
    try {
      await exportExamsToIcs(addedClass);
    } catch (error) {
      console.error("Error exporting schedule:", error);
    }
  }, [addedClass]);

  return (
    <nav
      className="sticky top-0 z-20 border-b border-wsu-border bg-wsu-bg/95 px-4 py-3 backdrop-blur-sm md:px-8"
      aria-label="Site"
    >
      <div className="mx-auto flex max-w-7xl items-center">
        <Link to="/" className="flex items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-wsu-crimson">
          <img
            src={wsulogo}
            alt="Washington State University"
            className="h-11 w-auto object-contain"
          />
        </Link>
        <button
          type="button"
          onClick={onExportSchedule}
          disabled={addedClass.length === 0}
          className="ml-auto flex items-center gap-2 rounded-lg bg-wsu-crimson px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-wsu-crimson-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="h-4 w-4" aria-hidden />
          Export
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
