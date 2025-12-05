import { formatJson } from '@src/mastra/lib/utils/formatters/json'

export function formatText(data: unknown): string {
  if (typeof data === 'string') return data
  return formatJson(data)
}

export function truncate(text: string, length: number = 100): string {
  return text.length > length ? text.slice(0, length) + '...' : text
}
