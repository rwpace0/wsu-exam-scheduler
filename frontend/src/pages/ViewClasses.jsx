import { useCallback } from "react";
import ExamSchedulePanel from "../components/schedule/ExamSchedulePanel";
import Toast from "../components/ui/Toast";
import { useAddedClasses } from "../hooks/useAddedClasses";
import { useToast } from "../hooks/useToast";

const ViewClasses = () => {
  const [addedClass, setAddedClass] = useAddedClasses();
  const { toast, showToast } = useToast();

  const onRemove = useCallback(
    (exam) => {
      setAddedClass((prev) =>
        prev.filter((item) => item.section !== exam.section),
      );
      showToast(`Removed ${exam.section} from Schedule`);
    },
    [setAddedClass, showToast],
  );

  return (
    <div className="mx-auto max-w-lg px-4 py-10 md:py-14">
      <div className="mb-8 text-center">
        <h1 className="font-display mb-3 text-3xl font-semibold text-white md:text-4xl">
          My classes
        </h1>
        <p className="text-wsu-muted">
          Manage the exams you added from search and export your schedule.
        </p>
      </div>
      <ExamSchedulePanel addedClass={addedClass} onRemove={onRemove} />
      <Toast open={toast.open} message={toast.message} />
    </div>
  );
};

export default ViewClasses;
