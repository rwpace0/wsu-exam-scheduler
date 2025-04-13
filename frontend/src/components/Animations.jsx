import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AnimatedLayout = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // reset visibility on route change
    setIsVisible(false);

    // small delay before fading in
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]); // rerun on route change

  // add animation for initial page load as well
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedLayout;
