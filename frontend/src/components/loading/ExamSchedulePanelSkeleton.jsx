import Skeleton from "./Skeleton";

const ExamSchedulePanelSkeleton = ({ rows = 3 }) => {
  return (
    <aside
      className="flex flex-col rounded-xl border border-wsu-border bg-wsu-surface p-4 sm:p-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)]"
      aria-label="Loading exam schedule"
    >
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-5 w-40" />
        <div className="ml-auto">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto">
        {Array.from({ length: rows }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-wsu-border bg-wsu-surface-elevated p-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-48 max-w-full" />
              </div>
              <Skeleton className="h-6 w-16 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-wsu-border pt-4">
        <Skeleton className="h-11 w-full rounded-xl" />
        <div className="mt-2 flex justify-center">
          <Skeleton className="h-3 w-64 max-w-full" />
        </div>
      </div>
    </aside>
  );
};

export default ExamSchedulePanelSkeleton;

