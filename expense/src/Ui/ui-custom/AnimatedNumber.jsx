
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

export function AnimatedNumber({
  value,
  className,
  prefix = '',
  suffix = '',
  duration = 1000,
  decimals = 0,
}) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    // Initial load animation
    let startTime;
    let animationFrame;
    
    const startValue = displayValue || 0;
    const startAnimation = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      // Easing function: cubicOut
      const easedProgress = 1 - Math.pow(1 - percentage, 3);
      
      const currentValue = startValue + (value - startValue) * easedProgress;
      setDisplayValue(currentValue);
      
      if (progress < duration) {
        animationFrame = requestAnimationFrame(startAnimation);
      }
    };
    
    animationFrame = requestAnimationFrame(startAnimation);
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);
  
  return (
    <span className={cn('inline-block transition-all relative', className)}>
      {prefix}{displayValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{suffix}
    </span>
  );
}
