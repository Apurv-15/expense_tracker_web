import { useState, lazy, Suspense, useEffect } from "react";
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

// Add animation styles
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.5, ease: "easeOut" }
};

// Lazy load components with delay
const Body = lazy(() => 
  new Promise(resolve => setTimeout(resolve, 2500)).then(() => 
    import("./pages/MainBody/Body")
  )
);
const Dashboard = lazy(() => 
  new Promise(resolve => setTimeout(resolve, 2000)).then(() => 
    import("./pages/Dashbord/Dashboard")
  )
);
const Insights = lazy(() => 
  new Promise(resolve => setTimeout(resolve, 1000)).then(() => 
    import("./pages/Dashbord/insights/Insights")
  )
);

function App() {
  const { theme } = useTheme();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsContentVisible(true);
    }, 3000); // Match the lazy load delay

    return () => clearTimeout(timer);
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return null; // Don't render anything while redirecting
    }
    return children;
  };

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
                    element={
                      <ProtectedRoute>
                        <div 
                          style={{ 
                            ...fadeIn.initial,
                            opacity: isContentVisible ? 1 : 0,
                            transform: `translateY(${isContentVisible ? 0 : 20}px)`
                          }}
                          className="transition-all duration-800 ease-out"
                        >
                          <Dashboard />
                        </div>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/insights"
                    element={
                      <ProtectedRoute>
                        <div 
                          style={{ 
                            ...fadeIn.initial,
                            opacity: isContentVisible ? 1 : 0,
                            transform: `translateY(${isContentVisible ? 0 : 20}px)`
                          }}
                          className="transition-all duration-800 ease-out"
                        >
                          <Insights />
                        </div>
                      </ProtectedRoute>
                    }
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
