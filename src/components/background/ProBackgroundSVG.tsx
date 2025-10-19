'use client';

import { useEffect, useRef } from 'react';

// Palette pastel officielle Octogone
const COLORS = {
  gold: '#DCB26B',
  sky: '#BADFF6',
  mint: '#B8E6D5',
  violet: '#E2CDED',
  bg: '#0B0D12',
};

// Génération déterministe avec angle d'or
const PHI = 1.618033988749895;
const GOLDEN_ANGLE = 137.508;

interface Shape {
  type: 'octagon' | 'rhombus';
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  layer: 'back' | 'mid' | 'front';
  animDelay: number;
  animDuration: number;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateShapes(count: number, seed: number = 8317): Shape[] {
  const rand = seededRandom(seed);
  const shapes: Shape[] = [];
  const colors = [COLORS.gold, COLORS.sky, COLORS.mint, COLORS.violet];
  const minDistance = 80;

  // Quotas par couche
  const frontCount = Math.floor(count * 0.15);
  const midCount = Math.floor(count * 0.55);
  const backCount = count - frontCount - midCount;

  const layerCounts = { back: backCount, mid: midCount, front: frontCount };
  const layers: Array<'back' | 'mid' | 'front'> = ['back', 'mid', 'front'];

  for (const layer of layers) {
    for (let i = 0; i < layerCounts[layer]; i++) {
      let attempts = 0;
      let x: number, y: number;
      let valid = false;

      // Anti-amas : vérifier distance minimale
      while (!valid && attempts < 50) {
        const angle = (i * GOLDEN_ANGLE) % 360;
        const radius = 30 + rand() * 70;
        x = 50 + Math.cos((angle * Math.PI) / 180) * radius + (rand() - 0.5) * 20;
        y = 50 + Math.sin((angle * Math.PI) / 180) * radius + (rand() - 0.5) * 20;

        valid = shapes.every(s => {
          const dx = s.x - x;
          const dy = s.y - y;
          return Math.sqrt(dx * dx + dy * dy) > minDistance;
        });

        attempts++;
      }

      if (!valid) continue;

      const sizeBase = layer === 'back' ? 40 : layer === 'mid' ? 30 : 20;
      
      shapes.push({
        type: rand() > 0.5 ? 'octagon' : 'rhombus',
        x: x!,
        y: y!,
        size: sizeBase + rand() * 20,
        rotation: rand() * 360,
        color: colors[Math.floor(rand() * colors.length)],
        layer,
        animDelay: rand() * 10,
        animDuration: 15 + rand() * 15,
      });
    }
  }

  return shapes;
}

function useScrollDrift(enabled: boolean) {
  const driftRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    let rafId: number;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      driftRef.current.y = scrollY * 0.05;
    };

    const tick = () => {
      handleScroll();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [enabled]);

  return driftRef;
}

export default function ProBackgroundSVG() {
  const shapes = useRef(generateShapes(60)).current;
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  
  const driftRef = useScrollDrift(!prefersReducedMotion);

  // Octogone path
  const octagonPath = (size: number) => {
    const points: [number, number][] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * 45 - 22.5) * (Math.PI / 180);
      points.push([
        Math.cos(angle) * size,
        Math.sin(angle) * size,
      ]);
    }
    return `M ${points.map(p => p.join(',')).join(' L ')} Z`;
  };

  // Losange path
  const rhombusPath = (size: number) => {
    const w = size * 0.7;
    const h = size;
    return `M 0,${-h} L ${w},0 L 0,${h} L ${-w},0 Z`;
  };

  return (
    <div className="octo-bg">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="100" height="100" fill={COLORS.bg} />

        {shapes.map((shape, i) => {
          const opacity = shape.layer === 'back' ? 0.15 : shape.layer === 'mid' ? 0.25 : 0.35;
          
          return (
            <g
              key={i}
              className="shape"
              data-layer={shape.layer}
              style={{
                transform: `translate(${shape.x}%, ${shape.y}%) translate3d(${driftRef.current.x}px, ${driftRef.current.y * (shape.layer === 'back' ? 0.3 : shape.layer === 'mid' ? 0.6 : 1)}px, 0)`,
              }}
            >
              <path
                d={shape.type === 'octagon' ? octagonPath(shape.size / 100) : rhombusPath(shape.size / 100)}
                fill={shape.color}
                opacity={opacity}
                filter="url(#glow)"
                style={{
                  transform: `rotate(${shape.rotation}deg)`,
                  animation: prefersReducedMotion ? 'none' : `float ${shape.animDuration}s ease-in-out ${shape.animDelay}s infinite`,
                }}
              />
            </g>
          );
        })}
      </svg>

      <style jsx>{`
        .octo-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
            opacity: 0.8;
          }
        }

        .shape {
          transition: transform 0.1s ease-out;
        }
      `}</style>
    </div>
  );
}
