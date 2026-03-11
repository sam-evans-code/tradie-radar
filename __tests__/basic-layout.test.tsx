/**
 * Basic UI Layout Component Tests
 * Tests foundation layout matching landing page style
 */

import { render, screen } from '@testing-library/react'
import BasicLayout from '@/components/ui/basic-layout'

describe('Basic UI Layout', () => {
  test('renders layout with children content', () => {
    render(
      <BasicLayout>
        <div data-testid="test-content">Test Content</div>
      </BasicLayout>
    )
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  test('includes header with Compete branding', () => {
    render(
      <BasicLayout>
        <div>Content</div>
      </BasicLayout>
    )
    
    // Should have Compete branding/logo
    expect(screen.getByText(/compete/i)).toBeInTheDocument()
  })

  test('applies consistent styling classes', () => {
    render(
      <BasicLayout>
        <div>Content</div>
      </BasicLayout>
    )
    
    // Should have main container with proper styling
    const layout = screen.getByRole('main')
    expect(layout).toBeInTheDocument()
    expect(layout).toHaveClass('min-h-screen')
  })

  test('supports custom title prop', () => {
    render(
      <BasicLayout title="Custom Page Title">
        <div>Content</div>
      </BasicLayout>
    )
    
    expect(screen.getByText('Custom Page Title')).toBeInTheDocument()
  })

  test('has responsive design classes', () => {
    render(
      <BasicLayout>
        <div>Content</div>
      </BasicLayout>
    )
    
    // Check the container div has responsive classes
    const layout = screen.getByRole('main')
    const containerDiv = layout.querySelector('.container')
    expect(containerDiv).toHaveClass('container', 'mx-auto', 'px-4')
  })

  test('matches landing page gradient background', () => {
    render(
      <BasicLayout>
        <div>Content</div>
      </BasicLayout>
    )
    
    const layout = screen.getByRole('main')
    expect(layout).toHaveClass('bg-gradient-to-br', 'from-blue-50', 'to-indigo-100')
  })
})