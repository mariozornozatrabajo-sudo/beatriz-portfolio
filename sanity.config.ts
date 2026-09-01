import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId: projectId || 'dummy',
  dataset: dataset || 'production',
  schema,
  plugins: [
    structureTool(),
  ],
})
