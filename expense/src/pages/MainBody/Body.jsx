import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "../../gsap/ScrollSmoother";
import Splashcursor from "../Cursor/Splashcursor";
import { HeroScrollDemo } from "../Hero_page/heroscroll";
import ComingFeature from "../Coming_features/ComingFeature";
import BentoImp from "../Features/BentoImp";
import SmoothScroll from "../../gsap/SmoothScroll";
import StickyScroll from "../../pages/DetaileFeature/StickyScrollRevealDemo";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const Body = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <SmoothScroll>
      {!isMobile && <Splashcursor />}
      <HeroScrollDemo />
      <BentoImp />
      <StickyScroll />
      <ComingFeature />
    </SmoothScroll>
  );
};

export default Body;
