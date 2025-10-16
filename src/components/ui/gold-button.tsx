import React from "react";
import Link from "next/link";

interface GoldButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const GoldButton: React.FC<GoldButtonProps> = ({ 
  href, 
  children,
  className = ""
}) => {
  return (
    <Link 
      href={href}
      className={`group inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-marine-900 bg-[#dcb26b] hover:bg-[#e2b45f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dcb26b] transition-all duration-300 ${className}`}
    >
      <span>{children}</span>
      <svg 
        className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M14 5l7 7m0 0l-7 7m7-7H3" 
        />
      </svg>
    </Link>
  );
};

export default GoldButton;
