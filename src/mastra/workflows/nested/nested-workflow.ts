import { createWorkflow, createStep } from '@mastra/core/workflows'
import { z } from 'zod'
import { formatJson, formatWithConfig } from '@src/mastra/lib/utils/formatters/json'
import { formatText } from '@src/mastra/lib/utils/formatters/text'

const formatStep = createStep({
  id: 'format-step',
  inputSchema: z.object({ data: z.unknown() }),
  outputSchema: z.object({ formatted: z.string() }),
  execute: async ({ inputData }) => {
    const jsonResult = formatJson(inputData.data)
    const textResult = formatText(jsonResult)
    const configResult = formatWithConfig(inputData.data)
    return { formatted: `${textResult}\n---\n${configResult}` }
  },
})

export const nestedWorkflow = createWorkflow({
  id: 'nested-workflow',
  description: 'Nested workflow using deeply chained @src/* imports',
  inputSchema: z.object({ data: z.unknown() }),
  outputSchema: z.object({ formatted: z.string() }),
})
  .then(formatStep)
  .commit()
