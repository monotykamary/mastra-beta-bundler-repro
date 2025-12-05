import { Agent } from '@mastra/core/agent'
import { deepAgent } from '@src/mastra/agents/nested'
import { formatText } from '@src/mastra/lib/utils/formatters/text'

export const nestedAgent = new Agent({
  name: 'nestedAgent',
  model: {
    provider: 'ANTHROPIC',
    name: 'claude-sonnet-4-20250514',
    toolChoice: 'auto',
  },
  instructions: `You are a nested agent that references other agents. Deep agent name: ${deepAgent.name}. ${formatText('Hello world')}`,
})
