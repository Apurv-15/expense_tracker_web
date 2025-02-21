"use client";
import React from "react";
import { ContainerScroll } from "./container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="bg-black flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
            Take Control of Your 
            <br />
              <span className="text-black dark:text-white text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              Finances with Ease
              </span>
            </h1>
          </>
        }
      >
        <img
          src={`https://www.geckoboard.com/uploads/Sales-YTD-dashboard-example-1efebb.png`} // Ensure this path is correct relative to your public directory
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}