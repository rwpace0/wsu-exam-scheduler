import { useState } from "react";

const CourseCard = ({ exam, isAdded, onToggle }) => {
  const [hover, setHover] = useState(false);

  return (
    <article
      className="flex flex-col gap-4 rounded-xl border border-wsu-border bg-wsu-surface-elevated p-4 sm:flex-row sm:items-center sm:justify-between"
      aria-labelledby={`course-${exam.section}`}
    >
      <div className="min-w-0 flex-1">
        <h2
          id={`course-${exam.section}`}
          className="truncate text-lg font-semibold tracking-tight text-white sm:text-xl"
        >
          {exam.section}
        </h2>
      </div>
      <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
        <button
          type="button"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => onToggle(exam)}
          className={`rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-colors ${
            isAdded
              ? hover
                ? "border-red-400/80 bg-red-950/40 text-red-100"
                : "border-wsu-crimson/50 bg-wsu-crimson/15 text-zinc-100"
              : "border-wsu-crimson bg-transparent text-wsu-crimson hover:bg-wsu-crimson/10"
          }`}
        >
          {!isAdded ? "Add exam" : hover ? "Remove" : "Added"}
        </button>
      </div>
    </article>
  );
};

export default CourseCard;
