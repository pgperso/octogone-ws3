import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OctogoneButton } from '@/components/ui/octogone-button'

describe('OctogoneButton', () => {
  it('renders button with text', () => {
    render(<OctogoneButton>Test Button</OctogoneButton>)
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument()
  })

  it('renders link when href is provided', () => {
    render(<OctogoneButton href="/test">Test Link</OctogoneButton>)
    expect(screen.getByRole('link', { name: 'Test Link' })).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
  })

  it('applies primary variant styles', () => {
    render(<OctogoneButton variant="primary">Primary Button</OctogoneButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-gradient-to-r')
  })

  it('applies secondary variant styles', () => {
    render(<OctogoneButton variant="secondary">Secondary Button</OctogoneButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('border-2')
  })

  it('applies large size styles', () => {
    render(<OctogoneButton size="lg">Large Button</OctogoneButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('px-8', 'py-4')
  })

  it('renders with icon', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>
    render(<OctogoneButton icon={<TestIcon />}>Button with Icon</OctogoneButton>)
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()
    
    render(<OctogoneButton onClick={handleClick}>Clickable Button</OctogoneButton>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<OctogoneButton disabled>Disabled Button</OctogoneButton>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('opacity-50')
  })
})
