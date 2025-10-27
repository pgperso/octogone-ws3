import React from 'react';

interface PriceTagProps {
  price: string;
  label: string;
  top: string;
  left: string;
  lineEndX: string;
  lineEndY: string;
  isVisible: boolean;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  price,
  label,
  top,
  left,
  lineEndX,
  lineEndY,
  isVisible,
}) => {
  return (
    <div
      className="absolute"
      style={{
        top,
        left,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Ligne de connexion vers l'ingrédient */}
      <svg
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          width: '200px',
          height: '200px',
          transform: 'translate(-50%, -50%)',
          overflow: 'visible',
        }}
      >
        <line
          x1="0"
          y1="0"
          x2={`calc(${lineEndX} - ${left})`}
          y2={`calc(${lineEndY} - ${top})`}
          stroke="var(--primary)"
          strokeWidth="2"
          strokeDasharray="4 4"
          opacity="0.6"
        />
      </svg>

      {/* Badge carré avec radius */}
      <div
        className="px-3 py-2 shadow-lg backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(var(--primary-rgb, 212, 175, 55), 0.95)',
          border: '2px solid var(--primary)',
          borderRadius: '8px',
          minWidth: '80px',
        }}
      >
        <div className="flex flex-col items-center gap-0.5">
          <span
            className="text-sm font-bold leading-none"
            style={{ color: 'var(--on-primary)' }}
          >
            {price}
          </span>
          <span
            className="text-[10px] font-medium leading-none"
            style={{ color: 'var(--on-primary)', opacity: 0.9 }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};
