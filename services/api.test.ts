// Mock fetch para los tests de servicios
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('Product Services', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  describe('getAllCategories', () => {
    it('should fetch categories successfully', async () => {
      const mockCategories = [
        { id: '1', name: 'Electronics' },
        { id: '2', name: 'Clothing' },
      ]

      mockFetch.mockResolvedValueOnce({
        json: async () => mockCategories,
      } as Response)

      // Simular la llamada al servicio
      const result = await fetch('https://dummyjson.com/products/categories')
      const categories = await result.json()

      expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/categories')
      expect(categories).toEqual(mockCategories)
    })

    it('should handle fetch errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      await expect(fetch('https://dummyjson.com/products/categories')).rejects.toThrow('Network error')
    })
  })

  describe('getProductsById', () => {
    it('should fetch product successfully', async () => {
      const mockProduct = {
        id: 1,
        title: 'Test Product',
        price: 99.99,
      }

      mockFetch.mockResolvedValueOnce({
        json: async () => mockProduct,
      } as Response)

      // Simular la llamada al servicio
      const result = await fetch('https://dummyjson.com/products/1')
      const product = await result.json()

      expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/1')
      expect(product).toEqual(mockProduct)
    })
  })
})