/**
 * OpenAI API Integration Tests
 * Tests GPT-4 integration for competitive insights generation
 */

// Mock OpenAI
jest.mock('openai', () => {
  const mockCreate = jest.fn()
  
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreate
        }
      }
    }))
  }
})

import { generateCompetitiveInsights } from '@/lib/openai/insights'

// Get the mocked create function
const getMockCreate = () => {
  const OpenAI = require('openai').default
  const instance = new OpenAI()
  return instance.chat.completions.create
}

describe('OpenAI Integration', () => {
  beforeEach(() => {
    // Reset and setup default mock
    const mockCreate = getMockCreate()
    mockCreate.mockResolvedValue({
      choices: [{
        message: {
          content: JSON.stringify({
            insights: ['Test insight 1', 'Test insight 2'],
            summary: 'Test competitive analysis summary',
            recommendations: ['Test recommendation']
          })
        }
      }]
    })
  })

  test('generates competitive insights from competitor data', async () => {
    const competitorData = {
      competitors: [
        {
          name: 'Competitor A',
          pricing: { plans: [{ name: 'Pro', price: '$99' }] },
          features: ['Feature 1', 'Feature 2']
        }
      ],
      prospectCompany: 'Test Company'
    }

    const result = await generateCompetitiveInsights(competitorData)
    
    expect(result).toBeDefined()
    expect(result.insights).toBeInstanceOf(Array)
    expect(result.insights.length).toBeGreaterThan(0)
    expect(result.summary).toBeDefined()
    expect(result.recommendations).toBeInstanceOf(Array)
  })

  test('handles API errors gracefully', async () => {
    // Mock API error for this test
    const mockCreate = getMockCreate()
    mockCreate.mockRejectedValueOnce(new Error('API Error'))

    const competitorData = {
      competitors: [],
      prospectCompany: 'Test Company'
    }

    await expect(generateCompetitiveInsights(competitorData)).rejects.toThrow('OpenAI API error: API Error')
  })

  test('validates input data structure', async () => {
    // Test missing required fields
    await expect(generateCompetitiveInsights({} as any)).rejects.toThrow()
    
    // Test invalid competitor data
    await expect(generateCompetitiveInsights({ 
      competitors: 'invalid', 
      prospectCompany: 'Test' 
    } as any)).rejects.toThrow()
  })

  test('returns structured insight format', async () => {
    const competitorData = {
      competitors: [{ name: 'Test Competitor', pricing: {}, features: [] }],
      prospectCompany: 'Test Company'
    }

    const result = await generateCompetitiveInsights(competitorData)
    
    // Verify required fields
    expect(result).toHaveProperty('insights')
    expect(result).toHaveProperty('summary')
    expect(result).toHaveProperty('recommendations')
    
    // Verify data types
    expect(Array.isArray(result.insights)).toBe(true)
    expect(typeof result.summary).toBe('string')
    expect(Array.isArray(result.recommendations)).toBe(true)
  })
})