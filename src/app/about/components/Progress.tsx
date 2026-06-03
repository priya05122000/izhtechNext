"use client";

import { useEffect, useState } from "react";

type ProgressProps = {
  progressTime: number;
  className?: string;
};

export default function ProgressBar({
  progressTime,
  className = "",
}: ProgressProps) {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(progressTime);
    }, 100);

    return () => clearTimeout(timer);
  }, [progressTime]);

  return (
    <div className={`mt-5 ${className}`}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out"
          style={{ width: `${progressValue}%` }}
        />
      </div>

      {/* <div className="mt-2 text-sm font-medium text-gray-700">
        {progressValue}%
      </div> */}
    </div>
  );
}