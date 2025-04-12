import React, { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_SUPABASE_URL;

const ResultsList = ({ searchVal, exams, addedClass, setAddedClass }) => {
  const [hover, setHover] = useState(null);

  const handleToggleClass = (exam) => {
    setAddedClass((prevClasses) => {
      let updatedClasses;
      if (prevClasses.some((item) => item.section === exam.section)) {
        // Remove the class if it already exists
        updatedClasses = prevClasses.filter(
          (item) => item.section !== exam.section,
        );
      } else {
        // Add the class if it doesn't exist
        updatedClasses = [...prevClasses, exam];
      }

      // Update sessionStorage
      sessionStorage.setItem("addedClass", JSON.stringify(updatedClasses));
      return updatedClasses;
    });
  };

  return (
    <div
      className="bg-customGray m-4 w-full max-w-2xl overflow-auto rounded-lg bg-opacity-90 p-6 shadow-lg"
      style={{ maxHeight: "calc(100vh - 300px)" }}
    >
      {exams.length > 0 ? (
        <div className="w-full">
          {/* Table header */}
          <div className="mb-2 grid grid-cols-4 gap-2 border-b border-gray-400 pb-2 font-semibold text-white">
            <div>Section</div>
            <div>Day</div>
            <div>Time</div>
            <div className="text-right">Action</div>
          </div>

          {/* Table body */}
          <div className="space-y-3">
            {exams.map((exam, index) => {
              const isAdded = addedClass.some(
                (item) => item.section === exam.section,
              );
              return (
                <div
                  key={index}
                  className="grid grid-cols-4 items-center gap-2 border-b border-gray-300 p-2"
                >
                  <div className="text-white">{exam.section}</div>
                  <div className="text-white">{exam.day}</div>
                  <div className="text-white">{exam.time}</div>
                  <div className="text-right">
                    <button
                      onMouseEnter={() => setHover(exam.section)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => handleToggleClass(exam)}
                      className={`ml-2 rounded-lg p-2 font-semibold text-white transition-colors ${
                        !isAdded
                          ? "border border-white bg-black hover:bg-gray-800"
                          : hover === exam.section
                            ? "border border-white bg-gray-800"
                            : "border border-white bg-black hover:bg-gray-800"
                      }`}
                    >
                      {!isAdded
                        ? "Add"
                        : hover === exam.section
                          ? "Remove"
                          : "Added"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-white">No exams found.</p>
      )}
    </div>
  );
};

// Separate SearchBox component
const SearchBox = ({ searchVal, setSearchVal, handleSubmit }) => {
  const handleInput = (e) => {
    setSearchVal(e.target.value);
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center">
      <div className="w-full rounded-lg p-0">
        <div className="flex w-full shadow-lg">
          <div className="flex w-10 items-center justify-center rounded-bl-lg rounded-tl-lg border-r border-gray-200 bg-white p-2">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="h-5 w-5 fill-gray-500 transition"
            >
              <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
            </svg>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full">
            <input
              type="text"
              value={searchVal}
              onChange={handleInput}
              className="h-12 w-full bg-white px-4 text-base font-semibold outline-0"
              id="searchtext"
              placeholder="Enter search term..."
            />
            <button
              type="submit"
              disabled={searchVal.trim() === ""}
              className="rounded-br-lg rounded-tr-lg border border-white bg-black px-4 py-2 font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main Search component
const Search = () => {
  const [searchVal, setSearchVal] = useState("");
  const [exams, setExams] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [addedClass, setAddedClass] = useState(() => {
    const storedClass = sessionStorage.getItem("addedClass");
    return storedClass ? JSON.parse(storedClass) : [];
  });

  // Data fetching function
  const fetchExams = async (query = "") => {
    try {
      const response = await fetch(
        `https://scheduler-bosk.onrender.com/search?q=${encodeURIComponent(query)}`,
      );
      const data = await response.json();
      setExams(data.exams);
      return data;
    } catch (error) {
      console.error("Error fetching exams:", error);
      setExams([]);
      return { exams: [] };
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchExams(searchVal);
    setIsSearched(true);
  };

  // Initial data load
  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center overflow-hidden">
      <div className="max-w-3xl pb-6 pt-10">
        <h1 className="font-primary mb-4 text-center text-4xl font-bold text-white">
          Search Exams
        </h1>

        <div className="bg-customGray mb-6 rounded-lg border border-white bg-opacity-50 p-4 text-center">
          <p className="mb-3 text-lg text-gray-200">
            Find your exam schedule by entering the course code (e.g.{" "}
            <span className="font-semibold text-white">MATH 171</span>).
          </p>

          <p className="mb-3 text-lg text-gray-200">
            The exam section is denoted by a decimal, so Math 171 section 2
            would be{" "}
            <span className="font-semibold text-white">MATH 171.02</span>. The
            default section is 1.
          </p>

          <p className="text-lg text-gray-200">
            Once you have found your exams, click the{" "}
            <span className="rounded border border-white bg-black px-2 py-1 text-sm font-semibold text-white">
              Add
            </span>{" "}
            buttons and go to the export page to export all your exams at once.
          </p>
        </div>
      </div>

      {/* Search Component */}
      <SearchBox
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        handleSubmit={handleSubmit}
      />

      {/* Results Component - conditionally rendered */}
      {isSearched && (
        <ResultsList
          searchVal={searchVal}
          exams={exams}
          addedClass={addedClass}
          setAddedClass={setAddedClass}
        />
      )}
    </div>
  );
};

export default Search;
