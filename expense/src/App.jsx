import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import Hero from "./pages/Hero_page/Hero";
import Navbar from "./pages/Navbar/Navbar";
import "./App.css";
import "./index.css";
import { HeroScrollDemo } from "./pages/Hero_page/heroscroll";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router> {/* Wrap everything inside BrowserRouter */}
      <div>
      <Navbar />
        <HeroScrollDemo />
       
        <Hero />
      </div>
    </Router>
  );
}

export default App;
