'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

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
  // Octaèdre (8 faces triangulaires) pour un vrai effet 3D multi-faces
  const geometry = useMemo(() => new THREE.OctahedronGeometry(1, 0), []);

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
      <meshStandardMaterial vertexColors transparent opacity={0.6} />
      <instancedBufferAttribute attach="instanceMatrix" args={[matrices, 16]} />
      <instancedBufferAttribute attach="instanceColor" args={[colors, 3]} />
    </instancedMesh>
  );
}

function RhombusInstances({ data }: { data: ShapeData[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Rhomboèdre (cube déformé) pour un vrai volume 3D
  const geometry = useMemo(() => {
    const vertices = new Float32Array([
      // Face avant (losange)
      0, 1, 0.5,
      0.7, 0, 0.5,
      0, -1, 0.5,
      -0.7, 0, 0.5,
      // Face arrière (losange)
      0, 1, -0.5,
      0.7, 0, -0.5,
      0, -1, -0.5,
      -0.7, 0, -0.5,
    ]);

    const indices = new Uint16Array([
      // Faces avant et arrière
      0, 1, 2, 0, 2, 3, // avant
      4, 6, 5, 4, 7, 6, // arrière
      // Faces latérales
      0, 4, 5, 0, 5, 1, // haut-droite
      1, 5, 6, 1, 6, 2, // bas-droite
      2, 6, 7, 2, 7, 3, // bas-gauche
      3, 7, 4, 3, 4, 0, // haut-gauche
    ]);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.setIndex(new THREE.BufferAttribute(indices, 1));
    geo.computeVertexNormals();
    return geo;
  }, []);

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
      <meshStandardMaterial vertexColors transparent opacity={0.6} />
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
