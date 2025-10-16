import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('combines class names correctly', () => {
    const result = cn('class1', 'class2', 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('handles conditional classes', () => {
    const result = cn('base', true && 'conditional', false && 'hidden')
    expect(result).toBe('base conditional')
  })

  it('handles undefined and null values', () => {
    const result = cn('base', undefined, null, 'valid')
    expect(result).toBe('base valid')
  })

  it('handles empty strings', () => {
    const result = cn('base', '', 'valid')
    expect(result).toBe('base valid')
  })

  it('merges Tailwind classes correctly', () => {
    const result = cn('px-4 py-2', 'px-6') // px-6 should override px-4
    expect(result).toContain('px-6')
    expect(result).not.toContain('px-4')
  })

  it('handles complex conditional logic', () => {
    const variant = 'primary'
    const size = 'lg'
    const disabled = false
    
    const result = cn(
      'base-class',
      variant === 'primary' && 'bg-blue-500',
      variant === 'secondary' && 'bg-gray-500',
      size === 'lg' && 'text-lg',
      disabled && 'opacity-50'
    )
    
    expect(result).toBe('base-class bg-blue-500 text-lg')
  })
})
