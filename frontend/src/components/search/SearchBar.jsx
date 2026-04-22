const SearchBar = ({ value, onChange, onSubmit, disabled }) => {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col gap-3 shadow-lg sm:flex-row sm:items-stretch sm:rounded-xl sm:overflow-hidden sm:shadow-none"
      >
        <div className="flex min-h-12 flex-1 overflow-hidden rounded-xl border border-wsu-border bg-white sm:rounded-l-xl sm:rounded-r-none">
          <div className="flex w-11 shrink-0 items-center justify-center border-r border-zinc-200 bg-zinc-50">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="h-5 w-5 fill-zinc-500"
            >
              <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z" />
            </svg>
          </div>
          <input
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-12 w-full bg-white px-3 text-base font-medium text-zinc-900 outline-none placeholder:text-zinc-400"
            id="searchtext"
            placeholder="Search by course or section…"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          disabled={disabled}
          className="min-h-12 shrink-0 rounded-xl bg-wsu-crimson px-8 text-base font-semibold text-white transition-colors hover:bg-wsu-crimson-hover disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-l-none sm:rounded-r-xl"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
