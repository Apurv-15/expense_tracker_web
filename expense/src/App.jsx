import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./pages/Navbar/Navbar";
import "./App.css";
import "./index.css";
import SplashCursor1 from "./pages/Cursor/Splashcursor";
import BackgroundWrapper from "./pages/Background_square/Square_bg";
// import { gsap } from "gsap";
// import { useEffect } from "react";
import Dashboard from "./pages/Dashbord/Dashboard";
import { ThemeProvider } from "./pages/Navbar/Themeprovider";

import { Routes, Route } from "react-router-dom";

import Body from "./pages/MainBody/Body";
import { useTheme } from "./pages/Navbar/Themeprovider";

function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider>
      <div className={`app-container ${theme === "dark" ? "dark" : ""}`}>
        <div className="app-container">
          {/* <BackgroundWrapper /> */}

          <div className="content-wrapper">
            <Router>
              <Navbar />
              {/* <SplashCursor1 />  */}

              <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </Router>
            {/* </UserProvider> */}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
