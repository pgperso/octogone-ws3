# OctogoneButton Component

Composant de bouton réutilisable avec le style et les interactions standardisées d'Octogone.

## Fonctionnalités

- ✅ **Couleurs de marque** : Primary (doré) et Secondary (bleu)
- ✅ **Hover interactif** : Primary → Secondary et vice versa
- ✅ **Tailles multiples** : sm, md, lg
- ✅ **Support icônes** : Icône optionnelle à gauche
- ✅ **Link ou Button** : Automatique selon la prop `href`
- ✅ **États disabled** : Gestion complète
- ✅ **Animations** : Scale, ombres, transitions

## Utilisation

### Bouton Link (avec href)
```tsx
import { OctogoneButton } from '@/components/ui/octogone-button';

<OctogoneButton 
  href="/contact"
  variant="primary"
  size="lg"
  icon={<ChatIcon />}
>
  Nous contacter
</OctogoneButton>
```

### Bouton standard (avec onClick)
```tsx
<OctogoneButton 
  onClick={() => handleSubmit()}
  variant="secondary"
  size="md"
  type="submit"
>
  Envoyer
</OctogoneButton>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Contenu du bouton |
| `href` | `string` | - | URL pour Link (optionnel) |
| `onClick` | `() => void` | - | Handler click (optionnel) |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Style du bouton |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du bouton |
| `icon` | `ReactNode` | - | Icône à gauche (optionnel) |
| `disabled` | `boolean` | `false` | État désactivé |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Type de bouton |

## Variants

### Primary (défaut)
- **Normal :** Fond doré (#dcb26b)
- **Hover :** Fond bleu (#BADFF6)

### Secondary
- **Normal :** Fond bleu (#BADFF6)
- **Hover :** Fond doré (#dcb26b)

## Tailles

- **sm :** `px-4 py-2 text-sm`
- **md :** `px-6 py-3 text-base`
- **lg :** `px-8 py-4 text-base`

## Exemples

### Avec icône
```tsx
<OctogoneButton 
  href="/demo"
  icon={<CalendarIcon />}
>
  Planifier une démo
</OctogoneButton>
```

### Bouton désactivé
```tsx
<OctogoneButton 
  disabled={isLoading}
  onClick={handleSubmit}
>
  {isLoading ? 'Envoi...' : 'Envoyer'}
</OctogoneButton>
```

### Bouton secondary
```tsx
<OctogoneButton 
  variant="secondary"
  size="sm"
>
  Annuler
</OctogoneButton>
```
