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
  // Extraire le montant numérique du prix (format: "2.85$" ou "$2.85")
  const priceValue = parseFloat(price.replace('$', ''));
  
  // Calculer le facteur d'échelle proportionnel au prix
  // Formule: scaleFactor = 0.8 + (prix / 3.5), plafonné entre 1.0 et 1.8
  // Exemples: 0.45$ → 1.08x, 0.85$ → 1.04x, 2.80$ → 1.60x
  const scaleFactor = Math.max(1.0, Math.min(1.8, 0.8 + (priceValue / 3.5)));
  const minWidth = Math.round(100 * scaleFactor);
  const paddingX = Math.round(16 * scaleFactor); // px-4 = 16px
  const paddingY = Math.round(12 * scaleFactor); // py-3 = 12px
  const fontSize = scaleFactor > 1.3 ? 'text-lg' : 'text-base';
  const labelSize = scaleFactor > 1.3 ? 'text-sm' : 'text-xs';
  
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
        className="shadow-lg backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '2px solid rgba(255, 255, 255, 0.8)',
          borderRadius: '10px',
          minWidth: `${minWidth}px`,
          paddingLeft: `${paddingX}px`,
          paddingRight: `${paddingX}px`,
          paddingTop: `${paddingY}px`,
          paddingBottom: `${paddingY}px`,
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <span
            className={`${fontSize} font-bold leading-none`}
            style={{ color: '#000000' }}
          >
            {price}
          </span>
          <span
            className={`${labelSize} font-medium leading-none`}
            style={{ color: '#000000', opacity: 0.8 }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};
