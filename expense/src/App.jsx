import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./pages/Navbar/Navbar";
import "./App.css";
import "./index.css";
import { HeroScrollDemo } from "./pages/Hero_page/heroscroll";
import SplashCursor1 from "./pages/Cursor/Splashcursor";
import JoinNow from "./pages/JoinNow/JoinNow";
import BackgroundWrapper from "./pages/Background_square/Square_bg";
import BentoGrid from "../../expense/src/pages/Features/BentoGrid"
import Sidebar from "./pages/Dashbord/Sidebar/Sidebar";
import Demo  from "./pages/Features/Demo";
import { gsap } from "gsap";
import { useEffect } from "react";

function App() {
  
  const [count, setCount] = useState(0);
  useEffect(() => {
    // Set up ScrollTrigger animations
    gsap.from(".HeroScrollDemo", {
      opacity: 0,
      y: 50,
      scrollTrigger: {
        trigger: ".HeroScrollDemo",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="app-container">
      {/* Background grid */}
      <BackgroundWrapper />

      {/* Ensure content is layered above */}
      <div className="content-wrapper">
        <Router>
          {/* <SplashCursor1 /> */}
          <Navbar />
          <HeroScrollDemo />
          <BentoGrid/>
          {/* <Demo/> */}
          <JoinNow />
          <Sidebar />
        </Router>
      </div>
    </div>
  );
}

export default App;
