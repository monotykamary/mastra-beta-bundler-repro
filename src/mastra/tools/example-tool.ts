import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import { transformData, normalizeOutput } from '@src/mastra/lib/utils'
import { DEFAULT_CONFIG } from '@src/mastra/lib/utils/helpers'

export const exampleTool = createTool({
  id: 'example-tool',
  description: 'An example tool that uses @src/* imports',
  inputSchema: z.object({
    query: z.string().describe('The query to process'),
  }),
  execute: async ({ query }) => {
    const transformed = transformData(query)
    const output = normalizeOutput(transformed)

    return {
      success: true,
      result: output,
      config: DEFAULT_CONFIG,
    }
  },
})
