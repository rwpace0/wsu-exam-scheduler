import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Search from "./pages/Search";
import ViewClasses from "./pages/ViewClasses";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/search" element={<Search />} />
          <Route path="/view" element={<ViewClasses />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

/*
to-do: 
- add to calender
- export calender
- style
*/
