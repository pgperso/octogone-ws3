'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { createRhombusBipyramid } from './solids';

// Palette pastel officielle Octogone
const COLORS = {
  gold: '#DCB26B',
  sky: '#BADFF6',
  mint: '#B8E6D5',
  violet: '#E2CDED',
  bg: '#0B0D12',
};

const GOLDEN_ANGLE = 137.508;

interface ShapeData {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  layer: 'back' | 'mid' | 'front';
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateShapeData(count: number, seed: number): { rhombuses: ShapeData[] } {
  const rand = seededRandom(seed);
  const colors = [COLORS.gold, COLORS.sky, COLORS.mint, COLORS.violet];
  const rhombuses: ShapeData[] = [];

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
        scale: scaleBase, // Taille fixe par couche (pas de variation aléatoire)
        color: colors[Math.floor(rand() * colors.length)],
        layer,
      };

      // Tous les shapes sont des losanges
      rhombuses.push(shapeData);
    }
  }

  return { rhombuses };
}

function RhombusInstances({ data }: { data: ShapeData[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Losange bipyramidal (diamant 3D) : deux pyramides jointes par la base
  const geometry = useMemo(() => createRhombusBipyramid({ diagH: 1.8, diagV: 1.2, height: 0.8, normalize: true }), []);

  const { matrices, colors } = useMemo(() => {
    const matrices = new Float32Array(data.length * 16);
    const colors = new Float32Array(data.length * 3);
    const tempMatrix = new THREE.Matrix4();
    const tempColor = new THREE.Color();

    data.forEach((shape, i) => {
      tempMatrix.identity();
      tempMatrix.makeRotationFromEuler(new THREE.Euler(...shape.rotation));
      tempMatrix.setPosition(...shape.position);
      tempMatrix.scale(new THREE.Vector3(shape.scale, shape.scale, shape.scale));
      tempMatrix.toArray(matrices, i * 16);

      tempColor.set(shape.color);
      tempColor.toArray(colors, i * 3);
    });

    return { matrices, colors };
  }, [data]);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Rotation continue pour montrer toutes les faces du rhomboèdre
    meshRef.current.rotation.x += 0.003;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, data.length]}>
      <meshBasicMaterial 
        vertexColors 
        wireframe={true}
        transparent
        opacity={0.8}
      />
      <instancedBufferAttribute attach="instanceMatrix" args={[matrices, 16]} />
      <instancedBufferAttribute attach="instanceColor" args={[colors, 3]} />
    </instancedMesh>
  );
}

function Scene({ density, seed }: { density: number; seed: number }) {
  const count = Math.floor(60 * density);
  const { rhombuses } = useMemo(() => generateShapeData(count, seed), [count, seed]);

  return (
    <>
      <color attach="background" args={[COLORS.bg]} />

      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <RhombusInstances data={rhombuses} />
      </Float>
    </>
  );
}

interface Background3DProps {
  density?: number;
  seed?: number;
}

export default function Background3D({ density = 1, seed = 8317 }: Background3DProps) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Scene density={density} seed={seed} />
      </Canvas>
    </div>
  );
}
