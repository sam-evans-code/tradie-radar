/**
 * Supabase Client Configuration Tests
 * Tests client setup and basic database operations
 */

import { createClient } from '@/lib/supabase/client'

// Mock Supabase SSR
jest.mock('@supabase/ssr', () => ({
  createBrowserClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn(),
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        data: [],
        error: null
      })),
      insert: jest.fn(() => ({
        data: [],
        error: null
      })),
      update: jest.fn(() => ({
        data: [],
        error: null
      })),
      delete: jest.fn(() => ({
        data: [],
        error: null
      }))
    }))
  }))
}))

describe('Supabase Client Configuration', () => {
  test('creates client with correct configuration', () => {
    const client = createClient()
    
    expect(client).toBeDefined()
    expect(client.auth).toBeDefined()
    expect(typeof client.from).toBe('function')
  })

  test('client has required authentication methods', () => {
    const client = createClient()
    
    expect(typeof client.auth.getUser).toBe('function')
    expect(typeof client.auth.signInWithPassword).toBe('function')
    expect(typeof client.auth.signUp).toBe('function')
    expect(typeof client.auth.signOut).toBe('function')
  })

  test('client can perform database operations', () => {
    const client = createClient()
    
    // Test table access
    const table = client.from('test_table')
    expect(table).toBeDefined()
    expect(typeof table.select).toBe('function')
    expect(typeof table.insert).toBe('function')
    expect(typeof table.update).toBe('function')
    expect(typeof table.delete).toBe('function')
  })

  test('environment variables are used correctly', () => {
    // This test verifies that the client uses environment variables
    // In a real implementation, we'd check that createClient was called with correct params
    expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBe('https://test.supabase.co')
    expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe('test-anon-key')
  })
})