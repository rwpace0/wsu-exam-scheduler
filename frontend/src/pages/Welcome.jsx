import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="font-primary mb-6 text-4xl font-bold text-white">
          Welcome to the Unoffical WSU Exam Scheduler
        </h1>
        <p className="mb-8 text-lg text-gray-200">
          This application helps you find and organize your exam schedule into
          your calendar. Get started by searching for your classes and exporting
          them to your calendar!
        </p>
        <p className="mb-8 text-lg text-gray-200">
          Unfortunately, WSU has not published the final exam schedule for
          Spring 2025. The next update will be for Fall 2025.
        </p>
        <button
          onClick={() => navigate("/search")}
          className="mt-4 rounded-lg border-2 border-white bg-black px-8 py-3 text-xl text-white transition-all hover:bg-gray-900 hover:shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Welcome;
