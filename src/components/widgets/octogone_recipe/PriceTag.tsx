import React from 'react';

interface PriceTagProps {
  price: string;
  label: string;
  top: string;
  left?: string;
  right?: string;
  isVisible: boolean;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  price,
  label,
  top,
  left,
  right,
  isVisible,
}) => {
  return (
    <div
      className="absolute"
      style={{
        top,
        ...(left && { left }),
        ...(right && { right }),
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-10deg)',
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* Badge carré avec radius - BLANC */}
      <div
        className="px-4 py-3 shadow-lg backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '2px solid rgba(255, 255, 255, 0.8)',
          borderRadius: '10px',
          minWidth: '100px',
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <span
            className="text-base font-bold leading-none"
            style={{ color: '#000000' }}
          >
            {price}
          </span>
          <span
            className="text-xs font-medium leading-none"
            style={{ color: '#000000', opacity: 0.8 }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};
