import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./pages/Navbar/Navbar";
import "./App.css";
import "./index.css";
import SplashCursor1 from "./pages/Cursor/Splashcursor";
import BackgroundWrapper from "./pages/Background_square/Square_bg";
import { ThemeProvider } from "./pages/Navbar/Themeprovider";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./pages/Navbar/Themeprovider";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./pages/LoadingSpinner/LoadingSpinner";

// Lazy load components
const Body = lazy(() => import("./pages/MainBody/Body"));
const Dashboard = lazy(() => import("./pages/Dashbord/Dashboard"));
const Insights = lazy(() => import("./pages/Dashbord/insights/Insights"));

function App() {
  const { theme } = useTheme();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <ThemeProvider>
      <div className={`app-container ${theme === "dark" ? "dark" : ""}`}>
        <div className="app-container">
          <BackgroundWrapper />

          <div className="content-wrapper">
            <Router>
              <Navbar />
              {/* <SplashCursor1 /> */}

              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Body />} />
                  <Route
                    path="/dashboard"
                    element={isAuthenticated ? (
                      <Dashboard />
                    ) : (
                      <Navigate to="/" />
                    )}
                  />
                  <Route
                    path="/insights"
                    element={isAuthenticated ? (
                      <Insights />
                    ) : (
                      <Navigate to="/" />
                    )}
                  />
                </Routes>
              </Suspense>
            </Router>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
