import Skeleton from "./Skeleton";

const AvailableCoursesSkeleton = ({ rows = 6 }) => {
  return (
    <section
      className="border-wsu-border bg-wsu-surface rounded-xl border p-4 sm:p-6"
      aria-label="Loading available courses"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-4 w-24" />
      </div>

      <ul className="flex flex-col gap-3">
        {Array.from({ length: rows }).map((_, idx) => (
          <li
            key={idx}
            className="border-wsu-border bg-wsu-surface-elevated rounded-xl border p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-64 max-w-full" />
                <Skeleton className="h-4 w-44" />
              </div>
              <Skeleton className="h-9 w-20 rounded-lg" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AvailableCoursesSkeleton;
