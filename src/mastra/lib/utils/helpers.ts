// Utility helpers that will be imported via @src/*
// CIRCULAR DEPENDENCY: This imports from formatters, which imports from helpers
import { formatJson } from '@src/mastra/lib/utils/formatters/json'

export function formatResponse(data: unknown): string {
  return JSON.stringify(data, null, 2)
}

export function parseInput(input: string): Record<string, unknown> {
  try {
    return JSON.parse(input)
  } catch {
    return { raw: input }
  }
}

export const DEFAULT_CONFIG = {
  maxRetries: 3,
  timeout: 30000,
}

// Use the circular import
export function formatConfigAsJson(): string {
  return formatJson(DEFAULT_CONFIG)
}
