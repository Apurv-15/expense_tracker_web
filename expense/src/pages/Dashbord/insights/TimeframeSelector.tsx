
import React from 'react';

interface TimeframeSelectorProps {
  timeFrame: 'weekly' | 'monthly' | 'yearly';
  setTimeFrame: (timeFrame: 'weekly' | 'monthly' | 'yearly') => void;
}

const TimeframeSelector = ({ timeFrame, setTimeFrame }: TimeframeSelectorProps) => {
  return (
    <div className="flex gap-2">
      {['weekly', 'monthly', 'yearly'].map((frame) => (
        <button
          key={frame}
          onClick={() => setTimeFrame(frame as any)}
          className={`px-3 py-1 text-sm rounded-full transition-all ${
            timeFrame === frame
              ? 'bg-blue-500 text-white'
              : 'bg-blue-500 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {frame.charAt(0).toUpperCase() + frame.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;
