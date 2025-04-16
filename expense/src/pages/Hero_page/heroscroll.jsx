"use client";
import React from "react";
import { ContainerScroll } from "./container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="bg-black flex flex-col overflow-hidden min-h-screen">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white text-center">
              Take Control of Your
              <br />
              <span className="text-black dark:text-blue-500 text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Finances with Ease
              </span>
            </h1>
          </>
        }
      >
        <div className="flex justify-center items-center w-full h-full">
          {/* Dashboard Image */}
          <div className="w-full h-full p-0">
            <img
              src="/images/dashboard.png"
              alt="Dashboard"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
