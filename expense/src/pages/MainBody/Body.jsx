import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "../../gsap/ScrollSmoother";

import { HeroScrollDemo } from "../Hero_page/heroscroll";
import ComingFeature from "../Coming_features/ComingFeature";
import JoinNow from "../JoinNow/JoinNow";
import BentoImp from "../Features/BentoImp";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const Body = () => {
  useEffect(() => {
    // Only create if it hasn't already been created
    if (!ScrollSmoother.get()) {
      ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
      });
    }
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <HeroScrollDemo />
        <BentoImp />
        <JoinNow />
        <ComingFeature />
      </div>
    </div>
  );
};

export default Body;
