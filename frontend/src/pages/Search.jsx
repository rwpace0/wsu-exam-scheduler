import { useCallback, useEffect, useState } from "react";
import {
  fetchExams as fetchExamsFromSupabase,
  filterExamsLocally,
} from "../api/exams";
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
  const [allExams, setAllExams] = useState([]);
  const [exams, setExams] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedClass, setAddedClass] = useAddedClasses();
  const { toast, showToast } = useToast();

  const applySearchFilter = useCallback(
    (query) => {
      const filteredExams = filterExamsLocally(allExams, query);
      setExams(filteredExams);
      setIsSearched(true);
    },
    [allExams],
  );

  const loadAllExams = useCallback(async () => {
    setLoading(true);
    try {
      const examsData = await fetchExamsFromSupabase();
      setAllExams(examsData);
      setExams(examsData);
      return { exams: examsData };
    } catch (error) {
      console.error("Error fetching exams:", error);
      setAllExams([]);
      setExams([]);
      return { exams: [] };
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    applySearchFilter(searchVal);
  };

  useEffect(() => {
    const load = async () => {
      await loadAllExams();
      setIsSearched(true);
    };
    load();
  }, [loadAllExams]);

  useEffect(() => {
    applySearchFilter(searchVal);
  }, [searchVal, applySearchFilter]);

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
                searchQuery={searchVal}
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
