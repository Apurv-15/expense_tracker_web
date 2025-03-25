import React from "react";
import { HeroScrollDemo } from "../Hero_page/heroscroll";
import ComingFeature from "../Coming_features/ComingFeature";
import JoinNow from "../JoinNow/JoinNow"

export const  Body = () => {
  return (
    <div>
      <HeroScrollDemo />
      <JoinNow />
      <ComingFeature/>
    </div>
  );
};

export default Body;