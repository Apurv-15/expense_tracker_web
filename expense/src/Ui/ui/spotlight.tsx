
import { cn } from "../../lib/utils";
import React, { useRef, useState, useEffect } from "react";

interface SpotlightProps {
  className?: string;
  children: React.ReactNode;
}

export function Spotlight({
  className,
  children,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Calculate the mouse position relative to the container
      mouseX.current = event.clientX - rect.left;
      mouseY.current = event.clientY - rect.top;
      
      // Update the custom property values
      container.style.setProperty("--mouse-x", `${mouseX.current}px`);
      container.style.setProperty("--mouse-y", `${mouseY.current}px`);
      container.style.setProperty("--mouse-x-percentage", `${mouseX.current / width}`);
      container.style.setProperty("--mouse-y-percentage", `${mouseY.current / height}`);
    };
    
    const handleMouseLeave = () => {
      // When mouse leaves, center the spotlight
      container.style.setProperty("--mouse-x", `${container.offsetWidth / 2}px`);
      container.style.setProperty("--mouse-y", `${container.offsetHeight / 2}px`);
    };
    
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    
    // Initial center position
    container.style.setProperty("--mouse-x", `${container.offsetWidth / 2}px`);
    container.style.setProperty("--mouse-y", `${container.offsetHeight / 2}px`);
    
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMounted]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-[inherit] z-0",
        className
      )}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(120, 130, 255, 0.1), transparent 40%)`,
        }}
      />
    </div>
  );
}
