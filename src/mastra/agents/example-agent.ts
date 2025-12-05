import { Agent } from '@mastra/core/agent'
import { exampleTool, anotherTool } from '@src/mastra/tools'
import { DEFAULT_CONFIG } from '@src/mastra/lib/utils/helpers'

export const exampleAgent = new Agent({
  id: 'example-agent',
  name: 'example-agent',
  instructions: `You are an example agent demonstrating @src/* path alias imports.

Configuration: ${JSON.stringify(DEFAULT_CONFIG)}

Use the available tools to process user requests.`,
  model: {
    provider: 'OPEN_AI',
    name: 'gpt-4o-mini',
  },
  tools: {
    exampleTool,
    anotherTool,
  },
})
