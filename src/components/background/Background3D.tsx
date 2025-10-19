'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { createRhombusBipyramid, createOctagonBipyramid } from './solids';

// Hook pour lire les couleurs du thème et réagir aux changements
function useThemeColors() {
  const [colors, setColors] = useState({
    background: '#1E1E1E',
    outline: '#404040',
  });

  useEffect(() => {
    const updateColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      
      // Utiliser directement les valeurs du thème
      setColors({
        background: isDark ? '#1E1E1E' : '#FAFAFA',
        outline: isDark ? '#404040' : '#E5E5E5',
      });
    };

    // Lire les couleurs au montage
    updateColors();

    // Observer les changements de classe sur <html> (dark/light)
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return colors;
}

const GOLDEN_ANGLE = 137.508;

interface ShapeData {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  layer: 'back' | 'mid' | 'front';
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateShapeData(count: number, seed: number): { rhombuses: ShapeData[]; octagons: ShapeData[] } {
  const rand = seededRandom(seed);
  const rhombuses: ShapeData[] = [];
  const octagons: ShapeData[] = [];

  const frontCount = Math.floor(count * 0.15);
  const midCount = Math.floor(count * 0.55);
  const backCount = count - frontCount - midCount;

  const layerCounts = { back: backCount, mid: midCount, front: frontCount };
  const layers: Array<'back' | 'mid' | 'front'> = ['back', 'mid', 'front'];
  const minDistance = 3;

  const allPositions: Array<[number, number, number]> = [];

  for (const layer of layers) {
    const zBase = layer === 'back' ? -15 : layer === 'mid' ? -8 : -3;
    
    for (let i = 0; i < layerCounts[layer]; i++) {
      let attempts = 0;
      let pos: [number, number, number];
      let valid = false;

      while (!valid && attempts < 50) {
        const angle = (i * GOLDEN_ANGLE) % 360;
        const radius = 5 + rand() * 10;
        const x = Math.cos((angle * Math.PI) / 180) * radius + (rand() - 0.5) * 3;
        const y = Math.sin((angle * Math.PI) / 180) * radius + (rand() - 0.5) * 3;
        const z = zBase + (rand() - 0.5) * 4;
        pos = [x, y, z];

        valid = allPositions.every(p => {
          const dx = p[0] - pos[0];
          const dy = p[1] - pos[1];
          const dz = p[2] - pos[2];
          return Math.sqrt(dx * dx + dy * dy + dz * dz) > minDistance;
        });

        attempts++;
      }

      if (!valid) continue;

      allPositions.push(pos!);

      const scaleBase = layer === 'back' ? 1.2 : layer === 'mid' ? 0.9 : 0.6;
      const shapeData: ShapeData = {
        position: pos!,
        rotation: [rand() * Math.PI, rand() * Math.PI, rand() * Math.PI],
        scale: scaleBase,
        layer,
      };

      // Alterner entre losanges et octogones
      if (rand() > 0.5) {
        rhombuses.push(shapeData);
      } else {
        octagons.push(shapeData);
      }
    }
  }

  return { rhombuses, octagons };
}

// Composant générique pour les instances de formes
function ShapeInstances({ 
  data, 
  outlineColor, 
  geometry, 
  rotationSpeed,
  opacity
}: { 
  data: ShapeData[]; 
  outlineColor: string; 
  geometry: THREE.BufferGeometry;
  rotationSpeed: { x: number; z: number };
  opacity: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const matrices = useMemo(() => {
    const matrices = new Float32Array(data.length * 16);
    const tempMatrix = new THREE.Matrix4();

    data.forEach((shape, i) => {
      tempMatrix.identity();
      tempMatrix.makeRotationFromEuler(new THREE.Euler(...shape.rotation));
      tempMatrix.setPosition(...shape.position);
      tempMatrix.scale(new THREE.Vector3(shape.scale, shape.scale, shape.scale));
      tempMatrix.toArray(matrices, i * 16);
    });

    return matrices;
  }, [data]);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += rotationSpeed.x;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * rotationSpeed.z) * 0.1;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, data.length]}>
      <meshBasicMaterial color={outlineColor} transparent opacity={opacity} key={outlineColor} />
      <instancedBufferAttribute attach="instanceMatrix" args={[matrices, 16]} />
    </instancedMesh>
  );
}

function Scene({ density, seed }: { density: number; seed: number }) {
  const count = Math.floor(60 * density);
  const themeColors = useThemeColors();
  
  const { rhombuses, octagons } = useMemo(
    () => generateShapeData(count, seed), 
    [count, seed]
  );

  // Géométries créées une seule fois
  const rhombusGeometry = useMemo(() => createRhombusBipyramid({ diagH: 1.4, diagV: 1.4, height: 0.05, normalize: true }), []);
  const octagonGeometry = useMemo(() => createOctagonBipyramid({ edge: 1, height: 0.05, normalize: true }), []);

  // Opacité selon le thème : plus faible en dark mode
  const isDark = document.documentElement.classList.contains('dark');
  const opacity = isDark ? 0.08 : 0.15;

  return (
    <>
      <color attach="background" args={[themeColors.background]} />

      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <ShapeInstances 
          data={rhombuses} 
          outlineColor={themeColors.outline}
          geometry={rhombusGeometry}
          rotationSpeed={{ x: 0.0015, z: 0.2 }}
          opacity={opacity}
        />
        <ShapeInstances 
          data={octagons} 
          outlineColor={themeColors.outline}
          geometry={octagonGeometry}
          rotationSpeed={{ x: 0.001, z: 0.3 }}
          opacity={opacity}
        />
      </Float>
    </>
  );
}

interface Background3DProps {
  density?: number;
  seed?: number;
}

export default function Background3D({ density = 1, seed = 8317 }: Background3DProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const themeColors = useThemeColors();

  useEffect(() => {
    // Vérifier si WebGL est disponible
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      console.warn('WebGL not supported, using fallback background');
      setHasError(true);
      setIsLoading(false);
      return;
    }

    // Timeout pour détecter si le Canvas ne charge pas
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  // Fallback: fond simple avec la couleur du thème
  if (hasError || isLoading) {
    return (
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: -1,
          backgroundColor: themeColors.background,
          transition: 'background-color 0.3s ease'
        }} 
      />
    );
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }}
        onCreated={() => setIsLoading(false)}
        onError={() => {
          console.error('Canvas rendering error, using fallback background');
          setHasError(true);
        }}
      >
        <Scene density={density} seed={seed} />
      </Canvas>
    </div>
  );
}
