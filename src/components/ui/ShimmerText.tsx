"use client";

import React from "react";

interface ShimmerTextProps {
  text: string;
  className?: string;
}

const ShimmerText: React.FC<ShimmerTextProps> = ({ text, className = "" }) => {
  return (
    <>
      <span
        className={`shimmer-text ${className}`}
        aria-label={text}
      >
        {text}
      </span>

      <style jsx>{`
        .shimmer-text {
          position: relative;
          display: inline-block;
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #ffffff 40%,
            #7c3aed 50%,
            #ffffff 60%,
            #ffffff 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-sweep 3s ease-in-out infinite;
        }

        @keyframes shimmer-sweep {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
    </>
  );
};

export default ShimmerText;
