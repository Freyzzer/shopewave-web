// Test para utilidades matemáticas y funciones simples

// Función de utilidad para formatear precios
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

// Función para validar email
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Función para calcular descuento
const calculateDiscount = (price: number, discountPercentage: number): number => {
  return price - (price * discountPercentage) / 100
}

describe('Utility Functions', () => {
  describe('formatPrice', () => {
    it('should format price correctly', () => {
      expect(formatPrice(99.99)).toBe('$99.99')
      expect(formatPrice(100)).toBe('$100.00')
      expect(formatPrice(0)).toBe('$0.00')
    })

    it('should handle edge cases', () => {
      expect(formatPrice(-10)).toBe('-$10.00')
    })
  })

  describe('validateEmail', () => {
    it('should validate correct emails', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
      expect(validateEmail('user+tag@example.org')).toBe(true)
    })

    it('should reject invalid emails', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
      expect(validateEmail('user@')).toBe(false)
      expect(validateEmail('user@domain')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })
  })

  describe('calculateDiscount', () => {
    it('should calculate discount correctly', () => {
      expect(calculateDiscount(100, 10)).toBe(90)
      expect(calculateDiscount(50, 25)).toBe(37.5)
      expect(calculateDiscount(200, 0)).toBe(200)
    })

    it('should handle 100% discount', () => {
      expect(calculateDiscount(100, 100)).toBe(0)
    })

    it('should handle negative discount', () => {
      expect(calculateDiscount(100, -10)).toBe(110)
    })
  })
})