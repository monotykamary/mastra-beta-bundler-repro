import { Mastra } from '@mastra/core/mastra'
import { exampleAgent, nestedAgent } from '@src/mastra/agents'
import { exampleWorkflow, nestedWorkflow } from '@src/mastra/workflows'
import { exampleTool, anotherTool, formatTool } from '@src/mastra/tools'
import { DEFAULT_CONFIG, formatJson, formatText } from '@src/mastra/lib'

console.log('Mastra config:', DEFAULT_CONFIG)
console.log(formatJson({ test: true }))
console.log(formatText('Hello from Mastra'))

export const mastra = new Mastra({
  agents: {
    exampleAgent,
    nestedAgent,
  },
  workflows: {
    exampleWorkflow,
    nestedWorkflow,
  },
  tools: {
    exampleTool,
    anotherTool,
    formatTool,
  },
})
