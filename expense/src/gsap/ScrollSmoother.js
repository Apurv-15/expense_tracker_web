// ScrollSmoother.js

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let smootherInstance;

export class ScrollSmoother {
  static create(config = {}) {
    if (smootherInstance) return smootherInstance;

    gsap.registerPlugin(ScrollTrigger);

    const wrapper = document.querySelector("#smooth-wrapper");
    const content = document.querySelector("#smooth-content");

    if (!wrapper || !content) {
      console.warn("ScrollSmoother: Missing #smooth-wrapper or #smooth-content");
      return null;
    }

    let scrollY = 0;
    let targetY = 0;
    let isTouch = "ontouchstart" in window;
    let smoothTime = isTouch ? config.smoothTouch || 0 : config.smooth || 1;

    const updateScroll = () => {
      scrollY += (targetY - scrollY) * 0.1;
      gsap.set(content, { y: -scrollY });
      requestAnimationFrame(updateScroll);
    };

    const onScroll = () => {
      targetY = wrapper.scrollTop;
    };

    wrapper.addEventListener("scroll", onScroll);
    updateScroll();

    // Optional ScrollTrigger integration
    ScrollTrigger.scrollerProxy(wrapper, {
      scrollTop(value) {
        if (arguments.length) wrapper.scrollTop = value;
        return wrapper.scrollTop;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: wrapper.style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.defaults({ scroller: wrapper });

    ScrollTrigger.refresh();

    smootherInstance = {
      scrollTop(value) {
        if (typeof value === "number") wrapper.scrollTop = value;
        return wrapper.scrollTop;
      }
    };

    return smootherInstance;
  }

  static get() {
    return smootherInstance;
  }
}
