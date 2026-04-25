import { useCallback, useEffect, useState } from "react";
import { fetchExams as fetchExamsFromSupabase } from "../api/exams";
import AvailableCourses from "../components/courses/AvailableCourses";
import AvailableCoursesSkeleton from "../components/loading/AvailableCoursesSkeleton";
import ExamSchedulePanelSkeleton from "../components/loading/ExamSchedulePanelSkeleton";
import ExamSchedulePanel from "../components/schedule/ExamSchedulePanel";
import SearchBar from "../components/search/SearchBar";
import SearchHero from "../components/search/SearchHero";
import Toast from "../components/ui/Toast";
import { useAddedClasses } from "../hooks/useAddedClasses";
import { useToast } from "../hooks/useToast";

const Search = () => {
  const [searchVal, setSearchVal] = useState("");
  const [exams, setExams] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedClass, setAddedClass] = useAddedClasses();
  const { toast, showToast } = useToast();

  const fetchExams = useCallback(async (query = "") => {
    setLoading(true);
    try {
      const examsData = await fetchExamsFromSupabase(query);
      setExams(examsData);
      return { exams: examsData };
    } catch (error) {
      console.error("Error fetching exams:", error);
      setExams([]);
      return { exams: [] };
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchExams(searchVal);
    setIsSearched(true);
  };

  useEffect(() => {
    const load = async () => {
      await fetchExams();
      setIsSearched(true);
    };
    load();
  }, [fetchExams]);

  const onToggleExam = useCallback(
    (exam) => {
      const alreadyAdded = addedClass.some(
        (item) => item.section === exam.section,
      );
      setAddedClass((prev) => {
        if (prev.some((item) => item.section === exam.section)) {
          return prev.filter((item) => item.section !== exam.section);
        }
        return [...prev, exam];
      });
      showToast(
        alreadyAdded
          ? `Removed ${exam.section} from schedule`
          : `Added ${exam.section} to schedule`,
      );
    },
    [addedClass, setAddedClass, showToast],
  );

  const onRemoveFromSchedule = useCallback(
    (exam) => {
      setAddedClass((prev) =>
        prev.filter((item) => item.section !== exam.section),
      );
      showToast(`Removed ${exam.section} from Schedule`);
    },
    [setAddedClass, showToast],
  );

  return (
    <div className="min-h-screen pb-12">
      <div className="mx-auto max-w-7xl px-4 pt-8 md:px-8 md:pt-12">
        <div className="mb-10 space-y-8">
          <SearchHero />
          <SearchBar
            value={searchVal}
            onChange={setSearchVal}
            onSubmit={handleSubmit}
            disabled={searchVal.trim() === ""}
          />
        </div>

        {loading && (
          <div
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start"
            aria-busy="true"
          >
            <div className="lg:col-span-8">
              <AvailableCoursesSkeleton />
            </div>
            <div className="lg:col-span-4">
              <ExamSchedulePanelSkeleton />
            </div>
          </div>
        )}

        {!loading && isSearched && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <AvailableCourses
                exams={exams}
                addedClass={addedClass}
                onToggleExam={onToggleExam}
              />
            </div>
            <div className="lg:col-span-4">
              <ExamSchedulePanel
                addedClass={addedClass}
                onRemove={onRemoveFromSchedule}
              />
            </div>
          </div>
        )}
      </div>
      <Toast open={toast.open} message={toast.message} />
    </div>
  );
};

export default Search;
