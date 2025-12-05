import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import { validateInput, validateConfig } from '@src/mastra/lib/utils/validators'
import { formatResponse } from '@src/mastra/lib/utils/helpers'

export const anotherTool = createTool({
  id: 'another-tool',
  description: 'Another tool demonstrating @src/* imports',
  inputSchema: z.object({
    data: z.string().describe('Data to validate'),
    config: z.record(z.unknown()).optional(),
  }),
  execute: async ({ data, config }) => {
    const inputValidation = validateInput(data)
    const configValid = config ? validateConfig(config) : true

    return {
      success: inputValidation.valid && configValid,
      formatted: formatResponse({ data, config }),
    }
  },
})
