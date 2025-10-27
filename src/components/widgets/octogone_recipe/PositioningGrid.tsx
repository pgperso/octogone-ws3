import React from 'react';

/**
 * Grille de positionnement temporaire pour aider à placer les badges de prix
 * À RETIRER une fois le positionnement terminé
 */
export const PositioningGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 100 }}>
      {/* Lignes horizontales tous les 10% */}
      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((percent) => (
        <div
          key={`h-${percent}`}
          className="absolute w-full"
          style={{
            top: `${percent}%`,
            height: '1px',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
          }}
        >
          <span
            className="absolute left-1 text-xs font-bold"
            style={{
              color: 'red',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '2px 4px',
              borderRadius: '2px',
            }}
          >
            {percent}%
          </span>
        </div>
      ))}

      {/* Lignes verticales tous les 10% */}
      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((percent) => (
        <div
          key={`v-${percent}`}
          className="absolute h-full"
          style={{
            left: `${percent}%`,
            width: '1px',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
          }}
        >
          <span
            className="absolute top-1 text-xs font-bold"
            style={{
              color: 'blue',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '2px 4px',
              borderRadius: '2px',
              transform: 'translateX(-50%)',
            }}
          >
            {percent}%
          </span>
        </div>
      ))}

      {/* Croix au centre */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          width: '20px',
          height: '20px',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            width: '100%',
            height: '2px',
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            width: '2px',
            height: '100%',
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
          }}
        />
      </div>
    </div>
  );
};
