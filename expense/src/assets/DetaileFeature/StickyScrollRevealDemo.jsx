import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";


gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "Track Your Spending",
    description: "Easily record your daily expenses with a modern, clean UI.",
    image:img2
  },
  {
    title: "Visual Reports",
    description: "Analyze your habits with dynamic charts and summary reports.",
    image: img1
  },
  {
    title: "Real Time Mail Update",
    description: "Get Instant Alert when you are about to react your monthly budget.",
    image: "https://www.alert-software.com/hs-fs/hubfs/email%20notification%20alerts.png?width=1280&name=email%20notification%20alerts.png"
  }
];

export default function ExpenseShowcase() {
  const containerRef = useRef(null);
  const leftTextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sectionsEls = gsap.utils.toArray(".section");

    sectionsEls.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftTextRef.current,
      pinSpacing: false
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <div className="flex w-full min-h-screen overflow-hidden" ref={containerRef}>
      {/* LEFT TEXT SECTION */}
      <div ref={leftTextRef} className="w-1/2 sticky top-0 h-screen flex flex-col justify-center p-8">
        <div className="bg-gradient-to-r from-transparent via-black/10 to-transparent rounded-xl p-8">
          <h2 className="text-6xl font-bold mb-6 transition-all duration-300 text-blue-500">
            {sections[activeIndex].title}
          </h2>
          <p className="text-2xl text-gray-300 transition-all duration-300">
            {sections[activeIndex].description}
          </p>
        </div>
      </div>

      {/* RIGHT IMAGE SECTION */}
      <div className="w-1/2 flex flex-col gap-32 overflow-hidden">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="section h-screen flex items-center justify-center overflow-hidden"
          >
            <img
              src={section.image}
              alt={`Section ${idx}`}
              className={`w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-lg transition-all duration-500 ${
                activeIndex === idx ? "opacity-100 scale-100" : "opacity-40 scale-95"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
