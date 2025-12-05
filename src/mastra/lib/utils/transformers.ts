import { parseInput, DEFAULT_CONFIG } from '@src/mastra/lib/utils/helpers'
import { validateInput } from '@src/mastra/lib/utils/validators'

export function transformData(raw: string): Record<string, unknown> {
  const validation = validateInput(raw)
  if (!validation.valid) {
    return { error: validation.message }
  }

  const parsed = parseInput(raw)
  return {
    ...parsed,
    config: DEFAULT_CONFIG,
    transformed: true,
  }
}

export function normalizeOutput(data: unknown): string {
  if (typeof data === 'string') return data
  return JSON.stringify(data)
}
