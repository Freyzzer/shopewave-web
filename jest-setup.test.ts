// Simple test to verify Jest is working
describe('Jest Setup', () => {
  it('should run a basic test', () => {
    expect(2 + 2).toBe(4)
  })

  it('should handle async operations', async () => {
    const result = await Promise.resolve(42)
    expect(result).toBe(42)
  })
})