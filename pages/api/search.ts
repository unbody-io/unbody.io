import { Server } from 'unbody-nextra-service/build/server'

const server = new Server({
  apiKey: process.env.UNBODY_SEARCH_API_KEY || "",
  projectId: process.env.UNBODY_SEARCH_PROJECT_ID || "",
  sourceId: process.env.UNBODY_SEARCH_SOURCE_ID || "",
  assistant: {
    name: "unbody.io" || "Assistant",
  }
})

const handler = server.handler

export default handler
