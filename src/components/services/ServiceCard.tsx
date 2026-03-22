"use client";

import React, { useRef, useEffect } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

interface ServiceCardProps {
  icon: string;
  counter: number;
  suffix: string;
  title: string;
  description: string;
  index: number;
}

const icons: Record<string, React.ReactNode> = {
  brain: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7c3aed"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a6 6 0 0 0-6 6c0 1.6.6 3 1.7 4.1L12 16l4.3-3.9A6 6 0 0 0 18 8a6 6 0 0 0-6-6Z" />
      <path d="M9 10a3 3 0 0 1 3-3" />
      <path d="M12 16v6" />
      <path d="M8 22h8" />
      <circle cx="12" cy="8" r="1" fill="#7c3aed" />
    </svg>
  ),
  workflow: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7c3aed"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  ),
  strategy: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7c3aed"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
      <circle cx="12" cy="12" r="1" fill="#7c3aed" />
    </svg>
  ),
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  counter,
  suffix,
  title,
  description,
  index,
}) => {
  return (
    <div
      className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-[#7c3aed]/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]"
    >
      <div className="mb-6">{icons[icon]}</div>

      <div className="mb-4">
        <AnimatedCounter target={counter} suffix={suffix} />
      </div>

      <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>

      <p className="text-white/60 leading-relaxed">{description}</p>
    </div>
  );
};

export default ServiceCard;
