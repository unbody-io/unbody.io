import {Unbody} from "@unbody-io/ts-client";

export const unbody = new Unbody({
    apiKey: process.env.UNBODY_API_KEY,
    projectId: process.env.UNBODY_PROJECT_ID
})
