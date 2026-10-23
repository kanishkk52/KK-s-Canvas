
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "light";
  });

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      localStorage.setItem("portfolio-theme", nextTheme);
      return nextTheme;
    });
  };

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <Home theme={theme} onToggleTheme={toggleTheme} />
          }
        />

        <Route
          path="/work"
          element={
            <Work theme={theme} onToggleTheme={toggleTheme} />
          }
        />

        <Route
          path="/work/:projectId"
          element={
            <ProjectDetail
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
