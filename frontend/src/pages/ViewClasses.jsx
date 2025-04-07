import React, { useEffect, useState } from "react";

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
    const baseURL = "http://127.0.0.1:5000/export";
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
          <ul className="space-y-3">
            {addedClass.map((exam, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b border-gray-300 p-2"
              >
                <div className="text-white">
                  {exam.section}, {exam.day}, {exam.time}
                </div>
                <button
                  onClick={() => removeClass(exam)}
                  className="ml-2 rounded-lg border border-white bg-black p-2 font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No classes added yet.</p>
        )}
      </div>

      <div className="mt-6">
        <button
          className="rounded-lg border-2 border-white bg-black px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => exportClasses(addedClass)}
          disabled={addedClass.length === 0}
        >
          Export Schedule
        </button>
      </div>
    </div>
  );
};

export default ViewClasses;
