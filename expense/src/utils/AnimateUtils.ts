import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const initPageAnimations = () => {
  // Reset any existing scroll triggers to prevent duplicates
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  // Animate elements with the 'animate-on-scroll' class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  animatedElements.forEach((element) => {
    gsap.fromTo(
      element,
      { 
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Animate headers with a staggered effect
  const headers = document.querySelectorAll('.stagger-header');
  
  headers.forEach((header) => {
    gsap.fromTo(
      header,
      { 
        opacity: 0,
        x: -30
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Fly-out effect for elements with 'fly-out' class when they leave viewport
  const flyOutElements = document.querySelectorAll('.fly-out');
  
  flyOutElements.forEach((element) => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top 10%',
      onLeave: () => {
        gsap.to(element, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: 'power1.in'
        });
      },
      onEnterBack: () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power1.out'
        });
      }
    });
  });

  // Parallax effect for background elements
  const parallaxElements = document.querySelectorAll('.parallax');
  
  parallaxElements.forEach((element) => {
    const speed = element.getAttribute('data-speed') || "10";
    const movement = parseInt(speed) * 10;
    
    gsap.to(element, {
      y: `${-movement}px`,
      ease: "none",
      scrollTrigger: {
        trigger: element.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // Animate items in a sequence
  const sequenceContainers = document.querySelectorAll('.sequence-container');
  
  sequenceContainers.forEach((container) => {
    const items = container.querySelectorAll('.sequence-item');
    
    gsap.fromTo(
      items,
      { 
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Scale effect for highlighted elements
  const scaleElements = document.querySelectorAll('.scale-on-scroll');
  
  scaleElements.forEach((element) => {
    gsap.fromTo(
      element,
      { 
        scale: 0.8,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
};
