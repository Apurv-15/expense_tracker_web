import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "../../gsap/ScrollSmoother";

import { HeroScrollDemo } from "../Hero_page/heroscroll";
import ComingFeature from "../Coming_features/ComingFeature";
import JoinNow from "../JoinNow/JoinNow";
import BentoImp from "../Features/BentoImp";
import SmoothScroll from "../../gsap/SmoothScroll";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const Body = () => {
  return (
    <SmoothScroll>
      <HeroScrollDemo />
      <BentoImp />
      <JoinNow />
      <ComingFeature />
    </SmoothScroll>
    
  );
};

export default Body;
