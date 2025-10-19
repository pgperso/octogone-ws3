import * as THREE from 'three';

/**
 * Crée une bipyramide rhombique (diamant losange 3D)
 * @param opts - Options de configuration
 * @returns BufferGeometry fermée et normalisée
 */
export function createRhombusBipyramid(opts?: {
  diagH?: number;
  diagV?: number;
  height?: number;
  normalize?: boolean;
}): THREE.BufferGeometry {
  const diagH = opts?.diagH ?? 1.8;
  const diagV = opts?.diagV ?? 1.2;
  const height = opts?.height ?? 0.8;
  const normalize = opts?.normalize ?? true;

  // 6 sommets: 4 base losange + 2 apex
  const positions = new Float32Array([
    // Base losange (Z=0)
    diagH / 2, 0, 0,           // 0: droite
    0, diagV / 2, 0,           // 1: haut
    -diagH / 2, 0, 0,          // 2: gauche
    0, -diagV / 2, 0,          // 3: bas
    // Apex
    0, 0, height / 2,          // 4: apex +Z
    0, 0, -height / 2,         // 5: apex -Z
  ]);

  // 8 triangles (4 pyramide sup + 4 pyramide inf), indices CCW
  const indices = new Uint16Array([
    // Pyramide supérieure (+Z)
    4, 0, 1,
    4, 1, 2,
    4, 2, 3,
    4, 3, 0,
    // Pyramide inférieure (-Z)
    5, 1, 0,
    5, 2, 1,
    5, 3, 2,
    5, 0, 3,
  ]);

  // Normalisation uniforme si demandée
  if (normalize) {
    let rMax = 0;
    for (let i = 0; i < positions.length; i += 3) {
      const r = Math.sqrt(
        positions[i] * positions[i] +
        positions[i + 1] * positions[i + 1] +
        positions[i + 2] * positions[i + 2]
      );
      if (r > rMax) rMax = r;
    }
    if (rMax > 0) {
      const scale = 1 / rMax;
      for (let i = 0; i < positions.length; i++) {
        positions[i] *= scale;
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();

  return geometry;
}

/**
 * Crée une bipyramide octogonale (8 faces latérales + 2 apex)
 * @param opts - Options de configuration
 * @returns BufferGeometry fermée et normalisée
 */
export function createOctagonBipyramid(opts?: {
  edge?: number;
  height?: number;
  normalize?: boolean;
}): THREE.BufferGeometry {
  const edge = opts?.edge ?? 1;
  const height = opts?.height ?? 0.8;
  const normalize = opts?.normalize ?? true;

  // Rayon circonscrit de l'octogone régulier
  const R = edge / (2 * Math.sin(Math.PI / 8));

  // 10 sommets: 8 octogone + 2 apex
  const positions: number[] = [];

  // Octogone régulier dans Z=0
  for (let k = 0; k < 8; k++) {
    const theta = (k * 2 * Math.PI) / 8;
    positions.push(R * Math.cos(theta), R * Math.sin(theta), 0);
  }

  // Apex
  positions.push(0, 0, height / 2);  // 8: apex +Z
  positions.push(0, 0, -height / 2); // 9: apex -Z

  const positionsArray = new Float32Array(positions);

  // 16 triangles (8 pyramide sup + 8 pyramide inf), indices CCW
  const indices: number[] = [];

  for (let k = 0; k < 8; k++) {
    const next = (k + 1) % 8;
    // Pyramide supérieure (+Z)
    indices.push(8, k, next);
    // Pyramide inférieure (-Z)
    indices.push(9, next, k);
  }

  const indicesArray = new Uint16Array(indices);

  // Normalisation uniforme si demandée
  if (normalize) {
    let rMax = 0;
    for (let i = 0; i < positionsArray.length; i += 3) {
      const r = Math.sqrt(
        positionsArray[i] * positionsArray[i] +
        positionsArray[i + 1] * positionsArray[i + 1] +
        positionsArray[i + 2] * positionsArray[i + 2]
      );
      if (r > rMax) rMax = r;
    }
    if (rMax > 0) {
      const scale = 1 / rMax;
      for (let i = 0; i < positionsArray.length; i++) {
        positionsArray[i] *= scale;
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3));
  geometry.setIndex(new THREE.BufferAttribute(indicesArray, 1));
  geometry.computeVertexNormals();

  return geometry;
}
