// src/gsap/SmoothScroll.js
import React, { useEffect } from 'react';

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    // Load Lenis script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/studio-freight/lenis@0.2.28/bundled/lenis.js';
    script.async = true;
    document.body.appendChild(script);

    // Add CSS to disable default smooth scrolling
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);

    let lenis;
    
    script.onload = () => {
      lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
        console.log({ scroll, limit, velocity, direction, progress });
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };

    // Cleanup function
    return () => {
      if (lenis) {
        lenis.destroy();
      }
      document.body.removeChild(script);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="smooth-scroll-container">
      {children}
    </div>
  );
};

export default SmoothScroll;