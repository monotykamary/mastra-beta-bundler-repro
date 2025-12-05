import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import { formatJson, formatWithConfig } from '@src/mastra/lib/utils/formatters/json'
import { formatText, truncate } from '@src/mastra/lib/utils/formatters/text'

export const formatTool = createTool({
  id: 'format-tool',
  description: 'Tool that uses deeply nested @src/* utility imports',
  inputSchema: z.object({
    data: z.unknown(),
    maxLength: z.number().optional(),
  }),
  outputSchema: z.object({
    json: z.string(),
    text: z.string(),
    withConfig: z.string(),
  }),
  execute: async ({ context }) => {
    const json = formatJson(context.data)
    const text = formatText(context.data)
    const withConfig = formatWithConfig(context.data)

    return {
      json: context.maxLength ? truncate(json, context.maxLength) : json,
      text: context.maxLength ? truncate(text, context.maxLength) : text,
      withConfig: context.maxLength ? truncate(withConfig, context.maxLength) : withConfig,
    }
  },
})
