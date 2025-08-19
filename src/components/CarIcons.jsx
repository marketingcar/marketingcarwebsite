import React from 'react';

const iconProps = {
  className: "w-full h-full",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const Gps = () => (
  <svg {...iconProps}>
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
);

export const Headlights = () => (
  <svg {...iconProps}>
    <path d="M12 5c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" />
    <path d="M12 5v14" />
    <path d="M20 13h-8" />
  </svg>
);

export const PaintJob = () => (
  <svg {...iconProps}>
    <path d="M12.5 2.5a1 1 0 0 0-1 0L2.5 9.5a1 1 0 0 0 0 1l9 7a1 1 0 0 0 1 0l9-7a1 1 0 0 0 0-1l-9-7z" />
    <path d="M2.5 9.5L12 17.5l9.5-8" />
    <path d="M12 2.5V17.5" />
  </svg>
);

export const Hitch = () => (
  <svg {...iconProps}>
    <path d="M18 8.5c0 2.5-4 2.5-4 5V16" />
    <path d="M14 13.5h2" />
    <path d="M18 16h-4" />
    <path d="M6 8.5c0 2.5 4 2.5 4 5V16" />
    <path d="M10 13.5H8" />
    <path d="M6 16h4" />
    <path d="M12 16v-2.5c0-2.5-4-2.5-4-5" />
    <path d="M12 16v-2.5c0-2.5 4-2.5 4-5" />
  </svg>
);

export const Body = () => (
  <svg {...iconProps}>
    <path d="M14.5 2H9.5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
    <path d="M12 18h.01" />
    <path d="M12 6h.01" />
  </svg>
);

export const Mechanic = () => (
  <svg {...iconProps}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.7-3.7a1 1 0 0 0-1.4-1.4l-1.6 1.6-1.6-1.6a1 1 0 0 0-1.4 0z" />
    <path d="m18.1 9.9-1.5 1.5-1.5-1.5-3.1 3.1 4.6 4.6 3.1-3.1-1.6-1.6z" />
    <path d="m7.1 2.9-4.6 4.6 1.5 1.5 1.5-1.5 3.1 3.1-4.6 4.6-1.5-1.5-1.5 1.5-1.4-1.4 1.5-1.5 4.6-4.6-1.5-1.5-1.5 1.5-3.1-3.1 4.6-4.6 1.5 1.5 1.5-1.5 1.4 1.4z" />
  </svg>
);

export const Engine = () => (
  <svg {...iconProps}>
    <path d="M12 20V10" />
    <path d="M12 10l-4 4" />
    <path d="M12 10l4 4" />
    <path d="M12 10H8" />
    <path d="M12 10h4" />
    <path d="M12 10V6" />
    <path d="M12 6H8" />
    <path d="M12 6h4" />
    <path d="M12 6V2" />
  </svg>
);

export const Gas = () => (
  <svg {...iconProps}>
    <path d="M14 7h4" />
    <path d="M10 7h.01" />
    <path d="M16 7h2" />
    <path d="M12 7h.01" />
    <path d="M18 7h2" />
    <path d="M6 15h12" />
    <path d="M6 11h2" />
    <path d="M10 11h2" />
    <path d="M14 11h2" />
    <path d="M18 11h2" />
    <path d="M6 19h2" />
    <path d="M10 19h2" />
    <path d="M14 19h2" />
    <path d="M18 19h2" />
  </svg>
);

export const Accelerator = () => (
  <svg {...iconProps}>
    <path d="m12 12 4 4" />
    <path d="m16 12-4 4" />
    <path d="m12 16 4-4" />
    <path d="m16 16-4-4" />
    <path d="m12 8 4 4" />
    <path d="m16 8-4 4" />
    <path d="m12 12 4-4" />
    <path d="m16 12-4-4" />
  </svg>
);

export const Horn = () => (
  <svg {...iconProps}>
    <path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
    <path d="M12 8V4" />
    <path d="M12 16v4" />
    <path d="M16 12h4" />
    <path d="M8 12H4" />
  </svg>
);

export const SteeringWheel = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 15v5" />
    <path d="m15 12 3.5-2" />
    <path d="m9 12-3.5-2" />
  </svg>
);

export const Wheels = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
);