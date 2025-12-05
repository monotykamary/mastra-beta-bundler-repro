import { createWorkflow, createStep } from '@mastra/core/workflows'
import { z } from 'zod'
import { transformData } from '@src/mastra/lib/utils/transformers'
import { validateInput } from '@src/mastra/lib/utils/validators'
import { formatResponse, DEFAULT_CONFIG } from '@src/mastra/lib/utils/helpers'

const inputStep = createStep({
  id: 'input-step',
  description: 'Process input data',
  inputSchema: z.object({
    query: z.string(),
  }),
  outputSchema: z.object({
    processed: z.record(z.unknown()),
    valid: z.boolean(),
  }),
  execute: async ({ inputData }) => {
    const validation = validateInput(inputData.query)
    const processed = transformData(inputData.query)

    return {
      processed,
      valid: validation.valid,
    }
  },
})

const outputStep = createStep({
  id: 'output-step',
  description: 'Format output',
  inputSchema: z.object({
    processed: z.record(z.unknown()),
    valid: z.boolean(),
  }),
  outputSchema: z.object({
    result: z.string(),
    config: z.record(z.unknown()),
  }),
  execute: async ({ inputData }) => {
    return {
      result: formatResponse(inputData.processed),
      config: DEFAULT_CONFIG,
    }
  },
})

export const exampleWorkflow = createWorkflow({
  id: 'example-workflow',
  description: 'Example workflow using @src/* imports',
  inputSchema: z.object({
    query: z.string(),
  }),
  outputSchema: z.object({
    result: z.string(),
    config: z.record(z.unknown()),
  }),
})
  .then(inputStep)
  .then(outputStep)
  .commit()
