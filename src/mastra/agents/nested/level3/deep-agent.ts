import { Agent } from '@mastra/core/agent'
import { formatJson } from '@src/mastra/lib/utils/formatters/json'

export const deepAgent = new Agent({
  name: 'deepAgent',
  model: {
    provider: 'ANTHROPIC',
    name: 'claude-sonnet-4-20250514',
    toolChoice: 'auto',
  },
  instructions: `You are a deeply nested agent. Config: ${formatJson({ nested: true })}`,
})
