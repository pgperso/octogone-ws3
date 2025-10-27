import React from 'react';

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
  percentageLabel?: string;
}

/**
 * Composant réutilisable pour afficher une barre de progression circulaire
 * Utilisé dans le hero et l'animation de recette
 */
export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 200,
  strokeWidth = 8,
  showPercentage = true,
  percentageLabel,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Cercle de fond */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth={strokeWidth}
        />
        
        {/* Cercle de progression */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--success)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Pourcentage au centre */}
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <span 
              className="text-4xl font-bold"
              style={{ 
                color: '#FFFFFF',
                textShadow: '0 2px 8px rgba(0,0,0,0.5)'
              }}
            >
              {Math.round(progress)}%
            </span>
            {percentageLabel && (
              <span 
                className="text-sm font-medium mt-1"
                style={{ 
                  color: '#FFFFFF',
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                }}
              >
                {percentageLabel}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
