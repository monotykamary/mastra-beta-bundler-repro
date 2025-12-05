import { formatResponse } from '@src/mastra/lib/utils/helpers'

export function validateInput(input: unknown): { valid: boolean; message: string } {
  if (!input) {
    return { valid: false, message: 'Input is required' }
  }
  return { valid: true, message: formatResponse(input) }
}

export function validateConfig(config: Record<string, unknown>): boolean {
  return Object.keys(config).length > 0
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-]{10,}$/
  return phoneRegex.test(phone)
}
