/**
 * OpenAI Integration for Competitive Insights
 * Generates actionable intelligence from competitor data using GPT-4
 */

import 'openai/shims/node'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export interface CompetitorData {
  competitors: Array<{
    name: string
    pricing?: any
    features?: string[]
    [key: string]: any
  }>
  prospectCompany: string
}

export interface CompetitiveInsights {
  insights: string[]
  summary: string
  recommendations: string[]
}

export async function generateCompetitiveInsights(data: CompetitorData): Promise<CompetitiveInsights> {
  // Validate input data
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid input data: expected object')
  }
  
  if (!data.competitors || !Array.isArray(data.competitors)) {
    throw new Error('Invalid competitors data: expected array')
  }
  
  if (!data.prospectCompany || typeof data.prospectCompany !== 'string') {
    throw new Error('Invalid prospect company: expected string')
  }

  const prompt = `
You are a competitive intelligence analyst. Analyze the following competitor data for ${data.prospectCompany} and provide actionable insights.

Competitor Data:
${JSON.stringify(data.competitors, null, 2)}

Please provide your analysis in the following JSON format:
{
  "insights": ["Key insight 1", "Key insight 2", "Key insight 3"],
  "summary": "Executive summary of competitive landscape",
  "recommendations": ["Actionable recommendation 1", "Actionable recommendation 2"]
}

Focus on:
1. Pricing positioning opportunities
2. Feature gaps and advantages
3. Market positioning insights
4. Immediate actionable recommendations for sales teams

Keep insights concise and business-focused.
`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a competitive intelligence expert who provides actionable business insights.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No content returned from OpenAI')
    }

    // Parse the JSON response
    const parsedInsights = JSON.parse(content) as CompetitiveInsights
    
    // Validate the response structure
    if (!parsedInsights.insights || !Array.isArray(parsedInsights.insights)) {
      throw new Error('Invalid response: missing insights array')
    }
    
    if (!parsedInsights.summary || typeof parsedInsights.summary !== 'string') {
      throw new Error('Invalid response: missing summary string')
    }
    
    if (!parsedInsights.recommendations || !Array.isArray(parsedInsights.recommendations)) {
      throw new Error('Invalid response: missing recommendations array')
    }

    return parsedInsights

  } catch (error) {
    // Re-throw with context for better debugging
    if (error instanceof Error) {
      throw new Error(`OpenAI API error: ${error.message}`)
    }
    throw error
  }
}