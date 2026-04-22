import { Calendar, CalendarDays, Download } from "lucide-react";
import { exportExamsToIcs } from "../../api/exportIcs";

const ExamSchedulePanel = ({ addedClass, onRemove }) => {
  const handleExport = async () => {
    if (!addedClass.length) return;
    try {
      await exportExamsToIcs(addedClass);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <aside
      className="flex flex-col rounded-xl border border-wsu-border bg-wsu-surface p-4 sm:p-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)]"
      aria-labelledby="schedule-heading"
    >
      <div className="mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-wsu-crimson" aria-hidden />
        <h2
          id="schedule-heading"
          className="font-display text-lg font-semibold text-white sm:text-xl"
        >
          My exam schedule
        </h2>
        <span
          className="ml-auto flex h-8 min-w-8 items-center justify-center rounded-full bg-wsu-crimson px-2 text-sm font-bold text-white"
          aria-live="polite"
        >
          {addedClass.length}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {addedClass.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CalendarDays
              className="mb-4 h-16 w-16 text-wsu-border"
              strokeWidth={1}
              aria-hidden
            />
            <p className="max-w-xs text-sm text-wsu-muted">
              Add courses from the list to see their final exam day and time
              here.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {addedClass.map((exam) => (
              <li
                key={exam.section}
                className="rounded-lg border border-wsu-border bg-wsu-surface-elevated p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-white">{exam.section}</p>
                    <p className="text-sm text-wsu-muted">
                      {exam.day}
                      {exam.time ? ` · ${exam.time}` : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(exam)}
                    className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-red-300 hover:bg-red-950/50 hover:text-red-200"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 border-t border-wsu-border pt-4">
        <button
          type="button"
          onClick={handleExport}
          disabled={addedClass.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-wsu-crimson py-3 text-sm font-semibold text-white transition-colors hover:bg-wsu-crimson-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="h-5 w-5" aria-hidden />
          Export to calendar (.ics)
        </button>
        <p className="mt-2 text-center text-xs text-wsu-muted">
          Works with Google Calendar, Outlook, Apple Calendar, and others.
        </p>
      </div>
    </aside>
  );
};

export default ExamSchedulePanel;
