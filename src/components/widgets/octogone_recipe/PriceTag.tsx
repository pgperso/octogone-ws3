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
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
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
