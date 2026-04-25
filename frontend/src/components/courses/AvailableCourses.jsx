import CourseCard from "./CourseCard";

const AvailableCourses = ({ exams, addedClass, onToggleExam, searchQuery }) => {
  return (
    <section
      className="rounded-xl border border-wsu-border bg-wsu-surface p-4 sm:p-6"
      aria-labelledby="available-courses-heading"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2
          id="available-courses-heading"
          className="font-display text-xl font-semibold text-white sm:text-2xl"
        >
          Available courses
        </h2>
        <p className="text-sm text-wsu-muted">
          {exams.length === 1
            ? "1 course found"
            : `${exams.length} courses found`}
        </p>
      </div>

      {exams.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {exams.map((exam) => {
            const isAdded = addedClass.some(
              (item) => item.section === exam.section,
            );
            return (
              <li key={exam.section}>
                <CourseCard
                  exam={exam}
                  isAdded={isAdded}
                  onToggle={onToggleExam}
                  searchQuery={searchQuery}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-wsu-muted">No exams match your search.</p>
      )}
    </section>
  );
};

export default AvailableCourses;
