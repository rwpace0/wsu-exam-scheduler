import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="font-primary mb-6 text-4xl font-bold text-white">
          Welcome to the Exam Schedule Finder
        </h1>
        <p className="mb-8 text-lg text-gray-200">
          Placeholder: This application helps you find and organize your exam
          schedule. Search for your classes, add them to your personal schedule,
          and export them for easy reference. Get started by searching for your
          classes or browse through available options.
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
