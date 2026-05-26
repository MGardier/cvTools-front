import type { ReactNode } from "react";

type TTechIcon = {
  name: string;
  svg: ReactNode;
};

export const TECH_ICONS: TTechIcon[] = [
  {
    name: "React",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="rgb(96,165,250)" strokeWidth="1.5">
        <circle cx="12" cy="12" r="2.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="rgb(96,165,250)" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="system-ui">
          TS
        </text>
      </svg>
    ),
  },
  {
    name: "Next.js",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" fill="rgb(39,39,42)" />
        <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" fontFamily="system-ui">
          N
        </text>
      </svg>
    ),
  },
  {
    name: "Node.js",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="rgb(74,222,128)" strokeWidth="1.5" />
        <path d="M12 8v8" stroke="rgb(74,222,128)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 10l4 2 4-2" stroke="rgb(74,222,128)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Nest.js",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="rgb(224,35,78)" />
        <text x="12" y="15.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="white" fontFamily="system-ui">
          Nest
        </text>
      </svg>
    ),
  },
  {
    name: "Docker",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="rgb(96,165,250)">
        <path d="M4 11h2v2H4zm3 0h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zm-6-3h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zm0-3h2v2h-2zm6.6 5.2c-.5-.3-1.1-.4-1.7-.3-.1-.6-.4-1.1-.8-1.5l-.4-.3-.3.4c-.3.4-.4.9-.5 1.4 0 .3.1.6.2.9-.4.2-.9.3-1.4.3H3v1c0 1.4.3 2.8.9 4.1 1.1 2.3 3.3 3.4 6 3.4 5.4 0 9.5-2.4 11.4-6.9.5 0 1.6-.1 2.1-1.1l.2-.2-.5-.4c-.5-.4-1.3-.4-1.7-.3-.4-.6-1-.7-1.7-.5z" />
      </svg>
    ),
  },
];
