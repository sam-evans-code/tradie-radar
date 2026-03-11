/**
 * Jest Setup Verification Test
 * Tests that our testing framework is properly configured
 */

describe('Jest Setup', () => {
  test('Jest is working correctly', () => {
    expect(true).toBe(true)
  })

  test('Environment variables are mocked', () => {
    expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBe('https://test.supabase.co')
    expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe('test-anon-key')
    expect(process.env.OPENAI_API_KEY).toBe('test-openai-key')
  })

  test('TypeScript compilation works', () => {
    const testObject: { name: string; value: number } = {
      name: 'test',
      value: 42
    }
    expect(testObject.name).toBe('test')
    expect(testObject.value).toBe(42)
  })
})