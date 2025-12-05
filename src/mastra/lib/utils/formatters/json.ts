import { DEFAULT_CONFIG } from '@src/mastra/lib/utils/helpers'

export function formatJson(data: unknown): string {
  return JSON.stringify(data, null, 2)
}

export function formatWithConfig(data: unknown): string {
  return JSON.stringify({ ...DEFAULT_CONFIG, data }, null, 2)
}
