import { render, screen } from '@testing-library/react'
import ToolDetailWidget from '@/components/widgets/tool-detail-widget'
import { Tool } from '@/data/tools/tools-content'

// Mock tool data pour les tests
const mockTool: Tool = {
  id: 'test-tool',
  titleFr: 'Outil Test',
  titleEn: 'Test Tool',
  descriptionFr: 'Description de test',
  descriptionEn: 'Test description',
  features: [
    {
      titleFr: 'Feature 1',
      titleEn: 'Feature 1',
      descriptionFr: 'Description feature 1',
      descriptionEn: 'Feature 1 description',
      benefits: [
        { fr: 'Bénéfice 1', en: 'Benefit 1' },
        { fr: 'Bénéfice 2', en: 'Benefit 2' }
      ],
      concepts: ['operate', 'automate'],
      image: '/test-image-1.jpg'
    },
    {
      titleFr: 'Feature 2',
      titleEn: 'Feature 2',
      descriptionFr: 'Description feature 2',
      descriptionEn: 'Feature 2 description',
      benefits: [
        { fr: 'Bénéfice 3', en: 'Benefit 3' }
      ],
      concepts: ['analyze'],
      image: '/test-image-2.jpg'
    }
  ],
  sections: [
    {
      features: [0, 1]
    }
  ]
}

describe('ToolDetailWidget', () => {
  it('renders without crashing', () => {
    render(<ToolDetailWidget tool={mockTool} locale="fr" />)
    expect(screen.getByText('Feature 1')).toBeInTheDocument()
  })

  it('displays French content when locale is fr', () => {
    render(<ToolDetailWidget tool={mockTool} locale="fr" />)
    expect(screen.getByText('Feature 1')).toBeInTheDocument()
    expect(screen.getByText('Description feature 1')).toBeInTheDocument()
    expect(screen.getByText('Bénéfice 1')).toBeInTheDocument()
  })

  it('displays English content when locale is en', () => {
    render(<ToolDetailWidget tool={mockTool} locale="en" />)
    expect(screen.getByText('Feature 1')).toBeInTheDocument()
    expect(screen.getByText('Feature 1 description')).toBeInTheDocument()
    expect(screen.getByText('Benefit 1')).toBeInTheDocument()
  })

  it('renders concept badges', () => {
    render(<ToolDetailWidget tool={mockTool} locale="fr" />)
    expect(screen.getByText('OPÉRER')).toBeInTheDocument()
    expect(screen.getByText('AUTOMATISER')).toBeInTheDocument()
  })

  it('renders benefits with check icons', () => {
    render(<ToolDetailWidget tool={mockTool} locale="fr" />)
    const benefits = screen.getAllByText(/Bénéfice/)
    expect(benefits).toHaveLength(3) // 2 pour feature 1, 1 pour feature 2
  })

  it('returns null when no sections provided', () => {
    const emptyTool = { ...mockTool, sections: [] }
    const { container } = render(<ToolDetailWidget tool={emptyTool} locale="fr" />)
    expect(container.firstChild).toBeNull()
  })

  it('handles missing features gracefully', () => {
    const toolWithMissingFeature = {
      ...mockTool,
      sections: [{ features: [0, 999] }] // 999 n'existe pas
    }
    render(<ToolDetailWidget tool={toolWithMissingFeature} locale="fr" />)
    expect(screen.getByText('Feature 1')).toBeInTheDocument()
    // Ne devrait pas crasher même avec un index inexistant
  })
})
