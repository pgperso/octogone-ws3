'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { createOctagonBipyramid, createRhombusBipyramid } from './solids';

// Anciennes fonctions supprimées - on utilise maintenant solids.ts
function createOctagonPrismGeometry_OLD(opts?: { edge?: number; height?: number }): THREE.BufferGeometry {
  const edge = opts?.edge ?? 1;
  const height = opts?.height ?? 0.6;
  
  // Calculs géométriques pour octogone régulier
  const radius = edge / (2 * Math.sin(Math.PI / 8));
  
  const vertices: number[] = [];
  const indices: number[] = [];
  
  // Générer les 8 sommets du haut et du bas
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4; // 45° entre chaque sommet
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    
    // Sommet du haut
    vertices.push(x, y, height / 2);
    // Sommet du bas
    vertices.push(x, y, -height / 2);
  }
  
  // Cap supérieur (triangulation en éventail depuis le centre)
  const topCenterIdx = vertices.length / 3;
  vertices.push(0, 0, height / 2);
  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    indices.push(topCenterIdx, i * 2, next * 2);
  }
  
  // Cap inférieur (triangulation en éventail depuis le centre)
  const bottomCenterIdx = vertices.length / 3;
  vertices.push(0, 0, -height / 2);
  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    indices.push(bottomCenterIdx, next * 2 + 1, i * 2 + 1);
  }
  
  // Faces latérales (8 rectangles = 16 triangles)
  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    const topCurrent = i * 2;
    const bottomCurrent = i * 2 + 1;
    const topNext = next * 2;
    const bottomNext = next * 2 + 1;
    
    // Triangle 1
    indices.push(topCurrent, bottomCurrent, topNext);
    // Triangle 2
    indices.push(topNext, bottomCurrent, bottomNext);
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  
  return geometry;
}

/**
 * Crée une bipyramide rhombique complète (diamant losange)
 */
function createRhombusBipyramidGeometry(opts?: { diagH?: number; diagV?: number; apex?: number }): THREE.BufferGeometry {
  const diagH = opts?.diagH ?? 1.8;
  const diagV = opts?.diagV ?? 1.2;
  const apex = opts?.apex ?? 0.8;
  
  const vertices = new Float32Array([
    // Base losange (plan Z=0) - 4 sommets
    diagH / 2, 0, 0,           // 0: droite
    0, diagV / 2, 0,           // 1: haut
    -diagH / 2, 0, 0,          // 2: gauche
    0, -diagV / 2, 0,          // 3: bas
    // Apex
    0, 0, apex / 2,            // 4: pointe avant (+Z)
    0, 0, -apex / 2,           // 5: pointe arrière (-Z)
  ]);
  
  const indices = new Uint16Array([
    // Pyramide supérieure (apex avant, +Z)
    4, 0, 1,  // face droite-haut
    4, 1, 2,  // face haut-gauche
    4, 2, 3,  // face gauche-bas
    4, 3, 0,  // face bas-droite
    // Pyramide inférieure (apex arrière, -Z)
    5, 1, 0,  // face droite-haut
    5, 2, 1,  // face haut-gauche
    5, 3, 2,  // face gauche-bas
    5, 0, 3,  // face bas-droite
  ]);
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  
  return geometry;
}

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

function generateShapeData(count: number, seed: number): { octagons: ShapeData[]; rhombuses: ShapeData[] } {
  const rand = seededRandom(seed);
  const colors = [COLORS.gold, COLORS.sky, COLORS.mint, COLORS.violet];
  const octagons: ShapeData[] = [];
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
        scale: scaleBase + rand() * 0.4,
        color: colors[Math.floor(rand() * colors.length)],
        layer,
      };

      if (rand() > 0.5) {
        octagons.push(shapeData);
      } else {
        rhombuses.push(shapeData);
      }
    }
  }

  return { octagons, rhombuses };
}

function OctagonInstances({ data }: { data: ShapeData[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  // Bipyramide octogonale : diamant à 8 faces
  const geometry = useMemo(() => createOctagonBipyramid({ edge: 1, height: 0.8, normalize: true }), []);

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
    // Rotation continue pour montrer toutes les faces
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, data.length]}>
      <meshStandardMaterial 
        vertexColors 
        transparent 
        opacity={0.7}
        metalness={0.3}
        roughness={0.4}
        flatShading={false}
      />
      <instancedBufferAttribute attach="instanceMatrix" args={[matrices, 16]} />
      <instancedBufferAttribute attach="instanceColor" args={[colors, 3]} />
    </instancedMesh>
  );
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
      <meshStandardMaterial 
        vertexColors 
        transparent 
        opacity={0.7}
        metalness={0.4}
        roughness={0.3}
        flatShading={false}
      />
      <instancedBufferAttribute attach="instanceMatrix" args={[matrices, 16]} />
      <instancedBufferAttribute attach="instanceColor" args={[colors, 3]} />
    </instancedMesh>
  );
}

function Scene({ density, seed }: { density: number; seed: number }) {
  const count = Math.floor(60 * density);
  const { octagons, rhombuses } = useMemo(() => generateShapeData(count, seed), [count, seed]);

  return (
    <>
      <color attach="background" args={[COLORS.bg]} />
      <fog attach="fog" args={[COLORS.bg, 6, 26]} />
      
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color={COLORS.sky} />

      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <OctagonInstances data={octagons} />
        <RhombusInstances data={rhombuses} />
      </Float>

      <Environment preset="city" />
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
