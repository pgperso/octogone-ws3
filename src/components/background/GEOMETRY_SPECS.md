# Spécifications Géométriques des Bipyramides 3D

## 1. Bipyramide Rhombique (Losange 3D)

### Paramètres d'entrée
- `diagH` : Diagonale horizontale du losange (axe X)
- `diagV` : Diagonale verticale du losange (axe Y)
- `height` (H) : Hauteur totale (sommet haut ↔ sommet bas)

### Convenances
- `a = diagH / 2` (demi-diagonale horizontale)
- `b = diagV / 2` (demi-diagonale verticale)

### Sommets
**Base (plan Z=0) :**
- P₀ = (+a, 0, 0)
- P₁ = (0, +b, 0)
- P₂ = (-a, 0, 0)
- P₃ = (0, -b, 0)

**Apex :**
- U = (0, 0, +H/2) (sommet haut)
- L = (0, 0, -H/2) (sommet bas)

### Arêtes / Triangles
- Côtés du losange (tous égaux) : `s = √(a² + b²)`
- Pour chaque côté (P₀→P₁, P₁→P₂, P₂→P₃, P₃→P₀) :
  - Triangle haut : (Pᵢ, Pᵢ₊₁, U)
  - Triangle bas : (Pᵢ₊₁, Pᵢ, L) [ordre anti-horaire vu de l'extérieur]

### Volumes / Surfaces
- **Aire base (losange)** : `A = (diagH × diagV) / 2 = 2ab`
- **Volume bipyramide** : `V = (A × H) / 3 = (2ab × H) / 3`
- **Distance du centre à un côté (apothem)** : `r_in = ab / s`
- **Hauteur oblique (slant)** : `ℓ = √((H/2)² + r_in²)`
- **Surface latérale totale (8 triangles)** : `S = 4sℓ`

### Normalisation
- **Rayon max** : `rMax = max(a, b, H/2)`
- **Facteur d'échelle** : `scale = 1 / rMax`

---

## 2. Bipyramide Octogonale Régulière

### Paramètres d'entrée
- `edge` (e) : Arête de l'octogone régulier
- `height` (H) : Hauteur totale (sommet haut ↔ sommet bas)

### Géométrie de l'octogone
- **Rayon circonscrit** : `R = e / (2 × sin(π/8))`
- **Rayon inscrit (apothem)** : `r = e / (2 × tan(π/8)) = R × cos(π/8)`

### Sommets
**Base (plan Z=0), pour k = 0..7 :**
- Pₖ = (R × cos(θₖ), R × sin(θₖ), 0)
- avec θₖ = 2πk / 8

**Apex :**
- U = (0, 0, +H/2) (sommet haut)
- L = (0, 0, -H/2) (sommet bas)

### Triangles
Pour chaque arête (Pₖ → Pₖ₊₁) :
- Triangle haut : (Pₖ, Pₖ₊₁, U)
- Triangle bas : (Pₖ₊₁, Pₖ, L) [ordre anti-horaire externe]

### Volumes / Surfaces
- **Périmètre** : `P = 8e`
- **Aire base (octogone régulier)** : `A = 2(1 + √2)e²`
  - Formule alternative : `A = (1/2) × P × r = 4er`
- **Volume bipyramide** : `V = (A × H) / 3`
- **Hauteur oblique (slant)** : `ℓ = √((H/2)² + r²)`
- **Surface latérale totale (16 triangles)** : `S = 8eℓ`

### Normalisation
- **Rayon max** : `rMax = max(R, H/2)`
- **Facteur d'échelle** : `scale = 1 / rMax`

---

## Récapitulatif Ultra-Court

### Rhombus Bipyramide
- Base losange (demi-diagonales a, b)
- Apex ±H/2
- **Volume** : `V = (2ab × H) / 3`
- **Surface** : `S = 4s√((H/2)² + (ab/s)²)` avec `s = √(a² + b²)`

### Octogone Bipyramide
- Base régulière (arête e, R = e/(2 sin π/8), r = e/(2 tan π/8))
- Apex ±H/2
- **Volume** : `V = (A × H) / 3` avec `A = 4er`
- **Surface** : `S = 8e√((H/2)² + r²)`
