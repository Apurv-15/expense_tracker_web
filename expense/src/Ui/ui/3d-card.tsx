
import React, { ReactNode, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

export const ThreeDCard = ({
  children,
  className,
  bgClassName,
  cardClassName,
  cardContent,
  showGradient = true,
}: {
  children?: ReactNode;
  className?: string;
  bgClassName?: string;
  cardClassName?: string;
  cardContent?: ReactNode;
  showGradient?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, bounds] = useMeasure();
  const [isHovered, setIsHovered] = useState(false);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation based on mouse position
    // Limit the rotation to ±8 degrees
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    setRotationX(rotateX);
    setRotationY(rotateY);
  };

  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves
    setRotationX(0);
    setRotationY(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={ref}
        className={cn(
          "w-full h-full transform-gpu preserve-3d transition-transform duration-100 ease-out",
          cardClassName
        )}
        style={{
          transform: `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale3d(${
            isHovered ? 1.05 : 1
          }, ${isHovered ? 1.05 : 1}, 1)`,
        }}
      >
        {showGradient && (
          <div
            className={cn(
              "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0",
              bgClassName || "bg-gradient-to-br from-blue-500/20 to-purple-600/20"
            )}
          />
        )}
        
        {/* Card content */}
        <div className="relative z-10">
          {cardContent || children}
        </div>
      </div>
    </div>
  );
};
