import React, { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_SUPABASE_URL;

const ViewClasses = () => {
  const [addedClass, setAddedClass] = useState([]);

  useEffect(() => {
    // get the stored classes from sessionStorage
    const storedClass = sessionStorage.getItem("addedClass");
    setAddedClass(storedClass ? JSON.parse(storedClass) : []);
    console.log(storedClass);
  }, []);

  const removeClass = (classToRemove) => {
    const updatedClass = addedClass.filter((item) => item !== classToRemove);
    setAddedClass(updatedClass);
    sessionStorage.setItem("addedClass", JSON.stringify(updatedClass)); //update local storage
  };

  const exportClasses = (exams) => {
    const baseURL = "https://scheduler-bosk.onrender.com//export";
    const params = new URLSearchParams();

    // Append each exam's section as a separate query parameter
    exams.forEach((exam) => params.append("section", exam.section));

    const url = `${baseURL}?${params.toString()}`;
    window.open(url, "_blank"); // downloads the file
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center p-5">
      <div className="mb-8 text-center">
        <h1 className="font-primary mb-4 text-4xl font-bold text-white">
          My Classes
        </h1>
        <p className="max-w-2xl text-center text-lg text-gray-200">
          View and manage the classes you've added to your schedule. Export your
          schedule for easy reference.
        </p>
      </div>

      <div
        className="bg-customGray w-full max-w-2xl overflow-auto rounded-lg bg-opacity-90 p-6 shadow-lg"
        style={{ maxHeight: "calc(100vh - 300px)" }}
      >
        {addedClass.length > 0 ? (
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
              {addedClass.map((exam, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 items-center gap-2 border-b border-gray-300 p-2"
                >
                  <div className="text-white">{exam.section}</div>
                  <div className="text-white">{exam.day}</div>
                  <div className="text-white">{exam.time}</div>
                  <div className="text-right">
                    <button
                      onClick={() => removeClass(exam)}
                      className="ml-2 rounded-lg border border-white bg-black p-2 font-semibold text-white transition-colors hover:bg-gray-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-white">No classes added yet.</p>
        )}
      </div>

      <div className="mt-6">
        <button
          className="font-roboto group relative isolation-auto z-10 mx-auto flex items-center justify-center gap-2 overflow-hidden rounded-full border-2 bg-black px-4 py-2 text-lg text-gray-50 shadow-xl backdrop-blur-md before:absolute before:-left-full before:-z-10 before:aspect-square before:w-full before:rounded-full before:bg-gray-700 before:transition-all before:duration-700 hover:bg-gray-800 hover:text-gray-50 before:hover:left-0 before:hover:w-full before:hover:scale-150 before:hover:duration-700 lg:font-semibold"
          onClick={() => exportClasses(addedClass)}
          disabled={addedClass.length === 0}
        >
          Export Schedule
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 19"
            className="h-8 w-8 rotate-45 justify-end rounded-full border border-gray-700 bg-gray-50 p-2 text-gray-50 duration-300 ease-linear disabled:opacity-50 group-hover:rotate-90 group-hover:border-none group-hover:bg-gray-50"
          >
            <path
              className="fill-gray-800 group-hover:fill-gray-800"
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ViewClasses;
