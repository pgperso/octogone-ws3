import React from 'react';

interface CortexSpinnerProps {
  size?: number;
  iconSize?: number;
  strokeWidth?: number;
  colorful?: boolean;
  className?: string;
}

export const CortexSpinner: React.FC<CortexSpinnerProps> = ({ 
  size = 100, 
  iconSize = 56,
  strokeWidth = 4,
  colorful = true,
  className = ''
}) => {
  return (
    <div 
      className={className}
      style={{ 
        position: 'relative', 
        width: `${size}px`, 
        height: `${size}px` 
      }}
    >
      {/* Animated octagon line with dash effect */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <path
          d="M 60,20 L 140,20 L 180,60 L 180,140 L 140,180 L 60,180 L 20,140 L 20,60 Z"
          fill="none"
          stroke="var(--on-secondary-container)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="bevel"
          strokeDasharray="70 1000"
          strokeDashoffset="0"
          style={{
            animation: colorful 
              ? 'cortexDashAnimation 4s ease-out infinite, cortexColorAnimation 8s ease-in-out infinite'
              : 'cortexDashAnimation 4s ease-out infinite'
          }}
        />
      </svg>
      
      {/* Cortex icon in center */}
      <div style={{
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img 
          src="/cortex.svg" 
          alt="Cortex" 
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            filter: 'brightness(0) saturate(100%)',
            opacity: 0.7
          }}
        />
      </div>

      <style jsx>{`
        @keyframes cortexDashAnimation {
          0% {
            stroke-dashoffset: 0;
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -1070;
            opacity: 0.3;
          }
        }
        @keyframes cortexColorAnimation {
          0%, 100% {
            stroke: #B8E0D2;
          }
          25% {
            stroke: #B4D4FF;
          }
          50% {
            stroke: #FFE5B4;
          }
          75% {
            stroke: #C8B6FF;
          }
        }
      `}</style>
    </div>
  );
};
