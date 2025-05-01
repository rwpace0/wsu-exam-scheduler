import React from "react";

const LoadingSpinner = ({ size = "6" }) => {
  const sizeClasses = {
    4: "h-4 w-4",
    6: "h-6 w-6",
    8: "h-8 w-8",
    10: "h-10 w-10",
    12: "h-12 w-12",
    16: "h-16 w-16",
  };

  const sizeClass = sizeClasses[size] || "h-6 w-6";

  return (
    <div
      className={`inline-block ${sizeClass} animate-spin rounded-full border-4 border-black border-t-transparent`}
      role="status"
      aria-lavel="loading"
    />
  );
};

export default LoadingSpinner;
