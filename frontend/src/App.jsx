import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Search from "./pages/Search";
import ViewClasses from "./pages/ViewClasses";
import Navbar from "./components/layout/Navbar";
import About from "./pages/About";
import AnimatedLayout from "./components/Animations";
import { AddedClassesProvider } from "./context/AddedClassesContext";
import "./index.css";

// This wrapper component ensures a new AnimatedLayout is created for each route
const AnimatedPage = ({ component }) => {
  const location = useLocation();
  const RouteComponent = component;

  return (
    <AnimatedLayout key={location.pathname}>
      <RouteComponent />
    </AnimatedLayout>
  );
};

function App() {
  return (
    <>
      <Router>
        <AddedClassesProvider>
        <Navbar />
        <main
          id="main-content"
          className="transition-opacity duration-1000 ease-out"
        >
          <Routes>
            <Route path="/" element={<AnimatedPage component={Search} />} />
            <Route
              path="/search"
              element={<AnimatedPage component={Search} />}
            />
            <Route
              path="/export"
              element={<AnimatedPage component={ViewClasses} />}
            />
            <Route path="/about" element={<AnimatedPage component={About} />} />
          </Routes>
        </main>
        </AddedClassesProvider>
      </Router>
      <Analytics />
    </>
  );
}

export default App;
