// Barrel file re-exporting agents using @src path aliases
export { exampleAgent } from '@src/mastra/agents/example-agent'
export { nestedAgent } from '@src/mastra/agents/nested-agent'
// Re-export from nested levels
export * from '@src/mastra/agents/nested'
