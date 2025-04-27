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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check initially
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Setup ScrollTrigger
    const sectionsEls = gsap.utils.toArray(".section");

    if (isMobile) {
      // Mobile-specific ScrollTrigger setup
      sectionsEls.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 70%", // Trigger earlier on mobile
          end: "bottom 30%",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
          markers: false // Set to true for debugging
        });
      });
    } else {
      // Desktop ScrollTrigger setup
      sectionsEls.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
      
      // Pin the left text section on desktop
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftTextRef.current,
        pinSpacing: false
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <div className={`${isMobile ? 'flex-col' : 'flex'} w-full min-h-screen overflow-hidden bg-gray-900`} ref={containerRef}>
      {/* LEFT TEXT SECTION */}
      <div 
        ref={leftTextRef} 
        className={`${
          isMobile ? 'w-full sticky top-0 py-4 z-20 bg-gray-900' : 'w-1/2 sticky top-0 h-screen'
        } flex flex-col justify-center p-4`}
      >
        <div className={`${
          isMobile ? 'bg-gray-900 shadow-xl border border-blue-900/30' : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'
        } rounded-xl p-6`}>
          <h2 className={`${
            isMobile ? 'text-2xl text-center' : 'text-6xl'
          } font-bold mb-4 transition-all duration-300 text-blue-500`}>
            {sections[activeIndex].title}
          </h2>
          <p className={`${
            isMobile ? 'text-base text-center font-medium' : 'text-2xl'
          } text-gray-200 transition-all duration-300`}>
            {sections[activeIndex].description}
          </p>
        </div>
      </div>

      {/* RIGHT IMAGE SECTION */}
      <div className={`${isMobile ? 'w-full mt-16 pt-8' : 'w-1/2'} flex flex-col ${isMobile ? 'gap-[70vh]' : 'gap-32'} overflow-hidden`}>
        {sections.map((section, idx) => (
          <div
            key={idx}
            className={`section ${isMobile ? 'min-h-[60vh]' : 'h-screen'} flex items-center justify-center overflow-hidden`}
          >
            <img
              src={section.image}
              alt={`Section ${idx}`}
              className={`w-full h-auto ${isMobile ? 'max-h-[50vh]' : 'max-h-[80vh]'} object-contain rounded-xl shadow-lg transition-all duration-500 ${
                activeIndex === idx ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
