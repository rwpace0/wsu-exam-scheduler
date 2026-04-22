const SearchHero = () => {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-wsu-muted">
        Final exams
      </p>
      <h1 className="font-display mb-4 text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
        Find your classes. Never miss an exam.
      </h1>
      <p className="text-base text-wsu-muted sm:text-lg">
        Search by course section (for example{" "}
        <span className="font-semibold text-zinc-200">MATH 171</span> or{" "}
        <span className="font-semibold text-zinc-200">MATH 171.02</span> for
        section 2). Add exams to your schedule and export a calendar file.
      </p>
    </header>
  );
};

export default SearchHero;
